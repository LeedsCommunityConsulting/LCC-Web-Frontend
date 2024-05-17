import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ConstantService } from '../services/constant.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  readonly APIURL = "http://localhost:8800/events"
  public pS : boolean = false;
  public data : any = "";
  public lS : boolean = false;
  public login : any = "";
  public loginForm : FormGroup;
  public loginerror : any = "";
  public loginsuccess : any = "";
  public loginsubmitted : boolean = false;
  public isLoggedIn: Observable<boolean> = new Observable<boolean>();
  public authUser : any = "";
  public has_error : boolean = false;

  constructor(private api:ApiService,
              private constant:ConstantService,
              private auth:AuthService,
              private router:Router,
              private formBuilder: FormBuilder){

              this.loginForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(1)]],
                rememberme : [''],
              });

              auth.isLoggedIn().subscribe(data => {
                // console.log(data);
               this.authUser = this.constant.getAuth();
              });

  }


  doLogin(): void{
    this.loginsubmitted = true;
    if (this.loginForm.invalid) {
      this.has_error = true;
            return;
    }
    if(this.lS) {
      // return false;
    }
    var __this;
    this.loginerror = "";
    this.loginsuccess = "";
    this.lS = true;
    var loginFormData = new FormData();
    loginFormData.append('username', this.loginForm.controls['email'].value);
    loginFormData.append('password', this.loginForm.controls['password'].value);
    let formDataJson: { [key: string]: string } = {};
    loginFormData.forEach((value, key) => {
        formDataJson[key] = value as string;
    });
    let loginDataString = JSON.stringify(formDataJson);
    this.auth.login(loginDataString).then( (response : any) => {
    	// console.log(response.token);
      this.lS = false;
    	this.loginsuccess = "Login Succcess";
      this.has_error = false;
    	this.auth.storeauthdata(response.token);
      // console.log(response.token)
    	let that = this;
    	setTimeout(function(){
    		that.goToDashboard();
    	}, 1000);
    }).catch( (error : any) => {
        console.log(error);
        this.loginerror = error.error.message;
        this.auth.clearauthdata();
        this.lS = false;
        this.has_error = true;
        this.loginsubmitted = false;
      })
  }

  goToDashboard() {
  	this.router.navigate(['admin/dashboard']);
  }

  logout() {
  	this.auth.logout();
  }

  ngOnInit(){
  }


}
