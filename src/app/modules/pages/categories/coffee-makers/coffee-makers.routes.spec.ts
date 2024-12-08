import {coffeeMakersRoutes} from './coffee-makers.routes';

describe('Coffee Makers Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = coffeeMakersRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
