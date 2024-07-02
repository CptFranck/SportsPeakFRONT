import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../muscles/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../muscles/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../muscles/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {ActionType} from "../../../../enum/action-type";
import {ExerciseType} from "../../../../interface/dto/exerciseType";
import {
  ExerciseTypeDetailsDisplayComponent
} from "../exercise-type-modal-components/exercise-type-details-display/exercise-type-details-display.component";
import {
  ExerciseTypeEntityFormComponent
} from "../exercise-type-modal-components/exercise-type-entity-form/exercise-type-entity-form.component";
import {
  ExerciseTypeDeleteFormComponent
} from "../exercise-type-modal-components/exercise-type-delete-form/exercise-type-delete-form.component";
import {UserLoggedService} from "../../../../services/userLogged/user-logged.service";

@Component({
  selector: 'app-exercise-type-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    ExerciseTypeDetailsDisplayComponent,
    ExerciseTypeEntityFormComponent,
    ExerciseTypeDeleteFormComponent
  ],
  templateUrl: './exercise-type-modal.component.html',
})
export class ExerciseTypeModalComponent implements OnInit {
  isAdmin: boolean = false;
  @Input() modalTitle!: string;
  @Input() exerciseTypeModalId!: string;
  @Input() exerciseType: ExerciseType | undefined;
  @Input() action!: ActionType;
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>
  protected readonly ActionType = ActionType;
  private userLoggedService: UserLoggedService = inject(UserLoggedService);


  ngOnInit(): void {
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  onClick(value: undefined) {
    this.exerciseType = value
    this.action = ActionType.create
    this.modalTitle = "Add new exerciseType";
  }
}
