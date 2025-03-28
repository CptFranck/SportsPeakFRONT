import {Component, computed, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputControlComponent} from "../../input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-duration-input',
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './duration-input.component.html'
})
export class DurationInputComponent {
  readonly fieldName = input.required<string>();
  readonly formGroup = input.required<FormGroup>();

  durationForm = computed<FormGroup>(() =>
    this.formGroup().get(this.fieldName()) as FormGroup
  );
}
