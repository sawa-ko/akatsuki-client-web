import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VerificationAccountComponent } from './verification-account/verification-account.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    VerificationAccountComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AuthRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EncryptService],
})
export class AuthModule {}
