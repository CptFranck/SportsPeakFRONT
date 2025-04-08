import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseEditorModalComponent} from './my-prog-exercise-editor-modal.component';

describe('MyProgExerciseModalComponent', () => {
  let component: MyProgExerciseEditorModalComponent;
  let fixture: ComponentFixture<MyProgExerciseEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseEditorModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
