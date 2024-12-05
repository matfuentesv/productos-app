import {TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../../core/services/data/data.service';
import {of, throwError} from 'rxjs';
import {ProductsResponse} from '../../../shared/models/products';


const mockProductsResponse: ProductsResponse = {
  notebooks: [],
  cellPhones: [],
  coffeeMakers: [],
  airConditioning: [],
  outstanding: [
    {

      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Description 1',
      image: 'image1.jpg',
      category: 'Category 1',
      originalPrice: 110,
      rating: 4,
      reviews: 10,
    },
    {

      name: 'Product 2',
      price: 200,
      discount: 20,
      description: 'Description 2',
      image: 'image2.jpg',
      category: 'Category 2',
      originalPrice: 250,
      rating: 5,
      reviews: 20,
    },
  ],
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dataService = jasmine.createSpyObj('DataService', ['getProducts']);

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: DataService, useValue: dataService },
      ],
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('should load products and chunk them correctly', () => {
    dataService.getProducts.and.returnValue(of(mockProductsResponse));

    component.ngOnInit();

    expect(component.products).toEqual(mockProductsResponse.outstanding);
    expect(component.chunkedProducts.length).toBeGreaterThan(0);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading products', () => {
    const consoleSpy = spyOn(console, 'error');
    dataService.getProducts.and.returnValue(throwError(() => new Error('Error loading products')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
    expect(component.loading).toBeFalse();
  });

  it('should add product to cart and show snackbar', () => {
    const mockProduct = mockProductsResponse.outstanding[0];

    component.addToCart(mockProduct);

    expect(snackBar.open).toHaveBeenCalledWith(
      'Producto agregado al carrito!',
      '',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom', panelClass: ['custom-snackbar'] }
    );
  });

  it('should return the correct star classes based on rating', () => {
    const fullStars = component.getStars(3);
    const emptyStars = component.getStars(0);
    const allFullStars = component.getStars(5);

    expect(fullStars).toEqual([
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
    ]);
    expect(emptyStars).toEqual([
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
    ]);
    expect(allFullStars).toEqual([
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
    ]);
  });

  it('should show spinner when loading is true in ngAfterViewInit', () => {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.classList.add('hidden');
    document.body.appendChild(spinner);

    component.loading = true;
    component.ngAfterViewInit();

    expect(spinner.classList.contains('hidden')).toBeFalse();

    // Clean up
    document.body.removeChild(spinner);
  });

  it('should hide spinner when loading is false in ngAfterViewInit', () => {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    document.body.appendChild(spinner);

    component.loading = false;
    component.ngAfterViewInit();

    expect(spinner.classList.contains('hidden')).toBeTrue();

    // Clean up
    document.body.removeChild(spinner);
  });

});
