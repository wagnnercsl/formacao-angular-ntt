import { AccountsPayableService } from '../../../../shared/service/accounts-payable/accounts-payable.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPayableAccount } from '../../../../shared/interfaces/IPayableAccount';
import { PaidStatusEnum } from '../../../../shared/enums/PaidStatusEnum';

@Component({
  selector: 'app-accounts-payable-form',
  templateUrl: './accounts-payable-form.component.html',
  styleUrl: './accounts-payable-form.component.css'
})
export class AccountsPayableFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountsPayableService: AccountsPayableService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(1)]],
      empresa: ['', [Validators.required]],
      dataVencimento: ['', [Validators.required]
      ]
    })
  }

  submitForm() {
    if(this.form.valid) {
      const randomId = Math.random() * (99 - 5) + 5;
      const id = parseInt(randomId.toString()).toString();
      const valueFormatted = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(this.form.value.valor)

      const newItem: IPayableAccount = {
        id,
        title: this.form.value.descricao,
        company: this.form.value.empresa,
        date: new Date(this.form.value.dataVencimento).toLocaleDateString('pt-BR'),
        value: valueFormatted
      }

      this.accountsPayableService.addItem(newItem);
      alert(`cadastrando! id: ${id}`);
      this.form.reset();
    }
  }
}
