import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSetDeleteFormComponent } from './target-set-delete-form.component';

describe('TargetSetDeleteFormComponent', () => {
  let component: TargetSetDeleteFormComponent;
  let fixture: ComponentFixture<TargetSetDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TargetSetDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
