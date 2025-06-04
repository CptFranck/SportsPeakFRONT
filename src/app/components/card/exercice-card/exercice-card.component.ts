import {Component, input} from '@angular/core';
import {Exercise} from "../../../shared/model/dto/exercise";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

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
