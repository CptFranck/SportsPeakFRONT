import {AfterViewInit, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {Observable, Subscription} from "rxjs";
import {GraphQLError} from "graphql/error";
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

  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();
  @Output() muscleDelete: EventEmitter<Muscle> = new EventEmitter<Muscle>();

  muscleService: MuscleService = inject(MuscleService);

  ngAfterViewInit() {
    if (this.eventsSubject)
      this.eventsSubscription = this.eventsSubject.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.muscle) return;
    this.muscleService.deleteMuscle(this.muscle.id)
      .subscribe(({error}: any) => {
        if (error) {
          this.errorOccurred.emit(error);
        } else {
          this.muscleDelete.emit(this.muscle);
        }
      });
    this.btnCloseRef.click()
  }
}
