import { ValueObject } from "../value-object";
import { ulid } from "ulid";

export class Ulid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || ulid();
    this.validate();
  }

  private validate() {
    const isValid = Ulid.isValidULID(this.id);
    if (!isValid) {
      throw new InvalidUlidError();
    }
  }


  static isValidULID(ulid: string) {
    // Verifica se o ULID possui exatamente 26 caracteres
    if (typeof ulid !== 'string' || ulid.length !== 26) {
      return false;
    }

    // Expressão regular para validar o formato do ULID
    const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

    // Retorna true se o ULID corresponder ao formato da expressão regular
    return ulidRegex.test(ulid);
  }

  toString() {
    return this.id;
  }
}


export class InvalidUlidError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valide ULID");
    this.name = "InvalidUlidError";
  }
}
