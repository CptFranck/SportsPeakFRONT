import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputControlComponent} from "../../input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-duration-input',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './duration-input.component.html',
})
export class DurationInputComponent {
  durationForm!: FormGroup;
  rootFormGroup!: FormGroup;

  @Input() fieldName!: string;

  @Input() set rootFormGroupInput(value: FormGroup) {
    this.rootFormGroup = value;
    this.durationForm = this.rootFormGroup.get(this.fieldName) as FormGroup;
  }
}
