import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableListComponent } from './accounts-receivable-list.component';

describe('AccountsReceivableListComponent', () => {
  let component: AccountsReceivableListComponent;
  let fixture: ComponentFixture<AccountsReceivableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsReceivableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsReceivableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
