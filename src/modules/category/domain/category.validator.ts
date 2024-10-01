import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import type { Category } from './category.entity'

//criar um testes que verifique os decorators
export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean

  constructor({ name, description, isActive }: Category) {
    Object.assign(this, { name, description, isActive })
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category) {
    return super.validate(new CategoryRules(entity))
  }
}

export class CategoryValidatorFactory {
  private constructor() {}
  static create() {
    return new CategoryValidator()
  }
}
