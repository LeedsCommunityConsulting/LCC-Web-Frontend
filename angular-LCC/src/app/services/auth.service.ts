import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConstantService } from './constant.service';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasAuth());
  isTokenSubject = new BehaviorSubject<boolean>(this.hasTokenExpired());
  

  public apiUrl = "";

  constructor(public constant : ConstantService,
          private router: Router,
  			  private http: HttpClient) 
  {
  		this.apiUrl = this.constant.apiUrl;
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
   
  /**
   *
   * @returns {Observable<T>}
   */
  isTokenExpired() : Observable<boolean> {
    return this.isTokenSubject.asObservable();
  }
 

  public get authUserValue() {
        return this.isLoginSubject.value;
  }

  login(datas: any) {
  	console.log(this.apiUrl)
  	return this.http.post(this.apiUrl+"auth/login", datas, {headers: {'Content-Type': 'application/json'}}).toPromise();
  }
  // forgotEmail(datas) {
  //   return this.http.post(this.apiUrl+"/auth/forgot-email", datas).toPromise();
  // }
  // resetPass(datas) {
  //   return this.http.post(this.apiUrl+"/auth/reset-password", datas).toPromise();
  // }
  
  // impersonate(datas) {
  //   console.log(this.apiUrl)
  //   return this.http.post(this.apiUrl+"/auth/impersonate", datas).toPromise();
  // }
  
  // signup(datas) {
  // 	console.log(this.apiUrl)
  // 	console.log(datas);
  // 	return this.http.post(this.apiUrl+"/auth/signup", datas).toPromise();
  // }


  private hasAuth() : boolean {
    return !!localStorage.getItem('authUser');
  }

  private hasTokenExpired() : boolean {
    return !!localStorage.getItem('tokenExpired');
  }

  /**
   *
   * @returns {Observable<T>}
   */

  storeauthdata(data: any) {
    if(data == "" || data == "null" || data == null) {
      return false;
    }
    this.constant.setAuth(data);
    this.isLoginSubject.next(true);
    return true;
  } 

  public get currentUserValue() {
        return this.isLoginSubject.value;
  }
  

  token() {
    let authUser : any = localStorage.getItem("authUser");
    if(authUser) {
      return authUser.token_type;
    }
    return "";
  }

  clearauthdata() {
  	localStorage.removeItem("authUser");
    this.isLoginSubject.next(false);
  }

  
  tokenexpired() {
    this.isTokenSubject.next(true);
  }

  logout() {
    //localStorage.clear();
    localStorage.removeItem('tokenExpired');
  	localStorage.removeItem("authUser");
    localStorage.removeItem("refreshData");
    this.isLoginSubject.next(false);
    this.router.navigate(["/"]);
  }

}
