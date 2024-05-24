import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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
  @Input() muscles!: any[];
  showDetails: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.muscles.map(value => this.showDetails[value.id] = false)
  }

  expendDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }
}
