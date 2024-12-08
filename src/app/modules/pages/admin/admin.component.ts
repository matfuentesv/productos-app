
import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild,} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf} from "@angular/common";
import {DataService} from "../../../core/services/data/data.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import {UserModalComponent} from "../../../shared/components/user-modal/user-modal.component";
import {EditUserModalComponent} from "../../../shared/components/edit-user-modal/edit-user-modal.component";
import {Order, Products} from "../../../shared/models/products";
import {User} from "../../../shared/models/user";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CustomCurrencyPipe} from "../../../shared/pipes/customCurrency";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";

interface ProductResponse {
  notebooks: Products[];
  cellPhones: Products[];
  coffeeMakers: Products[];
  airConditioning: Products[];
}

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatTable,
    MatPaginator,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CustomCurrencyPipe,
    MatProgressSpinner,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
  ],
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit, AfterViewInit, AfterViewChecked {
  currentSection: string = "products";

  productForm: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "rut",
    "email",
    "phone",
    "address",
    "roles",
    "edit",
    "delete",
  ];
  productDisplayedColumns: string[] = [
    "name",
    "price",
    "discount",
    "description",
    "category",
    "quantity",
  ];
  orderDisplayedColumns: string[] = ["orderId", "userName", "totalAmount"];

  dataSource = new MatTableDataSource<User>();
  productDataSource = new MatTableDataSource<Products>();
  dataSourceOrders = new MatTableDataSource<Order>();

  resultsLength = 0;
  productResultsLength = 0;
  orderResultsLength = 0;

  isLoadingResults = true;
  loading: boolean = true;

  @ViewChild("userPaginator") userPaginator!: MatPaginator;
  @ViewChild("productPaginator") productPaginator!: MatPaginator;
  @ViewChild("ordersPaginator") ordersPaginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private userService: DataService,
    private cdr: ChangeDetectorRef,
    public ngZone: NgZone,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {
    this.productForm = this.fb.group({
      productName: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      image: [""]
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadProducts();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePaginator();
    });
  }

  ngAfterViewChecked() {
    this.initializePaginator();
  }

  initializePaginator() {
    if (this.userPaginator && !this.dataSource.paginator) {
      this.ngZone.runOutsideAngular(() => {
        this.dataSource.paginator = this.userPaginator;
        this.setupPagination(this.userPaginator, "users");
      });
    }

    if (this.productPaginator && !this.productDataSource.paginator) {
      this.ngZone.runOutsideAngular(() => {
        this.productDataSource.paginator = this.productPaginator;
        this.setupPagination(this.productPaginator, "products");
      });
    }

    if (this.ordersPaginator && !this.dataSourceOrders.paginator) {
      this.ngZone.runOutsideAngular(() => {
        this.dataSourceOrders.paginator = this.ordersPaginator;
        this.setupPagination(this.ordersPaginator, "orders");
      });
    }
  }

  setupPagination(paginator: MatPaginator, section: string) {
    merge(paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          switch (section) {
            case "users":
              return this.userService
                .getUsers()
                .pipe(catchError(() => of([] as User[])));
            case "products":
              return this.userService.getProducts().pipe(
                catchError(() =>
                  of({
                    notebooks: [],
                    cellPhones: [],
                    coffeeMakers: [],
                    airConditioning: [],
                  } as ProductResponse)
                )
              );
            case "orders":
              return this.dataService
                .getOrders()
                .pipe(catchError(() => of([] as Order[])));
            default:
              return of([]);
          }
        }),
        map((data) => {
          this.isLoadingResults = false;

          if (section === "products") {
            const products = data as ProductResponse;
            return [
              ...products.notebooks,
              ...products.cellPhones,
              ...products.coffeeMakers,
              ...products.airConditioning,
            ];
          }

          return data;
        })
      )
      .subscribe((data) => {
        this.ngZone.run(() => {
          switch (section) {
            case "users":
              this.dataSource.data = data as User[];
              this.resultsLength = (data as User[]).length;
              break;
            case "products":
              this.productDataSource.data = data as Products[];
              this.productResultsLength = (data as Products[]).length;
              break;
            case "orders":
              this.dataSourceOrders.data = data as Order[];
              this.orderResultsLength = (data as Order[]).length;
              break;
          }
          this.cdr.detectChanges();
        });
      });
  }

  loadData() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (users) => {
        this.dataSource.data = users;
        this.resultsLength = users.length;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  private loadProducts() {
    this.loading = true;
    this.userService.getProducts().subscribe(
      (products: ProductResponse) => {
        const allProducts = [
          ...products.notebooks,
          ...products.cellPhones,
          ...products.coffeeMakers,
          ...products.airConditioning,
        ];
        this.productDataSource.data = allProducts;
        this.productResultsLength = allProducts.length;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  showSection(event: Event, section: string): void {
    event.preventDefault();
    this.currentSection = section;
  }

  openModal() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { users: this.dataSource.data },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  editElement(user: User) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      data: { user },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteElement(user: User) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteUser(user.email).subscribe(() => {
          this.snackBar.open("Usuario eliminado correctamente", "", {
            duration: 3000,
          });
          this.loadData();
        });
      }
    });
  }
}


