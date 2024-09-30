import { Entity } from "../entity";
import type { SearchParams } from './search-params'
import { ValueObject } from "../value-objects/value-object";
import { SearchResult } from "./search-result";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  insertBulk(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entityId: EntityId): Promise<void>;

  findAll(): Promise<E[]>;
  findById(id: EntityId): Promise<E | null>;

  getEntity(): new (...args: unknown[]) => E;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  SearchInput = SearchParams,
  SearchOutput = SearchResult
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(query: SearchInput): Promise<SearchOutput>;
}
