import { Entity } from '@/shared/domain/entity';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { ValueObject } from '@/shared/domain/value-objects/value-object';
import { IRepository } from '@shared/domain/repository/repository-interface'

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {

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
