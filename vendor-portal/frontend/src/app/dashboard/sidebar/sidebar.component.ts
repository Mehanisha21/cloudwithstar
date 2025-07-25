import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // Assuming you use Router for navigation/logout

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() profilePic: string = 'assets/vendor_profile.jpg';
  @Input() userName: string = 'Vendor Name';
  @Input() sidebarOpen: boolean = false;
  @Output() sidebarChanged = new EventEmitter<boolean>();

 
  navLinks = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'RFQs', icon: 'description', route: '/dashboard/rfq' },
    { label: 'Purchase Orders', icon: 'assignment', route: '/dashboard/po' },
    { label: 'Goods Receipt', icon: 'local_shipping', route: '/dashboard/goods-receipt' },
    { label: 'Financial Sheet', icon: 'receipt_long', route: '/dashboard/finance-sheet' },
    { label: 'Logout', icon: 'logout', route: '/login' }
  ];

   toggleSidebar() {
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Purchase Orders', route: '/dashboard/po', icon: 'assignment' },
    { label: 'RFQs', route: '/dashboard/rfq', icon: 'receipt_long' },
    { label: 'Invoices', route: '/dashboard/invoices', icon: 'description' },
    { label: 'Shipments', route: '/dashboard/shipments', icon: 'local_shipping' },
    { label: 'Profile', route: '/dashboard/profile', icon: 'person' },
    { label: 'Settings', route: '/dashboard/settings', icon: 'settings' },
    { label: 'Logout', route: '/logout', icon: 'logout' } // Example logout route
  ];

  constructor(private router: Router) { } // Inject Router

  ngOnInit(): void {
    // Initialization logic if needed
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarChanged.emit(this.sidebarOpen); // Emit the new boolean state
  }

  handleLogoutClick(event: Event, link: any): void {
    if (link.label === 'Logout') {
      event.preventDefault(); // Prevent default routerLink navigation
      // Implement your logout logic here
      console.log('Logout initiated');
      this.router.navigate(['/login']); // Redirect to login page after logout
    }
  }
}
