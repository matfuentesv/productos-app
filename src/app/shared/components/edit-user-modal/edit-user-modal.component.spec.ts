import {MatSnackBar} from '@angular/material/snack-bar';
import {TestBed} from '@angular/core/testing';
import {EditUserModalComponent} from './edit-user-modal.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditUserModalComponent>>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [EditUserModalComponent, HttpClientModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Provisión para MAT_DIALOG_DATA
      ],
    });

    component = TestBed.createComponent(EditUserModalComponent).componentInstance;
  });

  it('should call MatSnackBar.open with correct arguments on registration error', () => {
    component.handleRegistrationError();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  });

  it('should call MatSnackBar.open with correct arguments on login error', () => {
    component.handleLoginError();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  });

  it('should validateNumbers allow only digits and "+" character', () => {
    const validEventDigit = { charCode: 50 }; // Character "2"
    const validEventPlus = { charCode: 107 }; // Character "+"
    const invalidEventChar = { charCode: 65 }; // Character "A"
    const invalidEventSymbol = { charCode: 36 }; // Symbol "$"

    expect(component.validateNumbers(validEventDigit)).toBeTrue(); // Valid digit
    expect(component.validateNumbers(validEventPlus)).toBeTrue(); // Valid "+"
    expect(component.validateNumbers(invalidEventChar)).toBeFalse(); // Invalid char
    expect(component.validateNumbers(invalidEventSymbol)).toBeFalse(); // Invalid symbol
  });

});
