import type { IRepository } from '@/shared/domain/repository/repository-interface';
import type { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo';
import type { Category } from './category.entity';

export interface ICategoryRepository extends IRepository<Category, Ulid> {}
