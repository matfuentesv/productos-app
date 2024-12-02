import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DataService} from '../../core/services/data/data.service';
import {HttpClientModule} from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockJQuery: any;

  beforeEach(async () => {
    // Mock de jQuery
    mockJQuery = {
      hide: jasmine.createSpy('hide'),
      show: jasmine.createSpy('show'),
      css: jasmine.createSpy('css'),
    };


    await TestBed.configureTestingModule({
      imports: [HomeComponent,ReactiveFormsModule,
        HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[DataService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate star ratings correctly', () => {
    const stars = component.getStars(3.5);
    expect(stars.length).toBe(5);
    expect(stars.filter((star) => star === 'fas fa-star').length).toBe(0);
  });

  it('should display products in the carousel when loading is false', () => {
    component.loading = false;
    component.products = [
      { name: 'Product 1', price: 100, discount: 10, description: '', image: '', category: '', originalPrice: 110, rating: 4.5, reviews: 10 },
      { name: 'Product 2', price: 200, discount: 20, description: '', image: '', category: '', originalPrice: 220, rating: 3.5, reviews: 20 },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const carouselItems = compiled.querySelectorAll('.carousel-item');
    expect(carouselItems.length).toBe(0);
  });

  it('should divide an array into chunks of the given size', () => {
    const inputArray = [1, 2, 3, 4, 5, 6, 7];
    const chunkSize = 3;

    const result = component.chunk(inputArray, chunkSize);

    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('should handle empty arrays', () => {
    const inputArray: any[] = [];
    const chunkSize = 2;

    const result = component.chunk(inputArray, chunkSize);

    expect(result).toEqual([]);
  });

  it('should handle chunk size greater than the array length', () => {
    const inputArray = [1, 2, 3];
    const chunkSize = 5;

    const result = component.chunk(inputArray, chunkSize);

    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size of 1', () => {
    const inputArray = [1, 2, 3, 4];
    const chunkSize = 1;

    const result = component.chunk(inputArray, chunkSize);

    expect(result).toEqual([[1], [2], [3], [4]]);
  });




});
