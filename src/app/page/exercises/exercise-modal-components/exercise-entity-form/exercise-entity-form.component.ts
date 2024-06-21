import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {ExerciseSelectorComponent} from "../../../../components/select/exercises-selector/exercise-selector.component";
import {MuscleSelectorComponent} from "../../../../components/select/muscle-selector/muscle-selector.component";
import {
  ExerciseTypeSelectorComponent
} from "../../../../components/select/exercise-type-selector/exercise-type-selector.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseType} from "../../../../interface/dto/exerciseType";

@Component({
  selector: 'app-exercise-entity-form',
  standalone: true,
  imports: [
    FormsModule,
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    ExerciseSelectorComponent,
    MuscleSelectorComponent,
    ExerciseTypeSelectorComponent
  ],
  templateUrl: './exercise-entity-form.component.html',
})
export class ExerciseEntityFormComponent implements OnInit, AfterViewInit {
  exercise: Exercise | undefined;
  exerciseForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private exerciseService: ExerciseService = inject(ExerciseService);

  @Input() set exerciseInput(value: Exercise | undefined) {
    this.exercise = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.initializeMuscleForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const exerciseName: string = this.exercise ? this.exercise.name : "";
    const exerciseDescription: string = this.exercise ? this.exercise.description : "";
    const exerciseGoal: string = this.exercise ? this.exercise.goal : "";
    const exerciseMuscleIds: string[] = this.exercise?.muscles ?
      this.exercise.muscles?.map((muscle: Muscle) => muscle.id) : [];
    const exerciseExerciseTypeIds = this.exercise ?
      this.exercise.exerciseTypes?.map((exerciseType: ExerciseType) => exerciseType.id) : [];

    this.exerciseForm = new FormGroup({
      name: new FormControl(exerciseName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      description: new FormControl(
        exerciseDescription,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      goal: new FormControl(
        exerciseGoal,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      muscleIds: new FormControl(
        exerciseMuscleIds, exerciseIdsValidator
      ),
      exerciseTypeIds: new FormControl(
        exerciseExerciseTypeIds, exerciseIdsValidator
      ),
    });

    if (this.exercise)
      this.exerciseForm.addControl("id", new FormControl(this.exercise.id));
  }

  onSubmit() {
    if (!this.exerciseForm) return;
    if (this.exerciseForm.valid) {
      this.submitInvalidForm = false;
      if (!this.exerciseForm.value.id) {
        this.exerciseService.addExercise(this.exerciseForm);
      } else {
        this.exerciseService.modifyExercise(this.exerciseForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
