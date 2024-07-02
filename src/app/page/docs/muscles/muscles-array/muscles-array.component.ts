import {Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../enum/action-type";
import {UserLoggedService} from "../../../../services/userLogged/user-logged.service";

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
export class MusclesArrayComponent implements OnChanges {
  showDetails: { [id: string]: boolean } = {};
  isAdmin: boolean = false;

  @Input() muscles!: Muscle[];
  @Input() modalId!: string;

  @Output() actionMuscle: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    this.isAdmin = this.userLoggedService.isAdmin()
  }

  ngOnChanges(): void {
    this.muscles.forEach((muscle: Muscle) => this.showDetails[muscle.id] = false);
  }

  expendMuscleDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id];
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
