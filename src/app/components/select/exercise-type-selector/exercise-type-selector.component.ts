import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Option} from "../../../interface/multi-select/option";
import {ExerciseTypeService} from "../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../interface/dto/exerciseType";
import {AlertService} from "../../../services/alert/alert.service";
import {GraphQLError} from "graphql/error";
import {ApolloQueryResult} from "@apollo/client";

@Component({
  selector: 'app-exercise-type-selector',
  standalone: true,
  imports: [
    MultiSelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExerciseTypeSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './exercise-type-selector.component.html',
})
export class ExerciseTypeSelectorComponent implements OnInit, ControlValueAccessor {
  error: any;
  exerciseTypes: Option[] = [];
  @Input() exerciseTypeIds: number[] = [];
  alertService: AlertService = inject(AlertService);
  exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseTypes().subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map(err => this.setAlertError(err))
      } else {
        let options: Option[] = []
        result.data.getExerciseTypes.forEach((exerciseType: ExerciseType) => {
          options.push({
            id: exerciseType.id,
            title: exerciseType.name,
            value: exerciseType,
            description: exerciseType.goal
          });
        });
        this.exerciseTypes = [...options];
      }
    });
  }

  setAlertError(graphQLError: GraphQLError) {
    let message: string = "Error has occurred: " + graphQLError.message;
    this.alertService.addErrorAlert(message);
  }

  writeValue(exerciseTypeIds: number[]): void {
    this.exerciseTypeIds = exerciseTypeIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(exerciseTypeIds: number[]) {
    this.exerciseTypeIds = exerciseTypeIds;
    this.onChange(exerciseTypeIds);
  }
}
