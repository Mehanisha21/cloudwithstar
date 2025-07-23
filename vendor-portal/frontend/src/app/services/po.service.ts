import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface PurchaseOrder {
//   Ebeln: string;
//   Lifnr: string;
//   Bedat: string;
//   Ebelp: string;
//   Matnr: string;
//   Txz01: string;
//   Ktmng: number;
//   Meins: string;
//   Netpr: number;
//   Peinh: number;
//   Netwr: number;
//   Brtwr: number;
//   Waers: string;
//   Statu: string;
//   Bstyp: string;
//   Bsart: string;
// }

// //interface ApiResponse {
//   //success: boolean;
//   message?: string;
//   data: PurchaseOrder[];
// }

@Injectable({
  providedIn: 'root'
})
export class PoService {
  // *** CRITICAL CHANGE: Updated to use Node.js port 5000 ***
  // This URL combines your Node.js server address (localhost:5000)
  // with the base path '/api' defined in your server.js.
  // You MUST ensure that the actual route defined in your 'routes/po.js'
  // (e.g., router.get('/purchase-orders', ...)) matches the final path here.
  // For example, if po.js has router.get('/purchase-orders', ...), then this should be:
  private apiUrl = 'http://localhost:5000/api/po'; // <--- ADJUST THIS FINAL PATH IF NEEDED

  constructor(private http: HttpClient) { }

  getPOByVendor(vendorId: string) {
    // If your Node.js API expects vendorId as a query parameter:
    // return this.http.get<ApiResponse>(`${this.apiUrl}?vendorId=${vendorId}`);
    // Otherwise:
    return this.http.get(`${this.apiUrl}/${vendorId}`);
    // return this.http.get(this.apiUrl);
  }
}