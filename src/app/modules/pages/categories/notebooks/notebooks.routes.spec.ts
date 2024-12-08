import {notebooksRoutes} from './notebooks.routes';

describe('Notebooks Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = notebooksRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
