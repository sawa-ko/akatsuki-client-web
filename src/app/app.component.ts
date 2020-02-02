import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private langDefault: string;
  private langs: string[] = [];
  private _opened: boolean = false;

  constructor(private readonly translateService: TranslateService) {
    if (localStorage.getItem('lang') !== null) {
      this.translateService.use(localStorage.getItem('lang'));
      this.langDefault = localStorage.getItem('lang');
    } else {
      this.translateService.use('en_US');
      this.langDefault = 'en_US';
      localStorage.setItem('lang', 'en_US');
    }

    this.translateService.setDefaultLang('en_US');
    this.translateService.addLangs(['es_MX', 'en_US']);
    this.langs = this.translateService.getLangs();
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  public changeLang(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('lang', lang);
  }
}
