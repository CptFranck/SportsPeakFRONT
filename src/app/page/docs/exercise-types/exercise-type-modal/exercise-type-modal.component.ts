import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {
  ExerciseTypeDetailsDisplayComponent
} from "../../../../shared/components/modal-components/exercise-type-details-display/exercise-type-details-display.component";
import {
  ExerciseTypeEntityFormComponent
} from "../../../../shared/components/forms/exercise-type/exercise-type-entity-form/exercise-type-entity-form.component";
import {
  ExerciseTypeDeleteFormComponent
} from "../../../../shared/components/forms/exercise-type/exercise-type-delete-form/exercise-type-delete-form.component";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-exercise-type-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    ExerciseTypeDetailsDisplayComponent,
    ExerciseTypeEntityFormComponent,
    ExerciseTypeDeleteFormComponent
  ],
  templateUrl: './exercise-type-modal.component.html'
})
export class ExerciseTypeModalComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);

  readonly modalTitle = input.required<string>();
  readonly exerciseTypeModalId = input.required<string>();
  readonly exerciseType = input.required<ExerciseType | undefined>();
  readonly action = input.required<ActionType>();

  readonly exerciseTypeAction = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.userLoggedService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClick() {
    this.exerciseTypeAction.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
