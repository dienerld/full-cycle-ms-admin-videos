import type { Entity } from '../entity'

export class NotFoundError<TypeID> extends Error {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(id: TypeID | TypeID[], entityClass: new (...args: any[]) => Entity) {
    const idMessage = Array.isArray(id) ? id.join(', ') : id
    super(`${entityClass.name} Not found using ID ${idMessage}`)
    this.name = 'NotFoundError'
  }
}
