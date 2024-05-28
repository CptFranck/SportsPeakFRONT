import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {GET_EXERCISES} from "../../../graphql/grapgql.operations";
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {Exercise} from "../../../interface/dto/exercise";
import {Option} from "../../../interface/multiSelect/option";
import {OptionSelected} from "../../../interface/multiSelect/optionSelected";

@Component({
  selector: 'app-select-exercises',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  templateUrl: './select-exercises.component.html',
})
export class SelectExercisesComponent implements OnInit {
  exercises: Option[] = [];
  error: any;
  @Input()
  selectedExercises: OptionSelected[] = [];

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_EXERCISES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
      data.getExercises.forEach((exercise: Exercise) => {
        this.exercises.push({id: exercise.id, title: exercise.name, value: exercise});
      });
      console.log("exercises", this.exercises);
      this.error = error;
    });
  }
}
