import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { CustomPreloadingStrategy } from '../utils/strategys/CustomPreloadingStrategy/custom-preloading-strategy';
import { AuthGuard } from '../utils/guards/Auth/auth.guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AppErrorComponent } from '../pages/app-error/app-error.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'app-error', component: AppErrorComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true,
    },
  },
  {
    path: 'marketplace',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../pages/marketplace/marketplace.module').then(
        m => m.MarketplaceModule,
      ),
    data: {
      preload: false,
    },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
