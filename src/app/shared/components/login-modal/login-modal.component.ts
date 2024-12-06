import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {


  loginForm: FormGroup;

  isValidUser = true;

  constructor(public dialog: MatDialog,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  close() {
    this.dialog.closeAll();
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        this.dialog.closeAll();
        this.router.navigate(['/home']);
      } else {
        this.isValidUser = false;
      }
    }
  }


  recoverPassword() {
    this.close();
    this.router.navigate(["/recover-password"]);
  }


  register() {
    this.close();
    this.router.navigate(["/register"]);
  }
}
