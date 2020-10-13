import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAsstComponent } from './header-asst.component';

describe('HeaderAsstComponent', () => {
  let component: HeaderAsstComponent;
  let fixture: ComponentFixture<HeaderAsstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAsstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAsstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
