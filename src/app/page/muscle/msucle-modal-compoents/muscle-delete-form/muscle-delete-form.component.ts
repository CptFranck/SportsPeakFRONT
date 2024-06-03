import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {Apollo} from "apollo-angular";
import {Observable, Subscription} from "rxjs";
import {GraphQLError} from "graphql/error";

@Component({
  selector: 'app-muscle-delete-form',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './muscle-delete-form.component.html',
})
export class muscleDeleteFormComponent implements AfterViewInit {
  @Input() muscle!: Muscle | undefined;
  @Output() errorOccurred: EventEmitter<GraphQLError> = new EventEmitter<GraphQLError>();
  @Output() muscleDelete: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() eventsSubject!: Observable<void> | undefined;
  eventsSubscription!: Subscription;

  constructor(private apollo: Apollo, private ref: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.eventsSubject)
      this.eventsSubscription = this.eventsSubject.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    // this.apollo
    //   .mutate({
    //     mutation: DEL_MUSCLES,
    //     variables: {
    //       muscleId: this.muscle?.id,
    //     },
    //   })
    //   .subscribe(({data, error}: any) => {
    //     if (error) {
    //       this.errorOccurred.emit(error);
    //     } else {
    //       this.muscleDelete.emit(muscle);
    //     }
    //   });
    this.btnCloseRef.click()
  }
}
