import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// You may adjust these fields based on your actual SAP structure
export interface GoodsReceipt {
  Mblnr: string;        // Material Document Number
  Mjahr: string;        // Fiscal Year
  Budat: string;        // Posting Date
  Vendor: string;
  Quantity: number;
  Material: string;
  Description: string;
  Plant: string;
  // Add other fields as your SAP response provides
}

@Injectable({ providedIn: 'root' })
export class GoodsReceiptService {
  private apiUrl = 'http://localhost:5000/api/goods-receipt'; // Or '/api/goods-receipt' if using proxy

  constructor(private http: HttpClient) {}

  getAllGoodsReceipts(): Observable<GoodsReceipt[]> {
    return this.http.get<GoodsReceipt[]>(this.apiUrl);
  }
}
