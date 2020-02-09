import { TestBed } from '@angular/core/testing';

import { TranslatationService } from './translatation.service';

describe('TranslatationService', () => {
  let service: TranslatationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
