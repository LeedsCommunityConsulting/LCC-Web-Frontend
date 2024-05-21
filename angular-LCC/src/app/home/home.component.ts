import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxSplideModule } from 'ngx-splide';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SlickCarouselModule,CommonModule,HeaderComponent,FooterComponent,NgxSplideModule, RouterModule
  ],
})
export class HomeComponent {
  homeSlider = {
    "slidesToShow": 1, "slidesToScroll": 1, "dots": false, "autoplay": false, "autoplaySpeed": 2000,"speed":1000, "infinite": true ,"arrows": false
  };

  public jobCards: any;
  public logo: any;
  public jobLogos: any;
  public jobDetailTitle: any;
  public jobBg: any;
  public jobCard: any;
  public wrapper: any;
  public data : any = [];
  constructor(private auth: AuthService,
    public api : ApiService) { 
      this.getAllCasestudies();
    }

    getAllCasestudies(){
      this.api.dGet('getAllCaseStudies').subscribe((res : any) => {
            
           const result = res.slice(0, 3);
           this.data = result;
          //  console.log(this.data);
        }, error => { console.log(error); });
    }

  ngOnInit(): void {
    this.homeSlider = {
      "slidesToShow": 1, "slidesToScroll": 1, "dots": false, "autoplay": true, "autoplaySpeed": 4000,"speed":1500, "infinite": true ,"arrows": false
    };
  }

  slides = [
    {src: "/assets/img/leeds-flats.jpg", text: "Check out our previous success stories", subtext: "All available on our clients page.", linktext: "Clients", linkroute: "http://www.leedscommunityconsulting.co.uk/clients?q=&published=1&order=asc"},
    {src: "/assets/img/newImage1.jpg", text: "Start building your future in consultancy", subtext: "Visit our vacancies page to learn more.", linktext: "Vacancies", linkroute: "http://www.leedscommunityconsulting.co.uk/vacancies?q=&published=1&order=asc"},
    {src: "/assets/img/leeds-clocktower.jpg", text: "Interested in upcoming events?", subtext: "They're all available on our events page.", linktext: "Events", linkroute: "http://www.leedscommunityconsulting.co.uk/events?q=&published=1&order=asc"},

    // {src: "https://images.pexels.com/photos/9659841/pexels-photo-9659841.jpeg?auto=compress&cs=tinysrgb&w=800", text: "EXPLORE OUR VACANCIES", subtext: "We Helped Them To...", linktext: "Find out More"},
  ];
  // slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  slickInit(e: any) {
    // console.log('slick initialized');
  }
    
  breakpoint(e: any) {
    // console.log('breakpoint');
  }
    
  afterChange(e: any) {
    // console.log('afterChange');
  }
    
  beforeChange(e: any) {
    // console.log('beforeChange');
  }

}
