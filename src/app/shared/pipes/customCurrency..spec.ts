import {CustomCurrencyPipe} from './customCurrency';

describe('CustomCurrencyPipe', () => {
  let pipe: CustomCurrencyPipe;

  beforeEach(() => {
    pipe = new CustomCurrencyPipe();
  });

  it('should format a numeric value correctly', () => {
    const result = pipe.transform(123456.789);
    expect(result).toBe('$123.456,79');
  });

  it('should format a string numeric value correctly', () => {
    const result = pipe.transform('987654.321');
    expect(result).toBe('$987.654,32');
  });

  it('should handle integer values and remove ".00"', () => {
    const result = pipe.transform(1000);
    expect(result).toBe('$1.000');
  });

  it('should handle string integer values and remove ".00"', () => {
    const result = pipe.transform('2000');
    expect(result).toBe('$2.000');
  });

  it('should handle zero value', () => {
    const result = pipe.transform(0);
    expect(result).toBe('$0');
  });

  it('should handle string zero value', () => {
    const result = pipe.transform('0');
    expect(result).toBe('$0');
  });

  it('should return null for non-numeric strings', () => {
    const result = pipe.transform('invalid');
    expect(result).toBeNull();
  });

  it('should return null for undefined', () => {
    const result = pipe.transform(undefined as unknown as number | string);
    expect(result).toBeNull();
  });

  it('should return null for null', () => {
    const result = pipe.transform(null as unknown as number | string);
    expect(result).toBeNull();
  });
});
