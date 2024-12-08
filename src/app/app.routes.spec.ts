import {routes} from './app.routes';

describe('App Routes', () => {
  it('should define a root route with children', () => {
    const rootRoute = routes.find((r) => r.path === '');
    expect(rootRoute).toBeDefined();
    expect(rootRoute?.children).toBeDefined();
    expect(rootRoute?.children?.length).toBeGreaterThan(0);
  });

  it('should redirect empty path to "home"', () => {
    const redirectRoute = routes[0].children?.find((r) => r.pathMatch === 'full');
    expect(redirectRoute).toBeDefined();
    expect(redirectRoute?.redirectTo).toBe('home');
  });

  it('should define lazy-loaded routes for all paths', () => {
    const paths = [
      'home',
      'notebooks',
      'cell-phones',
      'coffee-makers',
      'air-conditioning',
      'admin',
      'account',
      'cart',
      'recover-password',
      'register',
    ];

    paths.forEach((path) => {
      const route = routes[0].children?.find((r) => r.path === path);
      expect(route).toBeDefined();
      expect(route?.loadChildren).toBeInstanceOf(Function);
    });
  });

  it('should have a valid "admin" route', async () => {
    const adminRoute = routes[0].children?.find((r) => r.path === 'admin');
    expect(adminRoute).toBeDefined();

    const module = await adminRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should have a valid "home" route', async () => {
    const homeRoute = routes[0].children?.find((r) => r.path === 'home');
    expect(homeRoute).toBeDefined();

    const module = await homeRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });
});
