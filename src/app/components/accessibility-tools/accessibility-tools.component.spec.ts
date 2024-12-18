import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityToolsComponent } from './accessibility-tools.component';

describe('AccessibilityToolsComponent', () => {
  let component: AccessibilityToolsComponent;
  let fixture: ComponentFixture<AccessibilityToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibilityToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
