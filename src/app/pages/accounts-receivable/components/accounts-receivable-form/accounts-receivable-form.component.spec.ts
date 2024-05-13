import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableFormComponent } from './accounts-receivable-form.component';

describe('AccountsReceivableFormComponent', () => {
  let component: AccountsReceivableFormComponent;
  let fixture: ComponentFixture<AccountsReceivableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsReceivableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsReceivableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
