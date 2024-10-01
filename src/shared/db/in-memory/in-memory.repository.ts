import type { Entity } from '@/shared/domain/entity'
import { NotFoundError } from '@/shared/domain/errors/not-found.error'
import type { SearchParams, SortDirection } from '@/shared/domain/repository/search-params'
import { SearchResult } from '@/shared/domain/repository/search-result'
import type { ValueObject } from '@/shared/domain/value-objects/value-object'
import type {
  IRepository,
  ISearchableRepository,
} from '@shared/domain/repository/repository-interface'

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
  implements IRepository<E, EntityId>
{
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }
  async insertBulk(entities: E[]): Promise<void> {
    this.items.push(...entities)
  }
  async update(entity: E): Promise<void> {
    const index = this.items.findIndex(item => item.id.equals(entity.id))
    if (index === -1) {
      throw new NotFoundError(entity.id, this.getEntity())
    }
    this.items[index] = entity
  }
  async delete(entityId: EntityId): Promise<void> {
    const index = this.items.findIndex(item => item.id.equals(entityId))
    if (index === -1) {
      throw new NotFoundError(entityId, this.getEntity())
    }
    this.items.splice(index, 1)
  }
  async findAll(): Promise<E[]> {
    return this.items
  }
  async findById(id: EntityId): Promise<E | null> {
    const item = this.items.find(item => item.id.equals(id))
    return typeof item === 'undefined' ? null : item
  }
  abstract getEntity(): new (...args: unknown[]) => E
}

export abstract class InMemorySearchableRepository<
    E extends Entity,
    EntityId extends ValueObject,
    Filter = string,
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  sortableFields: string[]
  async search(query: SearchParams<Filter>): Promise<SearchResult<E>> {
    // filter
    const itemsFiltered = await this.applyFilter(this.items, query.filter)
    // sort
    const itemsSorted = this.applySort(itemsFiltered, query.sortBy, query.sortDir)
    // pagination
    const itemsPaginated = this.applyPagination(itemsSorted, query.page, query.pageSize)

    return new SearchResult({
      items: itemsPaginated,
      total: itemsPaginated.length,
      currentPage: query.page,
      pageSize: query.pageSize,
    })
  }

  protected abstract applyFilter(items: E[], filter: Filter | null): Promise<E[]>
  protected applyPagination(items: E[], page: number, pageSize: number): E[] {
    const start = (page - 1) * pageSize
    const limit = start + pageSize
    return items.slice(start, limit)
  }

  protected applySort(
    items: E[],
    sortBy: string | null,
    sortDir: SortDirection | null,
    customGetter?: (sort: string, item: E) => 0 | 1 | -1
  ): E[] {
    if (!sortBy || !this.sortableFields.includes(sortBy)) {
      return items
    }

    return [...items].sort((a, b) => {
      const aValue = customGetter ? customGetter(sortBy, a) : a[sortBy as keyof E]
      const bValue = customGetter ? customGetter(sortBy, b) : b[sortBy as keyof E]

      if (aValue < bValue) {
        return sortDir === 'asc' ? -1 : 1
      }

      if (aValue > bValue) {
        return sortDir === 'asc' ? 1 : -1
      }
      return 0
    })
  }
}
