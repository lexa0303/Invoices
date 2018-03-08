import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public invoiceList: any;
  public customers;
  public products;

  constructor(private http: HttpService) {
  }

  async ngOnInit() {
    this.customers = await this.http.request({
      method: 'get',
      url: '/api/customers'
    });

    this.refreshInvoices();
  }

  private async refreshInvoices() {
    this.invoiceList = await this.http.request({
      method: 'get',
      url: '/api/invoices'
    });

    this.invoiceList.forEach(invoice => {
      invoice.customer = this.getCustomer(invoice.customer_id);
    });
  }

  private getCustomer(id) {
    return this.customers.filter(customer => parseInt(customer.id) === parseInt(id)).shift();
  }

  public async deleteInvoice(item) {
    await this.http.request({
      method: 'delete',
      url: '/api/invoices/' + item.id
    });
    this.refreshInvoices();
  }
}
