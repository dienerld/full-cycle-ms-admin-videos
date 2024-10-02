import { Op } from 'sequelize'

import { Category } from "@/modules/category/domain/category.entity";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "@/modules/category/domain/category.repository";
import { Entity } from "@/shared/domain/entity";
import { SearchResult } from "@/shared/domain/repository/search-result";
import { Ulid } from "@/shared/domain/value-objects/ulid/ulid.vo";
import { CategoryModel, CategoryModelProps } from "./category.model";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { FindAndCountOptions } from 'sequelize/types/model';


export class CategoryRepository implements ICategoryRepository {
  sortableFields: string[];

  constructor(private categoryModel: typeof CategoryModel) { }


  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create({
      id: entity.id.id,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    })
  }

  async insertBulk(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(entities.map((entity) => {
      return {
        id: entity.id.id,
        name: entity.name,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      }
    }));
  }

  async findAll(): Promise<Category[]> {
    const model = await this.categoryModel.findAll();

    return model.map((entity) => {
      return new Category({
        id: new Ulid(entity.id),
        name: entity.name,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      })
    });
  }

  async findById(id: Ulid): Promise<Category | null> {
    const model = await this.categoryModel.findByPk(id.id);
    if (!model) {
      return null;
    }

    return new Category({
      id: new Ulid(model.id),
      name: model.name,
      description: model.description,
      isActive: model.isActive,
      createdAt: model.createdAt,
    })
  }

  async update(entity: Category): Promise<void> {
    const model = await this.categoryModel.findByPk(entity.id.id);
    if (!model) {
      throw new NotFoundError(entity.id, this.getEntity());
    }

    await this.categoryModel.update(
      {
        name: entity.name,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      },
      { where: { id: entity.id.id } }
    );

  }

  async delete(entityId: Ulid): Promise<void> {
    const model = await this.categoryModel.findByPk(entityId.id);
    if (!model) {
      throw new NotFoundError(entityId, this.getEntity());
    }

    await this.categoryModel.destroy({ where: { id: entityId.id } });
  }

  async search(query: CategorySearchParams): Promise<SearchResult> {
    const offset = (query.page - 1) * query.pageSize;
    const limit = query.pageSize;
    const options: FindAndCountOptions<CategoryModelProps> = {}
    if (query.filter) {
      options.where = {
        name: { [Op.iLike]: `%${query.filter}%`, },
      }
    }

    if (query.sortBy) {
      options.order = [
        [query.sortBy, query.sortDir],
      ]
    }
    options.limit = limit;
    options.offset = offset;


    const { rows: models, count } = await this.categoryModel.findAndCountAll(options)

    return new CategorySearchResult({
      items: models.map((model) => {
        return new Category({
          id: new Ulid(model.id),
          name: model.name,
          description: model.description,
          isActive: model.isActive,
          createdAt: model.createdAt,
        })
      }),
      total: count,
      currentPage: query.page,
      pageSize: query.pageSize,
    })
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }


}
