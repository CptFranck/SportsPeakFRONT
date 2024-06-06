import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {Option} from "../../../interface/multi-select/option";
import {MultiSelectComponent} from "../multi-select/multi-select.component";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {Muscle} from "../../../interface/dto/muscle";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ApolloQueryResult} from "@apollo/client";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-muscle-selector',
  standalone: true,
  imports: [
    MultiSelectComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MuscleSelectorComponent),
      multi: true,
    }
  ],
  templateUrl: './muscle-selector.component.html',
})
export class MuscleSelectorComponent implements OnInit, ControlValueAccessor {
  error: any;
  muscles: Option[] = [];
  @Input() muscleIds: number[] = [];
  alertService: AlertService = inject(AlertService);
  muscleService: MuscleService = inject(MuscleService);

  onChange: (value: number[]) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.muscleService.getMuscles().subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map(err => this.alertService.createGraphQLErrorAlert(err))
      } else {
        let options: Option[] = []
        result.data.getMuscles.forEach((muscle: Muscle) => {
          options.push({
            id: muscle.id,
            title: muscle.name,
            value: muscle,
            description: muscle.description
          });
        });
        this.muscles = [...options];
      }
    });
  }

  writeValue(muscleIds: number[]): void {
    this.muscleIds = muscleIds;
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setExerciseIds(muscleIds: number[]) {
    this.muscleIds = muscleIds;
    this.onChange(muscleIds);
  }
}
