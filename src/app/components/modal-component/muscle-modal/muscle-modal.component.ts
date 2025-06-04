import {Component, input} from '@angular/core';
import {ActionTypeEnum} from "../../../shared/model/enum/action-type.enum";
import {ModalComponent} from "../../modal/modal/modal.component";
import {MuscleEntityFormComponent} from "../../form/muscle/muscle-entity-form/muscle-entity-form.component";
import {MuscleDeleteFormComponent} from "../../form/muscle/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../shared/model/dto/muscle";

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
  readonly action = input.required<ActionTypeEnum>();

  protected readonly ActionType = ActionTypeEnum;
}
