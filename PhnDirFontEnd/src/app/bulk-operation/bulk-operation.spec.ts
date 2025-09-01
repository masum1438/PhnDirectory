import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOperation } from './bulk-operation';

describe('BulkOperation', () => {
  let component: BulkOperation;
  let fixture: ComponentFixture<BulkOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkOperation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkOperation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
