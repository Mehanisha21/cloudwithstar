import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
  // Define fields according to your SAP response shape
  // Example of typical PO fields; adjust based on SAP data structure!
  PurchaseOrder: string;
  Vendor: string;
  DocumentDate: string;
  DeliveryDate: string;
  TotalAmount: number;
  Currency: string;
  Status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PoService {
  private apiUrl = 'http://localhost:5000/api/po';  // Adjust as needed for your backend

  constructor(private http: HttpClient) {}

  getPOByVendor(lifnr: string): Observable<PurchaseOrder[]> {
    // Calls your Node backend API: GET /api/po/:Lifnr
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/${lifnr}`);
  }
}
