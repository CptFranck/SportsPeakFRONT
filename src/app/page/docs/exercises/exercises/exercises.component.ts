import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesAdminArrayComponent} from "../exercises-array/exercises-admin-array.component";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {Subject, takeUntil} from "rxjs";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {ExerciceCardComponent} from "../../../../components/card/exercice-card/exercice-card.component";
import {collapseHeight} from "../../../../shared/animations/collapseHeigh";
import {sortExerciseByName} from "../../../../utils/exercise-function";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-exercises',
  imports: [
    CommonModule,
    ExercisesAdminArrayComponent,
    LoadingComponent,
    ExerciseModalComponent,
    SearchBarComponent,
    ExerciceCardComponent
  ],
  templateUrl: './exercises.component.html',
  animations: [collapseHeight]
})
export class ExercisesComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  loading = signal<boolean>(true);
  displayedExercises = signal<Exercise[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  exercise = signal<Exercise | undefined>(undefined);

  readonly exerciseModalId: string = "exerciseModal"

  private exercises: Exercise[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseService: ExerciseService = inject(ExerciseService);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.exerciseService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.exerciseService.exerciseList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
        this.displayedExercises.set(Array.from(exercises).sort(sortExerciseByName));
      });
    this.userLoggedService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setExercise(formIndicator: FormIndicator) {
    this.exercise.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new Exercise");
    else
      this.modalTitle.set(formIndicator.object.name);
  }

  searchExercise(input: string) {
    if (input === "")
      return this.displayedExercises.set(this.exercises);
    let localInput: string = input.toLowerCase();
    this.displayedExercises.set(this.filterExercises(localInput));
  }

  filterExercises(localInput: string) {
    let includeMuscleName = false;
    let includeExerciseTypeName = false;

    return this.exercises.filter((exercise: Exercise) => {
      includeMuscleName = false;
      if (exercise.muscles) {
        exercise.muscles.forEach((muscle: Muscle) => {
          if (muscle.name.toLowerCase().includes(localInput)) {
            includeMuscleName = true;
          }
        })
      }
      includeExerciseTypeName = false;
      if (exercise.exerciseTypes) {
        exercise.exerciseTypes.forEach((exerciseType: ExerciseType) => {
          if (exerciseType.name.toLowerCase().includes(localInput)) {
            includeExerciseTypeName = true;
          }
        })
      }

      return exercise.name.toLowerCase().includes(localInput) ||
        exercise.description.toLowerCase().includes(localInput) ||
        exercise.goal.toLowerCase().includes(localInput) ||
        includeMuscleName || includeExerciseTypeName;
    });
  }
}
