import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vaccancies',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule],
  templateUrl: './vaccancies.component.html',
  styleUrl: './vaccancies.component.scss'
})
export class VaccanciesComponent implements OnInit {
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
    this.api.dGet('getAllVacancy').subscribe((res : any) => {
          console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }
  

  ngOnInit(): void {
  }

}
