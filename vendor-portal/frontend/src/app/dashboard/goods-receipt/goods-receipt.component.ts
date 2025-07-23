import { Component, OnInit } from '@angular/core';
import { GoodsReceiptService, GoodsReceipt } from '../../services/goods-receipt.service';

@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.css']
})
export class GoodsReceiptComponent implements OnInit {
  goodsReceipts: GoodsReceipt[] = [];
  errorMsg = '';

  constructor(private goodsReceiptService: GoodsReceiptService) {}

  ngOnInit(): void {
    this.goodsReceiptService.getAllGoodsReceipts().subscribe({
      next: (receipts: GoodsReceipt[]) => {
        this.goodsReceipts = receipts;
      },
      error: (err: any) => {
        this.errorMsg = 'Failed to load goods receipts.';
        console.error('Goods Receipt loading error:', err);
      }
    });
  }
}
