import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountComponent, // Importar el componente standalone aquí
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it('should mark the form as valid if all fields are correctly filled', () => {
    // Llena el formulario con datos válidos
    component.accountForm.setValue({
      firstName: 'Jane', // Nombre válido
      lastName: 'Doe', // Apellido válido
      rut: '19.033.397-3|', // RUT válido
      email: 'jane.doe@example.com', // Email válido
      phone: '987654321', // Número de teléfono válido
      address: '123 Example Street', // Dirección válida
      password: 'StrongPass1', // Contraseña válida (1 mayúscula, 1 número, 8+ caracteres)
    });

    // Verifica que el formulario sea válido
    expect(component.accountForm.valid).toBeTrue();
  });

});
