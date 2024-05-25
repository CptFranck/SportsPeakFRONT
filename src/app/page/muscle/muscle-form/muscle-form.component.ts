import {Component} from '@angular/core';
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";

@Component({
  selector: 'app-muscle-form',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  templateUrl: './muscle-form.component.html',
})
export class MuscleFormComponent {

}
