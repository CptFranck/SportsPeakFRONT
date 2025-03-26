import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TargetSetSateSelectComponent} from "../../../selects/target-set-state-select/target-set-sate-select.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {TargetSetService} from "../../../../services/target-set/target-set.service";

@Component({
    selector: 'app-target-set-state-form',
    imports: [
        NgIf,
        TargetSetSateSelectComponent,
        ReactiveFormsModule
    ],
    templateUrl: './target-set-state-form.component.html'
})
export class TargetSetStateFormComponent implements OnInit {
  modify: boolean = false;
  targetSetForm: FormGroup | null = null;

  @Input() targetSet!: TargetSet;

  private readonly targetSetService: TargetSetService = inject(TargetSetService);

  ngOnInit() {
    this.initializeTargetSetForm();
  }

  initializeTargetSetForm() {
    this.targetSetForm = new FormGroup(
      {
        state: new FormControl(
          this.targetSet.state,
          [Validators.required]),
      });
    this.targetSetForm.addControl("id", new FormControl(this.targetSet.id));
  }

  openForm(): void {
    this.modify = true;
  }

  submit() {
    if (!this.targetSetForm) return;
    if (this.targetSetForm.valid) {
      this.targetSetService.modifyTargetSetState(this.targetSetForm);
      this.modify = false;
    }
  }
}

