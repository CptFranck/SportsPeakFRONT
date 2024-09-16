import {Component, inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ActionType} from "../../../../interface/enum/action-type";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {
  MyProgExerciseDetailsDisplayComponent
} from "../../../../components/modal-component/prog-exercise/my-prog-exercise-details-display/my-prog-exercise-details-display.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-prog-exercise-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
    MyProgExerciseDetailsDisplayComponent
  ],
  templateUrl: './prog-exercise-modal.component.html',
})
export class ProgExerciseModalComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() progExercise: ProgExercise | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  onClick(value: undefined) {
    this.progExercise = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new muscle";
  }

  ngOnInit(): void {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
