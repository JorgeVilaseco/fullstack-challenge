import MockedFn = jest.MockedFn;

export interface RepositoryMock {
  findOne: MockedFn<any>;
  findBy: MockedFn<any>;
  find: MockedFn<any>;
}

export const repositoryMockFactory: () => RepositoryMock = () => ({
  findOne: jest.fn((entity) => entity),
  findBy: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
});
