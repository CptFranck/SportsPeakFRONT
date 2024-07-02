import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ExerciseType} from "../../../../../interface/dto/exerciseType";
import {ExerciseTypeService} from "../../../../../services/exercise-type/exercise-type.service";

@Component({
  selector: 'app-exercise-type-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './exercise-type-delete-form.component.html',
})
export class ExerciseTypeDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() exerciseType!: ExerciseType | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.exerciseType) return;
    this.exerciseTypeService.deleteExerciseType(this.exerciseType);
    this.btnCloseRef.click();
  }
}
