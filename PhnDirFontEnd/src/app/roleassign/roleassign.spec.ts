import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roleassign } from './roleassign';

describe('Roleassign', () => {
  let component: Roleassign;
  let fixture: ComponentFixture<Roleassign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roleassign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roleassign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
