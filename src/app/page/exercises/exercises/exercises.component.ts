import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesArrayComponent} from "../exercises-array/exercises-array.component";
import {ActionType} from "../../../enum/action-type";
import {Exercise} from "../../../interface/dto/exercise";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../muscle/muscles-array/muscles-array.component";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExercisesArrayComponent, LoadingComponent, MuscleModalComponent, MusclesArrayComponent, ExerciseModalComponent],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit {
  loading: boolean = true;
  exercises: Exercise[] = [];
  exercise: Exercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseModalId: string = "exerciseModal"

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  private exerciseService: ExerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.exerciseService.exercises.subscribe(exercises => this.exercises = exercises);
    this.exerciseService.isLoading.subscribe(isLoading => this.loading = isLoading);
  }

  setExercise(formIndicator: FormIndicator) {
    this.exercise = formIndicator.object
    this.action = formIndicator.actionType
    this.modalTitle = formIndicator.object.name
  }
}
