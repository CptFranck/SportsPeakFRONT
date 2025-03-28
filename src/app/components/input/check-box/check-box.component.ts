import {Component, EventEmitter, Input, input, Output, signal} from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html'
})
export class CheckBoxComponent {

  label = signal<string>("");
  checked = signal<boolean>(false)

  readonly labelCheck = input.required<string>();
  readonly labelUnchecked = input<string>();

  @Output() actionPerformanceLog: EventEmitter<void> = new EventEmitter();

  @Input() set checkedInput(checked: boolean) {
    this.checked.set(checked);
    this.updateLabel();
  }

  onCheckBoxClick() {
    this.actionPerformanceLog.emit();
  }

  updateLabel() {
    const labelUnchecked = this.labelUnchecked();
    if (this.checked())
      this.label.set(this.labelCheck());
    else if (labelUnchecked)
      this.label.set(labelUnchecked);
    else
      this.label.set(this.labelCheck());
  }
}
