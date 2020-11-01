import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {LandingPageComponent} from '../app/landing-page/landing-page.component';
import {PerformanceCheckPageComponent} from '../app/performance-check-page/performance-check-page.component';
import {GenerateDataComponent} from '../app/generate-data/generate-data.component';

const routes: Routes = [
  {path: 'home', component: LandingPageComponent},
  {path: 'generate', component: GenerateDataComponent},
  {path: 'performanceCheck', component: PerformanceCheckPageComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
