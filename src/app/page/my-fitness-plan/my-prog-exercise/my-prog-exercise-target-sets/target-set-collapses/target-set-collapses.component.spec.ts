import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetCollapsesComponent } from './target-set-collapses.component';

describe('TargetSetCollapsesComponent', () => {
  let component: TargetSetCollapsesComponent;
  let fixture: ComponentFixture<TargetSetCollapsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetCollapsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetCollapsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
