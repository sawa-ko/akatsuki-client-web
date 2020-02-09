import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as ip from 'public-ip';
import { AuthService } from '../../../services/auth/auth.service';
import { SignInInterface } from '../../../utils/interfaces/auth/signin.interface';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation/translatation.service';

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
    private readonly router: Router,
    private readonly translationService: TranslationService,
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    if (this.signInForm.valid) {
      this.errorSignIn = true;
      this.errorSignInTitle = this.translationService.getTranslate(
        'Pages.SignIn.title.we_have_problems',
      );
      this.errorSignInDescription = this.translationService.getTranslate(
        'Pages.SignIn.messages.empty_fields',
      );

      setTimeout(() => {
        this.signInForm.enable();
        this.signInFormStatusDisabled = false;
        this.errorSignIn = false;
        this.errorSignInTitle = null;
        this.errorSignInDescription = null;
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
        localStorage.setItem('id', response.user_id);
        localStorage.setItem('session', response.session_id);
        localStorage.setItem('token', response.token);

        setTimeout(() => {
          if (
            localStorage.getItem('id') !== null &&
            localStorage.getItem('session') !== null &&
            localStorage.getItem('token') !== null
          ) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorSignIn = true;
            this.errorSignInTitle = this.translationService.getTranslate(
              'Pages.SignIn.title.we_have_problems',
            );
            this.errorSignInDescription = this.translationService.getTranslate(
              'Pages.SignIn.messages.error_processing_data',
            );

            return this.authService
              .logOut({
                userId: response.user_id,
                sesionId: response.session_id,
              })
              .subscribe({
                next: () => {
                  this.signInForm.enable();
                  this.signInFormStatusDisabled = false;
                  this.errorSignIn = true;
                  this.errorSignInTitle = null;
                  this.errorSignInDescription = null;
                },
                error: () => {
                  this.errorSignIn = true;
                  this.errorSignInTitle = this.translationService.getTranslate(
                    'Pages.SignIn.title.we_have_problems',
                  );
                  this.errorSignInDescription = this.translationService.getTranslate(
                    'Pages.SignIn.messages.error_sesion_log_out',
                  );
                },
              });
          }
        }, 2000);
      },
      error: (response: any) => {
        this.signInForm.enable();
        this.signInFormStatusDisabled = false;
        this.errorSignIn = true;
        this.errorSignInTitle = this.translationService.getTranslate(
          'Pages.SignIn.title.we_have_problems',
        );
        this.errorSignInDescription = response.error.message;
      },
    });
  }
}
