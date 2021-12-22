import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxrateComponent } from './fxrate.component';

describe('FxrateComponent', () => {
  let component: FxrateComponent;
  let fixture: ComponentFixture<FxrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
