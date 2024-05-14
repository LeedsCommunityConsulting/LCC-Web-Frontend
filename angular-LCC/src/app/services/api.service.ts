import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { ConstantService } from '../services/constant.service';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "";
  public authUser : any; 
  public urls: {[key: string]: any} = {
    getAllEvents              : "events/getAllEvents",
    addEvents                 : "events/addEvents",
    deleteEvent               : "events/v2",
    updateEvent               : "events/updateEvent",
    getAllVacancy             : "vacancy/getAllVacancy",
    addVacancy                : "vacancy/addVacancy",
    deleteVacancy             : "vacancy/v2",
    updateVacancy             : "vacancy/updateVacancy",
    getAllCaseStudies         : "caseStudies/getAllCaseStudies",
    getUniqueCaseStudy        : "caseStudies",
    addCaseStudies            : "caseStudies/addCaseStudies",
    deleteCaseStudy           : "caseStudies/v2",
    updateCaseStudy           : "caseStudies/updateCaseStudy",
    getAllUser                : "users/getAllUser",
    addUser                   : "users/addUser",
    deleteUser                : "users/v2",
    updateUser                : "users/updateUser",
    getAllRole                : "role/getAllRole",
    addRole                   : "users/addRole"
  }

  constructor( public constant : ConstantService, 
  			   public auth : AuthService, 
  			   private http: HttpClient
  			   ) 
  { 
  	this.apiUrl = this.constant.apiUrl;
    this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : []; 
  }

  dGet(url: any) : Observable<any> {
      try {
        var AH = "";
        let params = new HttpParams();
        // if(passparams) {
        //   Object.keys(passparams).forEach(function (key) {
        //        params = params.append(key, passparams[key]);
        //   });
        //  }
         this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
        //  if(this.authUser) {
        //    params = params.append('user_id', this.authUser.user.id);
        //    var AH = this.authUser.token_type+" "+this.authUser.access_token;
        //  }

         let httpOptions = { 
          headers: new HttpHeaders({
            'Authorization':  AH
          }),
          params : params
        };

        return this.http.get<any>(this.apiUrl+this.urls[url], httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      } catch ( e ) {
        console.log(e);
        return throwError(e);
      } 
  }

  dNGet(url: any, passparams: any) : Observable<any> {
    try {
      var AH = "";
      let params = new HttpParams();
      if(passparams) {
        Object.keys(passparams).forEach(function (key) {
             params = params.append(key, passparams[key]);
        });
       }
       this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
      //  if(this.authUser) {
      //    params = params.append('user_id', this.authUser.user.id);
      //    var AH = this.authUser.token_type+" "+this.authUser.access_token;
      //  }

       let httpOptions = { 
        headers: new HttpHeaders({
          'Authorization':  AH
        }),
        params : params
      };

      return this.http.get<any>(this.apiUrl+this.urls[url], {params: params})
      .pipe(
        catchError(this.handleError)
      );
    } catch ( e ) {
      console.log(e);
      return throwError(e);
    } 
}

  rDGet(url: any) : Observable<any> {
    try {
      var AH = "";
      let params = new HttpParams();
      // if(passparams) {
      //   Object.keys(passparams).forEach(function (key) {
      //        params = params.append(key, passparams[key]);
      //   });
      //  }
       this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
      //  if(this.authUser) {
      //    params = params.append('user_id', this.authUser.user.id);
      //    var AH = this.authUser.token_type+" "+this.authUser.access_token;
      //  }

       let httpOptions = { 
        headers: new HttpHeaders({
          'Authorization':  AH
        }),
        params : params
      };

      return this.http.get<any>(this.apiUrl+this.urls[url], {headers: {'authorization':"Bearer "+ this.authUser,}})
      .pipe(
        catchError(this.handleError)
      );
    } catch ( e ) {
      console.log(e);
      return throwError(e);
    } 
}

  dGetCaseStudies(url: any, id: number) : Observable<any> {
    try {
      var AH = "";
      // let params = new HttpParams();
      // if(passparams) {
      //   Object.keys(passparams).forEach(function (key) {
      //        params = params.append(key, passparams[key]);
      //   });
      //  }
      this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
      //  if(this.authUser) {
      //    params = params.append('user_id', this.authUser.user.id);
      //    var AH = this.authUser.token_type+" "+this.authUser.access_token;
      //  }

       let httpOptions = {};

      return this.http.get<any>(this.apiUrl+this.urls[url]+"/"+id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    } catch ( e ) {
      console.log(e);
      return throwError(e);
    } 
}

  dPost(url: any, body: any) : Observable<any> {
      try {
        this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
        let httpOptions = {};
        if(this.authUser) {
          const token = this.authUser.token_type + " " + this.authUser;
          httpOptions = { 
            headers: new HttpHeaders({
              'Authorization': token,
              'Content-Type': 'application/json',
            })
          };
        } 
        return this.http.post<any>(this.apiUrl+this.urls[url], body, {headers: {'authorization':"Bearer "+ this.authUser,}})
      .pipe(
        catchError(this.handleError)
      );
      } catch ( e ) {
        console.log(e);
        return throwError(e);
      } 
  }

  dUpdate(url: any, body: any, id: number) : Observable<any> {
    try {
      this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
      let httpOptions = {};
      if(this.authUser) {
        httpOptions = { 
          headers: new HttpHeaders({
            'Authorization':  this.authUser.token_type+" "+this.authUser.access_token
          })
        };
      } 
      return this.http.put<any>(this.apiUrl+this.urls[url]+"/"+id, body, {headers: {'authorization':"Bearer "+ this.authUser,}})
    .pipe(
      catchError(this.handleError)
    );
    } catch ( e ) {
      console.log(e);
      return throwError(e);
    } 
}


dAddRole(url: any, body: any, username: string) : Observable<any> {
  try {
    this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
    let httpOptions = {};
    if(this.authUser) {
      httpOptions = { 
        headers: new HttpHeaders({
          'Authorization':  this.authUser.token_type+" "+this.authUser.access_token
        })
      };
    } 
    return this.http.put<any>(this.apiUrl+this.urls[url]+"/"+username, body, {headers: {'authorization':"Bearer "+ this.authUser,}})
  .pipe(
    catchError(this.handleError)
  );
  } catch ( e ) {
    console.log(e);
    return throwError(e);
  } 
}

  dDelete(url: any, id: number) : Observable<any> {
      // url = `${url}/${id}`;
      try {
        this.authUser = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : ""; 
        let httpOptions = {};
        if(this.authUser) {
          httpOptions = { 
            headers: new HttpHeaders({
              'Authorization':  this.authUser.token_type+" "+this.authUser.access_token
            })
          };
        } 
        return this.http.delete(this.apiUrl+this.urls[url]+"/"+id, {headers: {'authorization':"Bearer "+ this.authUser,}})
      .pipe(
        catchError(this.handleError)
      );
      } catch ( e ) {
        console.log(e);
        return throwError(e);
      } 
}

  handleError = (error: HttpErrorResponse) =>  {
     console.log(error);
	   let errorMessage = '';
	   if (error.error instanceof ErrorEvent) {
	     // client-side error
	     errorMessage = `Error: ${error.error.message}`;
	   } else {
	     // server-side error
	     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
	   }

     if(error.status == 401) {
       this.auth.logout();
     }
     
	   //window.alert(errorMessage);
	   return throwError(errorMessage);
 	}
}
