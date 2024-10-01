import { SearchParams, type SortDirection } from './search-params';

describe('SearchParams Unit Tests', () => {
  it.each([
    { page: null, expected: 1 },
    { page: undefined, expected: 1 },
    { page: '', expected: 1 },
    { page: 'fake', expected: 1 },
    { page: 0, expected: 1 },
    { page: -1, expected: 1 },
    { page: 5.5, expected: 1 },
    { page: true, expected: 1 },
    { page: false, expected: 1 },
    { page: {}, expected: 1 },
  ])('page prop => %j', ({ page, expected }) => {
    expect(new SearchParams({ page: page as number }).page).toBe(expected);
  });

  it.each([
    { pageSize: null, expected: 15 },
    { pageSize: undefined, expected: 15 },
    { pageSize: '', expected: 15 },
    { pageSize: 'fake', expected: 15 },
    { pageSize: 0, expected: 15 },
    { pageSize: -1, expected: 15 },
    { pageSize: 5.5, expected: 15 },
    { pageSize: true, expected: 15 },
    { pageSize: false, expected: 15 },
    { pageSize: {}, expected: 15 },

    { pageSize: 1, expected: 1 },
    { pageSize: 2, expected: 2 },
    { pageSize: 10, expected: 10 },
  ])('pageSize prop => %j', ({ pageSize, expected }) => {
    expect(new SearchParams({ pageSize: pageSize as number }).pageSize).toBe(
      expected,
    );
  });

  it.each([
    { sortBy: null, expected: null },
    { sortBy: undefined, expected: null },
    { sortBy: '', expected: null },
    { sortBy: 0, expected: '0' },
    { sortBy: -1, expected: '-1' },
    { sortBy: 5.5, expected: '5.5' },
    { sortBy: true, expected: 'true' },
    { sortBy: false, expected: 'false' },
    { sortBy: {}, expected: '[object Object]' },
    { sortBy: 'field', expected: 'field' },
  ])('sortBy prop => %j', ({ sortBy, expected }) => {
    expect(new SearchParams({ sortBy: sortBy as SortDirection }).sortBy).toBe(
      expected,
    );
  });

  it('sortDir prop', () => {
    let params = new SearchParams();
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: null });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: undefined });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: '' });
    expect(params.sortDir).toBeNull();
  });

  it.each([
    { sortDir: null, expected: 'asc' },
    { sortDir: undefined, expected: 'asc' },
    { sortDir: '', expected: 'asc' },
    { sortDir: 0, expected: 'asc' },
    { sortDir: 'fake', expected: 'asc' },

    { sortDir: 'asc', expected: 'asc' },
    { sortDir: 'ASC', expected: 'asc' },
    { sortDir: 'desc', expected: 'desc' },
    { sortDir: 'DESC', expected: 'desc' },
  ])('sortDir prop => %j', ({ sortDir, expected }) => {
    expect(
      new SearchParams({ sortBy: 'field', sortDir: sortDir as SortDirection })
        .sortDir,
    ).toBe(expected);
  });

  it.each([
    { filter: null, expected: null },
    { filter: undefined, expected: null },
    { filter: '', expected: null },

    { filter: 0, expected: '0' },
    { filter: -1, expected: '-1' },
    { filter: 5.5, expected: '5.5' },
    { filter: true, expected: 'true' },
    { filter: false, expected: 'false' },
    { filter: {}, expected: '[object Object]' },
    { filter: 'field', expected: 'field' },
  ])('filter prop => %j', ({ filter, expected }) => {
    expect(new SearchParams({ filter: filter as string }).filter).toBe(
      expected,
    );
  });
});
