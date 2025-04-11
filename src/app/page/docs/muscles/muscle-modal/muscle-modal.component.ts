import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {ActionType} from "../../../../interface/enum/action-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../../../components/modal-component/muscle/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../../../components/form/muscle/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  MuscleDeleteFormComponent
} from "../../../../components/form/muscle/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscle-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    MuscleDeleteFormComponent
  ],
  templateUrl: './muscle-modal.component.html'
})
export class MuscleModalComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);

  readonly modalTitle = input.required<string>();
  readonly muscleModalId = input.required<string>();
  readonly muscle = input<Muscle>();
  readonly action = input.required<ActionType>();

  readonly actionMuscle = output<FormIndicator>();

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
    this.actionMuscle.emit({
      actionType: ActionType.create,
      object: undefined,
    });
  }
}
