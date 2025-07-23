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
    const lifnr = '100000';
    this.poService.getPOByVendor(lifnr).subscribe({
      next: (res) => {
        if (res.success) {
          this.purchaseOrders = res.data;
        } else {
          this.errorMsg = 'Failed to load Purchase Orders.';
        }
      },
      error: (err) => {
        this.errorMsg = 'Failed to load Purchase Orders.';
        console.error('PO loading error:', err);
      }
    });
  }

  // SAP date to JS date
  parseSapDate(sapDateString: string): string {
    if (!sapDateString) return '';
    const match = /\/Date\((\d+)\)\//.exec(sapDateString);
    if (match) {
      const date = new Date(+match[1]);
      return date.toLocaleDateString();
    }
    return sapDateString;
  }
}
