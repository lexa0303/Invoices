import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Invoice} from '../interfaces/invoice';
import {Customer} from '../interfaces/customer';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public invoiceList: Array<Invoice>;
  public customers: Array<Customer>;

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

  private getCustomer(id): Customer {
    return this.customers.filter(customer => customer.id === parseInt(id))[0];
  }

  public async deleteInvoice(item: Invoice) {
    await this.http.request({
      method: 'delete',
      url: '/api/invoices/' + item.id
    });
    this.refreshInvoices();
  }
}
