import {AfterViewInit, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {GraphQLError} from "graphql/error";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";

@Component({
  selector: 'app-exercise-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './exercise-delete-form.component.html',
})
export class ExerciseDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() exercise!: Exercise | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() eventsSubject!: Observable<void> | undefined;

  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();
  @Output() muscleDelete: EventEmitter<Exercise> = new EventEmitter<Exercise>();

  exerciseService: ExerciseService = inject(ExerciseService);

  ngAfterViewInit() {
    if (this.eventsSubject)
      this.eventsSubscription = this.eventsSubject.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.exercise) return;
    this.exerciseService.deleteExercise(this.exercise.id)
      .subscribe(({error}: any) => {
        if (error) {
          this.errorOccurred.emit(error);
        } else {
          this.muscleDelete.emit(this.exercise);
        }
      });
    this.btnCloseRef.click()
  }
}
