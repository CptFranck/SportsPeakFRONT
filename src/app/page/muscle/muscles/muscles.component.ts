import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {MuscleEntityFormComponent} from "../muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {AlertComponent} from "../../../components/alert/alert.component";
import {
  MuscleDetailsDisplayComponent
} from "../muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {muscleDeleteFormComponent} from "../muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {MuscleModalComponent} from "../muscle-modal/muscle-modal.component";
import {AlertDisplayComponent} from "../../../components/alert-display/alert-display.component";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {Muscle} from "../../../interface/dto/muscle";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    MusclesArrayComponent,
    MuscleEntityFormComponent,
    ModalButtonComponent,
    LoadingComponent,
    AlertComponent,
    MuscleDetailsDisplayComponent,
    muscleDeleteFormComponent,
    MuscleModalComponent,
    AlertDisplayComponent
  ],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  loading: boolean = true;
  muscles: Muscle[] = [];
  muscle: Muscle | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "muscleModal";
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private muscleService: MuscleService = inject(MuscleService);

  ngOnInit(): void {
    this.muscleService.muscles.subscribe((muscles: Muscle[]) => this.muscles = muscles);
    this.muscleService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setMuscle(formIndicator: FormIndicator) {
    this.muscle = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }
}
