import { InMemoryRepository } from '@/shared/db/in-memory/in-memory.repository'
import type { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo'
import { Category } from '../../domain/category.entity'

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Ulid> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getEntity(): new (...args: any[]) => Category {
    return Category
  }
}
