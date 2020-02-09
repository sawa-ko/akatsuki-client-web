import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders<DashboardModule> {
    return {
      ngModule: DashboardModule,
    };
  }
}
