import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  public searchParamsVal : any ;
  public params = { q: "", published : "", order : "" };

  
  constructor(private auth: AuthService,
      public api : ApiService,
      private route: ActivatedRoute,
      private router: Router){
      this.params.q = this.route.snapshot.queryParamMap.get("q")!;
      this.params.published = this.route.snapshot.queryParamMap.get("published")!;
      this.params.order = this.route.snapshot.queryParamMap.get("order")!;
      this.getAllVacancy();
  }


  onSearch(event: any)
  {
    this.searchParamsVal = event.target.value
    this.params.q =  this.searchParamsVal;
    this.router.navigate([], { queryParams: {q: this.searchParamsVal , published: this.params.published, order: this.params.order} } );
    this.getAllVacancy();
    // console.log(this.searchParamsVal );
   // console.log($('#mySearch').value());
  }

  onChange(event: any) {
    const selectedValue = event.target.value;
    this.params.order =  selectedValue;
    this.router.navigate([], { queryParams: {q: this.params.q  , published: this.params.published, order: selectedValue} } );
    this.getAllVacancy();
  }

  getAllVacancy(){
    this.api.dNGet('getAllCaseStudies', this.params).subscribe((res : any) => {
          // console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }
  

  ngOnInit(): void {
  }
}
