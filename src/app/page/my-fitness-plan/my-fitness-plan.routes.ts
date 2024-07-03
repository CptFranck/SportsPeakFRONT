import {Routes} from "@angular/router";
import {MyFitnessPlanComponent} from "./my-fitness-plan/my-fitness-plan.component";

export const MY_FITNESS_PLAN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {path: 'my-plan', component: MyFitnessPlanComponent},
    ],
  }
]
