import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CartComponent} from './cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the quantity of an item correctly', () => {
    const mockItem = {
      name: 'Producto 1',
      price: 100,
      discount: 10,
      description: 'Descripción del producto 1',
      image: 'image1.jpg',
      category: 'Categoría 1',
      originalPrice: 120,
      rating: 4.5,
      reviews: 10,
      quantity: 1,
    };
    component.items = [mockItem];
    fixture.detectChanges();


    component.updateQuantity('Producto 1', 3);
    fixture.detectChanges();


    expect(component.items[0].quantity).toBe(1);
  });

  it('should remove an item from the cart correctly', () => {
    component.items = [
      {
        name: 'Producto 1',
        price: 100,
        discount: 10,
        description: 'Descripción del producto 1',
        image: 'image1.jpg',
        category: 'Categoría 1',
        originalPrice: 120,
        rating: 4.5,
        reviews: 10,
        quantity: 1,
      },
      {
        name: 'Producto 2',
        price: 200,
        discount: 20,
        description: 'Descripción del producto 2',
        image: 'image2.jpg',
        category: 'Categoría 2',
        originalPrice: 250,
        rating: 4.0,
        reviews: 5,
        quantity: 2,
      },
    ];
    fixture.detectChanges();


    component.removeItem('Producto 1');
    fixture.detectChanges();


    expect(component.items.length).toBe(0);
  });
});
