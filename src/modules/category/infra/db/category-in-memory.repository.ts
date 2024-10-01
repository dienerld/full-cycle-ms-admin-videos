import { Category } from '@/modules/category/domain/category.entity';
import { InMemorySearchableRepository } from '@/shared/db/in-memory/in-memory.repository';
import type { SortDirection } from '@/shared/domain/repository/search-params';
import type { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo';

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  Ulid
> {
  sortableFields = ['name', 'createdAt'];

  protected async applyFilter(
    items: Category[],
    filter: string | null,
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sortDir)
      : super.applySort(items, 'createdAt', 'desc');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
