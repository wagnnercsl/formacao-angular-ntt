import { MatSort } from '@angular/material/sort';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { IPayableAccount } from '../../../../shared/interfaces/IPayableAccount';
import { AccountsPayableService } from '../../../../shared/service/accounts-payable/accounts-payable.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-accounts-payable-list',
  templateUrl: './accounts-payable-list.component.html',
  styleUrl: './accounts-payable-list.component.css'
})
export class AccountsPayableListComponent {

  @Input()
  payableAccounts:IPayableAccount[] = [];

  displayedColumns:string[] = ['title', 'company', 'date', 'value'];
  dataSource = new MatTableDataSource<IPayableAccount>(this.payableAccounts);

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private accountsPayableService: AccountsPayableService) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['payableAccounts']){
      this.accountsPayableService.getItems().subscribe((items) => {
        this.payableAccounts = items;
        this.dataSource.data = this.payableAccounts
      })
    }
  }
}

