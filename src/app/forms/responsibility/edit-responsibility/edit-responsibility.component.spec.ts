import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResponsibilityComponent } from './edit-responsibility.component';

describe('EditResponsibilityComponent', () => {
  let component: EditResponsibilityComponent;
  let fixture: ComponentFixture<EditResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
