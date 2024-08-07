import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
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
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {
  ExerciseEntityFormComponent
} from "../exercise-modal-components/exercise-entity-form/exercise-entity-form.component";
import {
  ExerciseDeleteFormComponent
} from "../exercise-modal-components/exercise-delete-form/exercise-delete-form.component";
import {
  ExerciseDetailsDisplayComponent
} from "../exercise-modal-components/exercise-details-display/exercise-details-display.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    ExerciseEntityFormComponent,
    ExerciseDeleteFormComponent,
    ExerciseDetailsDisplayComponent
  ],
  templateUrl: './exercise-modal.component.html',
})
export class ExerciseModalComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  @Input() modalTitle!: string;
  @Input() exerciseModalId!: string;
  @Input() exercise: Exercise | undefined;
  @Input() action!: ActionType;

  @Output() exerciseAction: EventEmitter<FormIndicator> = new EventEmitter();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  protected readonly ActionType = ActionType;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() =>
        this.isAdmin = this.userLoggedService.isAdmin());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClick() {
    this.exerciseAction.emit({
      object: undefined,
      actionType: ActionType.create
    });
  }

}
