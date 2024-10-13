import { inject, singleton } from 'tsyringe';
import Logger from '../../infrastructure/logger/logger';
import ConsoleLogger from '../../infrastructure/logger/console/console.logger';
import MysqlUserRepository from '../../infrastructure/repository/mysql-user.repository';
import UserRepository from '../../domain/repository/user.repository';
import { HttpRequest, HttpResponse } from '../../domain/types/route';
import { NewUserRequestDtoSchema, NewUserRequestDtoType } from '../../domain/dto/new-user-request.dto';
import { HTTP_STATUS } from '../../domain/constants';
import { BadRequestError, SchemaValidationError } from '../../domain/errors';
import { validationSchemaBody } from '../../domain/decorators';
import { LoginUserRequestDtoSchema, LoginUserRequestDtoType } from '../../domain/dto/login-user-request.dto';
import jwt from 'jsonwebtoken';
import EnvConfigurationRepository from '../../infrastructure/repository/env-configuration.repository';
import ConfigurationRepository from '../../domain/repository/configuration.repository';
import SecretKeyError from '../../domain/errors/secret-key.error';

const className = 'UserController';

@singleton()
export default class UserController {
    constructor(
        @inject(ConsoleLogger) private _logger: Logger,
        @inject(MysqlUserRepository) private _userRepository: UserRepository,
        @inject(EnvConfigurationRepository)
        private _configurationRepository: ConfigurationRepository,
    ) {}

    @validationSchemaBody(NewUserRequestDtoSchema)
    async register(req: HttpRequest<NewUserRequestDtoType>): Promise<HttpResponse> {
        const method = this.register.name;
        try {
            if (!req.body) throw new BadRequestError();
            const userDto = req.body;
            const result = await this._userRepository.register(userDto);

            return {
                statusCode: HTTP_STATUS.CREATED,
                body: result,
            };
        } catch (error) {
            this._logger.error({ className, method, error: <Error>error });
            if (error instanceof BadRequestError || error instanceof SchemaValidationError) {
                return error.errorResponse();
            }

            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                body: JSON.stringify(error),
            };
        }
    }

    @validationSchemaBody(LoginUserRequestDtoSchema)
    async login(req: HttpRequest<LoginUserRequestDtoType>): Promise<HttpResponse> {
        const method = this.login.name;
        try {
            if (!req.body) throw new BadRequestError();
            const userDto = req.body;
            const cnf = this._configurationRepository.get();

            if (!cnf.jwt.secretKey) throw new SecretKeyError();

            const token = jwt.sign(userDto, cnf.jwt.secretKey, { expiresIn: cnf.jwt.expiredToken });

            return {
                statusCode: HTTP_STATUS.OK,
                body: { token },
            };
        } catch (e) {
            this._logger.error({ className, method, error: <Error>e });

            if (e instanceof BadRequestError || e instanceof SchemaValidationError || e instanceof SecretKeyError) {
                return e.errorResponse();
            }

            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                body: JSON.stringify(e),
            };
        }
    }
}
