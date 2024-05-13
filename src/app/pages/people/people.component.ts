import { Component } from '@angular/core';
import { IPeople } from '../../shared/interfaces/IPeople';
import { PeopleService } from '../../shared/service/people/people.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {

  peopleList:IPeople[] = [];

  constructor(private peopleService: PeopleService) {

  }

  ngOnInit() {
    this.peopleService.peopleList$.subscribe((items) => {
      this.peopleList = items;
    })
  }

  onStepChange(event: StepperSelectionEvent ) {
    if(event.selectedIndex === 1) {
      this.peopleService.peopleList$.subscribe(items => {
        this.peopleList = items;
      })
    }
  }

}
