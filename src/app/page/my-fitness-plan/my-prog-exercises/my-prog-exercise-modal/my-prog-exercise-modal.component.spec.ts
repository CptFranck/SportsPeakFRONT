import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgExerciseModalComponent } from './my-prog-exercise-modal.component';

describe('MyProgExerciseModalComponent', () => {
  let component: MyProgExerciseModalComponent;
  let fixture: ComponentFixture<MyProgExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProgExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
