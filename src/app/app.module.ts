import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './config/app-routing.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpInterceptorG } from './utils/interceptors/http/http-interceptor-g';
import { AuthModule } from './pages/auth/auth.module';
import { SidebarModule } from 'ng-sidebar';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    DeviceDetectorModule.forRoot(),
    SidebarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/locales/', '.json'),
        deps: [HttpClient],
      },
      isolate: true,
    }),
    CommonModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorG,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
