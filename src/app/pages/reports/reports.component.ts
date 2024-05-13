import { BusinessService } from './../../shared/service/business.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportTypesEnum } from '../../shared/enums/ReportTypes';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  form!: FormGroup;

  reportTypes = [
    { value: ReportTypesEnum.PAYABLE, viewValue: 'Contas a Pagar' },
    { value: ReportTypesEnum.RECEIVABLE, viewValue: 'Contas a Receber' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      reportType: ['', [Validators.required]]
    })
  }

  getPayableReport() {
    this.businessService.getAccountsPayable().subscribe(accounts => {
      const accountText = JSON.stringify(accounts, null, 4);
      this.saveData(accountText);
    })
  }

  getReceivableReport() {
    this.businessService.getAccountsReceivable().subscribe(accounts => {
      const accountText = JSON.stringify(accounts, null, 4);
      this.saveData(accountText);
    })
  }

  saveData(data: any) {
    if(data) {
      const blob = new Blob([data], {type: 'text/plain'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  submitForm() {
    if(this.form.valid) {
      console.log(this.form.value)
      const reportType = this.form.value.reportType;
      if (reportType === ReportTypesEnum.RECEIVABLE) {
        return this.getReceivableReport();
      } else if (reportType === ReportTypesEnum.PAYABLE) {
        return this.getPayableReport();

      }
      this.form.reset();
    }
  }

}
