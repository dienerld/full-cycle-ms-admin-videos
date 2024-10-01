/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo'
import type { MockInstance } from 'vitest'
import { Category } from './category.entity'

describe('[Unit] Category', () => {
  let validateSpy: MockInstance
  beforeEach(() => {
    validateSpy = vi.spyOn(Category, 'validate')
  })

  afterEach(() => {
    validateSpy.mockReset()
  })
  describe('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie',
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with all values', () => {
      const createdAt = new Date()
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
        createdAt,
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })
    it('should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('create command', () => {
    it('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBe(true)
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('some description')
      expect(category.isActive).toBe(true)
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it('should create a category with isActive', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false,
      })

      expect(category.id).toBeInstanceOf(Ulid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBe(false)
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('id field', () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new Ulid() }]
    it.each(arrange)('id = %j', ({ id }) => {
      const category = new Category({
        name: 'Movie',
        id: id as unknown as Ulid,
      })

      expect(category.id).toBeInstanceOf(Ulid)
      if (id instanceof Ulid) {
        expect(category.id).toBe(id)
      }
    })
  })

  it('should change name', () => {
    const category = Category.create({
      name: 'Movie',
      isActive: false,
    })

    category.changeName('other name')

    expect(category.name).toBe('other name')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should change description', () => {
    const category = Category.create({
      name: 'Movie',
      isActive: false,
    })

    category.changeDescription('some description')

    expect(category.description).toBe('some description')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should active a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: false,
    })

    category.activate()

    expect(category.isActive).toBe(true)
  })

  it('should disable a category', () => {
    const category = Category.create({
      name: 'Filmes',
      isActive: true,
    })

    category.deactivate()

    expect(category.isActive).toBe(false)
  })
})

describe('[Unit] Category Validator', () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null as unknown as string })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      })

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      })

      expect(() => Category.create({ name: 5 as unknown as string })).containsErrorMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
      })

      expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      })
    })

    it('should a invalid category using description property', () => {
      expect(() =>
        Category.create({ description: 5 } as unknown as Category)
      ).containsErrorMessages({
        description: ['description must be a string'],
      })
    })

    it('should a invalid category using is_active property', () => {
      expect(() => Category.create({ is_active: 5 } as unknown as Category)).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      })
    })
  })

  describe('changeName method', () => {
    it('should a invalid category using name property', () => {
      const category = Category.create({ name: 'Movie' })
      expect(() => category.changeName(null as unknown as string)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      })

      expect(() => category.changeName('')).containsErrorMessages({
        name: ['name should not be empty'],
      })

      expect(() => category.changeName(5 as unknown as string)).containsErrorMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
      })

      expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      })
    })
  })

  describe('changeDescription method', () => {
    it('should a invalid category using description property', () => {
      const category = Category.create({ name: 'Movie' })
      expect(() => category.changeDescription(5 as unknown as string)).containsErrorMessages({
        description: ['description must be a string'],
      })
    })
  })
})
