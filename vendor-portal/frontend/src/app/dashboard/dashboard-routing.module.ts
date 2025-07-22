import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
// import { RFQComponent } from './rfq/rfq.component';
// import { POComponent } from './po/po.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardHomeComponent }, // This loads at /dashboard
      // { path: 'rfq', component: RFQComponent },    // /dashboard/rfq
      // { path: 'po', component: POComponent },      // /dashboard/po
      // ...other dashboard features
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
