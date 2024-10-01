import { EntityValidationError } from '@/shared/domain/validators/validation.error'
import { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo'
import { CategoryValidatorFactory } from './category.validator'

export type CategoryConstructorProps = {
  id?: Ulid
  name: string
  description?: string | null
  isActive?: boolean
  createdAt?: Date
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  isActive?: boolean
}

export class Category {
  id: Ulid
  name: string
  description: string | null
  isActive: boolean
  createdAt: Date

  constructor(props: CategoryConstructorProps) {
    this.id = props.id ?? new Ulid()
    this.name = props.name
    this.description = props.description ?? null
    this.isActive = props.isActive ?? true
    this.createdAt = props.createdAt ?? new Date()
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props)
    Category.validate(category)
    return category
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)
    if (!isValid) {
      throw new EntityValidationError(validator.errors!)
    }
  }

  changeName(name: string) {
    this.name = name
  }

  changeDescription(description: string | null) {
    this.description = description
  }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    }
  }
}
