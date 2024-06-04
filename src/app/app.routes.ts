import {Routes} from '@angular/router';
import {ExercisesComponent} from './page/exercises/exercises.component';
import {ExerciseTypesComponent} from './page/exercise-types/exercise-types/exercise-types.component';
import {MusclesComponent} from './page/muscle/muscles/muscles.component';

export const routes: Routes = [
  {path: 'exercises', component: ExercisesComponent},
  {path: 'exercise-types', component: ExerciseTypesComponent},
  {path: 'muscles', component: MusclesComponent},
  {path: '', redirectTo: '/muscles', pathMatch: 'full'},
];
