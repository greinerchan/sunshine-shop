import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendsComponent } from './recommends.component';

describe('RecommendsComponent', () => {
  let component: RecommendsComponent;
  let fixture: ComponentFixture<RecommendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
