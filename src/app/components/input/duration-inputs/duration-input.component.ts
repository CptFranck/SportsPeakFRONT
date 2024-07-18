import {Component, Input, OnInit} from '@angular/core';
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
export class DurationInputComponent implements OnInit {
  durationForm!: FormGroup;

  @Input() fieldName!: string;
  @Input() rootFormGroup!: FormGroup;

  ngOnInit(): void {
    this.durationForm = this.rootFormGroup.get(this.fieldName) as FormGroup;
  }
}
