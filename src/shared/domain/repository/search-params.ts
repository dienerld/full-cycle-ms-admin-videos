import { ValueObject } from "../value-objects/value-object"

export type SortDirection = 'asc' | 'desc'

export type SortParamsConstructorProps<Filter = string> = {
  page?: number,
  pageSize?: number,
  sortBy?: string | null,
  sortDir?: SortDirection | null,
  filter?: Filter | null
}

export class SearchParams<Filter = string> extends ValueObject {
  protected _page: number
  protected _pageSize: number = 15
  protected _sortBy: string | null
  protected _sortDir: SortDirection | null
  protected _filter: Filter | null


  constructor(props: SortParamsConstructorProps<Filter> = {}) {
    super()
    this._page = props.page || 1
    this._pageSize = props.pageSize || 15
    this._sortBy = props.sortBy || null
    this._sortDir = props.sortDir || null
    this._filter = props.filter || null
  }

  get page(): number {
    return this._page
  }

  get pageSize(): number {
    return this._pageSize
  }

  private set page(value: number) {
    let page = +value
    if(Number.isNaN(page) || page <= 0 || parseInt(page as never) !== page) {
      page = 1
    }
    this._page = page
  }

  private set pageSize(value: number) {
    let pageSize = Boolean(value) === true  ? this._pageSize : +value
    if(Number.isNaN(pageSize) || pageSize <= 0 || parseInt(pageSize as never) !== pageSize) {
      pageSize = 15
    }
    this._pageSize = pageSize
  }

  get sortBy(): string | null {
    return this._sortBy
  }

  get sortDir(): SortDirection | null {
    return this._sortDir
  }

  private set sortBy(value: string | null) {
    this._sortBy = value === null || value === ''  || value === undefined ? null : `${value}`
  }
  private set sortDir(value: SortDirection | null) {
    if(!value) {
      this._sortDir = null
      return
    }
    const dir = value.toLowerCase()
    this._sortDir = dir === 'asc' || dir === 'desc' ? `${dir}` : null
  }

  get filter(): Filter | null {
    return this._filter
  }

  private set filter(value: Filter | null) {
    this._filter = value === null || value === ''  || value === undefined ? null : `${value}` as Filter
  }
}
