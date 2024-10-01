import { ValueObject } from "../value-objects/value-object";

export type SortDirection = 'asc' | 'desc';

export type SearchParamsConstructorProps<Filter = string> = {
  page?: number;
  pageSize?: number;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> extends ValueObject {
  protected _page: number;
  protected _pageSize: number = 15;
  protected _sortBy: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchParamsConstructorProps<Filter> = {}) {
    super();
    this.setPage(props.page!);
    this.setPageSize(props.pageSize!);
    this.setSortBy(props.sortBy!);
    this.setSortDir(props.sortDir!);
    this.setFilter(props.filter!);
  }

  get page() {
    return this._page;
  }

  private setPage(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as never) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get pageSize() {
    return this._pageSize;
  }

  private setPageSize(value: number) {
    let _pageSize = value === (true as never) ? this._pageSize : +value;

    if (
      Number.isNaN(_pageSize) ||
      _pageSize <= 0 ||
      parseInt(_pageSize as never) !== _pageSize
    ) {
      _pageSize = this._pageSize;
    }

    this._pageSize = _pageSize;
  }

  get sortBy(): string | null {
    return this._sortBy;
  }

  private setSortBy(value: string | null) {
    this._sortBy =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }

  private setSortDir(value: SortDirection | null) {
    if (!this.sortBy) {
      this._sortDir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  protected setFilter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as Filter);
  }
}
