import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionssComponent } from './transactionss.component';

describe('TransactionssComponent', () => {
  let component: TransactionssComponent;
  let fixture: ComponentFixture<TransactionssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
