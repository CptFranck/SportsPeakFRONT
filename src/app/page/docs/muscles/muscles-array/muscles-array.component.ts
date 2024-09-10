import {Component, EventEmitter, inject, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscles-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent,
    ModalComponent,
  ],
  templateUrl: './muscles-array.component.html',
})
export class MusclesArrayComponent implements OnChanges, OnDestroy {
  isAdmin: boolean = false;
  showDetails: Dictionary<boolean> = {};

  @Input() muscles!: Muscle[];
  @Input() modalId!: string;

  @Output() actionMuscle: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.muscles.forEach((muscle: Muscle) => this.showDetails[muscle.id] = false);
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendMuscleDetails(id: number): void {
    let idKey: string = id.toString()
    this.showDetails[idKey] = !this.showDetails[idKey];
  }

  showMuscleDetails(muscle: Muscle): void {
    this.actionMuscle.emit({
      actionType: ActionType.read,
      object: muscle
    });
  }

  modifyMuscle(muscle: Muscle) {
    this.actionMuscle.emit({
      actionType: ActionType.update,
      object: muscle
    });
  }

  delMuscle(muscle: Muscle) {
    this.actionMuscle.emit({
      actionType: ActionType.delete,
      object: muscle
    });
  }
}
