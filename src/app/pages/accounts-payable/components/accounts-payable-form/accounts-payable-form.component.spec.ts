import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayableFormComponent } from './accounts-payable-form.component';

describe('AccountsPayableFormComponent', () => {
  let component: AccountsPayableFormComponent;
  let fixture: ComponentFixture<AccountsPayableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsPayableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsPayableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
