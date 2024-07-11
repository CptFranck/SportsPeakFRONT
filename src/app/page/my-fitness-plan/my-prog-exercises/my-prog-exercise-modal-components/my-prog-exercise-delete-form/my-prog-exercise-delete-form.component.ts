import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ProgExerciseService} from "../../../../../services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-my-prog-exercise-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './my-prog-exercise-delete-form.component.html',
})
export class MyProgExerciseDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() progExercise!: ProgExercise | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.progExercise) return;
    this.progExerciseService.deleteProgExercises(this.progExercise);
    this.btnCloseRef.click();
  }
}
