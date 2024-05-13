import { AccountsReceivableService } from './../../../../shared/service/accounts-receivable/accounts-receivable.service';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { IReceivableAccount } from '../../../../shared/interfaces/IReceivableAccount';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource<IReceivableAccount>(this.receivableAccounts);

  constructor(private accountsReceivableService: AccountsReceivableService) {}

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['receivableAccounts']){
      this.accountsReceivableService.getItems().subscribe((items) => {
        this.receivableAccounts = items;
        this.dataSource.data = this.receivableAccounts
      })
    }
  }
}

