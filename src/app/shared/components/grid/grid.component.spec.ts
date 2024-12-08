import {TestBed} from '@angular/core/testing';
import {GridComponent} from './grid.component';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Products} from '../../models/products';
import {CartService} from '../../../core/services/cart/cart.service';


const mockProducts: Products[] = [
  {

    name: 'Product 1',
    price: 100,
    discount: 10,
    description: 'Description 1',
    image: 'image1.jpg',
    category: 'Category 1',
    originalPrice: 110,
    rating: 3,
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
    rating: 4,
    reviews: 15,
  },
];

describe('GridComponent', () => {
  let component: GridComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    cartService = jasmine.createSpyObj('CartService', ['addToCart']);

    TestBed.configureTestingModule({
      imports: [GridComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: CartService, useValue: cartService },
      ],
    });

    const fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
  });



  it('should add product to cart and show snackbar', () => {
    const product = mockProducts[0];

    component.addToCart(product);

    expect(cartService.addToCart).toHaveBeenCalledWith(product);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Producto agregado al carrito!',
      '',
      {
        horizontalPosition: component.horizontalPosition,
        verticalPosition: component.verticalPosition,
        duration: 3000,
        panelClass: ['custom-snackbar'],
      }
    );
  });

  it('should return correct star classes based on rating', () => {

    let stars = component.getStars(3);
    expect(stars).toEqual([
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning'
    ]);

    stars = component.getStars(5);
    expect(stars).toEqual([
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning',
      'fas fa-star text-warning'
    ]);


    stars = component.getStars(0);
    expect(stars).toEqual([
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning',
      'far fa-star text-warning'
    ]);
  });

});
