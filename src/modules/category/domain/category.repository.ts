import type { ISearchableRepository } from '@/shared/domain/repository/repository-interface';
import type { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo';
import { SearchParams } from '@/shared/domain/repository/search-params';
import { SearchResult } from '@/shared/domain/repository/search-result';

import type { Category } from './category.entity';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> { }

export class CategorySearchResult extends SearchResult<Category> { }

export interface ICategoryRepository extends ISearchableRepository<Category, Ulid, CategoryFilter, CategorySearchParams, CategorySearchResult> { }
