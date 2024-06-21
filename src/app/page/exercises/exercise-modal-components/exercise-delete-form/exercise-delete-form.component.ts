import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
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
  @Input() submitEvents!: Observable<void> | undefined;

  private exerciseService: ExerciseService = inject(ExerciseService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.exercise) return;
    this.exerciseService.deleteExercise(this.exercise);
    this.btnCloseRef.click();
  }
}
