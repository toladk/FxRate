import { TokenService } from './../service/token.service';
import { AuthenticationService } from './../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from '../service/jarwis.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent implements OnInit {

  twoFactorForm: FormGroup;

  isLoadingOne = false;
  loginResult: any;
  loginResult2: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private Jarwis: JarwisService,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.twoFactorForm = this.formBuilder.group({
      username: ['', Validators.required],
      token: ['', Validators.required],
      token1: ['', Validators.required],
      token2: ['', Validators.required],
      token3: ['', Validators.required],
      token4: ['', Validators.required],
      userGroup: ['', Validators.required],
    });
  }

  onSubmit(){
    this.isLoadingOne = true;
    this.twoFactorForm.value.username = sessionStorage.getItem('username');
    this.twoFactorForm.value.userGroup = 'staff';
    // tslint:disable-next-line:max-line-length
    this.twoFactorForm.value.token = this.twoFactorForm.value.token1 + this.twoFactorForm.value.token2 + this.twoFactorForm.value.token3 + this.twoFactorForm.value.token4;
    delete this.twoFactorForm.value.token1;
    delete this.twoFactorForm.value.token2;
    delete this.twoFactorForm.value.token3;
    delete this.twoFactorForm.value.token4;
    this.Jarwis.twoFactorLogin(this.twoFactorForm.value).subscribe((result: any) => {
      this.loginResult = result.data;
      this.loginResult2 = result;
      if ( this.loginResult2.message === 'Processing Error, Contact Support'){
        this.isLoadingOne = false;
        this.notification.error('Token', this.loginResult2.message);
      }else if (this.loginResult.requires_two_factor === false){
        this.isLoadingOne = false;
        this.loginResult = this.handleResponse(this.loginResult);
      } else if (this.loginResult2.message === 'Invalid Token'){
        this.isLoadingOne = false;
        this.notification.error( 'Token', this.loginResult2.message );
      }
    }, error => this.handleError(error)
    );
  }

  handleResponse(loginResult){
    this.notification.success( 'Token', 'Login Successfully !!' );
    // this.Token.handle(loginResult.access_token);
    // this.authenticationService.changeAuthStatus(true);
    this.router.navigateByUrl('app/dashboard').then(() => {window.location.reload();});
  }

  handleError(error){
    this.isLoadingOne = false;
    // this.error = error.error.message;
    // const type = 'error';
    // this.message.create(type, `Error: ${this.error}` );
    this.notification.error( 'Login', error.error.message || error.error.responseMessage);
  }

}
