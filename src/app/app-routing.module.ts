import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InvoiceListComponent,
  },
  {
    path: 'invoice',
    pathMatch: 'full',
    component: InvoiceDetailComponent,
  },
  {
    path: 'invoice/:id',
    pathMatch: 'full',
    component: InvoiceDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
