import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {MuscleModalComponent} from "../../../../shared/components/modal-components/muscle-modal/muscle-modal.component";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {Subject, takeUntil} from "rxjs";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
import {collapseHeight} from "../../../../shared/animations/collapseHeigh";
import {sortMuscleByName} from "../../../../utils/muscle-functions";
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {SearchBarComponent} from "../../../../shared/components/search-bar/search-bar.component";
import {MuscleCardComponent} from "../../../../shared/components/cards/muscle-card/muscle-card.component";

@Component({
  selector: 'app-muscles',
  imports: [
    CommonModule,
    LoadingComponent,
    MuscleModalComponent,
    SearchBarComponent,
    MuscleCardComponent,
    ModalButtonComponent
  ],
  templateUrl: './muscles.component.html',
  animations: [collapseHeight]
})
export class MusclesComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  loading = signal<boolean>(true);

  muscle = signal<Muscle | undefined>(undefined);
  displayedMuscles = signal<Muscle[]>([]);

  readonly muscleModalId: string = "muscleModal";
  readonly ActionType = ActionType;

  private muscles: Muscle[] = [];
  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);
  private readonly currentUserService = inject(CurrentUserService);

  ngOnInit(): void {
    this.muscleService.getMuscles();
    this.muscleService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.muscleService.muscleList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscles: Muscle[]) => {
        this.muscles = muscles;
        this.displayedMuscles.set(Array.from(muscles).sort(sortMuscleByName));
      });
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchMuscle(input: string) {
    if (input === "")
      return this.displayedMuscles.set(this.muscles);
    const localInput = input.toLowerCase();
    this.displayedMuscles.set(this.filterMuscles(localInput));
  }

  filterMuscles(localInput: string) {
    let includeExerciseName = false;
    return this.muscles.filter((muscle: Muscle) => {
      includeExerciseName = false;
      muscle.exercises.forEach((exercise: Exercise) => {
        if (exercise.name.toLowerCase().includes(localInput)) {
          includeExerciseName = true;
        }
      })
      return muscle.name.toLowerCase().includes(localInput) ||
        muscle.description.toLowerCase().includes(localInput) ||
        muscle.function.toLowerCase().includes(localInput) ||
        includeExerciseName;
    });
  }
}
