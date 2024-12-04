import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import {DataService} from '../../../../core/services/data/data.service';
import {AirConditioningComponent} from './air-conditioning.component';


describe('AirConditioningComponent', () => {
  let component: AirConditioningComponent;
  let fixture: ComponentFixture<AirConditioningComponent>;
  let mockProductService: any;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('DataService', ['getProducts']);
    mockProductService.getProducts.and.returnValue(of({ airConditioning: [] }));

    await TestBed.configureTestingModule({
      imports: [AirConditioningComponent, HttpClientTestingModule],
      providers: [{ provide: DataService, useValue: mockProductService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirConditioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to false initially in ngOnInit', () => {

    mockProductService.getProducts.and.returnValue(of({ airConditioning: [] }));


    component.loading = false;

    component.ngOnInit();
    expect(component.loading).toBeFalse();
  });

  it('should set loading to false after data is loaded in ngOnInit', () => {

    const mockProducts = [{ id: 1 }, { id: 2 }];
    mockProductService.getProducts.and.returnValue(of({ airConditioning: mockProducts }));
    component.ngOnInit();


    mockProductService.getProducts().subscribe(() => {
      expect(component.loading).toBeFalse();
    });
  });



  it('should handle error in ngOnInit gracefully', () => {
    spyOn(console, 'error');
    mockProductService.getProducts.and.returnValue(throwError(() => new Error('Error loading data')));

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith(new Error('Error loading data'));
    expect(component.loading).toBeFalse();
  });
});
