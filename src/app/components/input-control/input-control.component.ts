import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-control',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './input-control.component.html',
})
export class InputControlComponent {
  @Input() formGroup!: FormGroup
  @Input() fieldName!: string
  @Input() rules!: string
  @Input() errorMessage: string = "Please write a correct " + this.fieldName + " (" + this.rules + ")."
}
