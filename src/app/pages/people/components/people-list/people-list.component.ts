import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { IPeople } from '../../../../shared/interfaces/IPeople';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { PeopleService } from '../../../../shared/service/people/people.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-people-list',
  standalone: false,
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent {

  @Input()
  peopleList:IPeople[] = [];

  dataSource = new MatTableDataSource<IPeople>(this.peopleList);
  displayedColumns:string[] = ['name', 'document', 'birthdate', 'email',  'phone', 'cellNumber'];

  constructor(private peopleService: PeopleService) {}

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['peopleList']){
      this.peopleService.getItems().subscribe((items) => {
        this.peopleList = items;
        this.dataSource.data = this.peopleList
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
}
