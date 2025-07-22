import { Component, OnInit } from '@angular/core';
import { RfqService } from '../../services/rfq.service';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.css']
})
export class RFQComponent implements OnInit {
  rfqs: any[] = [];
  errorMsg = '';

  constructor(private rfqService: RfqService) {}

  ngOnInit(): void {
    const lifnr = '123456'; // for example

    this.rfqService.getRfqsByVendor(lifnr).subscribe({
      next: (res: { success: boolean; data: any[] }) => {
        if (res.success) {
          this.rfqs = res.data;
        } else {
          this.errorMsg = 'Failed to load RFQ data';
        }
      },
      error: (err: any) => {
        this.errorMsg = 'Error communicating with server';
        console.error(err);
      }
    });
  }
}
