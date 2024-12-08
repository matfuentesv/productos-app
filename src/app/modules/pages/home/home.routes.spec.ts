import {homeRoutes} from './home.routes';

describe('Home Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = homeRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
