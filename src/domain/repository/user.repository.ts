import CrudOperations from '../../infrastructure/db/crud-operations';
import { NewUserRequestDtoType } from '../dto/new-user-request.dto';
import { UserEntity, UserEntityPacket } from '../entity/user.entity';

export default interface UserRepository extends CrudOperations<UserEntity, UserEntityPacket> {
    register(user: NewUserRequestDtoType): Promise<Omit<UserEntity, 'password' | 'salt'>>;
}
