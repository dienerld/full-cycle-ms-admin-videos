/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'vitest'
import type { ClassValidatorFields } from '../../src/shared/domain/validators/class-validator-fields'
import type { EntityValidationError } from '../../src/shared/domain/validators/validation.error'
import type { FieldsErrors } from '../../src/shared/domain/validators/validator-fields-interface'

type Expected =
  | {
      validator: ClassValidatorFields<any>
      data: any
    }
  | (() => void)
expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected()
        return isValid()
      } catch (e) {
        const error = e as EntityValidationError
        return assertContainsErrorsMessages(error.error, received)
      }
    } else {
      const { validator, data } = expected
      const validated = validator.validate(data)

      if (validated) {
        return isValid()
      }

      return assertContainsErrorsMessages(validator.errors!, received)
    }
  },
})

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected)

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      }
}

function isValid() {
  return { pass: true, message: () => '' }
}
