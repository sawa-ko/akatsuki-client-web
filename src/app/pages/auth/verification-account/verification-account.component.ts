import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './verification-account.component.html',
  styleUrls: ['./verification-account.component.scss'],
})
export class VerificationAccountComponent implements OnInit {
  activationAccountForm: FormGroup;
  activationAccountFormStatusDisabled: boolean = false;

  errorActivationAccountTitle: string;
  errorActivationAccountDescription: string;
  errorActivationAccount: boolean = false;

  successActivationAccountTitle: string;
  successActivationAccountDescription: string;
  successActivationAccount: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.activationAccountForm = this.formBuilder.group({
      id: ['', Validators.required],
      token: ['', Validators.required],
    });
  }

  ngOnInit() {}

  activateUserAccount() {
    const data = {
      userId: this.activationAccountForm.controls.id.value,
      token: this.activationAccountForm.controls.token.value,
    };

    if (this.activationAccountForm.valid) {
      this.authService.activationAccount(data).subscribe({
        next: (response: any) => {
          this.activationAccountFormStatusDisabled = true;
          this.activationAccountForm.disable();
          this.successActivationAccount = true;
          this.successActivationAccountTitle = '¡Es hora de iniciar sesión!';
          this.successActivationAccountDescription = response.message;

          setTimeout(() => {
            this.router.navigate(['/auth/sign-in']);
          }, 5000);
        },
        error: (response: any) => {
          this.activationAccountFormStatusDisabled = true;
          this.activationAccountForm.disable();
          this.errorActivationAccount = true;
          this.errorActivationAccountTitle = 'Tenemos problemas';
          this.errorActivationAccountDescription = response.error.message;

          setTimeout(() => {
            this.activationAccountForm.controls.token.setValue('');
            this.activationAccountFormStatusDisabled = false;
            this.activationAccountForm.enable();
            this.errorActivationAccount = false;
          }, 6000);
        },
      });
    } else {
      this.activationAccountFormStatusDisabled = true;
      this.activationAccountForm.disable();
      this.errorActivationAccount = true;
      this.errorActivationAccountTitle = 'Tenemos problemas';
      this.errorActivationAccountDescription =
        'Por favor completa los campos requeridos para procesar la activacion de la cuenta.';

      setTimeout(() => {
        this.activationAccountForm.controls.token.setValue('');
        this.activationAccountFormStatusDisabled = false;
        this.activationAccountForm.enable();
        this.errorActivationAccount = false;
        this.errorActivationAccountTitle = '';
        this.errorActivationAccountDescription = '';
      }, 6000);
    }
  }
}
