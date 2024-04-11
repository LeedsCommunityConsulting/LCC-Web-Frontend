import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  // public environment : string = "staging";
   public apiUrl  : string = "http://localhost:3000/";
  // public apiUrl  : string = "http://127.0.0.1:8000/api/v1/";
   public baseUrl : string = "http://localhost:3000/";
  // public baseUrl : string = "http://localhost:4200/";

  constructor() { }

  setItem(key: any, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getItem(key: any) {
    return JSON.parse(localStorage.getItem(key)!);
  }
 removeItem(key: any) {
    localStorage.removeItem(key);
  }

  getAuth() {
    return localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")!) : "";
  }
  setAuth(data: any) {
    localStorage.setItem("authUser", JSON.stringify(data));
  }

  pagination(c: number, m: number) {
      var current = c,
          last = m,
          delta = 2,
          left = current - delta,
          right = current + delta + 1,
          range = [],
          rangeWithDots = [],
          l;

      for (let i = 1; i <= last; i++) {
          if (i == 1 || i == last || i >= left && i < right) {
              range.push(i);
          }
      }

      for (let i of range) {
          if (l) {
              if (i - l === 2) {
                  rangeWithDots.push(l + 1);
              } else if (i - l !== 1) {
                  rangeWithDots.push('...');
              }
          }
          rangeWithDots.push(i);
          l = i;
      }

      return rangeWithDots;
  }
}
