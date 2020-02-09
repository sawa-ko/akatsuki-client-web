import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';

@Injectable()
export class HttpInterceptorG implements HttpInterceptor {
  token = '';
  lang = 'en_US';

  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.token = this.authService.getToken();
    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    }

    if (req.url.search('/upload/') === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json; charset=utf-8',
          'Accept-Language': this.lang,
        },
      });
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': this.lang,
        },
      });
    }
    return next.handle(req);
  }
}
