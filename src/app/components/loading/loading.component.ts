import {Component, input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loading',
  imports: [
    NgIf
  ],
  templateUrl: './loading.component.html',
  animations: [
    trigger('collapseHeight', [
      transition(':enter', [
        style({height: '0', opacity: 0, overflow: 'hidden'}),
        animate('300ms ease-in-out', style({height: '*', opacity: 1}))
      ]),
      transition(':leave', [
        style({height: '*', opacity: 1, overflow: 'hidden'}),
        animate('300ms ease-in-out', style({height: '0', opacity: 0}))
      ])
    ])
  ]
})
export class LoadingComponent {
  readonly loading = input.required<boolean>();
}
