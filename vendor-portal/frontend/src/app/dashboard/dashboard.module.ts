import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
// import { RFQComponent } from './rfq/rfq.component';
// import { POComponent } from './po/po.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      // { path: 'rfq', component: RFQComponent },    // /dashboard/rfq
      // { path: 'po', component: POComponent },      // /dashboard/po
      // ...other feature child routes
    ]
  }
];

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    DashboardHomeComponent,
    // ...other feature components
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
    // Add FormsModule, ReactiveFormsModule, etc. here if the feature needs them
  ]
})
export class DashboardModule { }
