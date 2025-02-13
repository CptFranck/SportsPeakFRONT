import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
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
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    MuscleDeleteFormComponent
  ],
  templateUrl: './muscle-modal.component.html',
})
export class MuscleModalComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() muscle: Muscle | undefined;
  @Input() action!: ActionType;

  @Output() actionMuscle: EventEmitter<FormIndicator> = new EventEmitter();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

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
    this.actionMuscle.emit({
      actionType: ActionType.create,
      object: undefined,
    });
  }
}
