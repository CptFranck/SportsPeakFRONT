import {Routes} from "@angular/router";
import {MusclesComponent} from "./muscles/muscles/muscles.component";
import {ExerciseTypesComponent} from "./exercise-types/exercise-types/exercise-types.component";
import {ExercisesComponent} from "./exercises/exercises/exercises.component";
import {MuscleDetailsComponent} from "./muscles/muscle-details/muscle-details.component";

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'muscles', component: MusclesComponent},
      {path: 'muscle-details/:id', component: MuscleDetailsComponent},
      {path: 'exercises', component: ExercisesComponent},
      {path: 'exercise-types', component: ExerciseTypesComponent},
    ],
  }
]
