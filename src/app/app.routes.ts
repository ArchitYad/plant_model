import { Routes } from '@angular/router';
import {  RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetectComponent } from './customer/detect/detect.component';
import { SupportComponent } from './customer/support/support.component';
import { PlanComponent } from './customer/plan/plan.component';
import { ManagedataComponent } from './admin/managedata/managedata.component';
import { CheckCustomerComponent } from './admin/checkcustomer/checkcustomer.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'customer', component: CustomerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'home', component: HomeComponent },
  {path: 'detect', component: DetectComponent},
  {path: 'support', component: SupportComponent},
  {path: 'plan', component: PlanComponent},
  {path: 'managedata', component: ManagedataComponent},
  {path: 'checkcustomer', component: CheckCustomerComponent},
  { path: 'layout', component: LayoutComponent},
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'customer', 
    component: CustomerComponent, 
    canActivate: [AuthGuard],   
    children: [
      { path: 'layout', component: LayoutComponent },
      { path: 'detect', component: DetectComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'support', component: SupportComponent },
    ]
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'admin' }, 
    children: [
      { path: 'layout', component: LayoutComponent},
      { path: 'managedata', component: ManagedataComponent },
      { path: 'checkcustomer', component: CheckCustomerComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})

export class AppRoutingModule { }