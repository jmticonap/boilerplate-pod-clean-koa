import { middleware, MiddlewareManager } from '../../../src/infrastructure/middleware-manager';

describe('MiddlewareManager', () => {
    let sut: MiddlewareManager;

    beforeEach(() => {
        sut = middleware();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should execute the handler function', async () => {
        const handler = () => "I'm a handler";
        const actual = await sut.handler<string>(handler)();
        const expected = "I'm a handler";

        expect(typeof actual).toBe('string');
        expect(actual).toBe(expected);
    });

    it('should execute the handler (async) function with especific response type', async () => {
        const handler = async () => Promise.resolve(2024);
        const actual = await sut.handler<number>(handler)();
        const expected = 2024;

        expect(typeof actual).toBe('number');
        expect(actual).toBe(expected);
    });

    it('should execute middleware before handler function', async () => {
        const middl1 = () => 'Middleware #01';
        const handler = () => "I'm a handler";
        const actual = await sut.use(middl1).handler<string>(handler)();
        const expected = 'Middleware #01';

        expect(typeof actual).toBe('string');
        expect(actual).toBe(expected);
    });

    it('should execute middleware (async) before handler (async) function', async () => {
        const middl1 = async () => Promise.resolve('Middleware #01');
        const handler = async () => Promise.resolve("I'm a handler");
        const actual = await sut.use(middl1).handler<string>(handler)();
        const expected = 'Middleware #01';

        expect(typeof actual).toBe('string');
        expect(actual).toBe(expected);
    });

    it('should throw an error if handler fail', async () => {
        const handler = () => {
            throw new Error();
        };

        await expect(sut.handler<string>(handler)()).rejects.toThrow();
    });

    it('should throw an error if middleware fail', async () => {
        const middl1 = () => {
            throw new Error();
        };
        const handler = () => 2024;

        await expect(sut.use(middl1).handler<string>(handler)()).rejects.toThrow();
    });
});
