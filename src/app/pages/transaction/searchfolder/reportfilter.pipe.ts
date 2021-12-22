import { ReportModel } from './../model/report';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportfilter'
})
export class ReportfilterPipe implements PipeTransform {

  transform( tableData: ReportModel[], searchValue: string ): ReportModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.applicantAccountNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.applicantFullName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.applicantAddress.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.beneficiaryAccountNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.formA.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.fxAmount.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.purchaseType.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.transactionType.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.purpose.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.taxCertNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.statusText.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.isCustomer.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.createdOn.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
