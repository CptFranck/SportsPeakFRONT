import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisesModalComponent} from './my-prog-exercises-modal.component';

describe('MyProgExerciseModalComponent', () => {
  let component: MyProgExercisesModalComponent;
  let fixture: ComponentFixture<MyProgExercisesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisesModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExercisesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
