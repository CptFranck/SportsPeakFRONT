import {Component, input} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {MuscleEntityFormComponent} from "../../forms/muscle/muscle-entity-form/muscle-entity-form.component";
import {MuscleDeleteFormComponent} from "../../forms/muscle/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../model/dto/muscle";
import {ActionType} from "../../../model/enum/action-type";

@Component({
  selector: 'app-muscle-modal',
  imports: [
    ModalComponent,
    MuscleEntityFormComponent,
    MuscleDeleteFormComponent
  ],
  templateUrl: './muscle-modal.component.html'
})
export class MuscleModalComponent {

  readonly modalTitle = input.required<string>();
  readonly muscleModalId = input.required<string>();
  readonly muscle = input<Muscle>();
  readonly action = input.required<ActionType>();

  protected readonly ActionType = ActionType;
}
