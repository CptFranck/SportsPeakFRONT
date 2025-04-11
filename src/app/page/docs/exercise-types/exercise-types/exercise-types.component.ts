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

@Component({
  selector: 'app-exercise-types',
  imports: [
    CommonModule,
    LoadingComponent,
    ExerciseTypeArrayComponent,
    ExerciseTypeModalComponent,
    SearchBarComponent
  ],
  templateUrl: './exercise-types.component.html'
})
export class ExerciseTypesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  displayedExerciseTypes = signal<ExerciseType[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  exerciseType = signal<ExerciseType | undefined>(undefined);

  readonly exerciseTypeModalId = "exercisesTypeModal";

  private searchInput = "";
  private exerciseTypes: ExerciseType[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseTypeService = inject(ExerciseTypeService);

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseTypes();

    this.exerciseTypeService.exerciseTypes
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exerciseType: ExerciseType[]) => {
        this.exerciseTypes = exerciseType;
        this.updateDisplayedExerciseTypes();
      });
    this.exerciseTypeService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => this.loading.set(loading));
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
    this.searchInput = input;
    this.updateDisplayedExerciseTypes();
  }

  updateDisplayedExerciseTypes() {
    if (this.searchInput === "") {
      this.displayedExerciseTypes.set(this.exerciseTypes);
      return;
    }

    let localInput: string = this.searchInput.toLowerCase();

    const exerciseTypesFiltered = this.filterProgExercises(localInput);
    this.displayedExerciseTypes.set(exerciseTypesFiltered);
  }

  filterProgExercises(localInput: string) {
    let includeExerciseTypeExerciseName: boolean = false;
    return this.exerciseTypes.filter((exerciseType: ExerciseType) => {
      includeExerciseTypeExerciseName = false;
      if (exerciseType.exercises) {
        exerciseType.exercises.forEach((exercise: Exercise) => {
          if (exercise.name.toLowerCase().includes(localInput)) {
            includeExerciseTypeExerciseName = true;
          }
        })
      }

      return exerciseType.name.toLowerCase().includes(localInput) ||
        exerciseType.goal.toLowerCase().includes(localInput) ||
        includeExerciseTypeExerciseName;
    });
  }
}
