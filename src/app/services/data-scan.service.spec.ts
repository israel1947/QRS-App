import { TestBed } from '@angular/core/testing';

import { DataScanService } from './data-scan.service';

describe('DataScanService', () => {
  let service: DataScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
