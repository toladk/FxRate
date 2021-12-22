import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UseErrorInterceptor } from './authentication/service/error.interceptor';

// ANT JS;
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { TwoFactorComponent } from './authentication/two-factor/two-factor.component';
import { TransactionssComponent } from './pages/transaction/transactionss/transactionss.component';
import { FxrateComponent } from './pages/fxrate/fxrate.component';
import { TransactionfilterPipe } from './pages/transaction/searchfolder/transactionfilter.pipe';
import { ReportComponent } from './pages/report/report.component';
import { ReportfilterPipe } from './pages/transaction/searchfolder/reportfilter.pipe';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ApplayoutComponent,
    TwoFactorComponent,
    TransactionssComponent,
    FxrateComponent,
    TransactionfilterPipe,
    ReportComponent,
    ReportfilterPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzToolTipModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    NzTabsModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzStepsModule,
    NzListModule,
    NzResultModule,
    NzGridModule,
    NzUploadModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzBadgeModule,
    NzModalModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzRadioModule,
    NzTableModule,
    NgxPaginationModule,
    OrderModule,
    PdfViewerModule
  ],
  providers: [UseErrorInterceptor, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
