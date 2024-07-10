import {Routes} from "@angular/router";
import {ProgExercisesComponent} from "./prog-exercises/prog-exercises/prog-exercises.component";

export const EXPLORE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'prog-exercises', component: ProgExercisesComponent},
    ],
  }
]
