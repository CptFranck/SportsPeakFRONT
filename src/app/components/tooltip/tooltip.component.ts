import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  tooltipHidden: boolean = true;

  @Input() used: boolean = true;
  @Input() tooltipText: string =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";

  showTooltip() {
    if (this.used)
      this.tooltipHidden = !this.tooltipHidden;
  }
}
