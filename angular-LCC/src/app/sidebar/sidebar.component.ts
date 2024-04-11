import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  status = false;
  public currentRouteName : any = "";
  constructor(private auth:AuthService, private router: Router,){
    if (this.router.url.includes('/events')) {
      this.currentRouteName = "events";
    }
    if (this.router.url.includes('/dashboard')) {
      this.currentRouteName = "dashboard";
    }
    if (this.router.url.includes('/vaccancy')) {
      this.currentRouteName = "vaccancy";
    }
    if (this.router.url.includes('/caseStudies')) {
      this.currentRouteName = "caseStudies";
    }
    if (this.router.url.includes('/users')) {
      this.currentRouteName = "users";
    }
  }
  addToggle()
  {
    this.status = !this.status;       
  }
  logout()
  {
    this.auth.logout();
  }
}
