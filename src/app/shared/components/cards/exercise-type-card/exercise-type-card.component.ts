import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ExerciseType} from "../../../model/dto/exercise-type";

@Component({
  selector: 'app-exercise-type-card',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './exercise-type-card.component.html',
  styleUrl: './exercise-type-card.component.css'
})
export class ExerciseTypeCardComponent {
  exerciseType = input.required<ExerciseType>();
}
