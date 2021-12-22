import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : 'http://10.0.33.12:8017/adloginv3',
    // login : 'https://apigateway.myapiservices.net/identity-manager/UserLogin',
  }

  constructor(
    private router: Router
  ) { }

  handle(token: any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token: string) {
    sessionStorage.setItem('token',token)
  }

  get() {
    return sessionStorage.getItem('token')
  }

  logout() {
    this.router.navigateByUrl('/login');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('ipAddress');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('branchId');
    sessionStorage.removeItem('tellerTill');
  }

  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
      return (payload.iss === 'http://10.0.33.12:8017/adloginv3') ? true : false; // easy hint
      // return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false ;
      }
    }
    return false;
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}

