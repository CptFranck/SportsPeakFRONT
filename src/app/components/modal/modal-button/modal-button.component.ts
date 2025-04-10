import {Component, input, OnInit, output, signal} from '@angular/core';
import {TooltipComponent} from "../../tooltip/tooltip.component";

@Component({
  selector: 'app-modal-button',
  imports: [
    TooltipComponent
  ],
  templateUrl: './modal-button.component.html'
})
export class ModalButtonComponent implements OnInit {
  style = signal<string>("");

  readonly modalId = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly modalValue = input<any>();
  readonly btnClass = input<string>("btn-success");
  readonly allWidth = input<boolean>(false);
  readonly onOneLine = input<boolean>(false);
  readonly useTooltip = input<boolean>(false);
  readonly tooltipText = input<string>("Modal tooltip text");

  readonly onCLickModalButton = output<any>();

  onClick() {
    if (this.onCLickModalButton)
      this.onCLickModalButton.emit(this.modalValue())
  }

  ngOnInit(): void {
    if (this.allWidth())
      this.style.update(value => value + " width:100%;")
    if (this.onOneLine())
      this.style.update(value => value + " white-space: nowrap; text-align: center;")
  }
}
