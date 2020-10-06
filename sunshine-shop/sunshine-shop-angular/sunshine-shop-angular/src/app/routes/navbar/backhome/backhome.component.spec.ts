import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackhomeComponent } from './backhome.component';

describe('BackhomeComponent', () => {
  let component: BackhomeComponent;
  let fixture: ComponentFixture<BackhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
