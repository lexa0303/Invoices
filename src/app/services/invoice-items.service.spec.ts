import { TestBed, inject } from '@angular/core/testing';

import { InvoiceItemsService } from './invoice-items.service';

describe('InvoiceItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceItemsService]
    });
  });

  it('should be created', inject([InvoiceItemsService], (service: InvoiceItemsService) => {
    expect(service).toBeTruthy();
  }));
});
