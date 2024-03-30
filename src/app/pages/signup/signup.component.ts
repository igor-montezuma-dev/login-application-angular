import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent {
  signupForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginService,private toastr: ToastrService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    const { email, password } = this.signupForm.value;
    this.loginService.login(email, password).subscribe({
      next: () =>  {
        this.toastr.success('Login efetuado com sucesso!')
      },
      error: (error) => {
        this.toastr.error('Ocorreu um erro! tente novamente mais tarde.');
      },
    });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
