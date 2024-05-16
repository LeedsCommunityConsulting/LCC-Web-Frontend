import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var $ :any;

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  contactDetails = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };


  constructor(private auth: AuthService,
    public api : ApiService)
    {
      window.scroll(0,0);
    }

    closeModal()
    {
      $("#success_tic").modal('hide');
    }

  submitForm(form: any): void {
    console.log('Form data:', this.contactDetails);
    if (form.valid) {
      console.log('Form data:', this.contactDetails);
      this.api.dPost('contactUs', this.contactDetails).subscribe((res : any) => {  
        console.log(res);
        $("#add-event-modal").modal('hide');
        form.resetForm();
        $("#success_tic").modal('show');
        // this.successmsg = true;
        // this.successMsgCnt = "New Vacancy is Added"
        let that = this;
        setTimeout(function() {
          // that.successmsg = false;
          // that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }
}
