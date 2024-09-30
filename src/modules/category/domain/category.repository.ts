import { IRepository } from "@/shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { Ulid } from "@/shared/domain/value-objects/ulid/ulid.vo";

export interface ICategoryRepository extends IRepository<Category, Ulid> {}
