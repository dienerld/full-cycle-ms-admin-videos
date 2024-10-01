import { Entity } from '@/shared/domain/entity';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo';
import { InMemoryRepository } from './in-memory.repository';

type StubEntityConstructor = {
  id?: Ulid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  id: Ulid;
  name: string;
  price: number;

  constructor(data: StubEntityConstructor) {
    super();
    this.id = data.id || new Ulid();
    this.name = data.name;
    this.price = data.price;
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Ulid> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });

    await repository.insert(entity);

    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toEqual(entity);
  });

  it('Should insert multiple entities', async () => {
    const entity1 = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    const entity2 = new StubEntity({
      id: new Ulid(),
      name: 'test2',
      price: 20,
    });

    await repository.insertBulk([entity1, entity2]);

    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toEqual(entity1);
    expect(repository.items[1]).toEqual(entity2);
  });

  it('Should return all entities', async () => {
    const entity1 = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    const entity2 = new StubEntity({
      id: new Ulid(),
      name: 'test2',
      price: 20,
    });
    await repository.insertBulk([entity1, entity2]);

    const entities = await repository.findAll();

    expect(entities.length).toBe(2);
    expect(entities[0]).toEqual(entity1);
    expect(entities[1]).toEqual(entity2);
  });

  it('Should throws error on update if entity does not exist', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });

    await expect(repository.update(aggregate)).rejects.toThrow(
      new NotFoundError(aggregate.id, StubEntity),
    );
  });

  it('Should update an entity', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    await repository.insert(aggregate);

    const newAggregate = new StubEntity({
      id: aggregate.id,
      name: 'test2',
      price: 20,
    });

    await repository.update(newAggregate);

    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toEqual(newAggregate);
  });

  it('Should delete an entity', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    await repository.insert(aggregate);

    await repository.delete(aggregate.id);

    expect(repository.items.length).toBe(0);
  });

  it('Should throws error on delete if entity does not exist', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });

    await expect(repository.delete(aggregate.id)).rejects.toThrow(
      new NotFoundError(aggregate.id, StubEntity),
    );
  });

  it('Should find an entity by id', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    await repository.insert(aggregate);

    const foundAggregate = await repository.findById(aggregate.id);

    expect(foundAggregate).toEqual(aggregate);
  });

  it('Should return null if entity does not exist', async () => {
    const aggregate = new StubEntity({
      id: new Ulid(),
      name: 'test',
      price: 10,
    });
    await repository.insert(aggregate);

    const foundAggregate = await repository.findById(new Ulid());

    expect(foundAggregate).toBeNull();
  });
});
