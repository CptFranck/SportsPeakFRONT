import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {MuscleModalComponent} from "../../../../shared/components/modal-components/muscle-modal/muscle-modal.component";
import {
  MuscleExercisesTableComponent
} from "../../../../shared/components/tables/muscle-exercises-table/muscle-exercises-table.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageFormComponent} from "../../../../shared/components/forms/image-form/image-form.component";
import {IllustrationService} from "../../../../core/services/illustration/illustration.service";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-muscle-details',
  imports: [
    LoadingComponent,
    NgOptimizedImage,
    ModalButtonComponent,
    MuscleModalComponent,
    MuscleExercisesTableComponent,
    ReactiveFormsModule,
    ImageFormComponent,

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
  private readonly currentUserService = inject(CurrentUserService);
  private readonly illustrationService = inject(IllustrationService);

  imageUrl = computed<string>(() => {
    const localMuscle = this.muscle();
    if (localMuscle) return this.illustrationService.getImageUrl(localMuscle.illustrationPath);
    return "";
  });

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => params['id'] !== this.muscle()?.id ?
        this.muscleService.getMuscleById(params['id']) : null);
    this.muscleService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.muscleService.selectedMuscle$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscle: Muscle | undefined) => this.muscle.set(muscle));
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
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

  reloadMuscle(url: string) {
    const muscle = this.muscle();
    if (muscle) this.muscleService.updateIllustrationMuscle(muscle.id, url);
  }
}
