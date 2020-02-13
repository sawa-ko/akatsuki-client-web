import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { HomeMarketComponent } from './pages/home/home.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [
      {
        path: 'home',
        component: HomeMarketComponent,
      },
      {
        path: 'new',
        component: NewProductComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
