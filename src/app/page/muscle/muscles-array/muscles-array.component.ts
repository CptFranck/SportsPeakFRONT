import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../interface/dto/muscle";

@Component({
  selector: 'app-muscles-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './muscles-array.component.html',
})
export class MusclesArrayComponent implements OnInit {
  @Input() muscles!: Muscle[];
  showDetails: { [id: string]: boolean } = {};

  ngOnInit(): void {
    this.muscles.map(muscle => this.showDetails[muscle.id] = false)
  }

  expendDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }
}
