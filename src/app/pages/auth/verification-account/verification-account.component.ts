import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.activationAccountForm = this.formBuilder.group({
      id: ['', Validators.required],
      token: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  activateUserAccount() {}
}
