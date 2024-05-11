import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { VaccanciesComponent } from './vaccancies/vaccancies.component';
import { FaqsComponent } from './faqs/faqs.component';
import { EventsComponent } from './events/events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HaveAuthGuard, canActivateGuard } from './guards/auth-guard';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminVaccancyComponent } from './admin-vaccancy/admin-vaccancy.component';
import { AdminCaseStudiesComponent } from './admin-case-studies/admin-case-studies.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ClientsComponent } from './clients/clients.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ClientInfoComponent } from './client-info/client-info.component';

export const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent , pathMatch: 'full' },
  { path: 'vacancies', component: VaccanciesComponent , pathMatch: 'full' },
  { path: 'faqs', component: FaqsComponent , pathMatch: 'full' },
  { path: 'events', component: EventsComponent , pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent , pathMatch: 'full' },
  { path: 'client-info/:id', component: ClientInfoComponent , pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent , pathMatch: 'full' },
  { path: 'admin/login', canActivate: [canActivateGuard], component: AdminLoginComponent , pathMatch: 'full' },
  { path: 'admin/forgot-pwd', canActivate: [canActivateGuard], component: ForgotPasswordComponent , pathMatch: 'full' },
  { path: 'admin/forgot-pwd/auth/resetPassword/:id/:slug', canActivate: [canActivateGuard], component: ResetPasswordComponent , pathMatch: 'full' },
  { path: 'admin/dashboard', canActivate: [HaveAuthGuard], component: AdminDashboardComponent , pathMatch: 'full' },
  { path: 'admin/events', canActivate: [HaveAuthGuard], component: AdminEventsComponent , pathMatch: 'full' },
  { path: 'admin/vaccancy', canActivate: [HaveAuthGuard], component: AdminVaccancyComponent , pathMatch: 'full' },
  { path: 'admin/caseStudies', canActivate: [HaveAuthGuard], component: AdminCaseStudiesComponent , pathMatch: 'full' },
  { path: 'admin/users', canActivate: [HaveAuthGuard], component: AdminUsersComponent , pathMatch: 'full' },
];
