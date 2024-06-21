import {AfterViewInit, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {GraphQLError} from "graphql/error";
import {ExerciseType} from "../../../../interface/dto/exerciseType";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";

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

  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();
  @Output() exerciseTypeDelete: EventEmitter<ExerciseType> = new EventEmitter<ExerciseType>();

  exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.exerciseType) return;
    this.exerciseTypeService.deleteExerciseType(this.exerciseType.id)
      .subscribe(({error}: any) => {
        if (error) {
          this.errorOccurred.emit(error);
        } else {
          this.exerciseTypeDelete.emit(this.exerciseType);
        }
      });
    this.btnCloseRef.click()
  }
}
