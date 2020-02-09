import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

import { WelcomeComponent } from '../pages/welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/dashboard/dashboard.module').then(m =>
        m.DashboardModule.forRoot(),
      ),
    data: {
      preload: false,
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth/auth.module').then(m => m.AuthModule.forRoot()),
    data: {
      preload: false,
    },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
