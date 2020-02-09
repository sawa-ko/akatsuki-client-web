import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslatationService {
  constructor(private readonly translateService: TranslateService) {}

  public getTranslate(key: string) {
    let translate: string;
    this.translateService.stream(key).subscribe((res: string) => {
      translate = res;
    });
    return translate;
  }
}
