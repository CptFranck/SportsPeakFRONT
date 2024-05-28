import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_EXERCISE_TYPES} from '../../graphql/grapgql.operations';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-exercise-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-types.component.html',
})
export class ExerciseTypesComponent implements OnInit {
  exerciseTypes: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_EXERCISE_TYPES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
      this.exerciseTypes = data.getExerciseTypes;
      this.error = error;
    });
  }
}
