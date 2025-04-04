import {Component, input, model, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {
  MyProgExerciseEntityFormComponent
} from "../../../../components/form/prog-exercise/my-prog-exercise-entity-form/my-prog-exercise-entity-form.component";
import {
  MyProgExercisePerformanceComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-performance/my-prog-exercise-performance.component";

@Component({
  selector: 'app-my-prog-exercise-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
    MyProgExerciseDetailsDisplayComponent,
    MyProgExerciseEntityFormComponent,
    MyProgExercisePerformanceComponent,
  ],
  templateUrl: './my-prog-exercise-modal.component.html'
})
export class MyProgExerciseModalComponent {
  readonly modalTitle = model.required<string>();
  readonly muscleModalId = input.required<string>();
  readonly progExercise = model.required<ProgExercise | undefined>();
  readonly action = model.required<ActionType>();

  @ViewChild("progExerciseModalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.progExercise.set(value);
    this.action.set(ActionType.create);
    this.modalTitle.set("Add new programed exercise");
  }
}
