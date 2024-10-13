import 'reflect-metadata';
import ActivityController from '../../../../src/application/controller/activity.controller';
import Logger from '../../../../src/infrastructure/logger/logger';
import { HttpRequest, HttpResponse } from '../../../../src/domain/types/route';
import { ActivityRequestDtoType } from '../../../../src/domain/dto/activity-request.dto';
import { HTTP_STATUS } from '../../../../src/domain/constants';
import { ResponsePage } from '../../../../src/domain/types';
import { ActivityEntity } from '../../../../src/domain/entity/activity.entity';
import { URLSearchParams } from 'url';
import { BadRequestError } from '../../../../src/domain/errors';

describe('ActivityController test suite', () => {
    let sut: ActivityController;
    let loggerMock: jest.Mocked<Logger>;
    let activityServiceMock: any;
    const newActivityMock = jest.fn();
    const activityRepositoryFindByIdMock = jest.fn();
    const activityRepositoryfindAllMock = jest.fn();
    const activityRepositoryfindByTagsMock = jest.fn();

    beforeEach(() => {
        loggerMock = {
            info: jest.fn(),
            debug: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        };
        activityServiceMock = {
            newActivity: newActivityMock,
            activityRepository: {
                findById: activityRepositoryFindByIdMock,
                findAll: activityRepositoryfindAllMock,
                findByTags: activityRepositoryfindByTagsMock,
            },
        };
        sut = new ActivityController(loggerMock, activityServiceMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('newActivity', () => {
        it('should returns a successful response', async () => {
            const newActivity = {
                title: 'title',
                estimate_time: 5,
                description: 'description',
                active: true,
            };
            newActivityMock.mockResolvedValue(newActivity);
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'POST',
                url: '/activity',
                body: {
                    title: 'title',
                    description: 'description',
                    tags: ['tag1'],
                },
            };
            const actual = await sut.newActivity(req);

            expect(actual.body).toEqual({ ...newActivity });
        });

        it('should returns a request validation exception response with bad body', async () => {
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'POST',
                url: '/activity',
                body: {
                    title: '',
                    description: 'description',
                    tags: ['tag1'],
                },
            };
            const actual = await sut.newActivity(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
        });

        it('should returns a request validation exception response without a body', async () => {
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'POST',
                url: '/activity',
            };
            const actual = await sut.newActivity(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
        });

        it('should returns a exception response with some fail', async () => {
            newActivityMock.mockRejectedValue(new Error('Some error'));
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'POST',
                url: '/activity',
                body: {
                    title: 'title',
                    description: 'description',
                    tags: ['tag1'],
                },
            };
            const actual = await sut.newActivity(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        });

        it('should returns a exception response with BadRequestError', async () => {
            newActivityMock.mockRejectedValue(new BadRequestError('Some error'));
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'POST',
                url: '/activity',
                body: {
                    title: 'title',
                    description: 'description',
                    tags: ['tag1'],
                },
            };
            const actual = await sut.newActivity(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
        });
    });

    describe('findById', () => {
        it('should return the activity successfully', async () => {
            const someActivity = {
                title: 'title',
                estimate_time: 5,
                description: 'description',
                active: true,
            };
            activityRepositoryFindByIdMock.mockResolvedValue(someActivity);
            const ctx = { id: 1 };
            const actual = await sut.findById({} as any, ctx);

            expect(actual.body).toEqual({ ...someActivity });
        });

        it('should return a bad request exception with no id param', async () => {
            const ctx = {};
            const actual = await sut.findById({} as any, ctx);

            expect(actual.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
        });

        it('should return a not found exception with exception in the repository', async () => {
            const ctx = { id: 1 };
            activityRepositoryFindByIdMock.mockRejectedValue(new Error('some error'));
            const actual = await sut.findById({} as any, ctx);

            expect(actual.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe('findAll', () => {
        it('should return a ResponsePage successfully', async () => {
            const someActivities = {
                data: [
                    {
                        title: 'title',
                        estimate_time: 5,
                        description: 'description',
                        active: true,
                    },
                ],
                count: 1,
                pages: 1,
                limit: 1,
                current: 1,
            };
            activityRepositoryfindAllMock.mockResolvedValue(someActivities);
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'GET',
                url: '/activity',
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findAll(req);

            expect(actual.body?.count).toBe(1);
        });

        it('should return a ResponsePage successfully (with parameters)', async () => {
            const someActivities = {
                data: [
                    {
                        title: 'title',
                        estimate_time: 5,
                        description: 'description',
                        active: true,
                    },
                ],
                count: 1,
                pages: 1,
                limit: 1,
                current: 1,
            };
            activityRepositoryfindAllMock.mockResolvedValue(someActivities);
            const params = new URLSearchParams();
            params.append('page', '1');
            params.append('limit', '10');
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'GET',
                url: '/activity',
                searchParams: params,
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findAll(req);

            expect(actual.body?.count).toBe(1);
        });

        it('should throw an exception response', async () => {
            activityRepositoryfindAllMock.mockRejectedValue(new Error('Some error'));
            const req: HttpRequest<ActivityRequestDtoType> = {
                method: 'GET',
                url: '/activity',
            };
            const actual: HttpResponse = await sut.findAll(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        });
    });

    describe('findByTags', () => {
        it('should return a successfully response with found tag', async () => {
            const someActivities = {
                data: [
                    {
                        title: 'title',
                        estimate_time: 5,
                        description: 'description',
                        active: true,
                    },
                ],
                count: 1,
                pages: 1,
                limit: 1,
                current: 1,
            };
            activityRepositoryfindByTagsMock.mockResolvedValue(someActivities);
            const req: HttpRequest<string[]> = {
                method: 'GET',
                url: '/activity',
                body: ['tag1'],
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findByTags(req);

            expect(actual.body?.count).toBe(1);
        });

        it('should return a successfully response with found tag (with params)', async () => {
            const someActivities = {
                data: [
                    {
                        title: 'title',
                        estimate_time: 5,
                        description: 'description',
                        active: true,
                    },
                ],
                count: 1,
                pages: 1,
                limit: 1,
                current: 1,
            };
            activityRepositoryfindByTagsMock.mockResolvedValue(someActivities);
            const params = new URLSearchParams();
            params.append('page', '1');
            params.append('limit', '10');
            const req: HttpRequest<string[]> = {
                method: 'GET',
                url: '/activity',
                body: ['tag1'],
                searchParams: params,
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findByTags(req);

            expect(actual.body?.count).toBe(1);
        });

        it('should return a exception response with a fail in the activity repository', async () => {
            activityRepositoryfindByTagsMock.mockRejectedValue(new Error('Some error'));
            const req: HttpRequest<string[]> = {
                method: 'GET',
                url: '/activity',
                body: ['tag1'],
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findByTags(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        });

        it('should return a exception response with not body found', async () => {
            const req: HttpRequest<string[]> = {
                method: 'GET',
                url: '/activity',
            };
            const actual: HttpResponse<ResponsePage<ActivityEntity>> = await sut.findByTags(req);

            expect(actual.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
        });
    });
});
