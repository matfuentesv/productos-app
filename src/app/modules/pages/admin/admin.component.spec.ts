import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminComponent} from './admin.component';
import {Subject} from 'rxjs';

describe('AdminComponent - Paginator Initialization and Form Validation', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule, // Agregado para evitar errores NG05105
        ReactiveFormsModule,
        AdminComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inicializar el formulario
    component.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl('', [Validators.required]),
    });
  });

  it('should validate productName as invalid when empty and touched', () => {
    const productNameControl = component.productForm.get('productName');
    productNameControl?.markAsTouched();
    expect(component.validProductName).toBeTrue();

    productNameControl?.setValue('Valid Name');
    expect(component.validProductName).toBeFalse();
  });

  it('should validate description as invalid when empty and touched', () => {
    const descriptionControl = component.productForm.get('description');
    descriptionControl?.markAsTouched();
    expect(component.validProductDescription).toBeTrue();

    descriptionControl?.setValue('Valid Description');
    expect(component.validProductDescription).toBeFalse();
  });

  it('should validate price as invalid when empty or below zero and touched', () => {
    const priceControl = component.productForm.get('price');
    priceControl?.markAsTouched();
    expect(component.validProductPrice).toBeTrue();

    priceControl?.setValue(-5);
    expect(component.validProductPrice).toBeTrue();

    priceControl?.setValue(100);
    expect(component.validProductPrice).toBeFalse();
  });

  it('should validate category as invalid when empty and touched', () => {
    const categoryControl = component.productForm.get('category');
    categoryControl?.markAsTouched();
    expect(component.validProductCategory).toBeTrue();

    categoryControl?.setValue('Valid Category');
    expect(component.validProductCategory).toBeFalse();
  });

  it('should initialize userPaginator correctly when dataSource.paginator is null', () => {
    const paginatorMock = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>() // Observable simulado
    });
    component.dataSource = { paginator: null } as MatTableDataSource<any>;
    component.userPaginator = paginatorMock;

    component.initializePaginator();

    expect(component.dataSource.paginator).toBe(component.userPaginator);
  });

  it('should not reinitialize userPaginator if already set', () => {
    const mockPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });
    component.dataSource = { paginator: mockPaginator } as MatTableDataSource<any>;
    component.userPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });

    component.initializePaginator();

    expect(component.dataSource.paginator).toBe(mockPaginator);
  });

  it('should initialize productPaginator correctly when productDataSource.paginator is null', () => {
    const paginatorMock = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>() // Observable simulado
    });
    component.productDataSource = { paginator: null } as MatTableDataSource<any>;
    component.productPaginator = paginatorMock;

    component.initializePaginator();

    expect(component.productDataSource.paginator).toBe(component.productPaginator);
  });

  it('should not reinitialize productPaginator if already set', () => {
    const mockPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });
    component.productDataSource = { paginator: mockPaginator } as MatTableDataSource<any>;
    component.productPaginator = jasmine.createSpyObj('MatPaginator', [], {
      page: new Subject<void>()
    });

    component.initializePaginator();

    expect(component.productDataSource.paginator).toBe(mockPaginator);
  });
});
