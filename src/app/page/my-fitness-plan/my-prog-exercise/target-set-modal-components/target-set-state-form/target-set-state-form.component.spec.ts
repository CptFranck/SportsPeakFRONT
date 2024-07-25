import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetStateFormComponent } from './target-set-state-form.component';

describe('TargetSetStateFormComponent', () => {
  let component: TargetSetStateFormComponent;
  let fixture: ComponentFixture<TargetSetStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetStateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
