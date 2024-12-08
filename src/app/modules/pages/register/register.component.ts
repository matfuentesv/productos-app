import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModalComponent} from "../../../shared/components/login-modal/login-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {User} from "../../../shared/models/user";
import {NgClass, NgIf} from "@angular/common";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DataService} from "../../../core/services/data/data.service";
import {RutValidatorDirective} from '../../../shared/directives/ng2-rut/ng2-rut.module';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  registerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  objectUser: User | null | undefined;


  users: User[] =[];


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private dataService: DataService) {}


  ngOnInit(): void {
    this.users = this.authService.loadUsers();
    this.objectUser = this.authService.getUser();
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(3)]],
      lastName: ['', [Validators.required,Validators.minLength(3)]],
      rut: ['', [Validators.required, RutValidatorDirective.validate]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')
      ]],
      promo: [false, [this.requiredCheckbox]]
    });
  }


  get validFirstName(){
    return this.registerForm.get('firstName')?.invalid && this.registerForm.get('firstName')?.touched;
  }


  get validLastName(){
    return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
  }


  get validRut(){
    return this.registerForm.get('rut')?.invalid && this.registerForm.get('rut')?.touched;
  }


  get validEmail(){
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }


  get validPhone(){
    return this.registerForm.get('phone')?.invalid && this.registerForm.get('phone')?.touched;
  }


  get validAddress(){
    return this.registerForm.get('address')?.invalid && this.registerForm.get('address')?.touched;
  }


  get validPassword(){
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }


  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const newUser = {
        rut: this.registerForm.get('rut')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        phone: this.registerForm.get('phone')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value,
        rol: {
          id: 2
        }
      };

      try {

        this.dataService.createUser(newUser).subscribe(rsp=>{
             if(rsp){
                 this.authService.isLoggedIn.next(true);
                 this.authService.userNameSubject.next(rsp?.body.firstName);
                 this.authService.userRoleSubject.next(rsp.body.rol.name ==='Admin'? 'admin' : 'customer');
                 this.authService.currentUser = rsp.body;
                 this.snackBar.open('Usuario creado correctamente!', '', {
                   horizontalPosition: this.horizontalPosition,
                   verticalPosition: this.verticalPosition,
                   duration: 3000,
                   panelClass: ['custom-snackbar']
                 });
                 this.router.navigate(['/home']);
             }
        });

      } catch (error) {
        this.snackBar.open('Error en el registro o login', 'Cerrar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  async loadUsers() {
      await this.dataService.getUsers().toPromise();
  }


  openModal() {
    this.dialog.open(LoginModalComponent, {});
  }


  requiredCheckbox(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  validateCharacters(event: { charCode: number; }): boolean {
    return (
      (event.charCode >= 65 && event.charCode <= 90) || // Letras mayúsculas (A-Z)
      (event.charCode >= 97 && event.charCode <= 122) || // Letras minúsculas (a-z)
      event.charCode === 32 // Espacios
    );
  }

  validateNumbers(event: { charCode: number; }){
    return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 107;
  }
}
