import {TestBed} from '@angular/core/testing';
import {CartService} from './cart.service';
import {Products} from '../../../shared/models/products';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
      quantity: 1,
    };

    service.addToCart(product);
    const items = service.getItems();

    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Product 1');
    expect(items[0].quantity).toBe(1);
  });

  it('should update the quantity of an existing product in the cart', () => {
    const product: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
    };

    service.addToCart(product);
    service.addToCart(product);
    const items = service.getItems();

    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should return the correct cart item count', (done) => {
    const product: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
    };

    service.addToCart(product);
    service.addToCart(product);

    service.getCartItemCount().subscribe((count) => {
      expect(count).toBe(2);
      done();
    });
  });

  it('should clear the cart', () => {
    const product: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
    };

    service.addToCart(product);
    service.clearCart();
    const items = service.getItems();

    expect(items.length).toBe(0);

    service.getCartItemCount().subscribe((count) => {
      expect(count).toBe(0);
    });
  });

  it('should remove an item from the cart', () => {
    const product1: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
    };
    const product2: Products = {
      name: 'Product 2',
      price: 200,
      discount: 20,
      description: 'Another test product',
      image: 'product2.jpg',
      category: 'Books',
      originalPrice: 220,
      rating: 4.0,
      reviews: 15,
    };

    service.addToCart(product1);
    service.addToCart(product2);

    service.removeItem('Product 1');
    const items = service.getItems();

    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Product 2');
  });

  it('should update the quantity of an existing product', () => {
    const product: Products = {
      name: 'Product 1',
      price: 100,
      discount: 10,
      description: 'Test product',
      image: 'product1.jpg',
      category: 'Electronics',
      originalPrice: 110,
      rating: 4.5,
      reviews: 10,
    };

    service.addToCart(product);
    service.updateQuantity('Product 1', 5);

    const items = service.getItems();

    expect(items[0].quantity).toBe(5);

    service.getCartItemCount().subscribe((count) => {
      expect(count).toBe(5);
    });
  });

  it('should not update quantity if product does not exist', () => {
    service.updateQuantity('Nonexistent Product', 5);

    const items = service.getItems();

    expect(items.length).toBe(0);

    service.getCartItemCount().subscribe((count) => {
      expect(count).toBe(0);
    });
  });
});
