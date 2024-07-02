import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesArrayComponent} from "../exercises-array/exercises-array.component";
import {ActionType} from "../../../../enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../docs/muscles/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../docs/muscles/muscles-array/muscles-array.component";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {UserLoggedService} from "../../../../services/userLogged/user-logged.service";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseType} from "../../../../interface/dto/exerciseType";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExercisesArrayComponent, LoadingComponent, MuscleModalComponent, MusclesArrayComponent, ExerciseModalComponent, SearchBarComponent],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit {
  isAdmin: boolean = false;
  loading: boolean = true;
  exercises: Exercise[] = [];
  displayedExercises: Exercise[] = [];
  exercise: Exercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseModalId: string = "exerciseModal"

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  private exerciseService: ExerciseService = inject(ExerciseService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
      this.displayedExercises = exercises;
    });
    this.exerciseService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
    this.userLoggedService.currentUser.subscribe(() =>
      this.isAdmin = this.userLoggedService.isAdmin());
  }

  setExercise(formIndicator: FormIndicator) {
    this.exercise = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }

  searchExercise(input: string) {
    if (input === "") {
      this.displayedExercises = this.exercises
      return;
    }

    let localInput: string = input.toLowerCase();
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
