import {Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../enum/action-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {TargetSetRowDetail} from "../../../../interface/utils/target-set-row-detail";
import {getProgExerciseTime, getTargetSetsInformation} from "../../../../utils/functions";

@Component({
  selector: 'app-my-prog-exercises-array',
  standalone: true,
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-prog-exercises-array.component.html',
})
export class MyProgExercisesArrayComponent implements OnChanges {
  userLogged: User | undefined;
  showDetails: Dictionary<TargetSetRowDetail> = {};

  @Input() progExercises!: ProgExercise[];
  @Input() modalId!: string;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => this.userLogged = user);
    this.progExercises.forEach((progExercise: ProgExercise) => {
      const sets: string[] = getTargetSetsInformation(progExercise);
      const time: string = getProgExerciseTime(progExercise)
      this.showDetails[progExercise.id] = {
        show: false,
        sets: sets,
        time: time
      };
    });
  }

  expendProgExerciseDetails(id: string): void {
    this.showDetails[id].show = !this.showDetails[id].show;
  }

  showMuscleDetails(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionType.read,
      object: progExercise
    });
  }

  modifyMuscle(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.update,
      object: progExercise
    });
  }

  delProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.delete,
      object: progExercise
    });
  }
}
