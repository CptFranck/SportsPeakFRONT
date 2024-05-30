import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_EXERCISES} from "../../graphql/exercise/exercise.operations";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit {
  exercises: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_EXERCISES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
      this.exercises = data.getExercises;
      this.error = error;
    });
  }
}
