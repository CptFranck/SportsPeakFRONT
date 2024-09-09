import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetModalComponent } from './target-set-modal.component';

describe('TargetSetModalComponent', () => {
  let component: TargetSetModalComponent;
  let fixture: ComponentFixture<TargetSetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
