import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Products} from "../../models/products";
import {CartService} from "../../../core/services/cart/cart.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CustomCurrencyPipe} from "../../pipes/customCurrency";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    CustomCurrencyPipe,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {


  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private cartService: CartService,
              private snackBar: MatSnackBar) {}

  @Input()
  chunkedProducts: {
    image: string;
    originalPrice: number;
    reviews: number;
    price: number;
    name: string;
    rating: number;
    description: string;
    discount: number
  }[][] = [];
  @Input()
  title: string = '';
  @Input()
  loading: boolean = true;

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }

  addToCart(product: Products): void {
    this.cartService.addToCart(product);
    this.snackBar.open('Producto agregado al carrito!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }

}
