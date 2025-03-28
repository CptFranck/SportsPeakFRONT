import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  loading: boolean = true;
  exerciseTypes: ExerciseType[] = [];
  displayedExerciseTypes: ExerciseType[] = [];
  exerciseType: ExerciseType | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseTypeModalId: string = "exercisesTypeModal";
  searchInput: string = "";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

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
      .subscribe((loading: boolean) =>
        this.loading = loading)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setExerciseType(formIndicator: FormIndicator) {
    this.exerciseType = formIndicator.object;
    this.action = formIndicator.actionType;
    if (formIndicator.object === undefined)
      this.modalTitle = "Add new exerciseType"
    else
      this.modalTitle = formIndicator.object.name;
  }

  searchExerciseType(input: string) {
    this.searchInput = input;
    this.updateDisplayedExerciseTypes();
  }

  updateDisplayedExerciseTypes() {
    if (this.searchInput === "") {
      this.displayedExerciseTypes = this.exerciseTypes;
      return;
    }

    let localInput: string = this.searchInput.toLowerCase();
    let includeExerciseTypeExerciseName: boolean = false;

    this.displayedExerciseTypes = this.exerciseTypes.filter((exerciseType: ExerciseType) => {
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
