import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
  Ebeln: string;
  Lifnr: string;
  Bstyp: string;
  Bsart: string;
  Statu: string;
  Ekorg: string;
  Ekgrp: string;
  Bedat: string;
  Waers: string;
  Wkurs: string;
  Ebelp: string;
  Matnr: string;
  Txz01: string;
  Ktmng: string;
  Meins: string;
  Netpr: string;
  Peinh: string;
  Netwr: string;
  Brtwr: string;
}

@Injectable({ providedIn: 'root' })
export class PoService {
  private apiUrl = 'http://localhost:5000/api/po'; // Or '/api/po' with proxy

  constructor(private http: HttpClient) {}

  getPOByVendor(lifnr: string): Observable<{ success: boolean, data: PurchaseOrder[] }> {
    return this.http.get<{ success: boolean, data: PurchaseOrder[] }>(`${this.apiUrl}/${lifnr}`);
  }
}
