import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilitySelectComponent } from './visibility-select.component';

describe('VisibilitySelectComponent', () => {
  let component: VisibilitySelectComponent;
  let fixture: ComponentFixture<VisibilitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibilitySelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisibilitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
