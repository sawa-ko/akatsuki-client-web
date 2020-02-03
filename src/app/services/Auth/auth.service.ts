import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  public getToken() {
    return 
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }
}