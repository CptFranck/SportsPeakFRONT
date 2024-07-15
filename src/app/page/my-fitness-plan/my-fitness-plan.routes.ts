import {Routes} from "@angular/router";
import {MyFitnessPlanComponent} from "./my-fitness-plan/my-fitness-plan.component";
import {MyProgExercisesComponent} from "./my-prog-exercises/my-prog-exercises/my-prog-exercises.component";
import {MyProgExerciseComponent} from "./my-prog-exercise/my-prog-exercise/my-prog-exercise.component";

export const MY_FITNESS_PLAN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'my-plan', component: MyFitnessPlanComponent},
      {path: 'my-programed-exercises', component: MyProgExercisesComponent},
      {path: 'my-programed-exercise/:id', component: MyProgExerciseComponent},
    ],
  }
]
