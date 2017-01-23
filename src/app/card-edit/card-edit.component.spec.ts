import { TestBed } from '@angular/core/testing';

import { CardEditComponent } from './card-edit.component';

describe('Card Edit Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [CardEditComponent]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(CardEditComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
  });

});
