import { Ulid } from "@/shared/domain/value-objects/ulid/ulid.vo";
import { Category } from "./category.entity"
import { MockInstance } from "vitest";

describe('[Unit] Category', () => {
 let validateSpy: MockInstance;
  beforeEach(() => {
    validateSpy = vi.spyOn(Category, "validate");
  });

  afterEach(() => {
    validateSpy.mockReset();
  });
  describe("constructor", () => {
    it("should create a category with default values", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    it("should create a category with all values", () => {
      const createdAt = new Date();
      const category = new Category({
        name: "Movie",
        description: "Movie description",
        isActive: false,
        createdAt,
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBe(createdAt);
    });
    it("should create a category with name and description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("create command", () => {
    it("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "some description",
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a category with isActive", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });

      expect(category.id).toBeInstanceOf(Ulid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("id field", () => {
    const arrange = [
      { id: null },
      { id: undefined },
      { id: new Ulid() },
    ];
    it.each(arrange)("id = %j", ({ id }) => {
      const category = new Category({
        name: "Movie",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: id as any,
      });

      expect(category.id).toBeInstanceOf(Ulid);
      if (id instanceof Ulid) {
        expect(category.id).toBe(id);
      }
    });
  });

  it("should change name", () => {
    const category = Category.create({
      name: "Movie",
      isActive: false
    });

    category.changeName("other name");

    expect(category.name).toBe("other name");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should change description", () => {
    const category = Category.create({
      name: "Movie",
      isActive: false
    });

    category.changeDescription("some description");

    expect(category.description).toBe("some description");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should active a category", () => {
    const category = Category.create({
      name: "Filmes",
      isActive: false,
    });

    category.activate();

    expect(category.isActive).toBe(true);
  });

  it("should disable a category", () => {
    const category = Category.create({
      name: "Filmes",
      isActive: true,
    });

    category.deactivate();

    expect(category.isActive).toBe(false);
  });
})
