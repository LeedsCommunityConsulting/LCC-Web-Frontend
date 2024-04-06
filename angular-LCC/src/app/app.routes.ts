import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { VaccanciesComponent } from './vaccancies/vaccancies.component';
import { FaqsComponent } from './faqs/faqs.component';
import { EventsComponent } from './events/events.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent , pathMatch: 'full' },
  { path: 'vacancies', component: VaccanciesComponent , pathMatch: 'full' },
  { path: 'faqs', component: FaqsComponent , pathMatch: 'full' },
  { path: 'events', component: EventsComponent , pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent , pathMatch: 'full' },
  { path: 'admin/dashboard', component: AdminDashboardComponent , pathMatch: 'full' },
];
