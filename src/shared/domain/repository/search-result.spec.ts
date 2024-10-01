import type { Entity } from '../entity';
import { SearchResult } from './search-result';

describe('SearchResult Unit Tests', () => {
  test('constructor props', () => {
    let result = new SearchResult({
      items: ['entity1', 'entity2'] as unknown as Entity[],
      total: 4,
      currentPage: 1,
      pageSize: 2,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      currentPage: 1,
      pageSize: 2,
      lastPage: 2,
    });

    result = new SearchResult({
      items: ['entity1', 'entity2'] as unknown as Entity[],
      total: 4,
      currentPage: 1,
      pageSize: 2,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      currentPage: 1,
      pageSize: 2,
      lastPage: 2,
    });
  });

  it('should set lastPage = 1 when pageSize field is greater than total field', () => {
    const result = new SearchResult({
      items: [],
      total: 4,
      currentPage: 1,
      pageSize: 15,
    });

    expect(result.lastPage).toBe(1);
  });

  test('lastPage prop when total is not a multiple of pageSize', () => {
    const result = new SearchResult({
      items: [],
      total: 101,
      currentPage: 1,
      pageSize: 20,
    });

    expect(result.lastPage).toBe(6);
  });
});
