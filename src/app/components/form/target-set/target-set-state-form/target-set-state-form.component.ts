import {Component, computed, inject, input, signal} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TargetSetStateSelectComponent
} from "../../../selects/target-set-state-select/target-set-state-select.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {TargetSetService} from "../../../../services/target-set/target-set.service";

@Component({
  selector: 'app-target-set-state-form',
  imports: [
    NgIf,
    TargetSetStateSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './target-set-state-form.component.html'
})
export class TargetSetStateFormComponent {
  modify = signal<boolean>(false);

  readonly targetSet = input.required<TargetSet>();

  readonly targetSetForm = computed<FormGroup>(() => {
    const targetSetForm: FormGroup = new FormGroup(
      {
        state: new FormControl(
          this.targetSet().state,
          [Validators.required]),
      });
    targetSetForm.addControl("id", new FormControl(this.targetSet().id));
    return targetSetForm;
  });

  private readonly targetSetService = inject(TargetSetService);

  openForm(): void {
    this.modify.set(true);
  }

  submit() {
    const targetSetForm = this.targetSetForm()
    if (targetSetForm.valid) {
      this.targetSetService.modifyTargetSetState(targetSetForm);
      this.modify.set(false);
    }
  }
}

