import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';

@NgModule({
  declarations: [MarketplaceComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class MarketplaceModule {}
