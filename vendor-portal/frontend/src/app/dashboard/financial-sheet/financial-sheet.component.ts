import { Component, OnInit } from '@angular/core';
import { FinancialSheetService, Invoice, PaymentAging, Memo } from '../../services/financial-sheet.service';

@Component({
  selector: 'app-financial-sheet',
  templateUrl: './financial-sheet.component.html',
  styleUrls: ['./financial-sheet.component.css']
})
export class FinancialSheetComponent implements OnInit {
  invoices: Invoice[] = [];
  payments: PaymentAging[] = [];
  memos: Memo[] = [];

  errorMsg = '';
  activeTab: 'invoices' | 'payments' | 'memos' = 'invoices';

  vendorId = '100000';

  constructor(private financialService: FinancialSheetService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.financialService.getInvoicesByVendor(this.vendorId).subscribe({
      next: (data) => this.invoices = data,
      error: (err) => this.errorMsg = 'Failed to load invoices'
    });

    this.financialService.getPaymentsAgingByVendor(this.vendorId).subscribe({
      next: (data) => {
        this.payments = data.map(p => ({
          ...p,
          Aging: this.calculateAging(p.BillingDate, p.DueDate)
        }));
      },
      error: (err) => this.errorMsg = 'Failed to load payments and aging'
    });

    this.financialService.getCDMemosByVendor(this.vendorId).subscribe({
      next: (data) => this.memos = data,
      error: (err) => this.errorMsg = 'Failed to load credit/debit memos'
    });
  }

  private parseSapDate(sapDateString: string): string {
    if (!sapDateString) return '';
    const m = /\/Date\((\d+)\)\//.exec(sapDateString);
    return m ? new Date(+m[1]).toLocaleDateString() : sapDateString;
  }

  calculateAging(billingDateStr: string, dueDateStr: string): number {
    const billingDate = new Date(this.parseSapDate(billingDateStr));
    const dueDate = new Date(this.parseSapDate(dueDateStr));
    // Aging = DueDate - BillingDate in days (usually aging is days overdue)
    return Math.floor((new Date().getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
  }

  setActiveTab(tab: 'invoices' | 'payments' | 'memos') {
    this.activeTab = tab;
  }
}
