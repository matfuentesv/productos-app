import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from "@angular/material/icon";
import {DataService} from "../../../core/services/data/data.service";
import {User} from "../../models/user";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";
import {Ng2Rut2, RutValidatorDirective} from "../../directives/ng2-rut/ng2-rut.module";


@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatGridList,
    MatGridTile,
    MatDatepickerToggle,
    MatDatepicker,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerInput,
    MatIcon,
    NgIf,
    Ng2Rut2
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements OnInit {


  userForm!: FormGroup;
  user : User[]=[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<UserModalComponent>) {
    this.user = data.users;
  }


  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rut: ['', [Validators.required, RutValidatorDirective.validate]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,18}$'),
        Validators.minLength(6),
        Validators.maxLength(18)
      ]],
      rol: [null, Validators.required],
    });
  }



  close(value: any) {
    this.dialogRef.close(value);
  }



  onSubmit() {
    if (this.userForm.valid) {

      const newUser: User = {
        id: this.user.length > 0 ? Math.max(...this.user.map((p: any) => p.id)) + 1 : 1,
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        rut: this.userForm.get('rut')?.value,
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        address: this.userForm.get('address')?.value,
        password: this.userForm.get('password')?.value,
        rol: this.userForm.get('roles')?.value
      };
      this.user.push(newUser);
      this.dataService.addUser(this.user).subscribe(rsp => {
        this.snackBar.open('Usuario creado correctamente!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
        this.close(1);
      })
    }
  }

  validateNumbers(event: KeyboardEvent): boolean {
    const charCode = event.charCode || event.keyCode;
    // Permitir números (0-9) y el carácter "+"
    return (charCode >= 48 && charCode <= 57) || charCode === 43;
  }




}
