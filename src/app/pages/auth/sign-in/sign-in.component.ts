import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as ip from 'public-ip';
import { AuthService } from '../../../services/Auth/auth.service';
import { SignInInterface } from '../../../utils/interfaces/auth/signin.interface';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signInFormStatusDisabled: boolean = false;

  errorSignInTitle: string;
  errorSignInDescription: string;
  errorSignIn: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly deviceService: DeviceDetectorService,
    private readonly authService: AuthService,
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberme: false,
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem('email') &&
      localStorage.getItem('password') !== null
    ) {
      this.signInForm.controls.email.setValue(localStorage.getItem('email'));
      this.signInForm.controls.password.setValue(
        localStorage.getItem('password'),
      );
      this.signInForm.controls.rememberme.setValue(true);
    }
  }

  async signInUser() {
    this.signInFormStatusDisabled = true;
    this.signInForm.disable();
    if (
      this.signInForm.controls.email.value === '' &&
      this.signInForm.controls.password.value === ''
    ) {
      this.errorSignIn = true;
      this.errorSignInTitle = 'Datos incorrectos';
      this.errorSignInDescription =
        'Por favor completa los campos requeridos para continuar.';

      setTimeout(() => {
        this.signInForm.enable();
        this.signInFormStatusDisabled = false;
        this.errorSignIn = false;
        this.errorSignInTitle = '';
        this.errorSignInDescription = '';
      }, 5000);

      return;
    }

    const data: SignInInterface = {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
      device: this.deviceService.getDeviceInfo().userAgent,
      ip: await ip.v4(),
    };

    return this.authService.signIn(data).subscribe({
      next: (response: any) => {
        this.signInForm.disable();
        this.signInFormStatusDisabled = true;
        console.log('Eso fue correcto.');
      },
      error: (response: any) => {
        this.signInForm.enable();
        this.signInFormStatusDisabled = false;
        this.errorSignIn = true;
        this.errorSignInTitle = 'Tenemos problemas';
        this.errorSignInDescription = response.error.message;
      },
    });
  }
}
