import {Component, EventEmitter, input, OnInit, Output, signal} from '@angular/core';
import {TooltipComponent} from "../../tooltip/tooltip.component";

@Component({
  selector: 'app-modal-button',
  imports: [
    TooltipComponent
  ],
  templateUrl: './modal-button.component.html'
})
export class ModalButtonComponent implements OnInit {
  allWidthStyle = signal<string>("");

  readonly disabled = input<boolean>(false);
  readonly modalId = input.required<string>();
  readonly modalValue = input<any>();
  readonly btnClass = input<string>("btn-success");
  readonly allWidth = input<boolean>(false);
  readonly useTooltip = input<boolean>(false);
  readonly tooltipText = input<string>("Modal tooltip text");

  @Output() onCLickModalButton: EventEmitter<any> = new EventEmitter();


  onClick() {
    if (this.onCLickModalButton) {
      this.onCLickModalButton.emit(this.modalValue())
    }
  }

  ngOnInit(): void {
    if (this.allWidth())
      this.allWidthStyle.set("width:100%")
  }
}
