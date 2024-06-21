import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {Observable, Subscription} from "rxjs";
import {MuscleService} from "../../../../services/muscle/muscle.service";

@Component({
  selector: 'app-muscle-delete-form',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './muscle-delete-form.component.html',
})
export class muscleDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() muscle!: Muscle | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() eventsSubject!: Observable<void> | undefined;

  muscleService: MuscleService = inject(MuscleService);

  ngAfterViewInit() {
    if (this.eventsSubject)
      this.eventsSubscription = this.eventsSubject.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.muscle) return;
    this.muscleService.deleteMuscle(this.muscle)
    this.btnCloseRef.click()
  }
}
