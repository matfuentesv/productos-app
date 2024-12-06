import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {adminRoutes} from './admin.routes';
import {Component} from '@angular/core';

// Componente mock para las pruebas
@Component({
  standalone: true,
  selector: 'app-mock-admin',
  template: '<p>Mock Admin Component</p>',
})
class MockAdminComponent {}

describe('AdminRoutes (Standalone)', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: MockAdminComponent }, // Ruta predeterminada
          ...adminRoutes, // Cargamos las rutas del archivo original
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });


  it('should dynamically load AdminComponent', async () => {
    const route = adminRoutes[0];

    // Verificamos si `loadComponent` está definido como una función
    expect(typeof route.loadComponent).toBe('function');

    // Ejecutamos el método y verificamos que retorne un valor válido
    const component = await route.loadComponent!();
    expect(component).toBeTruthy();
  });
});
