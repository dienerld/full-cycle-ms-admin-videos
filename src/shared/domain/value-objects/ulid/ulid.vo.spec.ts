import { InvalidUlidError, Ulid } from './ulid.vo';
describe('Ulid Unit Tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateSpy = vi.spyOn(Ulid.prototype as any, 'validate');

  afterEach(() => {
    validateSpy.mockReset();
  });

  test('should throw error when uuid is invalid', () => {
    expect(() => {

      new Ulid('invalid-uuid');
    }).toThrowError(new InvalidUlidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should create a valid ulid', () => {
    const uuid = new Ulid();
    expect(uuid.id).toBeDefined();
    expect(Ulid.isValidULID(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('should accept a valid ulid', () => {
    const uuid = new Ulid('01J6X7524YK9EVBBETT65GWY3R');
    expect(uuid.id).toBe('01J6X7524YK9EVBBETT65GWY3R');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
