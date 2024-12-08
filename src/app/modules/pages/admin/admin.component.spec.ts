import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminComponent} from './admin.component';

import {Subject} from 'rxjs';

describe('AdminComponent - Dialogs and Methods', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        AdminComponent,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;


    component.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl('', [Validators.required]),
    });

    fixture.detectChanges();
  });





  it('should validate productName as invalid when empty and touched', () => {
    const productNameControl = component.productForm.get('productName');
    productNameControl?.markAsTouched();
    expect(productNameControl?.invalid).toBeTrue();

    productNameControl?.setValue('Valid Name');
    expect(productNameControl?.invalid).toBeFalse();
  });

  it('should validate description as invalid when empty and touched', () => {
    const descriptionControl = component.productForm.get('description');
    descriptionControl?.markAsTouched();
    expect(descriptionControl?.invalid).toBeTrue();

    descriptionControl?.setValue('Valid Description');
    expect(descriptionControl?.invalid).toBeFalse();
  });

  it('should validate price as invalid when empty or below zero and touched', () => {
    const priceControl = component.productForm.get('price');
    priceControl?.markAsTouched();
    expect(priceControl?.invalid).toBeTrue();

    priceControl?.setValue(-5);
    expect(priceControl?.invalid).toBeTrue();

    priceControl?.setValue(100);
    expect(priceControl?.invalid).toBeFalse();
  });

  it('should validate category as invalid when empty and touched', () => {
    const categoryControl = component.productForm.get('category');
    categoryControl?.markAsTouched();
    expect(categoryControl?.invalid).toBeTrue();

    categoryControl?.setValue('Valid Category');
    expect(categoryControl?.invalid).toBeFalse();
  });

  it('should set userPaginator and call setupPagination when dataSource.paginator is null', () => {
    component.dataSource = { paginator: null } as MatTableDataSource<any>;
    const userPaginatorMock = jasmine.createSpyObj('MatPaginator', [], { page: new Subject<void>() });
    component.userPaginator = userPaginatorMock;

    spyOn(component, 'setupPagination');

    component.initializePaginator();

    expect(component.dataSource.paginator).toBe(userPaginatorMock);
    expect(component.setupPagination).toHaveBeenCalledWith(userPaginatorMock, 'users');
  });

  it('should set productPaginator and call setupPagination when productDataSource.paginator is null', () => {
    component.productDataSource = { paginator: null } as MatTableDataSource<any>;
    const productPaginatorMock = jasmine.createSpyObj('MatPaginator', [], { page: new Subject<void>() });
    component.productPaginator = productPaginatorMock;

    spyOn(component, 'setupPagination');

    component.initializePaginator();

    expect(component.productDataSource.paginator).toBe(productPaginatorMock);
    expect(component.setupPagination).toHaveBeenCalledWith(productPaginatorMock, 'products');
  });

  it('should update currentSection when showSection is called', () => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component.showSection(event, 'profile');

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.currentSection).toBe('profile');
  });

  it('should update currentSection to another section when showSection is called', () => {
    const event = new Event('click');
    spyOn(event, 'preventDefault');

    component.showSection(event, 'settings');

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.currentSection).toBe('settings');
  });

});
