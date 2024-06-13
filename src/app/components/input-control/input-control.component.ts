import {Component, Input, OnInit} from '@angular/core';
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
export class InputControlComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formGroupFieldName!: string;
  @Input() displayedFieldName: string | undefined;
  @Input() rules: string | undefined;
  @Input() errorMessage: string = "";
  @Input() submitInvalid!: boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.rules !== undefined)
      this.rules = " (" + this.rules + ")"
    else
      this.rules = "";

    let fieldName = "";
    if (this.displayedFieldName !== undefined)
      fieldName = this.displayedFieldName;
    else
      fieldName = this.formGroupFieldName

    if (this.errorMessage === "")
      this.errorMessage = "Please write a correct " + fieldName + this.rules;
    else
      this.errorMessage += this.rules;
  }
}
