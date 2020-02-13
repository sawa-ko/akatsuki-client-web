import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public getBestSellers() {
    return this.httpClient.get(`${environment.api}/user/best/sellers`).pipe(
      map((res: Response) => {
        return res || {};
      }),
    );
  }
}
