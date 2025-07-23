import { Component, OnInit } from '@angular/core';
import { RfqService } from '../../services/rfq.service'; // Adjust path if necessary

// Define the interface for the RFQ data as it will be displayed in the component.
// This provides strong typing for your 'rfqs' array and improves code readability.
export interface RfqDisplay {
  id: string;      // Mapped from __metadata.uri (RFQ ID)
  item: string;    // Mapped from Txz01 (Short Text / Item Description)
  qty: string;     // Mapped from Ktmng (Target Quantity), formatted as an integer string
  due: string;     // Mapped and formatted from Bedat (Document Date) as a readable date string
  status: string;  // Status of the RFQ (e.g., 'Open', 'Submitted', 'Awarded', 'Closed')
}

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.css']
})
export class RFQComponent implements OnInit {
  rfqs: RfqDisplay[] = []; // Array to hold the formatted RFQ data, strongly typed
  isLoading: boolean = false; // Flag to indicate if data is currently being loaded
  errorMsg: string | null = null; // Holds any error message to display, null if no error

  // IMPORTANT: This vendor ID is hardcoded for demonstration.
  // In a real application, fetch this from a user session, route parameter, or another service.
  private readonly vendorId: string = '0000100000';

  constructor(private rfqService: RfqService) {}

  ngOnInit(): void {
    // Fetch RFQ data when the component initializes
    this.getRfqs();
  }

  /**
   * Fetches RFQ data for the specified vendor from the RfqService.
   * Handles loading states, data transformation, and error messages.
   */
  getRfqs(): void {
    this.isLoading = true; // Set loading state to true
    this.errorMsg = null;  // Clear any previous error messages

    this.rfqService.getRfqsByVendor(this.vendorId).subscribe({
      next: (res: { success: boolean; data: any[] }) => {
        // Check if the API response indicates success and contains data
        if (res.success && res.data && res.data.length > 0) {
          // Map the raw API data to the desired RfqDisplay structure
          this.rfqs = res.data.map(rfqData => {
            // Extract RFQ ID from the __metadata.uri string using a regular expression
            const rfqIdMatch = rfqData.__metadata?.uri?.match(/VEN_RFQSet\('(\d+)'\)/);
            const rfqId = rfqIdMatch ? rfqIdMatch[1] : 'N/A'; // Default to 'N/A' if ID not found

            // Parse and format the OData date string (e.g., "/Date(1747699200000)/")
            let dueDate = 'N/A';
            if (rfqData.Bedat) {
              try {
                // Extract timestamp (digits inside the parentheses)
                const timestampMatch = rfqData.Bedat.match(/\/Date\((\d+)\)\//);
                if (timestampMatch && timestampMatch[1]) {
                  const timestamp = parseInt(timestampMatch[1], 10);
                  const date = new Date(timestamp);
                  // Format date to a locale-specific string (e.g., "MM/DD/YYYY")
                  dueDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  });
                }
              } catch (e) {
                console.warn('Error parsing date:', rfqData.Bedat, e);
                dueDate = 'Invalid Date'; // Indicate if parsing failed
              }
            }

            // Return the transformed RFQ object
            return {
              id: rfqId,
              item: rfqData.Txz01 || 'N/A', // Use 'N/A' if item description is missing
              qty: (parseFloat(rfqData.Ktmng) || 0).toFixed(0), // Convert to number, default to 0, then format to string
              due: dueDate,
              status: 'Open' // Currently hardcoded. If API provides status, map it here.
            } as RfqDisplay; // Cast to ensure it matches the interface
          });
        } else {
          // If no data or success is false, set an appropriate message
          this.rfqs = []; // Ensure the RFQs array is empty
          this.errorMsg = 'No RFQ data found for this vendor or API response was unsuccessful.';
        }
        this.isLoading = false; // Data processing complete, stop loading
      },
      error: (err: any) => {
        // Handle errors from the HTTP request (e.g., network issues, server errors)
        this.errorMsg = 'Failed to load RFQ data. Please check your network or try again later.';
        console.error('Error fetching RFQ data:', err);
        this.isLoading = false; // Stop loading on error
        this.rfqs = []; // Clear any potentially partial data on error
      },
      complete: () => {
        // This block executes when the Observable sequence finishes (either success or error)
        console.log('RFQ data fetching process completed.');
      }
    });
  }

  /**
   * trackBy function for *ngFor to improve performance.
   * It tells Angular how to identify unique items in the 'rfqs' array.
   * @param index The index of the item in the array.
   * @param rfq The current RfqDisplay object.
   * @returns A unique identifier for the rfq (its 'id').
   */
  trackByRfqId(index: number, rfq: RfqDisplay): string {
    return rfq.id; // Assuming 'id' is unique for each RFQ
  }
}