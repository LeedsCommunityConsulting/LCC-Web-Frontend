import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../services/auth.service';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,SidebarComponent,AdminHeaderComponent, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  public events : any = [];
  public caseStudies : any = [];
  public UsersData : any =[];
  public vacancyData : any = [];
status = true;
constructor(private auth: AuthService,
  public api : ApiService){
  this.getAllEvents();
  this.getAllCaseStudies();
  this.getAllUser();
  this.getAllVacancy();
}

getAllEvents(){
  this.api.dGet('getAllEvents').subscribe((res : any) => {
        // console.log(res);
      //  this.pS = false;
       this.events = res.length;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}

getAllCaseStudies(){
  this.api.dGet('getAllCaseStudies').subscribe((res : any) => {
        // console.log(res);
      //  this.pS = false;
       this.caseStudies = res.length;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}

getAllUser(){
  this.api.dGet('getAllUser').subscribe((res : any) => {
        // console.log(res);
      //  this.pS = false;
       this.UsersData = res.length;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}

getAllVacancy(){
  this.api.dGet('getAllVacancy').subscribe((res : any) => {
        // console.log(res);
      //  this.pS = false;
       this.vacancyData = res.length;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}

addToggle()
{
  this.status = !this.status;       
}


}
