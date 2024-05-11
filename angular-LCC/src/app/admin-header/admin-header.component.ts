import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule,RouterModule, SidebarComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  status = false;
  public currentRouteName : any = "";
  constructor(private auth:AuthService, private router: Router){
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
    const contentElement = document.getElementById("content");
    if(contentElement)
    {
      contentElement.classList.toggle("sideBar-Toggle");  
    }   
  }
  logout()
  {
    this.auth.logout();
  }
}
