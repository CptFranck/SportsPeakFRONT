import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputMuscle} from "../../../interface/input/muscle";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {InputControlComponent} from "../../../components/input-control/input-control.component";
import {Apollo} from "apollo-angular";
import {ADD_MUSCLES} from "../../../graphql/muscle/muscle.operations";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphQLError} from "graphql/error";

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
export class MuscleFormComponent implements OnInit {
  @Input()
  newMuscle: InputMuscle | undefined
  //   = {
  //   id: "",
  //   name: "NewMuscleTest",
  //   description: "NewMuscleTestDescription",
  //   function: "NewMuscleTestFunction",
  //   exerciseIds: [4]
  // }
  @Input()
  isAdmin: boolean = false;

  muscleForm: FormGroup | null = null;
  isFormSubmitted: boolean = false;

  @Output()
  newMuscleAdded: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @Output()
  errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required
    const muscleId = this.newMuscle ? this.newMuscle.id : "";
    const muscleName = this.newMuscle ? this.newMuscle.name : "";
    const muscleDescription = this.newMuscle ? this.newMuscle.description : "";
    const muscleFunction = this.newMuscle ? this.newMuscle.function : "";
    const muscleExerciseIds = this.newMuscle ? this.newMuscle.exerciseIds : [4, 1];

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
        muscleExerciseIds, exerciseIdsValidator
      ),
    });

    if (this.newMuscle)
      this.muscleForm.addControl("id", new FormControl(muscleId))
  }

  onSubmit() {
    if (!this.muscleForm) return
    if (this.muscleForm.valid) {
      console.log(this.muscleForm.value)
      console.log("test")
      this.apollo
        .mutate({
          mutation: ADD_MUSCLES,
          variables: {
            inputNewMuscle: this.muscleForm.value,
          },
        })
        .subscribe(({data, error}: any) => {
          console.log("test")
          if (data) {
            console.log(data);
            this.newMuscleAdded.emit(data.addMuscle)
          }
          if (error) {
            console.log(error);
            this.errorOccurred.emit(error);
          }
        });
      this.isFormSubmitted = true;
    }
  }
}
