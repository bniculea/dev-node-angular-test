import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceCheckPageComponent } from './performance-check-page.component';

describe('PerformanceCheckPageComponent', () => {
  let component: PerformanceCheckPageComponent;
  let fixture: ComponentFixture<PerformanceCheckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceCheckPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
