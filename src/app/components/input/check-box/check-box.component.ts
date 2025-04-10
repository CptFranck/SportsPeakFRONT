import {Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html'
})
export class CheckBoxComponent {

  readonly checked = input.required<boolean>()
  readonly labelCheck = input.required<string>();
  readonly labelUnchecked = input<string>();

  readonly label = computed<string>(() => {
    const checked = this.checked();
    const labelCheck = this.labelCheck();
    const labelUnchecked = this.labelUnchecked();
    if (checked)
      return labelCheck;
    else if (labelUnchecked)
      return labelUnchecked;
    else
      return labelCheck;
  });

  readonly actionPerformanceLog = output<void>();

  onCheckBoxClick() {
    this.actionPerformanceLog.emit();
  }
}
