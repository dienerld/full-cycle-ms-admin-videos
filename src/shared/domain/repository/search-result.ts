import type { Entity } from '../entity'
import { ValueObject } from '../value-objects/value-object'

type SearchResultConstructorProps<A extends Entity> = {
  items: A[]
  total: number
  currentPage: number
  pageSize: number
}

export class SearchResult<A extends Entity = Entity> extends ValueObject {
  readonly items: A[]
  readonly total: number
  readonly currentPage: number
  readonly pageSize: number
  readonly lastPage: number

  constructor(props: SearchResultConstructorProps<A>) {
    super()
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.pageSize = props.pageSize
    this.lastPage = Math.ceil(this.total / this.pageSize)
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map(item => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      lastPage: this.lastPage,
    }
  }
}
