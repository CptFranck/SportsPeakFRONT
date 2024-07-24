import {Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {User} from "../../../../interface/dto/user";
import {ProgExerciseRowDetail} from "../../../../interface/utils/prog-exercise-row-detail";
import {Dictionary} from "../../../../interface/utils/dictionary";

@Component({
  selector: 'app-prog-exercises-array',
  standalone: true,
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './prog-exercises-array.component.html',
})
export class ProgExercisesArrayComponent implements OnChanges {
  isAdmin: boolean = false;
  userLogged: User | undefined;
  progExerciseDetails: Dictionary<ProgExerciseRowDetail> = {};
  subscribeClassButton: string = "btn-Success";

  @Input() progExercises!: ProgExercise[];
  @Input() modalId!: string;

  @Output() actionMuscle: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => {
      this.userLogged = user;
      this.isAdmin = this.userLoggedService.isAdmin()
    });
    this.progExercises.forEach((progExercise: ProgExercise) => {
      let detail: ProgExerciseRowDetail = {
        show: false,
        subscribed: false,
        creator: false
      }
      if (this.userLogged) {
        detail.subscribed = this.userLogged.subscribedProgExercises.some(
          (progEx: ProgExercise) => progExercise.id === progEx.id
        );
        detail.creator = this.userLogged.progExercisesCreated.some(
          (progEx: ProgExercise) => progExercise.id === progEx.id
        );
      }
      this.progExerciseDetails[progExercise.id] = detail;
      console.log(this.progExerciseDetails)
    });
  }

  expendProgExerciseDetails(id: string): void {
    this.progExerciseDetails[id].show = !this.progExerciseDetails[id].show;
  }

  showMuscleDetails(progExercise: ProgExercise): void {
    this.actionMuscle.emit({
      actionType: ActionType.read,
      object: progExercise
    });
  }

  subScribeToProgExercise(progExercise: ProgExercise): void {
    this.actionMuscle.emit({
      actionType: ActionType.read,
      object: progExercise
    });
  }
}
