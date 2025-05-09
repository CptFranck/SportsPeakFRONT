import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Muscle} from "../../../../interface/dto/muscle";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {MuscleModalComponent} from "../../../../components/modal-component/muscle-modal/muscle-modal.component";
import {ActionType} from "../../../../interface/enum/action-type";
import {
  MuscleExercisesTableComponent
} from "../../../../components/table/muscle-exercises-table/muscle-exercises-table.component";

@Component({
  selector: 'app-muscle-details',
  imports: [
    NgIf,
    LoadingComponent,
    NgOptimizedImage,
    ModalButtonComponent,
    MuscleModalComponent,
    MuscleExercisesTableComponent,
  ],
  templateUrl: './muscle-details.component.html',
  styleUrl: './muscle-details.component.css'
})
export class MuscleDetailsComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  loading = signal<boolean>(true);
  muscle = signal<Muscle | undefined>(undefined);
  action = signal<ActionType>(ActionType.read);
  modalTitle = signal<string>("");

  readonly muscleModalId = "muscleModalId";
  readonly ActionType = ActionType;

  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.muscleService.detailsMuscle()
      .subscribe((muscle: Muscle | undefined) => this.muscle.set(muscle))
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => params['id'] !== this.muscle()?.id ? this.muscleService.getMuscleById(params['id']) : null);
    this.muscleService.loading()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onModify() {
    this.action.set(ActionType.update);
    this.modalTitle.set(`Modify muscle ${this.muscle()?.name}`);
  }

  onDelete() {
    this.action.set(ActionType.delete);
    this.modalTitle.set(`Delete muscle ${this.muscle()?.name}`);
  }
}
