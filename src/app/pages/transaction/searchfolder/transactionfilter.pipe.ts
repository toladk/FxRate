import { TransactionModel } from './../model/transac';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionfilter'
})
export class TransactionfilterPipe implements PipeTransform {

  transform( tableData: TransactionModel[], searchValue: string ): TransactionModel[] {
    if (!tableData || !searchValue) {
      return tableData;
    }
    return tableData.filter(details =>
      details.formA.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.beneficiaryAccountNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.applicantAccountNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      details.fxAmount.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
