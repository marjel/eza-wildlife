import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolBarComponent } from './main-tool-bar.component';

describe('MainToolBarComponent', () => {
  let component: MainToolBarComponent;
  let fixture: ComponentFixture<MainToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
