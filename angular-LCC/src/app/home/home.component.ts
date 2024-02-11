import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SlickCarouselModule,CommonModule
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
    {img: "https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&w=800", text: "tile 1"},
    {img: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800", text: "tile 2"},
    {img: "https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=800", text: "tile 3"},
    {img: "https://images.pexels.com/photos/9490227/pexels-photo-9490227.jpeg?auto=compress&cs=tinysrgb&w=800", text: "tile 4"},
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
