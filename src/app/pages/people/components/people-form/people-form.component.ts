import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../../../../shared/service/people/people.service';
import { IPeople } from '../../../../shared/interfaces/IPeople';

@Component({
  selector: 'app-people-form',
  standalone: false,
  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css'
})
export class PeopleFormComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService) {}

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
      alert(`cadastrando! id: ${id}`);
      this.form.reset();
    }
  }
}

