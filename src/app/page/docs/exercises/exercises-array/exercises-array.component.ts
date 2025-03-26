import {Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-exercises-array',
    imports: [
        NgForOf,
        NgIf,
        ModalButtonComponent
    ],
    templateUrl: './exercises-array.component.html'
})
export class ExercisesArrayComponent implements OnChanges, OnDestroy {
  isAdmin: boolean = false;
  showDetails: Dictionary<boolean> = {};

  @Input() exercises!: Exercise[];
  @Input() modalId!: string;

  @Output() actionExercise: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.exercises.forEach((exercise: Exercise) => this.showDetails[exercise.id] = false);
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendExerciseDetails(id: number): void {
    let IdKey: string = id.toString()
    this.showDetails[IdKey] = !this.showDetails[IdKey];
  }

  showExerciseDetails(exercise: Exercise): void {
    this.actionExercise.emit({
      actionType: ActionType.read,
      object: exercise
    });
  }

  modifyExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.update,
      object: exercise
    });
  }

  delExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.delete,
      object: exercise
    });
  }
}
