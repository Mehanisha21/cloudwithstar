import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() profilePic: string = 'assets/default-profile.png';
  @Input() userName: string = 'Vendor Name';

  sidebarOpen = false;

  navLinks = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'RFQs', icon: 'description', route: '/dashboard/rfq' },
    { label: 'Purchase Orders', icon: 'assignment', route: '/dashboard/po' },
    { label: 'Goods Receipt', icon: 'local_shipping', route: '/dashboard/goods-receipt' },
    { label: 'Financial Sheet', icon: 'receipt_long', route: '/dashboard/finance' },
    { label: 'Logout', icon: 'logout', route: '/logout' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
