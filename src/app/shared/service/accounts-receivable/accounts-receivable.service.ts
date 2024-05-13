import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusinessService } from '../business.service';
import { IReceivableAccount } from '../../interfaces/IReceivableAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountsReceivableService {

  private accountsReceivableSubject = new BehaviorSubject<IReceivableAccount[]>([]);
  accountsReceivable$ = this.accountsReceivableSubject.asObservable();

  private objects: any[] = [];

  constructor(private businessService: BusinessService) {
    this.businessService.getAccountsReceivable().subscribe((accounts: any) => {
      this.objects = accounts;
      this.accountsReceivableSubject.next(this.objects);
    });
  }

  addItem(accountPayableItem: IReceivableAccount) {
    const accountsReceivable = this.accountsReceivableSubject.getValue();
    accountsReceivable.push(accountPayableItem);
    this.accountsReceivableSubject.next(accountsReceivable);
  }

  getItems() {
    return this.accountsReceivable$;
  }

}
