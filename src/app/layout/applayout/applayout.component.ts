import { TokenService } from './../../authentication/service/token.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html',
  styleUrls: ['./applayout.component.css']
})
export class ApplayoutComponent implements OnInit {

  isCollapsed = false;

  usernameResult = [];
  permissionList = [];

  username: any;
  email: any;
  userDetails: any;
  tellerDetails: any;
  tellerDetails2: any;

  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.gettingUserDetails();
  }

  logout(){
    this.tokenService.logout();
    this.authenticationService.changeAuthStatus(false);
  }

  gettingDetails(){
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email');
  }

  gettingUserDetails(){
    let username = sessionStorage.getItem('username');
    this.authenticationService.getUserByUsername(username).subscribe((result: any) => {
      this.userDetails = result;
      sessionStorage.setItem('branchId', this.userDetails.soldId);
      sessionStorage.setItem('email', this.userDetails.email);
      this.gettingDetails();

      // this.authenticationService.getTellerByEmail(this.userDetails).subscribe((result: any) => {
      //   this.tellerDetails = result.value.till;
      //   sessionStorage.setItem('tellerTill', this.tellerDetails);
      // });

      this.usernameResult = result.roles;
      let centralAdminRole = this.usernameResult.find(x => x.applicationName === 'FXPURCHASEAPP');
      if (centralAdminRole === undefined){
        this.router.navigateByUrl('/login');
        this.notification.success( 'Permission', 'You dont have permission to view this application !!' )
      }
      else{
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
      }

    });
  }

}
