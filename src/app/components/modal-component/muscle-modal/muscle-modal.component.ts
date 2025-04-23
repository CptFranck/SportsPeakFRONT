import {Component, input} from '@angular/core';
import {ActionType} from "../../../interface/enum/action-type";
import {ModalComponent} from "../../modal/modal/modal.component";
import {MuscleEntityFormComponent} from "../../form/muscle/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {MuscleDeleteFormComponent} from "../../form/muscle/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../interface/dto/muscle";

@Component({
  selector: 'app-muscle-modal',
  imports: [
    ModalComponent,
    MuscleEntityFormComponent,
    NgIf,
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
