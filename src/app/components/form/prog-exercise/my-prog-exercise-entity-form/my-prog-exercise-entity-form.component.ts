import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {User} from "../../../../interface/dto/user";
import {Visibility} from "../../../../interface/enum/visibility";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {NgIf} from "@angular/common";
import {ExerciseSelectComponent} from "../../../selects/exercise-select/exercise-select.component";
import {VisibilitySelectComponent} from "../../../selects/visibility-select/visibility-select.component";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-my-prog-exercise-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    ExerciseSelectComponent,
    VisibilitySelectComponent
  ],
  templateUrl: './my-prog-exercise-entity-form.component.html',
})
export class MyProgExerciseEntityFormComponent implements OnInit, OnDestroy {
  progExercise: ProgExercise | undefined;
  progExerciseForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private user: User | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private userLoggedService: UserLoggedService = inject(UserLoggedService);
  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
    this.initializeProgExerciseForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) =>
        this.user = user);
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.create || actionType === ActionType.update)
            this.onSubmit();
        });
    this.initializeProgExerciseForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeProgExerciseForm() {
    const creatorId: number | null = this.user ? this.user.id : null;
    const progExerciseName: string = this.progExercise ? this.progExercise.name : "";
    const progExerciseNote: string = this.progExercise ? this.progExercise.note : "";
    const progExerciseVisibility: string = this.progExercise ? this.progExercise.visibility : Visibility.PRIVATE;
    const progExerciseExerciseId: number | null = this.progExercise ? this.progExercise.exercise.id : null;

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

    if (this.progExercise) {
      this.progExerciseForm.addControl("id", new FormControl(this.progExercise.id));
      this.progExerciseForm.removeControl("creatorId");
    }
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
