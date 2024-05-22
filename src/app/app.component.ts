import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusclesComponent } from './muscles/muscles.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseTypesComponent } from './exercise-types/exercise-types.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MusclesComponent,
    ExercisesComponent,
    ExerciseTypesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SportsPeak';
}
