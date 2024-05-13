import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../services/auth.service';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { ApiService } from '../services/api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
declare var $ :any;
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, AdminHeaderComponent, FormsModule, NgFor,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
  schemas:  [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminEventsComponent {
  // @ViewChild('eventEditDetails') form!: NgForm;
  status = true;
  isDeleted: string;
  public successmsg = false;
  public warningmsg = false;
  public errormsg = false;
  public successMsgCnt : any = [];
  public data : any = [];
  public editData : any = [];
  myForm: any = FormGroup ;
  date: Date = new Date();
//   settings = {
//     bigBanner: true,
//   timePicker: false,
//   format: 'dd-MM-yyyy',
//   defaultOpen: true
// }
    
  eventDetails = {
    title: '',
    place: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    imageURL: '',
    isPublished: '',
    typeOfEvent: '',
    fee: ''
  };

  eventEditDetails: any = {
    title: '',
    fee: '',
    place: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    imageURL: '',
    isPublished: '',
    typeOfEvent: '',
  };
  constructor(private auth: AuthService,
              public api : ApiService){
    this.getAllEvents();
    this.isDeleted = '';
  }
  addToggle()
  {
    this.status = !this.status;       
  }

  addEvent()
  {
    // $("#add-event-modal").modal('show');
    $("#eventsFTable").addClass("hide-data");
    $(".head-title").addClass("hide-data");
    $("#createEventBlock").removeClass("hide-data");
    // this.addToggle();
  }

  submitForm(form: any): void {
    const startDate = new Date(this.eventDetails.startDate);
    const startdateString = startDate.toDateString();
    this.eventDetails.startTime = startdateString +" "+this.eventDetails.startTime ;

    const endDate = new Date(this.eventDetails.endDate);
    const enddateString = endDate.toDateString();
    this.eventDetails.endTime =  enddateString +" "+this.eventDetails.endTime  ;
    console.log( this.eventDetails.endTime)
    if (form.valid) {
      // console.log('Form data:', this.eventDetails);
      this.api.dPost('addEvents', this.eventDetails).subscribe((res : any) => {  
        console.log(res);
        $("#add-event-modal").modal('hide');
        this.getAllEvents()
        form.resetForm();
        this.successmsg = true;
        this.successMsgCnt = "New Event is Added"
        $("#eventsFTable").removeClass("hide-data");
        $(".head-title").removeClass("hide-data");
        $("#createEventBlock").addClass("hide-data");
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  getAllEvents(){
    this.api.dGet('getAllEvents').subscribe((res : any) => {
          console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }

  closeModal(){
    // $("#add-event-modal").modal('hide');
    // $("#edit-event-modal").modal('hide');
    // $("#action-event-modal").modal('hide');
    $("#eventsFTable").removeClass("hide-data");
    $(".head-title").removeClass("hide-data");
    $("#createEventBlock").addClass("hide-data");
    $("#editEventBlock").addClass("hide-data");
  }

  selectRow(id: any){
    console.log(id);
    $("#action-event-modal").modal('show');
    $("#editOrDeleteEvent").val(id);

  }

  deletModal(){
    $("#delete-event-modal").modal('show')
    var dval = $("#editOrDeleteEvent").val();
    $("#confrmDeleteEvent").val(dval);
  }

  closeDeletModal(){
    $("#delete-event-modal").modal('hide')
  }

  deletEvent(){
    var cnfrmDelEveId = $("#confrmDeleteEvent").val();
    console.log(cnfrmDelEveId);
    this.api.dDelete('deleteEvent', cnfrmDelEveId).subscribe(
      () => {
        console.log('Item deleted successfully');
        $("#delete-event-modal").modal('hide')
        $("#action-event-modal").modal('hide');
        this.getAllEvents()
        this.successmsg = true;
        this.successMsgCnt = "Event is deleted Successfully"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  editModal(){
    $("#action-event-modal").modal('hide')
    $("#eventsFTable").addClass("hide-data");
    $(".head-title").addClass("hide-data");
    $("#editEventBlock").removeClass("hide-data");
    $("mat-datepicker-content").addClass("margination")
    var dval = $("#editOrDeleteEvent").val();
    this.editData = this.data.find((item: { id: { S: string } }) => item.id.S === dval);
    console.log(this.editData)
    $("#editEventsId").val(this.editData.id.S);
    const stime = new Date(this.editData.startTime.S);
    const shours = stime.getHours();
    const sminutes = stime.getMinutes();
    const setime = `${shours}:${sminutes}`

    const etime = new Date(this.editData.endTime.S);
    const ehours = etime.getHours();
    const eminutes = etime.getMinutes();
    const eetime = `${ehours}:${eminutes}`
    console.log(eetime)
    this.myForm.setValue({
      title: this.editData.title.S,
      // time: this.editData.time.S,
      place: this.editData.place.S,
      startDate: new Date(this.editData.startTime.S),
      startTime: setime,
      endDate: new Date(this.editData.endTime.S),
      endTime: eetime,
      imageURL: this.editData.imageURL.S,
      isPublished: this.editData.isPublished.S,
      typeOfEvent: this.editData.typeOfEvent.S,
      fee: this.editData.fee.S
    });
    // $("#confrmDeleteEvent").val(dval);
  }

  updateEventsForm(form: any): void {
    var cnfrmUpdstaeEveId = $("#editEventsId").val();

    const startDate = new Date(this.myForm.controls['startDate'].value);
    const startdateString = startDate.toDateString();
    this.myForm.controls['startTime'].setValue(startdateString +" "+this.myForm.controls['startTime'].value);

    const endDate = new Date(this.myForm.controls['endDate'].value);
    const enddateString = endDate.toDateString();
    // console.log(this.myForm.controls['endTime'].value);
    this.myForm.controls['endTime'].setValue(enddateString +" "+this.myForm.controls['endTime'].value);

    // console.log(this.myForm.controls['startTime'].value);
    if (form.valid) {
      console.log('Form data:', this.myForm.value);
      this.api.dUpdate('updateEvent', this.myForm.value, cnfrmUpdstaeEveId).subscribe((res : any) => {  
        console.log(res);
        $("#edit-event-modal").modal('hide');
        $("#action-event-modal").modal('hide');
        this.getAllEvents()
        this.successmsg = true;
        this.successMsgCnt = "Event is Updated Successfully"
        $("#eventsFTable").removeClass("hide-data");
        $(".head-title").removeClass("hide-data");
        $("#editEventBlock").addClass("hide-data");
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      place: new FormControl(''),
      // time: new FormControl(''),
      startDate: new FormControl(''),
      startTime: new FormControl(''),
      endDate: new FormControl(''),
      endTime: new FormControl(''),
      imageURL: new FormControl(''),
      isPublished: new FormControl(''),
      typeOfEvent: new FormControl(''),
      fee: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}
