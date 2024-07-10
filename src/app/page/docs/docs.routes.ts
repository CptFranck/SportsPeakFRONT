import {Routes} from "@angular/router";
import {MusclesComponent} from "./muscles/muscles/muscles.component";
import {ExerciseTypesComponent} from "./exercise-types/exercise-types/exercise-types.component";
import {ExercisesComponent} from "./exercises/exercises/exercises.component";

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'muscles', component: MusclesComponent},
      {path: 'exercises', component: ExercisesComponent},
      {path: 'exercise-types', component: ExerciseTypesComponent},
    ],
  }
]
