import {Component, input, OnInit, output, signal} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {NgIf, NgStyle} from "@angular/common";
import {Dictionary} from "../../interface/utils/dictionary";

@Component({
  selector: 'app-alert',
  imports: [
    NgIf,
    NgStyle,

  ],
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
  readonly alert = input.required<Alert>();
  readonly timeoutFading = input<number>(3);
  readonly timeoutFade = input<number>(3);

  disableCloseButton = signal<boolean>(false);
  transitionStyle = signal<Dictionary<string>>({
    'transition': `opacity ${this.timeoutFading()}s ease-in-out`,
    'opacity': '1'
  });

  readonly removedAlert = output<Alert>();

  private fadeTimeout: any;
  private removeTimeout: any;

  ngOnInit() {
    if (this.alert().autoClose)
      this.fadeTimeout = setTimeout(() => {
        this.transitionStyle.update(value => ({...value, ['opacity']: '0'}));
        this.removeTimeout = setTimeout(() => {
          this.removedAlert.emit(this.alert())
        }, 3000)
      }, this.timeoutFade() * 1000);
  }

  pauseFadeOut() {
    if (this.alert().autoClose) {
      clearTimeout(this.fadeTimeout);
      clearTimeout(this.removeTimeout);
      this.transitionStyle.set({'transition': 'none', 'opacity': '1',});
      setTimeout(() => this.transitionStyle.update(value => ({
        ...value,
        ['transition']: `opacity ${this.timeoutFading()}s ease-in-out`
      })), 100)
    }
  }

  removeAlert() {
    this.disableCloseButton.set(true);
    clearTimeout(this.fadeTimeout);
    clearTimeout(this.removeTimeout);
    this.removedAlert.emit(this.alert())
  }
}
