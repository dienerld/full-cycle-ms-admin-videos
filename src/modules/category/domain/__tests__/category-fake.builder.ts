/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Ulid } from '@/shared/domain/value-objects/ulid/ulid.vo';
import { Chance } from 'chance';
import { Category } from '../category.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class CategoryFakeBuilder<TBuild = unknown> {
  // auto generated in entity
  private _id: PropOrFactory<Ulid> | undefined = undefined;
  private _name: PropOrFactory<string> | undefined | null = (_index) =>
    this.chance.word();

  private _description: PropOrFactory<string | null> = (_index) =>
    this.chance.paragraph();

  private _isActive: PropOrFactory<boolean> = (_index) => true;
  // auto generated in entity
  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private countObjs;

  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories(countObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withEntityId(valueOrFactory: PropOrFactory<Ulid>) {
    this._id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: PropOrFactory<string> | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: unknown) {
    this._name = (value as string) ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string | null>) {
    this._description = valueOrFactory;
    return this;
  }

  withInvalidDescriptionNotAString(value?: unknown) {
    this._description = (value as string) ?? 5;
    return this;
  }

  activate() {
    this._isActive = true;
    return this;
  }

  deactivate() {
    this._isActive = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: '' | null | undefined) {
    this._isActive = value as unknown as boolean;
    return this;
  }

  withInvalidIsActiveNotABoolean(value?: unknown) {
    this._isActive = (value as boolean) ?? 'fake boolean';
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._createdAt = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Category(
          {
            name: this.callFactory(this._name, index),
            description: this.callFactory(this._description, index),
            isActive: this.callFactory(this._isActive, index),
            ...(this._createdAt && {
              createdAt: this.callFactory(this._createdAt, index),
            }),
          },
          // @ts-expect-error - mismatched ts params
          !this._id ? undefined : this.callFactory(this._id, index),
        ),
    );
    return (this.countObjs === 1
      ? categories[0]
      : categories) as unknown as TBuild;
  }

  get id() {
    return this.getValue('id');
  }

  get name() {
    return this.getValue('name');
  }

  get description() {
    return this.getValue('description');
  }

  get isActive() {
    return this.getValue('isActive');
  }

  get createdAt() {
    return this.getValue('createdAt');
  }

  private getValue(prop: string) {
    const optional = ['id', 'createdAt'];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<unknown>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
