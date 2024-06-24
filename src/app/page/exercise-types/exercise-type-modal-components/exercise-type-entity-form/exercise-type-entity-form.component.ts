import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {ExerciseSelectorComponent} from "../../../../components/select/exercise-selector/exercise-selector.component";
import {ExerciseType} from "../../../../interface/dto/exerciseType";
import {NgIf} from "@angular/common";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {Exercise} from "../../../../interface/dto/exercise";

@Component({
  selector: 'app-exercise-type-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    ExerciseSelectorComponent,
    NgIf
  ],
  templateUrl: './exercise-type-entity-form.component.html',
})
export class ExerciseTypeEntityFormComponent implements OnInit, AfterViewInit {
  exerciseType: ExerciseType | undefined;
  exerciseTypeForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  @Input() set exerciseTypeInput(value: ExerciseType | undefined) {
    this.exerciseType = value;
    this.initializeExerciseTypeForm();
  }

  ngOnInit() {
    this.initializeExerciseTypeForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeExerciseTypeForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const exerciseTypeName: string = this.exerciseType ? this.exerciseType.name : "";
    const exerciseTypeGoal: string = this.exerciseType ? this.exerciseType.goal : "";
    const muscleExerciseIds: string[] = this.exerciseType?.exercises ?
      this.exerciseType.exercises?.map((ex: Exercise) => ex.id) : [];

    this.exerciseTypeForm = new FormGroup({
      name: new FormControl(exerciseTypeName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      goal: new FormControl(
        exerciseTypeGoal,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      exerciseIds: new FormControl(
        muscleExerciseIds, exerciseIdsValidator
      ),
    });

    if (this.exerciseType)
      this.exerciseTypeForm.addControl("id", new FormControl(this.exerciseType.id));
  }

  onSubmit() {
    if (!this.exerciseTypeForm) return;
    if (this.exerciseTypeForm.valid) {
      this.submitInvalidForm = false;
      if (!this.exerciseTypeForm.value.id) {
        this.exerciseTypeService.addExerciseType(this.exerciseTypeForm);
      } else {
        this.exerciseTypeService.modifyExerciseType(this.exerciseTypeForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
