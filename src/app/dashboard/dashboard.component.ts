import { TransactionService } from './../pages/transaction/services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;

  allTransactionsList = [];
  allFxRateList = [];

  // Pagination
  pagination: number = 1;

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getPendingTransactions();
    this.getAllFxRate();
  }

  // Sorting
  key: string = 'applicantAccountNo';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // get Transactions
  getPendingTransactions(){
    this.transactionService.getFxTransactions().subscribe((result: any) => {
      this.allTransactionsList = result.respData;
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

}
