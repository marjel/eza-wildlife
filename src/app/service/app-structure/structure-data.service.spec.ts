import { TestBed } from '@angular/core/testing';

import { StructureDataService } from './structure-data.service';

describe('StructureDataService', () => {
  let service: StructureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
