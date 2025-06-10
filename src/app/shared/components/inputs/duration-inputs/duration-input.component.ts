import {Component, computed, input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputControlComponent} from "../../input-control/input-control.component";

@Component({
  selector: 'app-duration-input',
  imports: [
    InputControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './duration-input.component.html'
})
export class DurationInputComponent {
  readonly fieldName = input.required<string>();
  readonly formGroup = input.required<FormGroup>();

  readonly durationForm = computed<FormGroup>(() =>
    this.formGroup().get(this.fieldName()) as FormGroup
  );
}
