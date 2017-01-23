import { inject, TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';

describe('Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [CardsService]});
  });

  it('should ...', inject([CardsService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
