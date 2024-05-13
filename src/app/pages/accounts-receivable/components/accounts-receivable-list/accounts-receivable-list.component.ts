import { AccountsReceivableService } from './../../../../shared/service/accounts-receivable/accounts-receivable.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IReceivableAccount } from '../../../../shared/interfaces/IReceivableAccount';

@Component({
  selector: 'app-accounts-receivable-list',
  standalone: false,
  templateUrl: './accounts-receivable-list.component.html',
  styleUrl: './accounts-receivable-list.component.css'
})

export class AccountsReceivableListComponent {

    @Input()
    receivableAccounts:IReceivableAccount[] = [];
    displayedColumns:string[] = ['title', 'value', 'company', 'date',  'status'];

    constructor(private accountsReceivableService: AccountsReceivableService) {}

    ngOnChanges(changes: SimpleChanges) {
      if(changes['receivableAccounts']){
        this.accountsReceivableService.getItems().subscribe((items) => {
          this.receivableAccounts = items;
          this.receivableAccounts = [...this.receivableAccounts]
        })
      }
    }

    sortTable(sort: Sort): void {
    const data = this.receivableAccounts.slice();
    if(!sort.active || sort.direction === '') {
      this.receivableAccounts = data;
      return;
    }

    this.receivableAccounts = [...data].sort((a, b) => {
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
        case 'status':
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
