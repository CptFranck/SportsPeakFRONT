import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputMuscle} from "../../../interface/input/muscle";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {InputControlComponent} from "../../../components/input-control/input-control.component";

@Component({
  selector: 'app-muscle-form',
  standalone: true,
  imports: [
    MultiSelectComponent,
    SelectExercisesComponent,
    ReactiveFormsModule,
    NgIf,
    NgTemplateOutlet,
    InputControlComponent
  ],
  templateUrl: './muscle-form.component.html',
})
export class MuscleFormComponent {
  @Input()
  newMuscle: InputMuscle = {
    // id: "",
    // name: "NewMuscleTest",
    // description: "NewMuscleTestDescription",
    // function: "NewMuscleTestFunction",
    // exerciseIds: [4]
    id: "",
    name: "",
    description: "",
    function: "",
    exerciseIds: []
  }
  @Input()
  isAdmin: boolean = false;

  muscleForm: FormGroup
  isFormSubmitted: boolean = false;

  @Output()
  selectedOptionsChange: EventEmitter<InputMuscle> = new EventEmitter<InputMuscle>();

  constructor() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required

    const muscleName = this.newMuscle ? this.newMuscle.name : "";
    const muscleDescription = this.newMuscle ? this.newMuscle.description : "";
    const muscleFunction = this.newMuscle ? this.newMuscle.function : "";
    const muscleExerciseIds = this.newMuscle ? this.newMuscle.exerciseIds : [];

    this.muscleForm = new FormGroup({
      name: new FormControl(muscleName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      description: new FormControl(
        muscleDescription,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      function: new FormControl(
        muscleFunction,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      exerciseIds: new FormControl(
        muscleExerciseIds, Validators.required
      ),
    });
  }

  onSubmit() {
    const isFormValid = this.muscleForm.valid;
    debugger;
    this.isFormSubmitted = true;
  }
}
