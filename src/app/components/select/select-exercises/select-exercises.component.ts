import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {GET_EXERCISES} from "../../../graphql/grapgql.operations";
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {Exercise} from "../../../interface/dto/exercise";
import {Option} from "../../../interface/multiSelect/option";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-select-exercises',
  standalone: true,
  imports: [
    MultiSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectExercisesComponent),
      multi: true,
    }
  ],
  templateUrl: './select-exercises.component.html',
})
export class SelectExercisesComponent implements OnInit, ControlValueAccessor {
  error: any;
  exercises: Option[] = [];
  @Input()
  exerciseIds: number[] = [];

  constructor(private apollo: Apollo) {
  }

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_EXERCISES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
      let options: Option[] = []
      data.getExercises.forEach((exercise: Exercise) => {
        options.push({id: exercise.id, title: exercise.name, value: exercise, description: exercise.description});
      });
      this.exercises = [...options];
      this.error = error;
    });
  }

  writeValue(exerciseIds: number[]): void {
    this.exerciseIds = exerciseIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseIds: number[]) {
    this.exerciseIds = exerciseIds;
    this.onChange(exerciseIds);
  }
}
