import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {cartRoutes} from './cart.routes';
import {Component} from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-mock-cart',
  template: '<p>Mock Cart Component</p>',
})
class MockCartComponent {}

describe('CartRoutes (Standalone)', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: MockCartComponent },
          ...cartRoutes,
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });



  it('should dynamically load CartComponent', async () => {
    const route = cartRoutes[0];


    expect(typeof route.loadComponent).toBe('function');
    const component = await route.loadComponent!();
    expect(component).toBeTruthy();
  });
});
