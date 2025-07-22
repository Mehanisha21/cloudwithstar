import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RFQComponent } from './rfq/rfq.component';
import { POComponent } from './po/po.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'rfq', component: RFQComponent }, 
      { path: 'po', component: POComponent },     
      // ...other feature child routes
    ]
  }
];

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SidebarComponent,
    DashboardHomeComponent,
    TopNavComponent,
    RFQComponent,
    POComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // FormsModule, ReactiveFormsModule, etc. if needed
  ]
})
export class DashboardModule { }
