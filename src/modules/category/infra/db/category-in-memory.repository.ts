import { InMemoryRepository } from "@/shared/db/in-memory/in-memory.repository";
import { Category } from "../../domain/category.entity";
import { Ulid } from "@/shared/domain/value-objects/ulid/ulid.vo";

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Ulid> {
  getEntity(): new (...args: any[]) => Category {
    return Category
  }
}
