import { Component } from '@angular/core';
import { DashboardModule } from "../dashboard.module";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  
})
export class DashboardLayoutComponent {
  sidebarOpen = false;

  // Listen for sidebar toggle event
  onSidebarToggle(open: boolean) {
    this.sidebarOpen = open;
  }
}
