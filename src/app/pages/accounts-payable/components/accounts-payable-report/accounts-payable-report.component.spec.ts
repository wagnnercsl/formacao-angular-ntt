import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayableReportComponent } from './accounts-payable-report.component';

describe('AccountsPayableReportComponent', () => {
  let component: AccountsPayableReportComponent;
  let fixture: ComponentFixture<AccountsPayableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsPayableReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsPayableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
