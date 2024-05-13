import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusinessService } from '../business.service';
import { IPeople } from '../../interfaces/IPeople';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private peopleSubject = new BehaviorSubject<IPeople[]>([]);
  peopleList$ = this.peopleSubject.asObservable();

  private objects: any[] = [];

  constructor(private businessService: BusinessService) {
    this.businessService.getPeople().subscribe((accounts: any) => {
      this.objects = accounts;
      this.peopleSubject.next(this.objects);
    });
  }

  addItem(accountPayableItem: IPeople) {
    const peopleList = this.peopleSubject.getValue();
    peopleList.push(accountPayableItem);
    this.peopleSubject.next(peopleList);
  }

  getItems() {
    return this.peopleList$;
  }

}
