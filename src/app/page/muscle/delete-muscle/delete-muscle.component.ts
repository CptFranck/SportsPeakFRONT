import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Muscle} from "../../../interface/dto/muscle";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-delete-muscle',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './delete-muscle.component.html',
})
export class DeleteMuscleComponent {
  @Input() muscle!: Muscle | undefined;
  @Output() errorOccurred: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @Output() muscleDelete: EventEmitter<Muscle> = new EventEmitter<Muscle>();
  @ViewChild('btnClose') btnClose!: ElementRef

  constructor(private apollo: Apollo, private ref: ElementRef) {
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
    this.btnClose.nativeElement.click()
  }
}
