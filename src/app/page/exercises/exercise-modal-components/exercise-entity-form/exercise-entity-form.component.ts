import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {GraphQLError} from "graphql/error";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {ExerciseSelectorComponent} from "../../../../components/select/exercises-selector/exercise-selector.component";

@Component({
  selector: 'app-exercise-entity-form',
  standalone: true,
  imports: [
    FormsModule,
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    ExerciseSelectorComponent
  ],
  templateUrl: './exercise-entity-form.component.html',
})
export class ExerciseEntityFormComponent implements OnInit, AfterViewInit {
  exercise: Exercise | undefined
  exerciseForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() eventsSubject!: Observable<void> | undefined;

  @Output() newExerciseAdded: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  @Output() exerciseUpdated: EventEmitter<Exercise> = new EventEmitter<Exercise>();
  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();

  exerciseService: ExerciseService = inject(ExerciseService);

  @Input() set exerciseInput(value: Exercise | undefined) {
    this.exercise = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.initializeMuscleForm()
  }

  ngAfterViewInit() {
    if (this.eventsSubject)
      this.eventsSubscription = this.eventsSubject.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required
    const exerciseName = this.exercise ? this.exercise.name : "";
    const exerciseDescription = this.exercise ? this.exercise.description : "";
    const exerciseGoal = this.exercise ? this.exercise.goal : "";
    const exerciseMuscleIds = this.exercise ?
      this.exercise.muscles?.map(muscle => muscle.id) : [];
    const exerciseExerciseTypeIds = this.exercise ?
      this.exercise.exerciseTypes?.map(exerciseType => exerciseType.id) : [];

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
      exerciseMuscleIds: new FormControl(
        exerciseMuscleIds, exerciseIdsValidator
      ),
      exerciseExerciseTypeIds: new FormControl(
        exerciseExerciseTypeIds, exerciseIdsValidator
      ),
    });

    if (this.exercise)
      this.exerciseForm.addControl("id", new FormControl(this.exercise.id))
  }

  onSubmit() {
    if (!this.exerciseForm) return
    if (this.exerciseForm.valid) {
      this.submitInvalidForm = false;
      if (!this.exerciseForm.value.id) {
        this.exerciseService.addExercise(this.exerciseForm)
          .subscribe(({data, error}: any) => {
            if (data) {
              this.newExerciseAdded.emit(data.addMuscle)
            }
            if (error) {
              this.errorOccurred.emit(error);
            }
          });
      } else {
        this.exerciseService.modifyExercise(this.exerciseForm)
          .subscribe(({data, error}: any) => {
            if (data) {
              this.exerciseUpdated.emit(data.modifyMuscle)
            }
            if (error) {
              this.errorOccurred.emit(error);
            }
          });
      }
      this.btnCloseRef.click()
    } else {
      this.submitInvalidForm = true
    }
  }
}
