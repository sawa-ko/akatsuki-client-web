import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signUpFormStatusDisabled: boolean = false;

  errorSignUpTitle: string;
  errorSignUpDescription: string;
  errorSignUp: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly deviceService: DeviceDetectorService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.signUpForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      specialty: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password_confirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      rememberme: ['', Validators.required, ,],
    });
  }

  ngOnInit() {}

  public signUpUser() {
    const data = {
      name: this.signUpForm.controls.name.value,
      username: this.signUpForm.controls.username.value,
      specialty: this.signUpForm.controls.specialty.value,
      device: this.deviceService.getDeviceInfo().userAgent,
      email: {
        key: this.signUpForm.controls.email.value,
      },
      password: {
        key: this.signUpForm.controls.password.value,
      },
    };

    if (this.signUpForm.valid) {
      this.authService.signUp(data).subscribe({
        next: () => {},
        error: (response: any) => {
          this.errorSignUp = true;
          this.signUpFormStatusDisabled = true;
          this.errorSignUpTitle = 'Tenemos problemas';
          this.errorSignUpDescription = response.error.message;

          setTimeout(() => {
            this.signUpFormStatusDisabled = false;
            this.errorSignUp = false;
            this.errorSignUpTitle = '';
            this.errorSignUpDescription = '';
          }, 6000);
        },
      });
    } else {
      this.signUpForm.disable();
      this.signUpFormStatusDisabled = true;
      this.errorSignUp = true;
      this.errorSignUpTitle = 'Tenemos problemas';
      this.errorSignUpDescription =
        'Por favor completa los campos requeridos para procesar el registro.';

      setTimeout(() => {
        this.signUpForm.enable();
        this.signUpFormStatusDisabled = false;
        this.errorSignUp = false;
        this.errorSignUpTitle = '';
        this.errorSignUpDescription = '';
      }, 6000);
    }
  }
}
