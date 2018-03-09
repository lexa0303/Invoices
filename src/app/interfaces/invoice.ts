import {InvoiceItem} from './invoice-item';
import {Customer} from './customer';

export interface Invoice {
  id: number;
  customer_id: number;
  discount: number;
  total: number;
  products?: Array<InvoiceItem>;
  customer?: Customer;
}
