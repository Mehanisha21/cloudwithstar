import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; // Assuming you use Router for navigation/logout

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sidebarOpen: boolean = false; // Input property to control sidebar state
  @Output() sidebarChanged = new EventEmitter<boolean>(); // Output to notify parent of state change

  profilePic: string = 'https://placehold.co/40x40/FF5733/FFFFFF?text=VP'; // Placeholder for profile pic
  userName: string = 'Vendor User'; // Placeholder for user name

  navLinks = [
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
