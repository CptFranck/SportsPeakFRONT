import {Routes} from "@angular/router";
import {ExercisesComponent} from "./exercises/exercises/exercises.component";

export const EXPLORE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'exercises', component: ExercisesComponent},
    ],
  }
]
