import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesArrayComponent} from "../exercises-array/exercises-array.component";
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    ExercisesArrayComponent,
    LoadingComponent,
    ExerciseModalComponent,
    SearchBarComponent
  ],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  exercises: Exercise[] = [];
  displayedExercises: Exercise[] = [];
  exercise: Exercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseModalId: string = "exerciseModal"
  searchInput: string = "";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseService: ExerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.exerciseService.exercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
        this.updateDisplayedExercise();
      });
    this.exerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setExercise(formIndicator: FormIndicator) {
    this.exercise = formIndicator.object;
    this.action = formIndicator.actionType;
    if (formIndicator.object === undefined)
      this.modalTitle = "Add new Exercise"
    else
      this.modalTitle = formIndicator.object.name;
  }

  searchExercise(input: string) {
    this.searchInput = input;
    this.updateDisplayedExercise();
  }

  updateDisplayedExercise() {
    if (this.searchInput === "") {
      this.displayedExercises = this.exercises
      return;
    }
    let localInput: string = this.searchInput.toLowerCase();
    let includeExerciseMuscleName: boolean = false;
    let includeExerciseExerciseTypeName: boolean = false;

    this.displayedExercises = this.exercises.filter((exercise: Exercise) => {
      includeExerciseMuscleName = false;
      if (exercise.muscles) {
        exercise.muscles.forEach((muscle: Muscle) => {
          if (muscle.name.toLowerCase().includes(localInput)) {
            includeExerciseMuscleName = true;
          }
        })
      }
      includeExerciseExerciseTypeName = false;
      if (exercise.exerciseTypes) {
        exercise.exerciseTypes.forEach((exerciseType: ExerciseType) => {
          if (exerciseType.name.toLowerCase().includes(localInput)) {
            includeExerciseExerciseTypeName = true;
          }
        })
      }

      return exercise.name.toLowerCase().includes(localInput) ||
        exercise.description.toLowerCase().includes(localInput) ||
        exercise.goal.toLowerCase().includes(localInput) ||
        includeExerciseMuscleName || includeExerciseExerciseTypeName;
    });
  }
}
