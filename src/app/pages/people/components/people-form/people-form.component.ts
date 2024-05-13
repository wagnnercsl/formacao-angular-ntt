import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PeopleService } from '../../../../shared/service/people/people.service';
import { IPeople } from '../../../../shared/interfaces/IPeople';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-people-form',
  standalone: false,
  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css'
})
export class PeopleFormComponent {

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      document: ['', [Validators.required, Validators.min(1)]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cellNumber: ['', [Validators.required]]
    })
  }

  submitForm() {
    if(this.form.valid) {
      const randomId = Math.random() * (99 - 5) + 5;
      const id = parseInt(randomId.toString()).toString();

      const newItem: IPeople = {
        id,
        name: this.form.value.name,
        document: this.form.value.document,
        birthdate: new Date(this.form.value.birthdate).toLocaleDateString('pt-BR'),
        email: this.form.value.email,
        phone: this.form.value.phone,
        cellNumber: this.form.value.cellNumber
      }

      this.peopleService.addItem(newItem);
      this._snackBar.open('Pessoa cadastrada com sucesso!', 'Fechar', { duration: 3000, verticalPosition: 'bottom'});
      this.formRef.resetForm();
    }
  }
}

