import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsibilityComponent } from './create-responsibility.component';

describe('CreateResponsibilityComponent', () => {
  let component: CreateResponsibilityComponent;
  let fixture: ComponentFixture<CreateResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
