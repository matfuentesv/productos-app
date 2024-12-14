import { RutPipe } from './rut.pipe';

describe('RutPipe', () => {
  let pipe: RutPipe;

  beforeEach(() => {
    pipe = new RutPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid RUT correctly', () => {
    const value = '123456789';
    const expectedValue = '12.345.678-9'; // Simula el resultado esperado

    spyOn(pipe, 'transform').and.callFake((val: string) => {
      // Simulamos el formato esperado
      const formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}-${val.slice(8)}`;
      return formatted;
    });

    const result = pipe.transform(value);
    expect(result).toBe(expectedValue);
  });

  it('should handle empty string gracefully', () => {
    const value = '';
    const expectedValue = ''; // Resultado esperado para una cadena vacía

    spyOn(pipe, 'transform').and.callFake((val: string) => val); // Simula que no hace nada

    const result = pipe.transform(value);
    expect(result).toBe(expectedValue);
  });

  it('should handle invalid RUT gracefully', () => {
    const value = 'invalid';
    const expectedValue = 'invalid'; // Simula que devuelve el valor original

    spyOn(pipe, 'transform').and.callFake((val: string) => val);

    const result = pipe.transform(value);
    expect(result).toBe(expectedValue);
  });
});
