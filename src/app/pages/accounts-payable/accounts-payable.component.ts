import { IPayableAccount } from './../../shared/interfaces/IPayableAccount';
import { BusinessService } from './../../shared/service/business.service';
import { Component, OnInit } from '@angular/core';
import { AccountsPayableService } from '../../shared/service/accounts-payable/accounts-payable.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrl: './accounts-payable.component.css'
})
export class AccountsPayableComponent implements OnInit {

  payableAccounts:IPayableAccount[] = [];

  constructor(
    private service: BusinessService,
    private accountsPayableService: AccountsPayableService,
  ) {
  }

  ngOnInit(): void {
    this.accountsPayableService.accountsPayable$.subscribe((items) => {
      this.payableAccounts = items;
    })
  }

  onStepChange(event: StepperSelectionEvent ) {
    if(event.selectedIndex === 1) {
      this.accountsPayableService.accountsPayable$.subscribe(items => {
        this.payableAccounts = items;
      })
    }
  }
}
