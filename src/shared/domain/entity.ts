import type { ValueObject } from './value-objects/value-object';

export abstract class Entity {
  abstract get id(): ValueObject;
  abstract toJSON(): unknown;
}
