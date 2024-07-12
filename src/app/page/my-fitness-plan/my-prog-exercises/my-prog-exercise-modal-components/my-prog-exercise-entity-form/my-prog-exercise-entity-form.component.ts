import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {UserLoggedService} from "../../../../../services/user-logged/user-logged.service";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../../services/prog-exercise/prog-exercise.service";
import {User} from "../../../../../interface/dto/user";
import {Visibility} from "../../../../../interface/enum/visibility";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-my-prog-exercise-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './my-prog-exercise-entity-form.component.html',
})
export class MyProgExerciseEntityFormComponent implements OnInit, AfterViewInit {
  progExercise: ProgExercise | undefined;
  progExerciseForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private user: User | undefined;
  private userLoggedService: UserLoggedService = inject(UserLoggedService);
  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  @Input() set muscleInput(value: ProgExercise | undefined) {
    this.progExercise = value;
    this.initializeProgExerciseForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => this.user = user);
    this.initializeProgExerciseForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeProgExerciseForm() {
    const creatorId: string | null = this.user ? this.user.id : null;
    const progExerciseName: string = this.progExercise ? this.progExercise.name : "";
    const progExerciseNote: string = this.progExercise ? this.progExercise.note : "";
    const progExerciseVisibility: string = this.progExercise ? this.progExercise.visibility : Visibility.PRIVATE;
    const progExerciseExerciseId: string = this.progExercise ? this.progExercise.exercise.id : "";

    this.progExerciseForm = new FormGroup({
      name: new FormControl(
        progExerciseName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      note: new FormControl(
        progExerciseNote,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      visibility: new FormControl(
        progExerciseVisibility,
        [Validators.required]),
      exerciseId: new FormControl(
        progExerciseExerciseId,
        [Validators.required]),
      creatorId: new FormControl(creatorId),
    });
  }

  onSubmit() {
    if (!this.progExerciseForm) return;
    if (this.progExerciseForm.valid) {
      this.submitInvalidForm = false;
      if (!this.progExerciseForm.value.id) {
        this.progExerciseService.addProgExercise(this.progExerciseForm);
      } else {
        this.progExerciseService.modifyProgExercise(this.progExerciseForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
