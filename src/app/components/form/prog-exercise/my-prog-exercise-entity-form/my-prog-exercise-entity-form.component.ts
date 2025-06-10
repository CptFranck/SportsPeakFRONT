import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {User} from "../../../../shared/model/dto/user";
import {VisibilityEnum} from "../../../../shared/model/enum/visibility.enum";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {ExerciseSelectComponent} from "../../../selects/exercise-select/exercise-select.component";
import {VisibilitySelectComponent} from "../../../selects/visibility-select/visibility-select.component";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-my-prog-exercise-entity-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    ExerciseSelectComponent,
    VisibilitySelectComponent
  ],
  templateUrl: './my-prog-exercise-entity-form.component.html'
})
export class MyProgExerciseEntityFormComponent implements OnInit, OnDestroy {
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionEnum> | undefined>();

  submitInvalidForm = signal<boolean>(false);

  private user: User | undefined;

  readonly progExerciseForm = computed<FormGroup>(() => {
    const progExercise = this.progExercise();

    const creatorId: number | undefined = this.user ? this.user.id : undefined;
    const progExerciseName: string = progExercise ? progExercise.name : "";
    const progExerciseNote: string = progExercise ? progExercise.note : "";
    const progExerciseVisibility: string = progExercise ? progExercise.visibility : VisibilityEnum.PRIVATE;
    const progExerciseExerciseId: number | undefined = progExercise ? progExercise.exercise.id : undefined;

    const progExerciseForm: FormGroup = new FormGroup({
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

    if (progExercise) {
      progExerciseForm.addControl("id", new FormControl(progExercise.id));
      progExerciseForm.removeControl("creatorId");
    }
    return progExerciseForm;
  });

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly progExerciseService = inject(ProgExerciseService);

  ngOnInit() {
    this.userLoggedService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => this.user = user);
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionEnum) => {
          if (actionType === ActionEnum.create || actionType === ActionEnum.update)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const progExerciseForm = this.progExerciseForm();
    if (progExerciseForm.valid) {
      this.submitInvalidForm.set(false);
      if (!progExerciseForm.value.id) {
        this.progExerciseService.addProgExercise(progExerciseForm);
      } else {
        this.progExerciseService.modifyProgExercise(progExerciseForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
