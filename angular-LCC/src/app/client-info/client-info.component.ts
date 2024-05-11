import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule, RouterModule],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.scss'
})
export class ClientInfoComponent {

  public jobCards: any;
  public logo: any;
  public jobLogos: any;
  public jobDetailTitle: any;
  public jobBg: any;
  public jobCard: any;
  public wrapper: any;
  public data : any = [];
  public id : any = "";

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    public api : ApiService){
    this.getCasestudy();
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id)
  }

getCasestudy(){
  this.id = this.route.snapshot.paramMap.get("id");
  this.api.dGetCaseStudies('getUniqueCaseStudy', this.id).subscribe((res : any) => {
        console.log(res);
      //  this.pS = false;
       this.data = res;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}


ngOnInit(): void {
}

}
