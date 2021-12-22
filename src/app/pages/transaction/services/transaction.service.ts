import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  getFxTransactionsAll(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/FXSaleTransaction`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getFxTransactions(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/ByStatus?status=1`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getPurchaseType(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/PurchaseType`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getTransactionType(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/TransactionType`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getTransactionLimit(currencyID, transactionTypeID, purchaseType){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/ByCurrencyAndTransactionType/${currencyID}/${transactionTypeID}/${purchaseType}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getCurrencyRateById(id){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/ByCurrency?currencyID=${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getCurrency(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/Currency`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validateBvn(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/HBFXPurchase/ValidateBvn`, data,  { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  validateAccountNo(data){
    return this.http.get(`${environment.baseUrl}/api/v1/accounts/CustomerInquiry?customerIdOrAccountNumber=${data}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getBanks(){
    return this.http.get(`${environment.baseUrl}/api/v1/transactions/GetBanks/NIP`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  postTransaction(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/FXSaleTransaction`, data, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getTransactionDetails(transactionTypeId, BVN){
    return this.http.get(`${environment.baseUrl}/api/v1/HBFXPurchase/GetTransactionDetails/${transactionTypeId}/${BVN}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getFxRate(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/FXRate`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  addFxRate(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/FXRate`, data, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getTransactionById(id){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/ByTranxID?tranxID=${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  approveTransaction(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/Approve`, data, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  declineTransaction(data){
    return this.http.post<any>(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/Decline`, data, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getUserByUsername(username){
    return this.http.get(`${environment.centralAdmin}/getUserByUsername/${username}`, {headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getBranchAccount(){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/BranchAccount`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  getBranchBySolId(data){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/BySolID?solID=${data}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  // tslint:disable-next-line:max-line-length
  getReport(branchID: any, transactionType: any, status: any, createdBy: any, createdOnStart: any, createdOnEnd: any, transmittedBy: any, transmittedOnStart: any, transmittedOnEnd: any){
    return this.http.get(`${environment.baseUrl}/api/v1/FxPurchaseMiddleware/Report?branchID=${branchID}&transactionType=${transactionType}&status=${status}&createdBy=${createdBy}&createdOnStart=${createdOnStart}&createdOnEnd=${createdOnEnd}&transmittedBy=${transmittedBy}&transmittedOnStart=${transmittedOnStart}&transmittedOnEnd=${transmittedOnEnd}`, { headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }

  // For Exporting Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // tslint:disable-next-line:object-literal-key-quotes
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
