import { AccountsPayableService } from '../../../../shared/service/accounts-payable/accounts-payable.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IPayableAccount } from '../../../../shared/interfaces/IPayableAccount';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts-payable-form',
  templateUrl: './accounts-payable-form.component.html',
  styleUrl: './accounts-payable-form.component.css'
})
export class AccountsPayableFormComponent {

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private accountsPayableService: AccountsPayableService,
    private _snackBar: MatSnackBar
  ) {}

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
      this._snackBar.open('Conta cadastrada com sucesso!', 'Fechar', { duration: 3000, verticalPosition: 'bottom'});
      this.formRef.resetForm();
    }
  }
}
