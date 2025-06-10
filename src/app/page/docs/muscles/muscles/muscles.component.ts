import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../../components/modal-component/muscle-modal/muscle-modal.component";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {Subject, takeUntil} from "rxjs";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {collapseHeight} from "../../../../shared/animations/collapseHeigh";
import {MuscleCardComponent} from "../../../../components/card/muscle-card/muscle-card.component";
import {sortMuscleByName} from "../../../../utils/muscle-functions";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

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
  readonly ActionType = ActionEnum;

  private muscles: Muscle[] = [];
  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.muscleService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.muscleService.muscleList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscles: Muscle[]) => {
        this.muscles = muscles;
        this.displayedMuscles.set(Array.from(muscles).sort(sortMuscleByName));
      });
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
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
