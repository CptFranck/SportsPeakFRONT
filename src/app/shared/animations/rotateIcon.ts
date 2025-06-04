import {animate, state, style, transition, trigger} from '@angular/animations';

export const rotateIcon = trigger('rotateIcon', [
  state('down', style({transform: 'rotate(0deg)'})),
  state('up', style({transform: 'rotate(180deg)'})),
  transition('down <=> up', animate('500ms ease'))
]);
