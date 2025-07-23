import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  // Define relevant fields returned by your SAP invoice API
  InvoiceNumber: string;         // You can adjust names to match SAP fields
  Lifnr: string;
  Bedat: string;                  // SAP date: "/Date(1234567890)/"
  MaterialDescription: string;
  Amount: number;
  Currency: string;
}

export interface PaymentAging {
  BillingDocument: string;
  Lifnr: string;
  BillingDate: string;            // SAP date
  DueDate: string;                // SAP date
  Amount: number;
  Currency: string;
  Aging: number;                 // You can calculate on frontend or backend
}

export interface Memo {
  MemoId: string;
  Lifnr: string;
  Type: 'Credit' | 'Debit';
  Amount: number;
  Currency: string;
  Description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinancialSheetService {
  private baseUrl = 'http://localhost:5000/api'; // Adjust if you use proxy

  constructor(private http: HttpClient) {}

  getInvoicesByVendor(lifnr: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/invoices/${lifnr}`);
  }

  getPaymentsAgingByVendor(lifnr: string): Observable<PaymentAging[]> {
    return this.http.get<PaymentAging[]>(`${this.baseUrl}/payage/${lifnr}`);
  }

  getCDMemosByVendor(lifnr: string): Observable<Memo[]> {
    return this.http.get<Memo[]>(`${this.baseUrl}/cdmemos/${lifnr}`);
  }
}
