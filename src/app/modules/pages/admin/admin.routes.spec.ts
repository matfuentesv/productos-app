import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {adminRoutes} from './admin.routes';
import {Component} from '@angular/core';


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
          { path: '', component: MockAdminComponent },
          ...adminRoutes,
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });


  it('should dynamically load AdminComponent', async () => {
    const route = adminRoutes[0];


    expect(typeof route.loadComponent).toBe('function');

    const component = await route.loadComponent!();
    expect(component).toBeTruthy();
  });
});
