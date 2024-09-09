import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {
  TargetSetSateSelectComponent
} from "../../../../../components/selects/target-set-state-select/target-set-sate-select.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../../services/prog-exercise/prog-exercise.service";
import {
  TrustLabelSelectComponent
} from "../../../../../components/selects/prog-exercise-trust-label-select/trust-label-select.component";

@Component({
  selector: 'app-prog-exercise-trust-label-form',
  standalone: true,
  imports: [
    NgIf,
    TargetSetSateSelectComponent,
    ReactiveFormsModule,
    TrustLabelSelectComponent
  ],
  templateUrl: './prog-exercise-trust-label-form.component.html',
})
export class ProgExerciseTrustLabelFormComponent implements OnInit {
  modify: boolean = false;
  progExerciseTrustLabel: FormGroup | null = null;

  @Input() progExercise!: ProgExercise;

  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit() {
    this.initializeProgExerciseForm();
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

