import {cellPhonesRoutes} from './cell-phones.routes';

describe('Cell Phones Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = cellPhonesRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
