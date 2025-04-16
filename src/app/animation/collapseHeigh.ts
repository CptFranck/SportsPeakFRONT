import {animate, query, style, transition, trigger} from "@angular/animations";

const animation = '.5s ease-in-out';
const style1 = {height: '0', opacity: 0};
const style2 = {height: '*', opacity: 1};

export const collapseHeight = trigger('collapseHeight', [
  transition('* <=> *', [
    query(':enter', [
      style(style1), animate(animation, style(style2))
    ], {optional: true}),
    query(':leave', [
      style(style2), animate(animation, style(style1))
    ], {optional: true}),
  ]),
])
