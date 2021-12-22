import { FxrateComponent } from './pages/fxrate/fxrate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imported Component
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './authentication/login/login.component';
import { TwoFactorComponent } from './authentication/two-factor/two-factor.component';
import { TransactionssComponent } from './pages/transaction/transactionss/transactionss.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent ,
  },
  {
    path : 'two-factor',
    component : TwoFactorComponent ,
  },

  {
    path : 'app',
    component : ApplayoutComponent ,
    children : [
      {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
      },
      {
        path : 'dashboard',
        component : DashboardComponent
      },
      {
        path : 'transaction',
        component : TransactionssComponent
      },
      {
        path : 'fxrate',
        component : FxrateComponent
      },
      {
        path : 'report',
        component : ReportComponent
      },
      {
        path : '**',
        redirectTo : ''
      }
    ]
  },

  {
    path : '**',
    redirectTo : ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
