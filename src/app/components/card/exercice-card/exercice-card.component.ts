import {Component, input} from '@angular/core';
import {Exercise} from "../../../interface/dto/exercise";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exercice-card',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './exercice-card.component.html',
  styleUrl: './exercice-card.component.css'
})
export class ExerciceCardComponent {
  exercise = input.required<Exercise>();
}
