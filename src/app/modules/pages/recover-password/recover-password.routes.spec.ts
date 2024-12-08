import {recoverPasswordRoutes} from './recover-password.routes';

describe('Recover Password Routes', () => {
  it('should define a default route with lazy loading', async () => {
    const route = recoverPasswordRoutes.find((r) => r.path === '');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeInstanceOf(Function);

    const component = await route?.loadComponent?.();
    expect(component).toBeTruthy();
  });
});
