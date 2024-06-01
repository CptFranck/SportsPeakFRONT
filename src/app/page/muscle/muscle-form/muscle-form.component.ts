import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {InputControlComponent} from "../../../components/input-control/input-control.component";
import {Apollo} from "apollo-angular";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphQLError} from "graphql/error";
import {ADD_MUSCLES, MOD_MUSCLES} from "../../../graphql/muscle/muscle.operations";
import {Observable, Subscription} from "rxjs";

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
export class MuscleFormComponent implements OnInit, AfterViewInit {

  muscle: Muscle | undefined
  muscleForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() isAdmin: boolean = false;
  @Output() newMuscleAdded: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @Output() muscleUpdated: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() eventsSubject!: Observable<void> | undefined;
  eventsSubscription!: Subscription;

  constructor(private apollo: Apollo) {
  }

  @Input() set muscleInput(value: Muscle | undefined) {
    this.muscle = value;
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
    const muscleName = this.muscle ? this.muscle.name : "";
    const muscleDescription = this.muscle ? this.muscle.description : "";
    const muscleFunction = this.muscle ? this.muscle.function : "";
    const muscleExerciseIds = this.muscle ?
      this.muscle.exercises?.map(ex => ex.id) : [];

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

    if (this.muscle)
      this.muscleForm.addControl("id", new FormControl(this.muscle.id))
  }

  onSubmit() {
    if (!this.muscleForm) return
    if (this.muscleForm.valid) {
      this.submitInvalidForm = false;
      if (this.muscleForm.value.id === "") {
        this.apollo
          .mutate({
            mutation: ADD_MUSCLES,
            variables: {
              inputNewMuscle: this.muscleForm.value,
            },
          })
          .subscribe(({data, error}: any) => {
            if (data) {
              this.newMuscleAdded.emit(data.addMuscle)
            }
            if (error) {
              this.errorOccurred.emit(error);
            }
          });
      } else {
        this.apollo
          .mutate({
            mutation: MOD_MUSCLES,
            variables: {
              inputMuscle: this.muscleForm.value,
            },
          })
          .subscribe(({data, error}: any) => {
            if (data) {
              this.muscleUpdated.emit(data.modifyMuscle)
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
