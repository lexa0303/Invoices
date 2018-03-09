import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class InvoiceItemsService {

  private url = '/api/invoices/{id}/items';

  constructor(private http: HttpService) { }

  private makeUrl (invoice_id, item_id = false): string {
    let result = this.url.replace('{id}', invoice_id);
    if (item_id) {
      result += '/' + item_id;
    }
    return result;
  }

  public get(id): Promise<any> {
    return this.http.request({
      method: 'get',
      url: this.makeUrl(id)
    });
  }

  public getById(invoiceId, itemId): Promise<any> {
    return this.http.request({
      method: 'get',
      url: this.makeUrl(invoiceId, itemId)
    });
  }

  public add(id, data): Promise<any> {
    return this.http.request({
      method: 'post',
      url: this.makeUrl(id),
      data: data
    });
  }

  public update(id, data): Promise<any> {
    return this.http.request({
      method: 'put',
      url: this.makeUrl(id, data.id),
      data: data
    });
  }

  public delete(invoice_id, item_id): Promise<any> {
    return this.http.request({
      method: 'delete',
      url: this.makeUrl(invoice_id, item_id)
    });
  }

}
