import { Component, OnInit } from '@angular/core';
import { PoService } from '../../services/po.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class POComponent implements OnInit {

  isLoading: boolean = false;
  errorMsg: string | null = null;
  noDataFound: boolean = false;
  purchaseOrders: any[] = [];

  private readonly vendorId: string = '0000100000';

  constructor(private poService: PoService) {}

  ngOnInit(): void {
    this.getPurchaseOrders();
  }

  getPurchaseOrders(): void {
    this.isLoading = true;
    this.errorMsg = null;
    this.noDataFound = false;

    this.poService.getPOByVendor(this.vendorId).subscribe({
      next: (response: any) => {
        console.log('API Response received in component:', response);

        // ✅ Adjusted to actual backend structure
        if (response?.data?.length) {
          this.purchaseOrders = response.data;
          console.log("Parsed Purchase Orders:", this.purchaseOrders);
        } else {
          this.noDataFound = true;
        }

        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMsg = 'Failed to load Purchase Order data. Please check your network or try again later.';
        console.error('Error fetching Purchase Order data:', err);
        this.isLoading = false;
        this.purchaseOrders = [];
      },
      complete: () => {
        console.log('Purchase Order data fetching process completed.');
      }
    });
  }

  // ✅ Converts OData date format like "/Date(1748822400000)/" to readable format
  formatODataDate(odataDate: string | undefined): string {
    if (!odataDate) return '—';
    const timestamp = parseInt(odataDate.replace('/Date(', '').replace(')/', ''), 10);
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }
}