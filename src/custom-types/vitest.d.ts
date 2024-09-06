/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'vitest'
import type {FieldsErrors} from '@shared/domain/validators/validator-fields-interface'

interface CustomMatchers<R = unknown> {

  containsErrorMessages: (expected: FieldsErrors) => R
}

declare module 'vitest' {
  interface Assertion<T> extends CustomMatchers<T> { }
  interface AsymmetricMatchersContaining extends CustomMatchers { }
}
