import {Component, inject, input, OnChanges, OnDestroy, signal, output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscles-array',
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent,
  ],
  templateUrl: './muscles-array.component.html'
})
export class MusclesArrayComponent implements OnChanges, OnDestroy {
  isAdmin = signal<boolean>(false);
  showDetails = signal<Dictionary<boolean>>({});

  readonly muscles = input.required<Muscle[]>();
  readonly modalId = input.required<string>();

  readonly actionMuscle = output<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.muscles().forEach((muscle: Muscle) => this.showDetails.update(value => ({...value, [muscle.id]: false})));
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendMuscleDetails(id: number): void {
    let idKey: string = id.toString()
    this.showDetails.update(value => ({...value, [idKey]: !value[idKey]}));
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
