import { JarwisService } from './../service/jarwis.service';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ipAddress: any;

  loginForm: FormGroup;

  isLoadingOne = false;
  userDetails: any;
  tellerDetails: any;
  tellerDetails2: any;

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    this.getIPAddress();
    this.isLoadingOne = true;
    this.jarwis.login(this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
      );
  }

  getIPAddress(){
    this.http.get('https://api.db-ip.com/v2/free/self').subscribe((result: any) => {
      this.ipAddress = result.ipAddress;
      sessionStorage.setItem('ipAddress', this.ipAddress);
      console.log('finding', this.ipAddress);
    });
  }

  handleResponse(data){
    this.isLoadingOne = false;
    if (data.error === 'Invalid username or password'){
      this.notification.error('Login', data.error);
    }else {
    const username = this.loginForm.value.username;
    sessionStorage.setItem('username', this.loginForm.value.username);
    this.token.handle(data.value);

    this.authenticationService.changeAuthStatus(true);
    this.router.navigateByUrl('app/dashboard').then(() => {window.location.reload();});

    }
  }

  handleError(error){
    this.isLoadingOne = false;
    error = this.notification.error( 'Login', error.error.Error );
  }

}
