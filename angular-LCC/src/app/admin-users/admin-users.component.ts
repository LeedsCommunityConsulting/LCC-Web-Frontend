import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { ActivatedRoute, Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, AdminHeaderComponent, FormsModule, NgFor],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  status = true;
  public searchParamsVal : any ;
  public params = { q: "", published : "", order : "" };
  public roleidval : any;
  public usernamerole : any;
  public successmsg = false;
  public warningmsg = false;
  public errormsg = false;
  public successMsgCnt : any = [];
  public data : any = [];
  public roleData : any = [];
  public editData : any = [];
  myForm: any = FormGroup ;
  eventDetails = {
    fName: '',
    lName: '',
    info: '',
    position: '',
    contactDetails: {
      email: '',
      linkedIn: ''     
    },
    username: '',
    imageURL: '',
    testamonials: '',
    memberType: '',
    role: ''
  };

  eventEditDetails: any = {
    fName: '',
    lName: '',
    info: '',
    position: '',
    contactDetails: {
      email: '', 
      linkedIn: ''    
    },
    email: '',
    linkedIn: '',
    username: '',
    imageURL: '',
    testamonials: '',
    memberType: '',
    role: ''
  };
  constructor(private auth: AuthService,
              public api : ApiService,
              private route: ActivatedRoute,
              private router: Router){
  this.params.q = this.route.snapshot.queryParamMap.get("q")!;
  this.params.published = this.route.snapshot.queryParamMap.get("published")!;
  this.params.order = this.route.snapshot.queryParamMap.get("order")!;
    this.getAllUser();
    this.getAllRoles();
  }

  onSearch(event: any)
  {
    this.searchParamsVal = event.target.value
    this.params.q =  this.searchParamsVal;
    this.router.navigate([], { queryParams: {q: this.searchParamsVal , published: this.params.published, order: this.params.order} } );
    this.getAllUser();
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

  addRoleUser(roles: any, username:any){
    // Role adding Code
    // console.log(roles)
    // console.log(username)
    if(roles && username)
    {
      const rolesObj = { roles: roles };
      this.api.dAddRole('addRole', rolesObj , username).subscribe((res : any) => {  
        // console.log(res);
        $("#add-event-modal").modal('hide');
        this.successmsg = true;
        this.successMsgCnt = "Role is Added"
        // console.log("Role is added");
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

  submitForm(form: any): void {
    this.roleidval =  this.eventDetails.role;
    this.usernamerole = this.eventDetails.username;
    const email: string = this.eventDetails.contactDetails.email;
    const linkedIn: string = this.eventDetails.contactDetails.linkedIn;
    const contactDetailsObj = { email:  email, linkedIn: linkedIn};
    this.eventDetails.contactDetails = contactDetailsObj;
    // console.log('Form data:', this.eventDetails);
    // console.log( this.roleidval);
    if (form.valid) {
      // console.log('Form data:', this.eventDetails);
      this.api.dPost('addUser', this.eventDetails).subscribe((res : any) => {  
        // console.log(res);
        $("#add-event-modal").modal('hide');
        this.getAllUser()
        form.resetForm();
        this.successmsg = true;
        this.successMsgCnt = "New User is Added"
        let that = this;
        // this.addRoleUser(this.roleidval, this.usernamerole)
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    // console.log();
    }
  }

  getAllUser(){
    this.api.dNGet('getAllUser', this.params).subscribe((res : any) => {
          // console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }

  getAllRoles(){
    this.api.rDGet('getAllRole').subscribe((res : any) => {
          // console.log(res);
        //  this.pS = false;
         this.roleData = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }


  removeRole(roles: any, username:any){
    // console.log(roles)
    // console.log(username)
    if(roles && username)
    {
      const rolesObj = { roles: roles };
      this.api.dRemoveRole('removeRole', rolesObj , username).subscribe((res : any) => {  
        // console.log(res);
        $("#add-event-modal").modal('hide');
        this.successmsg = true;
        this.successMsgCnt = "Existing Role is removed"
        // console.log("Existing Role is removed");
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    // console.log();
    }

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
    this.api.dDelete('deleteUser', cnfrmDelEveId).subscribe(
      () => {
        // console.log('Item deleted successfully');
        $("#delete-event-modal").modal('hide')
        $("#action-event-modal").modal('hide');
        this.getAllUser()
        this.successmsg = true;
        this.successMsgCnt = "User is deleted Successfully"
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
    console.log(this.editData)
    $("#editEventsId").val(this.editData.id.S);
    this.myForm.setValue({
      fName: this.editData.fName.S,
      lName: this.editData.lName.S,
      info: this.editData.info.S,
      position: this.editData.position.S,
      contactDetails: {
        email: this.editData.contactDetails.M.M.M.email.S, 
        linkedIn: this.editData.contactDetails.M.M.M.linkedIn.S
      },
      email: this.editData.contactDetails.M.M.M.email.S,
      linkedIn: this.editData.contactDetails.M.M.M.linkedIn.S,
      username: this.editData.username.S,
      imageURL: this.editData.imageURL.S,
      testamonials: this.editData.testamonials.S,
      memberType: this.editData.memberType ? this.editData.memberType.S : '',
      role: ''
    });
  }

  updateEventsForm(form: any): void {
    this.roleidval =  this.eventDetails.role;
    this.usernamerole = this.eventDetails.username;
    const email: string = this.eventDetails.contactDetails.email;
    const linkedIn: string = this.eventDetails.contactDetails.linkedIn;
    const contactDetailsObj = { email:  email, linkedIn: linkedIn};
    this.myForm.contactDetails = contactDetailsObj;
    var cnfrmUpdstaeEveId = $("#editEventsId").val();
    // console.log(this.myForm.value);
    if (form.valid) {
      // console.log('Form data:', this.myForm.value);
      this.api.dUpdate('updateUser', this.myForm.value, cnfrmUpdstaeEveId).subscribe((res : any) => {  
        // console.log(res);
        $("#edit-event-modal").modal('hide');
        $("#action-event-modal").modal('hide');
        this.getAllUser()
        this.successmsg = true;
        this.successMsgCnt = "User is Updated Successfully"
        let that = this;
        this.removeRole(this.roleidval, this.usernamerole)
        this.addRoleUser(this.roleidval, this.usernamerole)
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          // console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      fName: new FormControl(''),
      info: new FormControl(''),
      lName: new FormControl(''),
      position: new FormControl(''),
      contactDetails: new FormGroup({
        email: new FormControl(''),
        linkedIn: new FormControl('')
      }),
      username: new FormControl(''),
      imageURL: new FormControl(''),
      testamonials: new FormControl(''),
      memberType: new FormControl(''),
      email: new FormControl(''),
      linkedIn: new FormControl(''),
      role: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }

}
