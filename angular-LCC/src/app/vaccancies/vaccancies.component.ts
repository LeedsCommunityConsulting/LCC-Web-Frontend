import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-vaccancies',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
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

  

  

  ngOnInit(): void {
  }

}
