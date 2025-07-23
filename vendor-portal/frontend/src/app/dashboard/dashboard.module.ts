// src/app/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // REQUIRED for *ngIf, *ngFor, [ngClass], [ngStyle]
import { RouterModule } from '@angular/router'; // REQUIRED for routerLink, routerLinkActive

import { HttpClientModule } from '@angular/common/http'; // Often needed in feature modules for services
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // If forms are used in dashboard components

// Import your dashboard components.
// IMPORTANT: Ensure these paths are correct relative to this dashboard.module.ts file,
// and that each component class is 'export'ed in its respective .ts file.
import { RFQComponent } from './rfq/rfq.component';
import { POComponent } from './po/po.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

// NEW: Import DashboardHomeComponent
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component'; // <--- ADDED THIS IMPORT

@NgModule({
  declarations: [
    // Declare all components that belong to this dashboard module
    RFQComponent,
    POComponent,
    SidebarComponent,
    TopNavComponent,
    DashboardLayoutComponent,
    DashboardHomeComponent, // <--- ADDED THIS DECLARATION
  ],
  imports: [
    CommonModule, // Provides *ngIf, *ngFor, [ngClass], [ngStyle], etc.
    RouterModule, // Provides routerLink, routerLinkActive
    HttpClientModule, // If services within this module make HTTP calls
    FormsModule, // If template-driven forms are used
    ReactiveFormsModule, // If reactive forms are used
    DashboardRoutingModule // Your dashboard specific routing
  ],
  exports: [
    // Export components that need to be used in other modules' templates (e.g., AppComponent)
    SidebarComponent, // Often exported if used in AppComponent or other modules
    TopNavComponent, // Often exported if used in AppComponent or other modules
    // DashboardLayoutComponent, // Consider exporting if app.component.html directly uses <app-dashboard-layout>
    // DashboardHomeComponent // Consider exporting if used directly outside this module's routes
  ],
  providers: []
})
export class DashboardModule { }