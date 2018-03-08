import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceItemsService} from '../services/invoice-items.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  public customers: any;
  public products: any;
  public invoice = {
    id: null,
    customer_id: null,
    products: [],
    discount: 0,
    total: 0
  };

  private selectedProduct: any;

  constructor(private http: HttpService,
              private route: ActivatedRoute,
              private router: Router,
              private invoiceItems: InvoiceItemsService) {
  }

  async ngOnInit() {
    this.customers = await this.http.request({
      method: 'get',
      url: '/api/customers'
    });
    this.products = await this.http.request({
      method: 'get',
      url: '/api/products'
    });

    this.route.params.subscribe( async data => {
      if (!data.id) {
        const invoice: any = await this.http.request({
          method: 'post',
          url: '/api/invoices',
          data: {}
        });
        this.router.navigate(['/invoice/' + invoice.id]);
      } else {
        this.invoice = await this.http.request({
          method: 'get',
          url: '/api/invoices/' + data.id
        });

        this.refreshItems();
        console.log(this.invoice);
      }
    });
  }

  private async refreshItems() {
    const items = await this.invoiceItems.get(this.invoice.id);
    this.invoice.products = items.map(item => {
      item.product = this.getProduct(item.product_id);
      return item;
    });
  }

  public async addProduct() {
    if (!this.selectedProduct) {
      return;
    }
    const addedProduct = this.getAddedProduct(this.selectedProduct);
    if (addedProduct) {
      addedProduct.quantity++;
      this.updateProduct(addedProduct);
      return;
    }
    this.invoice.products = this.invoice.products || [];
    const product = this.getProduct(this.selectedProduct);
    if (!product) {
      return;
    }
    const result = await this.invoiceItems.add(this.invoice.id, {
      product_id: product.id,
      quantity: 1
    });
    result.product = this.getProduct(result.product_id);
    this.invoice.products.push(result);

    this.updateInvoice();
  }

  public updateProduct(product) {
    this.invoiceItems.update(this.invoice.id, product);
    this.updateInvoice();
  }

  public async deleteProduct(product) {
    const result = await this.invoiceItems.delete(this.invoice.id, product.id);
    if (result) {
      this.refreshItems();
    }
  }

  private getProduct(id) {
    return this.products.filter(product => parseInt(product.id) === parseInt(id))[0];
  }

  private getAddedProduct(id) {
    return this.invoice.products.filter(product => parseInt(product.product_id) === parseInt(id))[0];
  }

  public updateInvoice() {
    this.updateTotal();
    this.http.request({
      method: 'put',
      url: '/api/invoices/' + this.invoice.id,
      data: this.invoice
    });
  }

  private updateTotal() {
    this.invoice.total = this.invoice.products.reduce((sum, product) => {
      return sum + (product.product.price * product.quantity) * (100 - this.invoice.discount) / 100;
    }, 0);
  }

}
