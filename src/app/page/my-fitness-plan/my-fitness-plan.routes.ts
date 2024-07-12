import {Routes} from "@angular/router";
import {MyFitnessPlanComponent} from "./my-fitness-plan/my-fitness-plan.component";
import {MyProgExercisesComponent} from "./my-prog-exercises/my-prog-exercises/my-prog-exercises.component";

export const MY_FITNESS_PLAN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'my-plan', component: MyFitnessPlanComponent},
      {path: 'my-programed-exercises', component: MyProgExercisesComponent},
    ],
  }
]
