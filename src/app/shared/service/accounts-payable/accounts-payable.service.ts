import { IPayableAccount } from '../../interfaces/IPayableAccount';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusinessService } from '../business.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsPayableService {

  private accountsPayableSubject = new BehaviorSubject<IPayableAccount[]>([]);
  accountsPayable$ = this.accountsPayableSubject.asObservable();

  private objects: any[] = [];

  constructor(private businessService: BusinessService) {
    this.businessService.getAccountsPayable().subscribe((accounts: any) => {
      this.objects = accounts;
      this.accountsPayableSubject.next(this.objects);
    });
  }

  // getAll() {
  //   this.accountsPayableSubject.next(this.accountsPayableSubject.getValue());
  // }

  addItem(accountPayableItem: IPayableAccount) {
    const accountsPayable = this.accountsPayableSubject.getValue();
    accountsPayable.push(accountPayableItem);
    this.accountsPayableSubject.next(accountsPayable);
  }

  getItems() {
    return this.accountsPayable$;
  }

}
