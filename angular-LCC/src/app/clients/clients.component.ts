import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule, RouterModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  public jobCards: any;
  public logo: any;
  public jobLogos: any;
  public jobDetailTitle: any;
  public jobBg: any;
  public jobCard: any;
  public wrapper: any;
  public data : any = [];

  
  constructor(private auth: AuthService,
      public api : ApiService){
  this.getAllVacancy();
  }

  getAllVacancy(){
    this.api.dGet('getAllCaseStudies').subscribe((res : any) => {
          console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }
  

  ngOnInit(): void {
  }
}
