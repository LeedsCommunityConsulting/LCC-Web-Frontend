import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-admin-case-studies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, AdminHeaderComponent, FormsModule, NgFor, EditorModule],
  templateUrl: './admin-case-studies.component.html',
  styleUrl: './admin-case-studies.component.scss'
})
export class AdminCaseStudiesComponent {
  status = true;
  public successmsg = false;
  public warningmsg = false;
  public errormsg = false;
  public successMsgCnt : any = [];
  public data : any = [];
  public editData : any = [];
  myForm: any = FormGroup ;
  public searchParamsVal : any ;
  public params = { q: "", published : "", order : "" };
  eventDetails = {
    title: '',
    client: '',
    tags: '',
    objective: '',
    outcome: '',
    tagline: '',
    isPublished: '',
    imageURL: ''
  };

  eventEditDetails: any = {
    title: '',
    client: '',
    tags: '',
    eobjective: '',
    eoutcome: '',
    tagline: '',
    isPublished: '',
    imageURL: ''
  };
  constructor(private auth: AuthService,
              public api : ApiService,
              private route: ActivatedRoute,
              private router: Router){
    this.getAllCaseStudies();
  }
  addToggle()
  {
    this.status = !this.status;       
  }

  onSearch(event: any)
  {
    this.searchParamsVal = event.target.value
    this.params.q =  this.searchParamsVal;
    this.router.navigate([], { queryParams: {q: this.searchParamsVal , published: this.params.published, order: this.params.order} } );
    this.getAllCaseStudies();
    console.log(this.searchParamsVal );
   // console.log($('#mySearch').value());
  }

  addEvent()
  {
    $("#add-event-modal").modal('show');
    this.addToggle();
  }

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form data:', this.eventDetails);
      this.api.dPost('addCaseStudies', this.eventDetails).subscribe((res : any) => {  
        console.log(res);
        $("#add-event-modal").modal('hide');
        this.getAllCaseStudies()
        form.resetForm();
        this.successmsg = true;
        this.successMsgCnt = "New Case Study is Added"
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

  getAllCaseStudies(){
    this.api.dNGet('getAllCaseStudies', this.params).subscribe((res : any) => {
          console.log(res);
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
    this.api.dDelete('deleteCaseStudy', cnfrmDelEveId).subscribe(
      () => {
        console.log('Item deleted successfully');
        $("#delete-event-modal").modal('hide')
        $("#action-event-modal").modal('hide');
        this.getAllCaseStudies()
        this.successmsg = true;
        this.successMsgCnt = "Case Study is deleted Successfully"
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
    $("#edit-event-modal").modal('show')
    var dval = $("#editOrDeleteEvent").val();
    this.editData = this.data.find((item: { id: { S: string } }) => item.id.S === dval);
    console.log(this.editData)
    $("#editEventsId").val(this.editData.id.S);
    this.myForm.setValue({
      title: this.editData.title.S,
      client: this.editData.client.S,
      tags: this.editData.tags.S,
      eobjective: this.editData.objective.S,
      eoutcome: this.editData.outcome.S,
      tagline: this.editData.tagline.S,
      isPublished: this.editData.isPublished.S,
      imageURL: this.editData.imageURL.S
    });
    // $("#confrmDeleteEvent").val(dval);
  }

  updateEventsForm(form: any): void {
    var cnfrmUpdstaeEveId = $("#editEventsId").val();
    console.log(this.myForm.value);
    if (form.valid) {
      console.log('Form data:', this.myForm.value);
      this.api.dUpdate('updateCaseStudy', this.myForm.value, cnfrmUpdstaeEveId).subscribe((res : any) => {  
        console.log(res);
        $("#edit-event-modal").modal('hide');
        $("#action-event-modal").modal('hide');
        this.getAllCaseStudies()
        this.successmsg = true;
        this.successMsgCnt = "Case Study is Updated Successfully"
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
      tags: new FormControl(''),
      client: new FormControl(''),
      eobjective: new FormControl(''),
      eoutcome: new FormControl(''),
      tagline: new FormControl(''),
      isPublished: new FormControl(''),
      imageURL: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}
