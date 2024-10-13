import 'reflect-metadata';
import ConsoleLogger from '../../../../src/infrastructure/logger/console/console.logger';
import EnvConfigurationRepository from '../../../../src/infrastructure/repository/env-configuration.repository';
import dotenv from 'dotenv';

describe('EnvConfigurationRepository test suite', () => {
    const logger = new ConsoleLogger();
    describe('Load especific .env', () => {
        it('return default values set in constructor', () => {
            dotenv.config({ path: './src/env/.env.dev.test', override: true });

            const sut = new EnvConfigurationRepository(logger);
            const actual = sut.get();
            const expected = {
                nodeEnv: 'test',
                serverLivePort: 3000,
                serverTestPort: 8000,
            };

            expect(actual.nodeEnv).toBe(expected.nodeEnv);
            expect(actual.server.live.port).toBe(expected.serverLivePort);
            expect(actual.server.test.port).toBe(expected.serverTestPort);
        });
    });

    describe('setEnv', () => {
        it('should override nodeEnv property', () => {
            dotenv.config({ path: './src/env/.env.dev.test' });

            const sut = new EnvConfigurationRepository(logger);
            const actual = sut.get();
            const expectedFirst = 'test';

            expect(actual.nodeEnv).toBe(expectedFirst);

            sut.setEnv('live');
            const expectedSecond = 'live';

            expect(actual.nodeEnv).toBe(expectedSecond);
        });
    });
});
