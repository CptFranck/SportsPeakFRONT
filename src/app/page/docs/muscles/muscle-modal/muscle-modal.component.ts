import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../../enum/action-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {MuscleEntityFormComponent} from "../muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {muscleDeleteFormComponent} from "../muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";

@Component({
  selector: 'app-muscle-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent
  ],
  templateUrl: './muscle-modal.component.html',
})
export class MuscleModalComponent implements OnInit {
  isAdmin: boolean = false;
  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() muscle: Muscle | undefined;
  @Input() action!: ActionType;
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;
  protected readonly ActionType = ActionType;
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  onClick(value: undefined) {
    this.muscle = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new muscle";
  }

  ngOnInit(): void {
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }
}
