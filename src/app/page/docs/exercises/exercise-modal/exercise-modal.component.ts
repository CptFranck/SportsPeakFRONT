import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {
  ExerciseEntityFormComponent
} from "../../../../components/form/exercise/exercise-entity-form/exercise-entity-form.component";
import {
  ExerciseDeleteFormComponent
} from "../../../../components/form/exercise/exercise-delete-form/exercise-delete-form.component";
import {
  ExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/exercise/exercise-details-display/exercise-details-display.component";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-exercise-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    ExerciseEntityFormComponent,
    ExerciseDeleteFormComponent,
    ExerciseDetailsDisplayComponent
  ],
  templateUrl: './exercise-modal.component.html'
})
export class ExerciseModalComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);

  readonly action = input.required<ActionType>();
  readonly exercise = input.required<Exercise | undefined>();
  readonly modalTitle = input.required<string>();
  readonly exerciseModalId = input.required<string>();

  readonly actionExercise = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() =>
        this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClick() {
    this.actionExercise.emit({
      object: undefined,
      actionType: ActionType.create
    });
  }
}
