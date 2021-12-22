import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction/services/transaction.service';
import { TransactionModel } from '../transaction/model/transac';
import { ReportModel } from '../transaction/model/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;

  allTransactionTypeList = [];
  reportDetailsList: ReportModel[] = [];

  isLoadingOne = false;
  showDownload = false;
  transmittedOnStartToUse: string;
  transmittedOnEndToUse: string;
  checkingTrans = '01/01/0001';
  reportDetailsList2: any;

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  // for searching
  searchValue: string;

  // Pagination
  pagination = 1;

  // For Sorting
  key = '';
  reverse = false;

  allTransactionsList: TransactionModel[] = [];

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      status: ['', Validators.required],
      createdOnStart: ['', Validators.required],
      createdOnEnd: ['', Validators.required],
      transmittedOnStart: ['', Validators.required],
      transmittedOnEnd: ['', Validators.required],
      branchID: ['', Validators.required],
    });

    // this.getPendingTransactions();
    this.getAllTransactionType();
  }

  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  // get Transactions
  getPendingTransactions(): void{
    this.transactionService.getFxTransactionsAll().subscribe((result: any) => {
      this.allTransactionsList = result.respData;
    }, error => {
      this.notification.error('Transaction', error.error.errors);
    });
  }

  // Get Transaction Type
  getAllTransactionType(): void{
    this.transactionService.getTransactionType().subscribe((result: any) => {
      this.allTransactionTypeList = result.respData;
    }, error => {
      this.notification.error('Transaction Type', error.error.message);
    });
  }

  // Get Report
  getReport(): void{
    const transmisttedBy = '';
    const createdBy = '';
    if ( this.reportForm.value.transmittedOnStart === ''){
      this.reportForm.value.transmittedOnStart = this.checkingTrans;
      this.reportForm.value.transmittedOnEnd = this.checkingTrans;
    }
    if ( this.reportForm.value.createdOnStart === ''){
      this.reportForm.value.createdOnStart = this.checkingTrans;
      this.reportForm.value.createdOnEnd = this.checkingTrans;
    }
    if ( this.reportForm.value.branchID === ''){
      this.reportForm.value.branchID = 0;
    }

    if (this.reportForm.value.transactionType === '' || this.reportForm.value.status === ''){
      this.notification.error('Report', 'Transaction Type or Status is required !!');
    } else {
      this.isLoadingOne = true;
      // tslint:disable-next-line:max-line-length
      this.transactionService.getReport(this.reportForm.value.branchID, this.reportForm.value.transactionType, this.reportForm.value.status, createdBy, this.reportForm.value.createdOnStart, this.reportForm.value.createdOnEnd, transmisttedBy, this.reportForm.value.transmittedOnStart, this.reportForm.value.transmittedOnEnd).subscribe((result: any) => {
        this.reportDetailsList = result.respData;
        this.reportDetailsList2 = result;
        if (this.reportDetailsList2.respCode === '16'){
          this.notification.error('Report', this.reportDetailsList2.respMessage);
          this.isLoadingOne = false;
        } else if (this.reportDetailsList2.respCode === '04'){
          this.notification.error('Report', this.reportDetailsList2.respMessage);
          this.isLoadingOne = false;
        } else {
          this.notification.success('Report', 'Transaction Fetch Successfully');
          this.isLoadingOne = false;
          this.showDownload = true;
        }
      }, error => {
        this.isLoadingOne = false;
        this.notification.error('Report', error.error.title);
      });
    }
  }

  // download report
  DownloadReport(): void{
    this.transactionService.exportAsExcelFile(this.reportDetailsList, 'Transaction List');
  }

  // Reset Filter
  resetFilter(): void{
    location.reload();
  }

}
