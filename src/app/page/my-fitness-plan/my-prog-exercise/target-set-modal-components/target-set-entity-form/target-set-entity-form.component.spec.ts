import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetEntityFormComponent } from './target-set-entity-form.component';

describe('TargetSetEntityFormComponent', () => {
  let component: TargetSetEntityFormComponent;
  let fixture: ComponentFixture<TargetSetEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
