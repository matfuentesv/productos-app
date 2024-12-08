import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Ng2Rut2, RutValidatorDirective} from "../../directives/ng2-rut/ng2-rut.module";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {DataService} from "../../../core/services/data/data.service";
import {User} from "../../models/user";
import {AuthService} from "../../../core/services/auth/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    Ng2Rut2
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent  implements OnInit{

  userForm!: FormGroup;
  users : User[]=[];
  objectUser : User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loggedUser: User | null | undefined;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              public dialogRef: MatDialogRef<EditUserModalComponent>) {
    this.users = data.user;
    this.objectUser = data.user;
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getUser();
    this.userForm = this.fb.group({
      firstName: [this.objectUser.firstName, [Validators.required,Validators.minLength(3)]],
      lastName: [this.objectUser.lastName, [Validators.required,Validators.minLength(3)]],
      rut: [this.objectUser.rut, [Validators.required, RutValidatorDirective.validate]],
      email: [this.objectUser.email, [Validators.required, Validators.email]],
      phone: [this.objectUser.phone, [Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
      address: [this.objectUser.address, Validators.required],
      password: [this.objectUser.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')
      ]],
      rol: [this.objectUser.rol.id, Validators.required]
    });
  }


  close(value: any) {
    this.dialogRef.close(value);
  }


  onSubmit() {
    if (this.userForm.valid) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar!'
      }).then((result) => {
        const updateUser = {
          id: this.objectUser.id,
          firstName: this.userForm.get('firstName')?.value,
          lastName: this.userForm.get('lastName')?.value,
          rut: this.userForm.get('rut')?.value,
          email: this.userForm.get('email')?.value,
          phone: this.userForm.get('phone')?.value,
          address: this.userForm.get('address')?.value,
          password: this.userForm.get('password')?.value,
          rol: {
            id: Number(this.userForm.get('rol')?.value)
          }
        };

        this.dataService.updateUser(updateUser).subscribe(rsp=>{
          if(rsp){
            this.snackBar.open('Usuario actualizado correctamente!', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['custom-snackbar']
            });
            this.close(1);
          }
        });
      });
    }
  }

  validateNumbers(event: { charCode: number; }){
    return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 107;
  }

  handleRegistrationError() {
    this.snackBar.open(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  }

  handleLoginError() {
    this.snackBar.open(
      'Error en el registro o login',
      'Cerrar',
      { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom' }
    );
  }

}
