import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SlickCarouselModule,CommonModule,HeaderComponent,FooterComponent
  ],
})
export class HomeComponent {

  constructor() { }

  ngOnInit(): void {
  }

  homeSlider = {
    "slidesToShow": 1, "slidesToScroll": 1, "dots": false, "autoplay": true, "autoplaySpeed": 2000,"speed":1000, "infinite": true ,"arrows": false
  };

  slides = [
    {img: "/assets/img/slide1.jpg", text: "NIGHT TIME ECONOMY SOLUTIONS", subtext: "We Helped Them To...", linktext: "Learn More"},
    {img: "/assets/img/slide2.jpg", text: "EXPLORE OUR VACANCIES", subtext: "Join our team and blah blah", linktext: "Find out More"},
    {img: "/assets/img/slide3.jpg", text: "EXPLORE OUR VACANCIES", subtext: "We Helped Them To...", linktext: "Find out More"},
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
    
  breakpoint(e: any) {
    console.log('breakpoint');
  }
    
  afterChange(e: any) {
    console.log('afterChange');
  }
    
  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
