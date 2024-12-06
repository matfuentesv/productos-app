import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminComponent} from './admin.component';

import {of, Subject} from 'rxjs';
import {UserModalComponent} from '../../../shared/components/user-modal/user-modal.component';
import {EditUserModalComponent} from '../../../shared/components/edit-user-modal/edit-user-modal.component';

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

    // Inicializar el formulario
    component.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl('', [Validators.required]),
    });

    fixture.detectChanges();
  });

  it('should open the UserModalComponent and reload data when rsp is 1', () => {
    const dialogRefSpy = {
      afterClosed: () => of(1) // Simular que el diálogo devuelve 1
    };
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    spyOn(component.ngZone, 'run').and.callFake((fn) => fn());
    spyOn(component, 'loadData');

    component.openModal();

    expect(dialogSpy.open).toHaveBeenCalledWith(UserModalComponent, { data: { users: component.user }, disableClose: true });
    expect(component.ngZone.run).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should open the EditUserModalComponent and reload data when result is 1', () => {
    const userMock = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      rut: '12345678-9',
      email: 'test@example.com',
      phone: '123456789',
      address: 'Test Address',
      password: 'password',
      roles: ['admin']
    };

    const dialogRefSpy = {
      afterClosed: () => of(1) // Simular que el diálogo devuelve 1
    };
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    spyOn(component.ngZone, 'run').and.callFake((fn) => fn());
    spyOn(component, 'loadData');

    component.editElement(userMock);

    expect(dialogSpy.open).toHaveBeenCalledWith(EditUserModalComponent, { data: { users: component.user, user: userMock }, disableClose: true });
    expect(component.ngZone.run).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
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
