import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {appAirConditioningRoutes} from './app-air-conditioning.routes';


@Component({
  standalone: true,
  selector: 'app-mock-air-conditioning',
  template: '<p>Mock Air Conditioning Component</p>',
})
class MockAirConditioningComponent {}

describe('AirConditioningRoutes (Standalone)', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: MockAirConditioningComponent },
          ...appAirConditioningRoutes,
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });

  it('should dynamically load AirConditioningComponent', async () => {
    const route = appAirConditioningRoutes[0];


    expect(typeof route.loadComponent).toBe('function');


    const component = await route.loadComponent!();
    expect(component).toBeTruthy();
  });
});
