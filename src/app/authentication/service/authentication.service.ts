import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private Token: TokenService, private http: HttpClient) {

  }

  changeAuthStatus(value : boolean) {
    this.loggedIn.next(value);
  }

  getUserByUsername(username){
    return this.http.get(`${environment.centralAdmin}/getUserByUsername/${username}`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getTellerByEmail(email){
    return this.http.get(`${environment.centralAdmin}/getTellerByEmail?email=${email}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

}
