import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-admin-vaccancy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,SidebarComponent, AdminHeaderComponent, FormsModule, NgFor],
  templateUrl: './admin-vaccancy.component.html',
  styleUrl: './admin-vaccancy.component.scss'
})
export class AdminVaccancyComponent {
  status = true;
  public searchParamsVal : any ;
  public params = { q: "", published : "", order : "" };
  public checkP : any = "Test";
  public successmsg = false;
  public warningmsg = false;
  public errormsg = false;
  public successMsgCnt : any = [];
  public data : any = [];
  public editData : any = [];
  myForm: any = FormGroup ;
  eventDetails = {
    title: '',
    description: '',
    noOfAvailablity: '',
    jobType: '',
    duration: '',
    experienceLevel: '',
    isPublished: '',
    applyURL: ''
  };

  eventEditDetails: any = {
    title: '',
    description: '',
    noOfAvailablity: '',
    jobType: '',
    duration: '',
    experienceLevel: '',
    isPublished: '',
    applyURL: ''
  };
  constructor(private auth: AuthService,
              public api : ApiService,
              private route: ActivatedRoute,
              private router: Router,){
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
  addToggle()
  {
    this.status = !this.status;       
  }

  addEvent()
  {
    $("#add-event-modal").modal('show');
    this.addToggle();
  }

  submitForm(form: any): void {
    if (form.valid) {
      // console.log('Form data:', this.eventDetails);
      this.api.dPost('addVacancy', this.eventDetails).subscribe((res : any) => {  
        // console.log(res);
        $("#add-event-modal").modal('hide');
        this.getAllVacancy()
        form.resetForm();
        this.successmsg = true;
        this.successMsgCnt = "New Vacancy is Added"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  getAllVacancy(){
    this.api.dNGet('getAllVacancy', this.params).subscribe((res : any) => {
          // console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }

  closeModal(){
    $("#add-event-modal").modal('hide');
    $("#edit-event-modal").modal('hide');
    $("#action-event-modal").modal('hide');
  }

  selectRow(id: any){
    // console.log(id);
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
    // console.log(cnfrmDelEveId);
    this.api.dDelete('deleteVacancy', cnfrmDelEveId).subscribe(
      () => {
        console.log('Item deleted successfully');
        $("#delete-event-modal").modal('hide')
        $("#action-event-modal").modal('hide');
        this.getAllVacancy()
        this.successmsg = true;
        this.successMsgCnt = "Vacancy is deleted Successfully"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  editModal(){
    $("#edit-event-modal").modal('show')
    var dval = $("#editOrDeleteEvent").val();
    this.editData = this.data.find((item: { id: { S: string } }) => item.id.S === dval);
    // console.log(this.editData)
    $("#editEventsId").val(this.editData.id.S);
    this.myForm.setValue({
      title: this.editData.title.S,
      description: this.editData.description.S,
      noOfAvailablity: this.editData.noOfAvailablity.S,
      jobType: this.editData.jobType.S,
      duration: this.editData.duration.S,
      experienceLevel: this.editData.experienceLevel.S,
      isPublished: this.editData.isPublished.S,
      applyURL: this.editData.applyURL.S
    });
    // $("#confrmDeleteEvent").val(dval);
  }

  updateEventsForm(form: any): void {
    var cnfrmUpdstaeEveId = $("#editEventsId").val();
    // console.log(this.myForm.value);
    if (form.valid) {
      // console.log('Form data:', this.myForm.value);
      this.api.dUpdate('updateVacancy', this.myForm.value, cnfrmUpdstaeEveId).subscribe((res : any) => {  
        // console.log(res);
        $("#edit-event-modal").modal('hide');
        $("#action-event-modal").modal('hide');
        this.getAllVacancy()
        this.successmsg = true;
        this.successMsgCnt = "Vacancy is Updated Successfully"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    // console.log();
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      noOfAvailablity: new FormControl(''),
      description: new FormControl(''),
      jobType: new FormControl(''),
      duration: new FormControl(''),
      experienceLevel: new FormControl(''),
      isPublished: new FormControl(''),
      applyURL: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}
