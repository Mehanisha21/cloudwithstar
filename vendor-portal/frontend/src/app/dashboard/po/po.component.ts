import { Component, OnInit } from '@angular/core';
import { PoService, PurchaseOrder } from '../../services/po.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class POComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  errorMsg = '';

  constructor(private poService: PoService) {}

  ngOnInit(): void {
    const lifnr = '123456'; // Replace with actual Vendor Id from auth or route param

    this.poService.getPOByVendor(lifnr).subscribe({
      next: (pos) => {
        this.purchaseOrders = pos;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load Purchase Orders.';
        console.error('PO loading error:', err);
      }
    });
  }
}
