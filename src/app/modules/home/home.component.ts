import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CustomCurrencyPipe} from '../../shared/pipes/customCurrency';
import {Products} from '../../shared/models/products';
import {DataService} from '../../core/services/data/data.service';
import {CartService} from '../../core/services/cart/cart.service';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    NgForOf,
    MatButton,
    CustomCurrencyPipe,
    MatProgressSpinnerModule,
    NgIf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {


  products: Products[] = [];
  chunkedProducts: Products[][] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = true;

  constructor(private dataService: DataService,
              private cartService: CartService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getProducts().subscribe(x => {
      this.products = x.outstanding;
      this.chunkedProducts = this.chunk(this.products, 3);
      this.loading = false;
    },error => {
      console.error(error);
      this.loading = false;
    });
  }


  chunk(arr: any[], chunkSize: number): any[] {
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }


  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }


  ngAfterViewInit() {
    const spinner = document.getElementById('spinner');
    if (this.loading) {
      spinner?.classList.remove('hidden');
    } else {
      spinner?.classList.add('hidden');
    }
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
