import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
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
  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() progExercise: ProgExercise | undefined;
  @Input() action!: ActionType;

  @ViewChild("progExerciseModalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.progExercise = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new programed exercise";
  }
}
