import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http : HttpClient) { }

  // signup(data) {
  //   return this.http.post(`${environment.baseUrl}/signup` ,data)
  // }

  login(data) {
    return this.http.post(`${environment.loginUrl}/adloginv3` , data);
  }

  twoFactorLogin(data){
    return this.http.post(`${environment.baseUrl}/api/v1/utilities/2FactorAuthentication`, data);
  }

}
