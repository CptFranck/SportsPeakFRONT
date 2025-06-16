import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {
  ExerciseEntityFormComponent
} from "../../../../shared/components/forms/exercise/exercise-entity-form/exercise-entity-form.component";
import {
  ExerciseDeleteFormComponent
} from "../../../../shared/components/forms/exercise/exercise-delete-form/exercise-delete-form.component";
import {
  ExerciseDetailsDisplayComponent
} from "../../../../shared/components/modal-components/exercise-details-display/exercise-details-display.component";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
import {Subject, takeUntil} from "rxjs";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionType} from "../../../../shared/model/enum/action-type";

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
  private readonly currentUserService = inject(CurrentUserService);

  ngOnInit(): void {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
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
