import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  summaryCards = [
    { label: 'Open RFQs', value: 7, icon: 'description', color: 'linear-gradient(120deg,#2d81f7 60%, #72e7fd 100%)' },
    { label: 'Active POs', value: 5, icon: 'assignment', color: 'linear-gradient(120deg,#43a047 70%, #b8f2cc 100%)' },
    { label: 'Goods Receipts', value: 12, icon: 'local_shipping', color: 'linear-gradient(120deg,#fb8c00 70%, #ffe082 100%)' },
    { label: 'Outstanding Invoices', value: 3, icon: 'receipt', color: 'linear-gradient(120deg,#d32f2f 70%, #ffbdbd 100%)' }
  ];

  rfqs = [
    { id: 'RFQ1001', item: 'Industrial Valve', qty: 50, due: '2025-08-10', status: 'Open' },
    { id: 'RFQ1002', item: 'Water Pump', qty: 30, due: '2025-08-20', status: 'Submitted' },
    { id: 'RFQ1003', item: 'Pipe Sealing Kit', qty: 5, due: '2025-09-01', status: 'Open' },
    { id: 'RFQ1004', item: 'Steel Flange', qty: 100, due: '2025-09-15', status: 'Awarded' },
    { id: 'RFQ1005', item: 'Expansion Joint', qty: 15, due: '2025-10-05', status: 'Closed' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Later: fetch summary data/RFQs from API
  }
}
