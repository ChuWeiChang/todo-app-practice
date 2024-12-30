import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddPanelComponent } from './quick-add-panel.component';

describe('QuickAddPanelComponent', () => {
  let component: QuickAddPanelComponent;
  let fixture: ComponentFixture<QuickAddPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAddPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAddPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
