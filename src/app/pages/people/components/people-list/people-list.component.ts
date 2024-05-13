import { Component, Input, SimpleChanges } from '@angular/core';
import { IPeople } from '../../../../shared/interfaces/IPeople';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { PeopleService } from '../../../../shared/service/people/people.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-people-list',
  standalone: false,
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent {

  @Input()
  peopleList:IPeople[] = [];
  displayedColumns:string[] = ['name', 'document', 'birthdate', 'email',  'phone', 'cellNumber'];

  constructor(private peopleService: PeopleService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['peopleList']){
      this.peopleService.getItems().subscribe((items) => {
        this.peopleList = items;
        this.peopleList = [...this.peopleList]
      })
    }
  }

  onStepChange(event: StepperSelectionEvent ) {
    if(event.selectedIndex === 1) {
      this.peopleService.peopleList$.subscribe(items => {
        this.peopleList = items;
      })
    }
  }

  sortTable(sort: Sort): void {
    const data = this.peopleList.slice();
    if(!sort.active || sort.direction === '') {
      this.peopleList = data;
      return;
    }

    this.peopleList = [...data].sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'document':
          return compare(a.document, b.document, isAsc);
        case 'birthdate':
          return compare(a.birthdate, b.birthdate, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
