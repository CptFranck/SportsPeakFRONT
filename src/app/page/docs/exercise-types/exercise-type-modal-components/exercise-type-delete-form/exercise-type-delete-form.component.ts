import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable} from "rxjs";
import {ExerciseType} from "../../../../../interface/dto/exercise-type";
import {ExerciseTypeService} from "../../../../../services/exercise-type/exercise-type.service";
import {ActionType} from "../../../../../enum/action-type";

@Component({
  selector: 'app-exercise-type-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './exercise-type-delete-form.component.html',
})
export class ExerciseTypeDeleteFormComponent implements AfterViewInit {

  @Input() exerciseType!: ExerciseType | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType!: Observable<ActionType> | undefined;

  private exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  ngAfterViewInit() {
    if (this.submitEventActionType)
      this.submitEventActionType.subscribe((actionType: ActionType) => {
        if (actionType === ActionType.delete)
          this.onSubmit();
      });
  }

  onSubmit() {
    if (!this.exerciseType) return;
    this.exerciseTypeService.deleteExerciseType(this.exerciseType);
    this.btnCloseRef.click();
  }
}
