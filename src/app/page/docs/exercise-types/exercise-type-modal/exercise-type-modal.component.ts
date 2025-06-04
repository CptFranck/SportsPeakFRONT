import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {
  ExerciseTypeDetailsDisplayComponent
} from "../../../../components/modal-component/exercise-type/exercise-type-details-display/exercise-type-details-display.component";
import {
  ExerciseTypeEntityFormComponent
} from "../../../../components/form/exercise-type/exercise-type-entity-form/exercise-type-entity-form.component";
import {
  ExerciseTypeDeleteFormComponent
} from "../../../../components/form/exercise-type/exercise-type-delete-form/exercise-type-delete-form.component";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

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
  readonly action = input.required<ActionEnum>();

  readonly exerciseTypeAction = output<FormIndicator>();

  protected readonly ActionType = ActionEnum;

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
    this.exerciseTypeAction.emit({
      object: undefined,
      actionType: ActionEnum.create
    })
  }
}
