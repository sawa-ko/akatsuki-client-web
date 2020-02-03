import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { SignInComponent } from '../pages/Auth/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/Auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
