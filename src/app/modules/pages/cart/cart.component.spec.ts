import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CartComponent} from './cart.component';
import {CartService} from '../../../core/services/cart/cart.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DataService} from '../../../core/services/data/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Products} from '../../../shared/models/products';
import {User} from '../../../shared/models/user';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let authService: jasmine.SpyObj<AuthService>;
  let dataService: jasmine.SpyObj<DataService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockProducts: Products[] = [
    { name: 'Product 1', price: 100, discount: 10, description: 'Desc 1', image: 'img1.jpg', originalPrice: 120, rating: 4.5, reviews: 10, quantity: 2 },
    { name: 'Product 2', price: 200, discount: 5, description: 'Desc 2', image: 'img2.jpg', originalPrice: 220, rating: 4.0, reviews: 5, quantity: 1 }
  ];

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    rut: '12345678-9',
    email: 'john.doe@example.com',
    phone: '123456789',
    address: '123 Street',
    password: 'Password1',
    rol: { id: 1, name: 'customer', description: 'Customer role' }
  };

  beforeEach(() => {
    cartService = jasmine.createSpyObj('CartService', ['getItems', 'updateQuantity', 'removeItem']);
    authService = jasmine.createSpyObj('AuthService', ['getUser']);
    dataService = jasmine.createSpyObj('DataService', ['createOrder']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: AuthService, useValue: authService },
        { provide: DataService, useValue: dataService },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user and items', () => {
    authService.getUser.and.returnValue(mockUser);
    cartService.getItems.and.returnValue(mockProducts);

    component.ngOnInit();

    expect(component.objectUser).toEqual(mockUser);
    expect(component.items).toEqual(mockProducts);
    expect(component.total).toBe(400); // 100*2 + 200
    expect(component.discount).toBe(30); // (100*2*0.1 + 200*0.05)
  });

  it('should calculate total and discount correctly', () => {
    component.items = mockProducts;
    component.calculateTotal();

    expect(component.total).toBe(400); // 100*2 + 200
    expect(component.discount).toBe(30); // (100*2*0.1 + 200*0.05)
  });

  it('should update quantity and recalculate total', () => {
    component.items = mockProducts;
    component.updateQuantity('Product 1', 3);

    expect(cartService.updateQuantity).toHaveBeenCalledWith('Product 1', 3);
    expect(component.total).toBe(400);
    expect(component.discount).toBe(30);
  });

  it('should remove item and recalculate total', () => {
    component.items = mockProducts;
    cartService.getItems.and.returnValue([mockProducts[1]]);

    component.removeItem('Product 1');

    expect(cartService.removeItem).toHaveBeenCalledWith('Product 1');
    expect(component.items).toEqual([mockProducts[1]]);
    expect(component.total).toBe(200); // 200
    expect(component.discount).toBe(10); // (200*0.05)
  });

  it('should show alert if no items in cart on pay', () => {
    spyOn(window, 'alert');
    component.items = [];

    component.pay();

    expect(window.alert).toHaveBeenCalledWith('No hay productos en el carrito para pagar.');
  });

  // it('should create order and show success message on pay', () => {
  //   component.items = mockProducts;
  //   authService.getUser.and.returnValue(mockUser);
  //   dataService.createOrder.and.returnValue(of({ success: true }));
  //
  //   component.pay();
  //
  //   expect(dataService.createOrder).toHaveBeenCalledWith({
  //     userName: 'John',
  //     products: [
  //       { productName: 'Product 1', price: 100, quantity: 2 },
  //       { productName: 'Product 2', price: 200, quantity: 1 }
  //     ]
  //   });
  //
  //   expect(snackBar.open).toHaveBeenCalledWith('Usuario actualizado correctamente!', '', {
  //     horizontalPosition: component.horizontalPosition,
  //     verticalPosition: component.verticalPosition,
  //     duration: 3000,
  //     panelClass: ['custom-snackbar']
  //   });
  // });
});
