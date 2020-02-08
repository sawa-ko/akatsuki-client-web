import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EncryptService } from '../Encrypt/encrypt.service';
import { SignInInterface } from '../../utils/interfaces/auth/signin.interface';
import { SignUpInterface } from '../../utils/interfaces/auth/signup.interface';
import { ActivactionInterface } from '../../utils/interfaces/auth/activation.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly encryptService: EncryptService,
  ) {}

  public signUp(signUpData: SignUpInterface) {
    return this.httpClient.put(`${environment.api}/auth/signup`, signUpData);
  }

  public signIn(signInData: SignInInterface) {
    return this.httpClient.post(`${environment.api}/auth/signin`, signInData);
  }

  public activationAccount(activactionData: ActivactionInterface) {
    return this.httpClient.patch(
      `${environment.api}/auth/account/verify/email`,
      activactionData,
    );
  }

  public getToken() {
    if (localStorage.getItem('token') === null) {
      return this.encryptService.get('123456$#@$^@1ERF', 'Waiting...');
    } else {
      return this.encryptService.get(
        '123456$#@$^@1ERF',
        localStorage.getItem('token'),
      );
    }
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }
}
