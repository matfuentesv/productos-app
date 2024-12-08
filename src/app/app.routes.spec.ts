import {routes} from './app.routes';

describe('App Routes', () => {
  it('should define the root route with a lazy-loaded PagesComponent', async () => {
    const rootRoute = routes.find((r) => r.path === '');
    expect(rootRoute).toBeDefined();
    expect(rootRoute?.loadComponent).toBeInstanceOf(Function);

    const component = await rootRoute?.loadComponent?.();
    expect(component).toBeTruthy();
  });

  it('should redirect the empty path to "home"', () => {
    const childRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.pathMatch === 'full');
    expect(childRoute).toBeDefined();
    expect(childRoute?.redirectTo).toBe('home');
  });

  it('should define all child routes with lazy loading', async () => {
    const childRoutes = routes.find((r) => r.path === '')?.children || [];
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

    paths.forEach(async (path) => {
      const route = childRoutes.find((r) => r.path === path);
      expect(route).toBeDefined();
      expect(route?.loadChildren).toBeInstanceOf(Function);

      const module = await route?.loadChildren?.();
      expect(module).toBeTruthy();
    });
  });

  it('should define the "home" route', async () => {
    const homeRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'home');
    expect(homeRoute).toBeDefined();

    const module = await homeRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "notebooks" route', async () => {
    const notebooksRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'notebooks');
    expect(notebooksRoute).toBeDefined();

    const module = await notebooksRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "cell-phones" route', async () => {
    const cellPhonesRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'cell-phones');
    expect(cellPhonesRoute).toBeDefined();

    const module = await cellPhonesRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "coffee-makers" route', async () => {
    const coffeeMakersRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'coffee-makers');
    expect(coffeeMakersRoute).toBeDefined();

    const module = await coffeeMakersRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "air-conditioning" route', async () => {
    const airConditioningRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'air-conditioning');
    expect(airConditioningRoute).toBeDefined();

    const module = await airConditioningRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "admin" route', async () => {
    const adminRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'admin');
    expect(adminRoute).toBeDefined();

    const module = await adminRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "account" route', async () => {
    const accountRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'account');
    expect(accountRoute).toBeDefined();

    const module = await accountRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "cart" route', async () => {
    const cartRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'cart');
    expect(cartRoute).toBeDefined();

    const module = await cartRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "recover-password" route', async () => {
    const recoverPasswordRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'recover-password');
    expect(recoverPasswordRoute).toBeDefined();

    const module = await recoverPasswordRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });

  it('should define the "register" route', async () => {
    const registerRoute = routes.find((r) => r.path === '')?.children?.find((r) => r.path === 'register');
    expect(registerRoute).toBeDefined();

    const module = await registerRoute?.loadChildren?.();
    expect(module).toBeTruthy();
  });
});
