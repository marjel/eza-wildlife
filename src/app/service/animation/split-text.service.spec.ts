import { TestBed } from '@angular/core/testing';

import { SplitTextService } from './split-text.service';

describe('SplitTextService', () => {
  let service: SplitTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
