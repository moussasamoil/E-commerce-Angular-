import { TestBed } from '@angular/core/testing';

import { LocalstorgeService } from './localstorge.service';

describe('LocalstorgeService', () => {
  let service: LocalstorgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
