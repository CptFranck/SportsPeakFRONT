import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {ExerciseTypeArrayComponent} from "../exercise-types-array/exercise-type-array.component";
import {ExerciseTypeModalComponent} from "../exercise-type-modal/exercise-type-modal.component";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {Subject, takeUntil} from "rxjs";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
import {collapseHeight} from "../../../../shared/animations/collapseHeigh";
import {sortExerciseTypeByName} from "../../../../utils/exercise-type-function";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {SearchBarComponent} from "../../../../shared/components/search-bar/search-bar.component";
import {
  ExerciseTypeCardComponent
} from "../../../../shared/components/cards/exercise-type-card/exercise-type-card.component";

@Component({
  selector: 'app-exercise-types',
  imports: [
    CommonModule,
    LoadingComponent,
    ExerciseTypeArrayComponent,
    ExerciseTypeModalComponent,
    SearchBarComponent,
    ExerciseTypeCardComponent
  ],
  templateUrl: './exercise-types.component.html',
  animations: [collapseHeight]
})
export class ExerciseTypesComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  loading = signal<boolean>(true);
  displayedExerciseTypes = signal<ExerciseType[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  exerciseType = signal<ExerciseType | undefined>(undefined);

  readonly exerciseTypeModalId = "exercisesTypeModal";

  private exerciseTypes: ExerciseType[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly currentUserService = inject(CurrentUserService);
  private readonly exerciseTypeService = inject(ExerciseTypeService);

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseTypes();
    this.exerciseTypeService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
    this.exerciseTypeService.exerciseTypeList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exerciseType: ExerciseType[]) => {
        this.exerciseTypes = exerciseType;
        this.displayedExerciseTypes.set(Array.from(exerciseType).sort(sortExerciseTypeByName));
      });
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setExerciseType(formIndicator: FormIndicator) {
    this.exerciseType.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new exerciseType");
    else
      this.modalTitle.set(formIndicator.object.name);
  }

  searchExerciseType(input: string) {
    if (input === "")
      return this.displayedExerciseTypes.set(this.exerciseTypes);
    let localInput = input.toLowerCase();
    this.displayedExerciseTypes.set(this.filterExerciseTypes(localInput));
  }

  filterExerciseTypes(localInput: string) {
    let includeExerciseName = false;
    return this.exerciseTypes.filter((exerciseType: ExerciseType) => {
      includeExerciseName = false;
      if (exerciseType.exercises)
        exerciseType.exercises.forEach((exercise: Exercise) => {
          if (exercise.name.toLowerCase().includes(localInput)) {
            includeExerciseName = true;
          }
        })

      return exerciseType.name.toLowerCase().includes(localInput) ||
        exerciseType.goal.toLowerCase().includes(localInput) ||
        includeExerciseName;
    });
  }
}
