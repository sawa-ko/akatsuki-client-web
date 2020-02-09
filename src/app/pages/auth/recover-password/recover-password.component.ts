import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatationService } from '../../../services/translation/translatation.service';
import * as ip from 'public-ip';

@Component({
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetPasswordFormStatusDisabled: boolean = false;

  errorResetPasswordTitle: string;
  errorResetPasswordDescription: string;
  errorResetPassword: boolean = false;

  successResetPasswordTitle: string;
  successResetPasswordDescription: string;
  successResetPassword: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translationService: TranslatationService,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      id: ['', Validators.required],
      token: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeUserPassword() {
    const data = {
      userId: this.resetPasswordForm.controls.id.value,
      tokenPassword: this.resetPasswordForm.controls.token.value,
      newPassword: this.resetPasswordForm.controls.password.value,
    };

    if (this.resetPasswordForm.valid) {
      this.resetPasswordFormStatusDisabled = true;
      this.resetPasswordForm.disable();

      return this.authService.changePassword(data).subscribe({
        next: (response: any) => {
          this.successResetPasswordTitle = this.translationService.getTranslate(
            'Pages.Recover_password.title.access_account',
          );
          this.successResetPasswordDescription = response.message;
          this.successResetPassword = true;

          setTimeout(() => {
            this.router.navigate(['/auth/sign-in']);
          }, 5000);
        },
        error: (response: any) => {
          this.errorResetPasswordTitle = this.translationService.getTranslate(
            'Pages.Recover_password.title.we_have_problems',
          );
          this.errorResetPasswordDescription = response.error.message;
          this.errorResetPassword = true;

          setTimeout(() => {
            this.resetPasswordFormStatusDisabled = false;
            this.resetPasswordForm.enable();
            this.errorResetPasswordTitle = null;
            this.errorResetPasswordDescription = null;
            this.errorResetPassword = false;
          }, 6000);
        },
      });
    } else {
      this.errorResetPasswordTitle = this.translationService.getTranslate(
        'Pages.Recover_password.title.we_have_problems',
      );
      this.errorResetPasswordDescription = this.translationService.getTranslate(
        'Pages.Recover_password.messages.empty_fields',
      );
      this.errorResetPassword = true;

      setTimeout(() => {
        this.errorResetPasswordTitle = null;
        this.errorResetPasswordDescription = null;
        this.errorResetPassword = false;
      }, 6000);
    }
  }

  async requestChangeUserPassword() {
    const data = {
      userId: this.resetPasswordForm.controls.id.value,
      userIp: await ip.v4(),
    };

    if (this.resetPasswordForm.controls.id.value !== '') {
      this.resetPasswordFormStatusDisabled = true;
      this.resetPasswordForm.disable();

      return this.authService.requestPassword(data).subscribe({
        next: (response: any) => {
          this.successResetPasswordTitle = this.translationService.getTranslate(
            'Pages.Recover_password.title.good_news',
          );
          this.successResetPasswordDescription = response.message;
          this.successResetPassword = true;

          setTimeout(() => {
            this.resetPasswordFormStatusDisabled = false;
            this.resetPasswordForm.enable();
            this.successResetPasswordTitle = this.translationService.getTranslate(
              'Pages.Recover_password.title.good_next_step',
            );
            this.successResetPasswordDescription = this.translationService.getTranslate(
              'Pages.Recover_password.messages.good_next_step',
            );
            this.successResetPassword = true;
          }, 6000);
        },
        error: (response: any) => {
          this.errorResetPasswordTitle = this.translationService.getTranslate(
            'Pages.Recover_password.title.we_have_problems',
          );
          this.errorResetPasswordDescription = response.error.message;
          this.errorResetPassword = true;

          setTimeout(() => {
            this.resetPasswordFormStatusDisabled = false;
            this.resetPasswordForm.enable();
            this.errorResetPasswordTitle = null;
            this.errorResetPasswordDescription = null;
            this.errorResetPassword = false;
          }, 6000);
        },
      });
    } else {
      this.errorResetPasswordTitle = this.translationService.getTranslate(
        'Pages.Recover_password.title.we_have_problems',
      );
      this.errorResetPasswordDescription = this.errorResetPasswordTitle = this.translationService.getTranslate(
        'Pages.Recover_password.messages.empty_user_id_field',
      );
      this.errorResetPassword = true;

      setTimeout(() => {
        this.errorResetPasswordTitle = null;
        this.errorResetPasswordDescription = null;
        this.errorResetPassword = false;
      }, 6000);
    }
  }
}
