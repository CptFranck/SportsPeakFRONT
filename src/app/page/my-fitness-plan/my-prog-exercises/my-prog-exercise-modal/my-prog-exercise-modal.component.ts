import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../enum/action-type";
import {
  MyProgExerciseDeleteFormComponent
} from "../my-prog-exercise-modal-components/my-prog-exercise-delete-form/my-prog-exercise-delete-form.component";

@Component({
  selector: 'app-my-prog-exercise-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
    MyProgExerciseDeleteFormComponent
  ],
  templateUrl: './my-prog-exercise-modal.component.html',
})
export class MyProgExerciseModalComponent {
  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() progExercise: ProgExercise | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.progExercise = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new muscle";
  }
}
