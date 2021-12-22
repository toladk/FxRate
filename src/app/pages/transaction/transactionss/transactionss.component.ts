import { TransactionService } from './../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionModel } from '../model/transac';

@Component({
  selector: 'app-transactionss',
  templateUrl: './transactionss.component.html',
  styleUrls: ['./transactionss.component.css']
})
export class TransactionssComponent implements OnInit {

  // for searching
  searchValue: string;

  transactionForm: FormGroup;

  visible = false;
  visibleTran = false;
  isLoadingCurrency = false;
  isLoadingLimit = false;
  isLoadingValidateBvn2 = false;
  isLoadingValidateBvn1 = false;
  beneBvnBtn = true;
  bvnDetailsApp1 = false;
  bvnDetailsApp2 = false;
  bvnDetailsBene = false;
  showImage = false;
  isLoadingSub = false;
  showForTransfer = false;
  showForCash = false;
  showFor = false;
  isCashPick = false;
  isTransferPick = true;
  isLoadingAccNo = false;
  showFirstMainPage = false;
  visibleApprove = false;
  isLoadingAppro = false;
  isLoadingDecli = false;

  allPurchaseTypeList = [];
  allTransactionTypeList = [];
  allCurrencyList = [];
  myFiles: string [] = [];
  uploadedDocs = [];
  allTransactionsList: TransactionModel[] = [];
  allBankList = [];
  allUploadedImages = [];
  DocumentListToUse = [];
  usernameResult = [];
  permissionList = [];

  personalBvn: any;
  beneBvn: any;
  Ademm: any;
  transactionLimitDetail: any;
  currencyRateDetails: any;

  // Pagination
  pagination = 1;

  applicantBvnDetails: any;
  beneficiaryBvnDetails: any;
  accountNoDetails: any;
  transacLimitId: any;
  currentRateId: any;
  transactionDetails: any;
  isCashTransfer: any;
  isCustomerSelecting: boolean;
  bvnAndTransactionTyeDetails: any;
  applicantBalance: any;
  transactionFormDetailsById: any;
  ApplicantAddressToUse: any;
  ApplicantAccountNoToUse: any;
  ApplicantBVNToUse: any;
  BeneficiaryAccountNoToUse: any;
  BeneficiaryBVNToUse: any;
  FXAmountToUse: any;
  IsCashTranxToUse: any;
  IsCustomerToUse: any;
  PassportNoToUse: any;
  PurposeToUse: any;
  TaxCertNoToUse: any;
  TellerTillToUse: any;
  approveDetails: any;
  transId: any;
  userDetails: any;
  allBranchAccount: any;
  branchSolId: any;
  fxRateToUse: any;
  formANoToUse: any;
  approvalFxRateToUse: any;
  branchAccountNo: any;
  transactionTypeToUse: any;
  purchaseTypeToUse: any;
  bvnFullName: any;
  userApplicationRole: any;

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      bvnApplicant: ['', Validators.required],
      bvnSecondaryApplicant: ['', Validators.required],
      currency: ['', Validators.required],
      transactionType: ['', Validators.required],
      purchaseType: ['', Validators.required],
      transactionTypeLimitID: ['', Validators.required],
      fxRateID: ['', Validators.required],
      applicantBVN: ['', Validators.required],
      beneficiaryBVN: ['', Validators.required],
      isCustomer: [null , Validators.required],
      applicantBankCode: ['', Validators.required],
      applicantAccountNo: ['', Validators.required],
      beneficiaryBankCode: ['', Validators.required],
      beneficiaryAccountNo: ['', Validators.required],
      isCashTranx: [null, Validators.required],
      fxAmount: ['', Validators.required],
      createdBy: ['', Validators.required],
      tellerTill: ['', Validators.required],
      branchID: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      taxCertNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      applicantAddress: ['', Validators.required],
      passportNo: ['', [Validators.required, Validators.minLength(9)]],
      purpose: ['', Validators.required],
      debitAccountNo: ['', Validators.required],
      fxSaleTransactionID: ['', Validators.required],
      comment: ['', Validators.required],
      transmittedBy: ['', Validators.required],
      formA: ['', Validators.minLength(4)],
      approvalFXRate: ['', Validators.required],
      applicantFullName: ['', Validators.required],
      documentList: this.formBuilder.array([]),
    });

    this.getAllPurchaseType();
    this.getAllTransactionType();
    this.getAllCurrency();
    this.getBanks();
    this.getUserDetails();
    this.getBranchAccount();
    this.getBranchBySolId();

  }

  // Sorting
  key: string = 'applicantAccountNo';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  openNewTransaction(){
    this.visible = true;
  }
  closeNewTransaction(){
    this.visible = false;
  }
  nextTran(){
    this.visibleTran = true;
  }
  closeTran(){
    this.visibleTran = false;
    location.reload();
  }
  closeTranApprove(){
    this.visibleApprove = false;
    this.transactionForm.reset();
  }

  validateApplicantBvn(){
    this.bvnDetailsApp1 = true;
  }

  validateBeneficiaryBvn(){
    this.bvnDetailsBene = true;
  }

  // For permissions
  getUserDetails(){
    let username = sessionStorage.getItem('username');
    this.transactionService.getUserByUsername(username).subscribe((result: any) => {
      this.userDetails = result;
      this.usernameResult = result.roles;
      const centralAdminRole = this.usernameResult.find(x => x.applicationName === 'FXPURCHASEAPP');
      if (centralAdminRole === undefined){

      }
      else{
        console.log('checking Application Name', centralAdminRole);
        this.userApplicationRole = centralAdminRole.roleName;
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
        this.getTransactions();
      }
    });
  }

  //Get Banks
  getBanks(){
    this.transactionService.getBanks().subscribe((result: any) => {
      this.allBankList = result.bankList;
    }, error => {
      this.notification.error('Bank', error.error.responseMessage);
    })
  }

  getBranchAccount(){
    this.transactionService.getBranchAccount().subscribe((result: any) => {
      this.allBranchAccount = result.respData;
    }, error => {
      this.notification.error('Branch Account', error.error.responseMessage);
    });
  }

  // get Transactions
  getTransactions(): void{
    if (this.userApplicationRole === 'Support.FX'){
      this.transactionService.getFxTransactionsAll().subscribe((result: any) => {
      this.allTransactionsList = result.respData;
      }, error => {
        this.notification.error('Transaction', error.error.errors);
      });
    } else if ( this.userApplicationRole === 'Inputter.FX'){
      this.transactionService.getFxTransactions().subscribe((result: any) => {
        this.allTransactionsList = result.respData;
        }, error => {
          this.notification.error('Transaction', error.error.errors);
        });
    } else if (this.userApplicationRole === 'Reviewer.FX'){
      this.transactionService.getFxTransactionsAll().subscribe((result: any) => {
        this.allTransactionsList = result.respData;
        }, error => {
          this.notification.error('Transaction', error.error.errors);
        });
    } else {
      this.transactionService.getFxTransactionsAll().subscribe((result: any) => {
        this.allTransactionsList = result.respData;
        }, error => {
          this.notification.error('Transaction', error.error.errors);
        });
    }

  }

  //Get purchase type
  getAllPurchaseType(){
    this.transactionService.getPurchaseType().subscribe((result: any) => {
      this.allPurchaseTypeList = result.respData;
    }, error => {
      this.notification.error('Purchase Type', error.error.errors);
    });
  }

  //Gte Transaction Type
  getAllTransactionType(){
    this.transactionService.getTransactionType().subscribe((result: any) => {
      this.allTransactionTypeList = result.respData;
    }, error => {
      this.notification.error('Transaction Type', error.error.message);
    });
  }

  //Get Transaction Limit
  getTransactionLimit(){
    this.isLoadingLimit = true;
    // tslint:disable-next-line:max-line-length
    this.transactionService.getTransactionLimit(this.transactionForm.value.currency, this.transactionForm.value.transactionType, this.transactionForm.value.purchaseType).subscribe((result: any) => {
      this.transactionLimitDetail = result;
      if (this.transactionLimitDetail.respCode === '00'){
        this.isLoadingLimit = false;
        this.transacLimitId = this.transactionLimitDetail.respData.id;
        this.notification.success('Transaction Limit', 'Limit Fetch Successfully !!');
        this.getTransactionDetailsByBVNandTransactionType();
      }
    }, error => {
      this.isLoadingLimit = false;
      this.notification.error('Transaction Limit', error.error.errors.currencyID || error.error.errors.transactionTypeID);
    });
  }

  // GETbranch by sold ID
  getBranchBySolId(){
    const userSoldId = sessionStorage.getItem('branchId');
    this.transactionService.getBranchBySolId(userSoldId).subscribe((result: any) => {
      // this.branchSolId = result;
      this.branchAccountNo = result.respData.accountNo;
      console.log('finding branch account', this.branchAccountNo);
    });
  }

  checkingToBuyAccess(){
    if ( this.transactionForm.value.fxAmount > this.applicantBalance) {
      this.notification.error('FX Amount', 'Amount must match within your balance !!');
    }
  }

  // get Currency Rate
  getCurrencyRate(){
    this.isLoadingCurrency = true;
    this.transactionService.getCurrencyRateById(this.transactionForm.value.currency).subscribe((result: any) => {
      this.currencyRateDetails = result.respData;
      this.currentRateId = this.currencyRateDetails.id;
      this.notification.success('Currency Rate', 'Currency Rate Fetch Successfully !!');
      this.isLoadingCurrency = false;
    }, error => {
      this.isLoadingCurrency = false;
      this.notification.error('Currency Rate', error.error.errors.currencyID || error.error.errors.transactionTypeID);
    });
  }

  // Get Currency
  getAllCurrency(){
    this.transactionService.getCurrency().subscribe((result: any) => {
      this.allCurrencyList = result;
    }, error => {
      this.notification.error('Currency', error.error.errors);
    });
  }

  // Image Upload
  onFileSelect(event): void{
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      if ( event.target.files.length < 2 ){
        this.notification.error('File Upload', 'Minimum of 2 files should be uploaded');
      }else {
        this.myFiles.push(event.target.files[i]);
        this.allUploadedImages = this.myFiles;


        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.uploadedDocs.push(event.target.result);
          console.log('checking', this.uploadedDocs);
          this.showImage = true;
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      console.log('checking files', this.allUploadedImages);


    }


  }

  // Customer Select
  onActionCustomer(val): void{
    if (val === 'isCustomer'){
      this.showForTransfer = true;
      this.showForCash = true;
      this.showFor = true;
      this.isCustomerSelecting = true;
    }else{
      this.showForTransfer = false;
      this.showForCash = true;
      this.showFor = true;
      this.isCustomerSelecting = false;
    }
  }

  // Cash or Transfer Select
  onActionSelect(val): void{
    if (val === 'isCash'){
      this.isCashPick = false;
      this.isTransferPick = true;
      this.isCashTransfer = true;
    }else{
      this.isCashPick = false;
      this.isTransferPick = true;
      this.isCashTransfer = false;
    }
  }

  // For Selecting Same BVN
  samePerson(e): void{
    if (e.target.checked){
      this.beneBvn = this.personalBvn;
      this.beneBvnBtn = false;
    } else{
      this.beneBvnBtn = true;
      this.beneBvn = '';
      this.bvnDetailsApp1 = true;
      this.bvnDetailsApp2 = false;
      this.bvnDetailsBene = false;
    }
  }

  // Get Transaction Details by TransactionTypeId and BVN
  getTransactionDetailsByBVNandTransactionType(){
    // tslint:disable-next-line:max-line-length
    this.transactionService.getTransactionDetails(this.transactionForm.value.transactionType, this.transactionForm.value.applicantBVN).subscribe((result: any) => {
      this.bvnAndTransactionTyeDetails = result.fxPurchaseDetails;
      this.applicantBalance = this.bvnAndTransactionTyeDetails.applicantsBalance;
      if ( this.applicantBalance === 0){
        this.notification.error('Transaction', 'You cant perform any transaction because your tansaction balance is 0');
      }
    }, error => {
      this.notification.error('Transaction', error.error.responseMessage);
    });
  }

  // Validate Bvn
  validateBvn(){
    this.isLoadingValidateBvn1 = true;
    this.transactionForm.value.bvnApplicant = this.transactionForm.value.applicantBVN;
    this.transactionForm.value.bvnSecondaryApplicant = this.transactionForm.value.beneficiaryBVN;
    this.transactionService.validateBvn(this.transactionForm.value).subscribe((result: any) => {
      this.applicantBvnDetails = result.nibssResponse.bvnApplicant;
      console.log(result);
      if (result.isSuccessful === false){
        this.notification.success('BVN Validation', result.responseMessage);
        this.isLoadingValidateBvn1 = false;
      } else {
        // tslint:disable-next-line:max-line-length
        this.bvnFullName = `${this.applicantBvnDetails.firstName} ${this.applicantBvnDetails.middleName} ${this.applicantBvnDetails.lastName}`;
        this.beneficiaryBvnDetails = result.nibssResponse.bvnSecondaryApplicant;
        this.notification.success('BVN Validation', result.responseMessage);
        this.isLoadingValidateBvn1 = false;
        this.showFirstMainPage = true;
        this.bvnDetailsApp2 = true;

        if (this.personalBvn === this.beneBvn){
          this.bvnDetailsApp1 = false;
          this.bvnDetailsApp2 = true;
          this.bvnDetailsBene = false;
        } else if (this.personalBvn !== this.beneBvn){
          this.bvnDetailsApp1 = true;
          this.bvnDetailsApp2 = false;
          this.bvnDetailsBene = true;
        }
      }
    }, error => {
      this.isLoadingValidateBvn1 = false;
      this.notification.error('BVN Validation', error.error.responseMessage);
    });
  }
  validateBvnApproval(): void{
    this.isLoadingValidateBvn1 = true;
    this.transactionForm.value.bvnApplicant = this.transactionForm.value.applicantBVN;
    this.transactionForm.value.bvnSecondaryApplicant = this.transactionForm.value.beneficiaryBVN;
    this.transactionService.validateBvn(this.transactionForm.value).subscribe((result: any) => {
      this.applicantBvnDetails = result.nibssResponse.bvnApplicant;
      this.beneficiaryBvnDetails = result.nibssResponse.bvnSecondaryApplicant;
      this.notification.success('BVN Validation', result.responseMessage);
      this.isLoadingValidateBvn1 = false;
      this.showFirstMainPage = false;
      this.bvnDetailsApp2 = true;
      if (this.personalBvn === this.beneBvn){
        this.bvnDetailsApp1 = false;
        this.bvnDetailsApp2 = true;
        this.bvnDetailsBene = false;
      } else if (this.personalBvn !== this.beneBvn){
        this.bvnDetailsApp1 = true;
        this.bvnDetailsApp2 = false;
        this.bvnDetailsBene = true;
      }
    }, error => {
      this.isLoadingValidateBvn1 = false;
      this.notification.error('BVN Validation', error.error.responseMessage);
    });
  }

  // Validate Account No
  validateAccount(){
    this.isLoadingAccNo = true;
    this.transactionService.validateAccountNo(this.transactionForm.value.applicantAccountNo).subscribe((result: any) => {
      this.accountNoDetails = result;
      this.notification.success('Account Validation', result.responseMessage);
      this.isLoadingAccNo = false;
    }, error => {
      this.isLoadingAccNo = false;
      this.notification.error('BVN Validation', error.error.responseMessage);
    });
  }

  // Submit Transaction
  submitTransaction(): void{
    delete this.transactionForm.value.bvnApplicant;
    delete this.transactionForm.value.bvnSecondaryApplicant;
    delete this.transactionForm.value.currency;
    delete this.transactionForm.value.purchaseType;
    delete this.transactionForm.value.transactionType;

    this.isLoadingSub = true;
    this.transactionForm.value.transactionTypeLimitID = this.transacLimitId;
    this.transactionForm.value.fxRateID = this.currentRateId;
    this.transactionForm.value.createdBy = sessionStorage.getItem('email');
    this.transactionForm.value.branchID = sessionStorage.getItem('branchId');
    this.transactionForm.value.isCashTranx = this.isCashTransfer;
    this.transactionForm.value.isCustomer = this.isCustomerSelecting;

    const formData: any = new FormData();
    formData.append('transactionTypeLimitID', this.transactionForm.value.transactionTypeLimitID);
    formData.append('fxRateID', this.transactionForm.value.fxRateID);
    formData.append('createdBy', this.transactionForm.value.createdBy);
    formData.append('branchID', this.transactionForm.value.branchID);
    formData.append('isCashTranx', this.transactionForm.value.isCashTranx);
    formData.append('isCustomer', this.transactionForm.value.isCustomer);
    formData.append('applicantBVN', this.transactionForm.value.applicantBVN);
    formData.append('beneficiaryBVN', this.transactionForm.value.beneficiaryBVN);
    formData.append('applicantBankCode', this.transactionForm.value.applicantBankCode);
    formData.append('beneficiaryBankCode', this.transactionForm.value.beneficiaryBankCode);
    formData.append('beneficiaryAccountNo', this.transactionForm.value.beneficiaryAccountNo);
    formData.append('fxAmount', this.transactionForm.value.fxAmount);
    formData.append('applicantFullName', this.transactionForm.value.applicantFullName = this.bvnFullName);
    if (this.isCashTransfer === true){
      formData.append('tellerTill', this.transactionForm.value.tellerTill = sessionStorage.getItem('tellerTill'));
      formData.append('applicantAccountNo', this.transactionForm.value.applicantAccountNo);
      formData.append('debitAccountNo', this.transactionForm.value.debitAccountNo = this.branchAccountNo);
    }else {
      formData.delete('tellerTill', this.transactionForm.value.tellerTill);
      formData.append('applicantAccountNo', this.transactionForm.value.applicantAccountNo);
      formData.append('debitAccountNo', this.transactionForm.value.debitAccountNo = this.branchAccountNo);
      console.log('checking', this.transactionForm.value.debitAccountNo);
    }
    formData.append('dateOfBirth', this.transactionForm.value.dateOfBirth);
    formData.append('taxCertNo', this.transactionForm.value.taxCertNo);
    formData.append('applicantAddress', this.transactionForm.value.applicantAddress);
    formData.append('passportNo', this.transactionForm.value.passportNo);
    formData.append('purpose', this.transactionForm.value.purpose);
    formData.append('formA', this.transactionForm.value.formA);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('documentList', this.myFiles[i]);
    }

    console.log(JSON.stringify(formData));

    this.transactionService.postTransaction(formData).subscribe((result: any) => {
      this.transactionDetails = result;
      this.notification.success('Transaction', result.respMessage);
      this.isLoadingSub =  false;
      this.resetForm();
      this.closeTran();
    }, error => {
      this.notification.error('Transaction', error.error.message || error.error.respMessage);
      this.isLoadingSub =  false;
    });
  }

  resetForm(){
    this.transactionForm.reset();
  }

  approveTrans(transss){
    this.visibleApprove = true;
    this.transactionService.getTransactionById(transss.id).subscribe((result: any) => {
      this.transactionFormDetailsById = result.RespData;

      this.transId = this.transactionFormDetailsById.ID;
      this.ApplicantAccountNoToUse = this.transactionFormDetailsById.ApplicantAccountNo;
      this.ApplicantAddressToUse = this.transactionFormDetailsById.ApplicantAddress;
      this.ApplicantBVNToUse = this.transactionFormDetailsById.ApplicantBVN;
      this.BeneficiaryAccountNoToUse = this.transactionFormDetailsById.BeneficiaryAccountNo;
      this.BeneficiaryBVNToUse = this.transactionFormDetailsById.BeneficiaryBVN;
      this.FXAmountToUse = this.transactionFormDetailsById.FXAmount;
      this.IsCashTranxToUse = this.transactionFormDetailsById.IsCashTranx;
      this.IsCustomerToUse = this.transactionFormDetailsById.IsCustomer;
      this.PassportNoToUse = this.transactionFormDetailsById.PassportNo;
      this.PurposeToUse = this.transactionFormDetailsById.Purpose;
      this.TaxCertNoToUse = this.transactionFormDetailsById.TaxCertNo;
      this.TellerTillToUse = this.transactionFormDetailsById.TellerTill;
      this.DocumentListToUse = this.transactionFormDetailsById.DocumentList;
      this.approvalFxRateToUse = this.transactionFormDetailsById.FXSellingRate;
      this.formANoToUse = this.transactionFormDetailsById.FormA;
      this.transactionTypeToUse = this.transactionFormDetailsById.TransactionType;
      this.purchaseTypeToUse = this.transactionFormDetailsById.PurchaseType;
    });
  }

  // for aprrove and decline
  approveTransaction(){
    delete this.transactionForm.value.bvnApplicant;
    delete this.transactionForm.value.bvnSecondaryApplicant;
    delete this.transactionForm.value.currency;
    delete this.transactionForm.value.transactionType;
    delete this.transactionForm.value.transactionTypeLimitID;
    delete this.transactionForm.value.fxRateID;
    delete this.transactionForm.value.applicantBVN;
    delete this.transactionForm.value.beneficiaryBVN;
    delete this.transactionForm.value.isCustomer;
    delete this.transactionForm.value.applicantBankCode;
    delete this.transactionForm.value.applicantAccountNo;
    delete this.transactionForm.value.beneficiaryBankCode;
    delete this.transactionForm.value.beneficiaryAccountNo;
    delete this.transactionForm.value.isCashTranx;
    delete this.transactionForm.value.createdBy;
    delete this.transactionForm.value.tellerTill;
    delete this.transactionForm.value.branchID;
    delete this.transactionForm.value.dateOfBirth;
    delete this.transactionForm.value.taxCertNo;
    delete this.transactionForm.value.applicantAddress;
    delete this.transactionForm.value.passportNo;
    delete this.transactionForm.value.purpose;
    delete this.transactionForm.value.debitAccountNo;
    delete this.transactionForm.value.documentList;
    delete this.transactionForm.value.purchaseType;

    this.transactionForm.value.transmittedBy = sessionStorage.getItem('email');
    this.transactionForm.value.fxSaleTransactionID = this.transId;
    this.isLoadingAppro = true;
    this.transactionService.approveTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.approveDetails = result;
      this.notification.success('Approve Transaction', result.respMessage);
      this.isLoadingAppro = false;
      this.visibleApprove = false;
      this.getTransactions();
      this.transactionForm.reset();
      this.bvnDetailsApp1 = false;
      this.bvnDetailsApp2 = false;
      this.bvnDetailsBene = false;
    }, error => {
      this.isLoadingAppro = false;
      this.notification.error('Approve Transaction', error.error.responseMessage);
    });
  }
  declineTransaction(){
    delete this.transactionForm.value.bvnApplicant;
    delete this.transactionForm.value.bvnSecondaryApplicant;
    delete this.transactionForm.value.currency;
    delete this.transactionForm.value.transactionType;
    delete this.transactionForm.value.transactionTypeLimitID;
    delete this.transactionForm.value.fxRateID;
    delete this.transactionForm.value.applicantBVN;
    delete this.transactionForm.value.beneficiaryBVN;
    delete this.transactionForm.value.isCustomer;
    delete this.transactionForm.value.applicantBankCode;
    delete this.transactionForm.value.applicantAccountNo;
    delete this.transactionForm.value.beneficiaryBankCode;
    delete this.transactionForm.value.beneficiaryAccountNo;
    delete this.transactionForm.value.isCashTranx;
    delete this.transactionForm.value.createdBy;
    delete this.transactionForm.value.tellerTill;
    delete this.transactionForm.value.branchID;
    delete this.transactionForm.value.dateOfBirth;
    delete this.transactionForm.value.taxCertNo;
    delete this.transactionForm.value.applicantAddress;
    delete this.transactionForm.value.passportNo;
    delete this.transactionForm.value.purpose;
    delete this.transactionForm.value.debitAccountNo;
    delete this.transactionForm.value.documentList;
    delete this.transactionForm.value.purchaseType;

    this.transactionForm.value.transmittedBy = sessionStorage.getItem('email');
    this.transactionForm.value.fxSaleTransactionID = this.transId;
    this.isLoadingDecli = true;
    this.transactionService.declineTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.approveDetails = result;
      this.notification.success('Decline Transaction', result.respMessage);
      this.isLoadingDecli = false;
      this.visibleApprove = false;
      this.getTransactions();
      this.transactionForm.reset();
      this.bvnDetailsApp1 = false;
      this.bvnDetailsApp2 = false;
      this.bvnDetailsBene = false;
    }, error => {
      this.isLoadingDecli = false;
      this.notification.error('Decline Transaction', error.error.responseMessage);
    });
  }

  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
  onClickDownloadPdf(base64){
    this.downloadPdf(base64, 'PDF File');
  }


}
