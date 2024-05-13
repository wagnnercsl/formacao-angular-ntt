import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { AccountsReceivableService } from '../../shared/service/accounts-receivable/accounts-receivable.service';
import { IReceivableAccount } from '../../shared/interfaces/IReceivableAccount';

@Component({
  selector: 'app-accounts-receivable',
  templateUrl: './accounts-receivable.component.html',
  styleUrl: './accounts-receivable.component.css',
  standalone: false
})
export class AccountsReceivableComponent {

  receivableAccounts:IReceivableAccount[] = [];

  constructor(private accountsReceivableService: AccountsReceivableService) {}

  ngOnInit() {
    this.accountsReceivableService.accountsReceivable$.subscribe((items) => {
      this.receivableAccounts = items;
    })
  }

  onStepChange(event: StepperSelectionEvent ) {
    if(event.selectedIndex === 1) {
      this.accountsReceivableService.accountsReceivable$.subscribe(items => {
        this.receivableAccounts = items;
      })
    }
  }

}
