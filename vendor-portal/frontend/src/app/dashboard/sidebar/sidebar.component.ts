import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() profilePic: string = 'assets/vendor_profile.png';
  @Input() userName: string = 'Vendor Name';
  @Input() sidebarOpen: boolean = false;
  @Output() sidebarChanged = new EventEmitter<boolean>();

 
  navLinks = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'RFQs', icon: 'description', route: '/dashboard/rfq' },
    { label: 'Purchase Orders', icon: 'assignment', route: '/dashboard/po' },
    { label: 'Goods Receipt', icon: 'local_shipping', route: '/dashboard/goods-receipt' },
    { label: 'Financial Sheet', icon: 'receipt_long', route: '/dashboard/finance' },
    { label: 'Logout', icon: 'logout', route: '/login' }
  ];

   toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarChanged.emit(this.sidebarOpen); // notify the parent!
  }

  constructor(private router: Router) {}

  handleLogoutClick(event: MouseEvent, link: { label: string; icon: string; route: string }) {
  if (link.label === 'Logout') {
    event.preventDefault();
    event.stopPropagation();  // add this too

    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      // Clear auth tokens or perform logout logic here
      this.router.navigate([link.route]);
    } 
  }
}


  
}
