import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProgExercise} from "../../../../model/dto/prog-exercise";
import {ProgExerciseService} from "../../../../../core/services/prog-exercise/prog-exercise.service";
import {
  TrustLabelSelectComponent
} from "../../../selects/prog-exercise-trust-label-select/trust-label-select.component";
import {CurrentUserService} from "../../../../../core/services/current-user/current-user.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-prog-exercise-trust-label-form',
  imports: [
    ReactiveFormsModule,
    TrustLabelSelectComponent
  ],
  templateUrl: './prog-exercise-trust-label-form.component.html'
})
export class ProgExerciseTrustLabelFormComponent implements OnInit, OnDestroy {
  readonly progExercise = input.required<ProgExercise>();

  modify = signal<boolean>(false);
  isStaff = signal<boolean>(false);
  progExerciseTrustLabel = computed<FormGroup>(() => {
    const progExerciseTrustLabel: FormGroup = new FormGroup({
      trustLabel: new FormControl(
        this.progExercise().trustLabel,
        [Validators.required]),
    });
    progExerciseTrustLabel.addControl("id", new FormControl(this.progExercise().id));
    return progExerciseTrustLabel;
  });

  private readonly unsubscribe$ = new Subject<void>();
  private readonly currentUserService = inject(CurrentUserService);
  private readonly progExerciseService = inject(ProgExerciseService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isStaff.set(this.currentUserService.isStaff()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openForm(): void {
    this.modify.set(true);
  }

  submit() {
    const progExerciseTrustLabel = this.progExerciseTrustLabel();
    if (progExerciseTrustLabel.valid) {
      this.progExerciseService.modifyProgExerciseTrustLabel(progExerciseTrustLabel);
      this.modify.set(false);
    }
  }
}

