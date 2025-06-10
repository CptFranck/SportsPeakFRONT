import {Component, input, signal} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  tooltipHidden = signal<boolean>(true);

  readonly used = input<boolean>(true);
  readonly tooltipText = input<string>("Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...");

  showTooltip() {
    if (this.used())
      this.tooltipHidden.update(value => !value);
  }
}
