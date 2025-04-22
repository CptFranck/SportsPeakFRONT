import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {ActionType} from "../../../../interface/enum/action-type";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {ExerciseTypeArrayComponent} from "../exercise-types-array/exercise-type-array.component";
import {ExerciseTypeModalComponent} from "../exercise-type-modal/exercise-type-modal.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Exercise} from "../../../../interface/dto/exercise";
import {Subject, takeUntil} from "rxjs";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {collapseHeight} from "../../../../animation/collapseHeigh";
import {ExerciseTypeCardComponent} from "../../../../components/card/exercise-type-card/exercise-type-card.component";
import {sortExerciseTypeByName} from "../../../../utils/exercise-type-function";

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
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly exerciseTypeService = inject(ExerciseTypeService);

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseTypes();

    this.exerciseTypeService.exerciseTypes
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exerciseType: ExerciseType[]) => {
        this.exerciseTypes = exerciseType;
        this.displayedExerciseTypes.set(Array.from(exerciseType).sort(sortExerciseTypeByName));
      });
    this.exerciseTypeService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
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
