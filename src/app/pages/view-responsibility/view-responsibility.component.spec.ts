import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResponsibilityComponent } from './view-responsibility.component';

describe('ViewResponsibilityComponent', () => {
  let component: ViewResponsibilityComponent;
  let fixture: ComponentFixture<ViewResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
