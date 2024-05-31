import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../interface/dto/muscle";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";

@Component({
  selector: 'app-muscles-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent
  ],
  templateUrl: './muscles-array.component.html',
})
export class MusclesArrayComponent implements OnInit {
  @Input() muscles!: Muscle[];
  @Input() modalId!: string;
  @Output() updateMuscle: EventEmitter<Muscle> = new EventEmitter();
  showDetails: { [id: string]: boolean } = {};

  ngOnInit(): void {
    this.muscles.map(muscle => this.showDetails[muscle.id] = false)
  }

  expendMuscleDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }

  showMuscleDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }

  modifyMuscle(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }

  setMuscle(muscle: Muscle) {
    this.updateMuscle.emit(muscle);
  }
}
