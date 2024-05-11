import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

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

  onResize(event : any) {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    // console.log(this.currentWindowWidth);
  }

}
