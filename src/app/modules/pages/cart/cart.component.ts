import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {CustomCurrencyPipe} from '../../../shared/pipes/customCurrency';
import {Products} from '../../../shared/models/products';
import {CartService} from '../../../core/services/cart/cart.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {DataService} from '../../../core/services/data/data.service';
import {User} from '../../../shared/models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    CustomCurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {


  items: Products[] = [];
  total: number = 0;
  discount: number = 0;
  objectUser: User | null | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private cartService: CartService,
              private authService: AuthService,
              private  dataService: DataService,
              private snackBar: MatSnackBar,) { }


  ngOnInit(): void {
    this.objectUser = this.authService.getUser();
    this.items = this.cartService.getItems();
    console.log('Items en el carrito:', this.items);
    this.calculateTotal();
  }


  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    this.discount = this.items.reduce((acc, item) => acc + ((item.price * (item.discount / 100)) * (item.quantity || 1)), 0);
  }


  updateQuantity(productName: string, quantity: number | undefined): void {
    if (quantity === undefined || quantity < 1) {
      quantity = 1;
    }
    this.cartService.updateQuantity(productName, quantity);
    this.calculateTotal();
  }


  removeItem(productName: string): void {
    this.cartService.removeItem(productName);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  pay(): void {

    if (this.items.length === 0) {
      alert('No hay productos en el carrito para pagar.');
      return;
    }


    const orderPayload: { userName: string; products: { productName: string; price: number; quantity: number }[] } = {
      userName: this.objectUser?.firstName || 'Usuario Anónimo', // Valor predeterminado si no está definido
      products: this.items.map((item: Products) => ({
        productName: item.name,
        price: item.price,
        quantity: item.quantity || 1
      }))
    };


    this.dataService.createOrder(orderPayload).subscribe(rsp =>{
       if(rsp.success){
         this.snackBar.open('Usuario actualizado correctamente!', '', {
           horizontalPosition: this.horizontalPosition,
           verticalPosition: this.verticalPosition,
           duration: 3000,
           panelClass: ['custom-snackbar']
         });
       }
    });
  }


}
