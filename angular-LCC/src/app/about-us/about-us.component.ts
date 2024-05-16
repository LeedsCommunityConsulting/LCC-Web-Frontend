import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {

  public currentWindowWidth: any;
  public teams : any = [];
  public data : any = [];

  constructor(private auth: AuthService,
    public api : ApiService){
this.getAllTeamMembers();
}

  onResize(event : any) {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    // console.log(this.currentWindowWidth);
  }


  getAllTeamMembers(){
    // this.api.dGet('getUserByRole').subscribe((res : any) => {
    //       console.log(res);
    //     //  this.pS = false;
    //      this.teams = res;
    //     //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    //   }, error => { console.log(error); });
  }

}
