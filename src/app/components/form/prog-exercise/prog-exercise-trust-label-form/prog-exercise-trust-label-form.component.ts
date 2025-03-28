import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {
  TrustLabelSelectComponent
} from "../../../selects/prog-exercise-trust-label-select/trust-label-select.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-prog-exercise-trust-label-form',
  imports: [
    NgIf,
    ReactiveFormsModule,
    TrustLabelSelectComponent
  ],
  templateUrl: './prog-exercise-trust-label-form.component.html'
})
export class ProgExerciseTrustLabelFormComponent implements OnInit, OnDestroy {
  modify: boolean = false;
  isStaff: boolean = false;
  progExerciseTrustLabel: FormGroup | null = null;

  @Input() progExercise!: ProgExercise;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);
  private readonly progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit() {
    this.initializeProgExerciseForm();
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isStaff = this.userLoggedService.isStaff();
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeProgExerciseForm() {
    this.progExerciseTrustLabel = new FormGroup(
      {
        trustLabel: new FormControl(
          this.progExercise.trustLabel,
          [Validators.required]),
      });
    this.progExerciseTrustLabel.addControl("id", new FormControl(this.progExercise.id));
  }

  openForm(): void {
    this.modify = true;
  }

  submit() {
    if (!this.progExerciseTrustLabel) return;
    if (this.progExerciseTrustLabel.valid) {
      this.progExerciseService.modifyProgExerciseTrustLabel(this.progExerciseTrustLabel);
      this.modify = false;
    }
  }
}

