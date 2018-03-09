import {Product} from './product';

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  product_id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
}
