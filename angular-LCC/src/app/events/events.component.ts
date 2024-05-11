import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  public data : any = [];
  constructor(private auth: AuthService,
    public api : ApiService){
this.getAllEvents();
}

getAllEvents(){
  this.api.dGet('getAllEvents').subscribe((res : any) => {
        console.log(res);
      //  this.pS = false;
       this.data = res;
      //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
    }, error => { console.log(error); });
}

  // openModal(){
  //   console.log("test")
  // }

}
