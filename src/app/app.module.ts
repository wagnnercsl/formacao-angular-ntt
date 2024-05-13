import { PeopleFormComponent } from './pages/people/components/people-form/people-form.component';
import { PeopleListComponent } from './pages/people/components/people-list/people-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BusinessService } from './shared/service/business.service';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { AccountsPayableComponent } from './pages/accounts-payable/accounts-payable.component';
import { AccountsReceivableComponent } from './pages/accounts-receivable/accounts-receivable.component';
import { PeopleComponent } from './pages/people/people.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { AccountsPayableListComponent } from "./pages/accounts-payable/components/accounts-payable-list/accounts-payable-list.component";
import { AccountsPayableFormComponent } from './pages/accounts-payable/components/accounts-payable-form/accounts-payable-form.component';
import { AccountsPayableReportComponent } from './pages/accounts-payable/components/accounts-payable-report/accounts-payable-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { AccountsReceivableFormComponent } from './pages/accounts-receivable/components/accounts-receivable-form/accounts-receivable-form.component';
import { AccountsReceivableListComponent } from './pages/accounts-receivable/components/accounts-receivable-list/accounts-receivable-list.component';
import { MatOption, MatSelect } from '@angular/material/select';


registerLocaleData(localePt);


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AccountsPayableComponent,
        AccountsReceivableComponent,
        PeopleComponent,
        ReportsComponent,
        AccountsPayableFormComponent,
        AccountsPayableListComponent,
        AccountsReceivableFormComponent,
        AccountsReceivableListComponent,
        PeopleListComponent,
        PeopleFormComponent
    ],
    providers: [
        BusinessService,
        provideCharts(withDefaultRegisterables()),
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        BaseChartDirective,
        SharedModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        AccountsPayableReportComponent,
        MatButtonModule,
        MatSelect,
        MatOption
    ]
})
export class AppModule {
}
