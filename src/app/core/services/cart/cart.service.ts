import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from "../../../shared/models/products";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Products[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() { }


  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }


  addToCart(product: Products): void {
    const existingProduct = this.items.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.cartItemCount.next(this.items.reduce((acc, item) => acc + (item.quantity || 0), 0));
  }


  getItems(): Products[] {
    return this.items;
  }


  clearCart(): Products[] {
    this.items = [];
    this.cartItemCount.next(0);
    return this.items;
  }


  removeItem(productName: string): void {
    this.items = this.items.filter(item => item.name !== productName);
    this.cartItemCount.next(this.items.reduce((acc, item) => acc + (item.quantity || 0), 0));
  }


  updateQuantity(productName: string, quantity: number): void {
    const product = this.items.find(item => item.name === productName);
    if (product) {
      product.quantity = quantity;
      this.cartItemCount.next(this.items.reduce((acc, item) => acc + (item.quantity || 0), 0));
    }
  }
}
