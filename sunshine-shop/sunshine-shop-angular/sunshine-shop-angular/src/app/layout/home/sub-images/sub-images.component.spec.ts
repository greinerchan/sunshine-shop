import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubImagesComponent } from './sub-images.component';

describe('SubImagesComponent', () => {
  let component: SubImagesComponent;
  let fixture: ComponentFixture<SubImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
