import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {InvoiceItemsService} from './services/invoice-items.service';
import {FormsModule} from '@angular/forms';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';
import { SummPipe } from './pipes/summ.pipe';
import { DiscountPipe } from './pipes/discount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    SummPipe,
    DiscountPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpService,
    InvoiceItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
