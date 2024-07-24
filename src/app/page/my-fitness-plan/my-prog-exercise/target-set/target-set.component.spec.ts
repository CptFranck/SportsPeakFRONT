import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetComponent } from './target-set.component';

describe('TargetSetComponent', () => {
  let component: TargetSetComponent;
  let fixture: ComponentFixture<TargetSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
