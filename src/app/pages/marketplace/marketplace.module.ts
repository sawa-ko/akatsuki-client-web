import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { HomeMarketComponent } from './pages/home/home.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

@NgModule({
  declarations: [MarketplaceComponent, HomeMarketComponent, NewProductComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class MarketplaceModule {}
