import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslationService } from 'src/app/services/translation/translatation.service';
import { environment } from 'src/environments/environment';
import * as ip from 'public-ip';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly deviceService: DeviceDetectorService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async res => {
      this.httpClient
        .post(`${environment.api}/auth/account/verify/session`, {
          userId: localStorage.getItem('id'),
          sessioId: localStorage.getItem('session'),
          sessionIp: await ip.v4(),
          sessionDevice: this.deviceService.getDeviceInfo().os_version,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['dashboard']);
            res(true);
          },
          error: () => {
            this.router.navigate(['auth/sign-in']);
            res(false);
          },
        });
    });
  }
}
