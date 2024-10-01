import { SearchParams, SortDirection,  } from "./search-params";

describe("SearchParams Unit Tests", () => {
  test("page prop", () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },

      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ page: i.page as number }).page).toBe(i.expected);
    });
  });

  test("pageSize prop", () => {
    const params = new SearchParams();
    expect(params.pageSize).toBe(15);

    //TODO refactor to test.each
    const arrange = [
      { pageSize: null, expected: 15 },
      { pageSize: undefined, expected: 15 },
      { pageSize: "", expected: 15 },
      { pageSize: "fake", expected: 15 },
      { pageSize: 0, expected: 15 },
      { pageSize: -1, expected: 15 },
      { pageSize: 5.5, expected: 15 },
      { pageSize: true, expected: 15 },
      { pageSize: false, expected: 15 },
      { pageSize: {}, expected: 15 },

      { pageSize: 1, expected: 1 },
      { pageSize: 2, expected: 2 },
      { pageSize: 10, expected: 10 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ pageSize: i.pageSize as number }).pageSize).toBe(
        i.expected
      );
    });
  });

  test("sortBy prop", () => {
    const params = new SearchParams();
    expect(params.sortBy).toBeNull();

    //TODO refactor to test.each
    const arrange = [
      { sortBy: null, expected: null },
      { sortBy: undefined, expected: null },
      { sortBy: "", expected: null },
      { sortBy: 0, expected: "0" },
      { sortBy: -1, expected: "-1" },
      { sortBy: 5.5, expected: "5.5" },
      { sortBy: true, expected: "true" },
      { sortBy: false, expected: "false" },
      { sortBy: {}, expected: "[object Object]" },
      { sortBy: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ sortBy: i.sortBy as SortDirection }).sortBy).toBe(i.expected);
    });
  });

  test("sortDir prop", () => {
    let params = new SearchParams();
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: null });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: undefined });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sortBy: "" });
    expect(params.sortDir).toBeNull();

    //TODO refactor to test.each
    const arrange = [
      { sortDir: null, expected: "asc" },
      { sortDir: undefined, expected: "asc" },
      { sortDir: "", expected: "asc" },
      { sortDir: 0, expected: "asc" },
      { sortDir: "fake", expected: "asc" },

      { sortDir: "asc", expected: "asc" },
      { sortDir: "ASC", expected: "asc" },
      { sortDir: "desc", expected: "desc" },
      { sortDir: "DESC", expected: "desc" },
    ];

    arrange.forEach(({ sortDir, expected }) => {
      expect(
        new SearchParams({ sortBy: "field", sortDir: sortDir as SortDirection })
          .sortDir
      ).toBe(expected);
    });
  });

  test("filter prop", () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    //TODO refactor to test.each
    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },

      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: 5.5, expected: "5.5" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
      { filter: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ filter: i.filter as string }).filter).toBe(
        i.expected
      );
    });
  });
});
