import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {accountRoutes} from './account.routes';
import {Component} from '@angular/core';

// Componente mock para las pruebas
@Component({
  standalone: true,
  selector: 'app-mock-account',
  template: '<p>Mock Account Component</p>',
})
class MockAccountComponent {}

describe('AccountRoutes (Standalone)', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: MockAccountComponent }, // Ruta predeterminada
          ...accountRoutes, // Cargamos las rutas del archivo original
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });


  it('should dynamically load AccountComponent', async () => {
    const route = accountRoutes[0];

    // Verificamos si `loadComponent` está definido como una función
    expect(typeof route.loadComponent).toBe('function');

    // Ejecutamos el método y verificamos que retorne un valor válido
    const component = await route.loadComponent!();
    expect(component).toBeTruthy();
  });
});
