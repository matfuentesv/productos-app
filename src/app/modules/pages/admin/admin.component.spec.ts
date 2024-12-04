import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminComponent} from './admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminComponent, // Para componentes standalone
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule, // Módulo necesario para HttpClient
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to the "products" section when showSection is called with "products"', () => {
    const spyShowSection = spyOn(component, 'showSection').and.callThrough();
    component.showSection(new MouseEvent('click'), 'products');
    expect(spyShowSection).toHaveBeenCalled();
    expect(component.currentSection).toBe('products');
  });

  it('should switch to the "users" section when showSection is called with "users"', () => {
    const spyShowSection = spyOn(component, 'showSection').and.callThrough();
    component.showSection(new MouseEvent('click'), 'users');
    expect(spyShowSection).toHaveBeenCalled();
    expect(component.currentSection).toBe('users');
  });

  it('should call editElement with a valid user object', () => {
    const mockUser = {
      id: 1,
      rut: '12345678-9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      address: '123 Main St',
      password: 'securepassword',
      roles: ['Admin'],
    };
    const spyEditElement = spyOn(component, 'editElement').and.callThrough();
    component.editElement(mockUser);
    expect(spyEditElement).toHaveBeenCalledWith(mockUser);
  });

  it('should call deleteElement with a valid user object', () => {
    const mockUser = {
      id: 2,
      rut: '98765432-1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987654321',
      address: '456 Elm St',
      password: 'anotherpassword',
      roles: ['User'],
    };
    const spyDeleteElement = spyOn(component, 'deleteElement').and.callThrough();
    component.deleteElement(mockUser);
    expect(spyDeleteElement).toHaveBeenCalledWith(mockUser);
  });

  it('should open modal when "Agregar" button is clicked', () => {
    const spyOpenModal = spyOn(component, 'openModal').and.callThrough();
    component.openModal();
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should display the correct columns for the products table', () => {
    expect(component.productDisplayedColumns).toEqual(['name', 'price', 'discount', 'description', 'category', 'quantity']);
  });

  it('should display the correct columns for the users table', () => {
    expect(component.displayedColumns).toEqual(['firstName', 'lastName', 'rut', 'email', 'phone', 'address', 'roles', 'edit', 'delete']);
  });

  it('should show a loading spinner when loading is set to true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.nativeElement.querySelector('.spinner-container');
    expect(spinnerElement).toBeTruthy();
  });
});
