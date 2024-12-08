import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RecoverPasswordComponent} from './recover-password.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverPasswordComponent, ReactiveFormsModule, RouterTestingModule, MatSnackBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });


  it('should open a snackbar if form is valid', () => {
    spyOn(snackBar, 'open');
    component.recover.get('email')?.setValue('test@example.com');
    component.onSubmit();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Contraseña enviada con exito!',
      '',
      {
        horizontalPosition: component.horizontalPosition,
        verticalPosition: component.verticalPosition,
        duration: 3000,
        panelClass: ['custom-snackbar'],
      }
    );
  });

  it('should mark all controls as touched if form is invalid', () => {
    spyOn(component.recover.controls['email'], 'markAsTouched');
    component.recover.get('email')?.setValue('');
    component.onSubmit();
    expect(component.recover.controls['email'].markAsTouched).toHaveBeenCalled();
  });
});
