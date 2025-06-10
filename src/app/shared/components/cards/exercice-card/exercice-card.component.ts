import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Exercise} from "../../../model/dto/exercise";

@Component({
  selector: 'app-exercice-card',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './exercice-card.component.html',
  styleUrl: './exercice-card.component.css'
})
export class ExerciceCardComponent {
  exercise = input.required<Exercise>();
}
