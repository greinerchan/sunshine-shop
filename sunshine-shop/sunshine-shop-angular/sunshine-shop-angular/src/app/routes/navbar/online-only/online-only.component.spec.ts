import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineOnlyComponent } from './online-only.component';

describe('OnlineOnlyComponent', () => {
  let component: OnlineOnlyComponent;
  let fixture: ComponentFixture<OnlineOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
