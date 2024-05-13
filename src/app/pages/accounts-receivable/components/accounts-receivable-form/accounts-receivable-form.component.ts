import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsReceivableService } from '../../../../shared/service/accounts-receivable/accounts-receivable.service';
import { IReceivableAccount } from '../../../../shared/interfaces/IReceivableAccount';
import { PaidStatusEnum } from '../../../../shared/enums/PaidStatusEnum';

@Component({
  selector: 'app-accounts-receivable-form',
  standalone: false,
  templateUrl: './accounts-receivable-form.component.html',
  styleUrl: './accounts-receivable-form.component.css'
})
export class AccountsReceivableFormComponent {
  form!: FormGroup;
  paidStatus = [
    {value: PaidStatusEnum.PAGO, viewValue: 'Pago'},
    {value: PaidStatusEnum.PENDENTE, viewValue: 'Pagar'}
  ]

  constructor(
    private formBuilder: FormBuilder,
    private accountsReceivableService: AccountsReceivableService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1)]],
      company: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  submitForm() {
    if(this.form.valid) {
      const randomId = Math.random() * (99 - 5) + 5;
      const id = parseInt(randomId.toString()).toString();
      const valueFormatted = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(this.form.value.value)

      const newItem: IReceivableAccount = {
        id,
        title: this.form.value.title,
        company: this.form.value.company,
        date: new Date(this.form.value.date).toLocaleDateString('pt-BR'),
        value: valueFormatted,
        status: this.form.value.status
      }

      this.accountsReceivableService.addItem(newItem);
      alert(`cadastrando! id: ${id}`);
      this.form.reset();
    }
  }
}
