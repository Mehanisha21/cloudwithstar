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

@Injectable({ providedIn: 'root' })
export class PoService {
  private apiUrl = 'http://localhost:5000/api/po';  // Adjust as needed for your backend

  constructor(private http: HttpClient) { }

  getPOByVendor(lifnr: string): Observable<PurchaseOrder[]> {
    // Calls your Node backend API: GET /api/po/:Lifnr
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/${lifnr}`);
  }
}
