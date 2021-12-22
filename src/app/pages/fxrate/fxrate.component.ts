import { TransactionService } from '../transaction/services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-fxrate',
  templateUrl: './fxrate.component.html',
  styleUrls: ['./fxrate.component.css']
})
export class FxrateComponent implements OnInit {

  fxRateForm: FormGroup;

  // Pagination
  pagination: number = 1;

  visibleFxRate = false;
  isLoadingSub = false;

  allCurrencyList = [];
  allFxRateList = [];
  usernameResult = [];
  permissionList = [];

  fxRateDetails: any;
  userDetails: any;

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fxRateForm = this.formBuilder.group({
      currencyID: ['', Validators.required],
      buyingAmount: ['', Validators.required],
      sellingAmount: ['', Validators.required],
    });

    this.getAllCurrency();
    this.getAllFxRate();
    this.getUserDetails();

  }

  // For permissions
  getUserDetails(){
    let username = sessionStorage.getItem('username');
    this.transactionService.getUserByUsername(username).subscribe((result: any) => {
      this.userDetails = result;
      this.usernameResult = result.roles;
      let centralAdminRole = this.usernameResult.find(x => x.applicationName === 'FXPURCHASEAPP');
      if(centralAdminRole === undefined){

      }
      else{
        console.log('checking Application Name', centralAdminRole);
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
      }
    });
  }

  // Sorting
  key: string = 'currencyID';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  openFxRate(){
    this.visibleFxRate = true;
  }
  closeFxRate(){
    this.visibleFxRate = false;
  }

  // Get Currency
  getAllCurrency(){
    this.transactionService.getCurrency().subscribe((result: any) => {
      this.allCurrencyList = result;
    }, error => {
      this.notification.error('Currency', error.error.errors);
    });
  }

  // Get FxRate
  getAllFxRate(){
    this.transactionService.getFxRate().subscribe((result: any) => {
      this.allFxRateList = result.respData;
    }, error => {
      this.notification.error('Currency', error.error.errors);
    });
  }

  clear(){
    this.fxRateForm.reset();
  }

  // Post Fx Rate
  submitFxRate(){
    this.isLoadingSub = true;
    this.transactionService.addFxRate(this.fxRateForm.value).subscribe((result: any) => {
      this.fxRateDetails = result;
      this.notification.success('FX Rate', result.respMessage);
      this.isLoadingSub = false;
      this.visibleFxRate = false;
      this.getAllFxRate();
      this.clear();
    }, error => {
      this.notification.error('FX Rate', error.error.message);
      this.isLoadingSub = false;
    });
  }

  cancelFxRate(){

  }


}
