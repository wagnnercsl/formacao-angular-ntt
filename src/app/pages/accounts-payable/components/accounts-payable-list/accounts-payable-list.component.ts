import { Sort } from '@angular/material/sort';
import { Component, Input, SimpleChanges } from '@angular/core';
import { IPayableAccount } from '../../../../shared/interfaces/IPayableAccount';
import { AccountsPayableService } from '../../../../shared/service/accounts-payable/accounts-payable.service';

@Component({
  selector: 'app-accounts-payable-list',
  templateUrl: './accounts-payable-list.component.html',
  styleUrl: './accounts-payable-list.component.css'
})
export class AccountsPayableListComponent {

  @Input()
  payableAccounts:IPayableAccount[] = [];

  displayedColumns:string[] = ['title', 'company', 'date', 'value'];

  constructor(
    private accountsPayableService: AccountsPayableService
  ) {
    this.payableAccounts = this.payableAccounts.slice();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['payableAccounts']){
      this.accountsPayableService.getItems().subscribe((items) => {
        this.payableAccounts = items;
        this.payableAccounts = [...this.payableAccounts];
      })
    }
  }

  sortTable(sort: Sort): void {
    const data = this.payableAccounts.slice();
    if(!sort.active || sort.direction === '') {
      this.payableAccounts = data;
      return;
    }

    this.payableAccounts = [...data].sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      let numberValueA = '';
      let numberValueB = '';

      if(sort.active === 'value') {
        const stringValueA = a.value.split('R$')[1];
        numberValueA = stringValueA.replaceAll('.', '').replace(',', '.');
        const stringValueB = b.value.split('R$')[1];
        numberValueB = stringValueB.replaceAll('.', '').replace(',', '.');
      }

      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'company':
          return compare(a.company, b.company, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'value':
          return compare(numberValueA, numberValueB, isAsc);
        default:
          return 0;
      }
    })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
