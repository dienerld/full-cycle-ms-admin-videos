import type { Entity } from '../entity';

export class NotFoundError<TypeID> extends Error {
  constructor(
    id: TypeID | TypeID[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entityClass: new (...args: any[]) => Entity,
  ) {
    const idMessage = Array.isArray(id) ? id.join(', ') : id;
    super(`${entityClass.name} Not found using ID ${idMessage}`);
    this.name = 'NotFoundError';
  }
}
