import {registerRoutes} from './register.routes';

describe('Register Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = registerRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
