import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetCardComponent } from './target-set-card.component';

describe('TargetSetCardComponent', () => {
  let component: TargetSetCardComponent;
  let fixture: ComponentFixture<TargetSetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
