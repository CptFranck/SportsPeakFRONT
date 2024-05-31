import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMuscleComponent } from './delete-muscle.component';

describe('DeleteMuscleComponent', () => {
  let component: DeleteMuscleComponent;
  let fixture: ComponentFixture<DeleteMuscleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMuscleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMuscleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
