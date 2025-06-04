import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseEditorModalComponent} from './my-prog-exercise-editor-modal.component';
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

describe('MyProgExerciseEditorModalComponent', () => {
  let component: MyProgExerciseEditorModalComponent;
  let fixture: ComponentFixture<MyProgExerciseEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseEditorModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseEditorModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "Title");
    fixture.componentRef.setInput('progExerciseModalId', "Id");
    fixture.componentRef.setInput('action', ActionEnum.create);
    fixture.componentRef.setInput('progExercise', undefined);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
