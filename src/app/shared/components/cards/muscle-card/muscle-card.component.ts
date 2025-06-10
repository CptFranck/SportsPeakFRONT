import {Component, inject, input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Muscle} from "../../../model/dto/muscle";
import {IllustrationService} from "../../../../core/services/illustration/illustration.service";

@Component({
  selector: 'app-muscle-card',
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './muscle-card.component.html',
  styleUrl: 'muscle-card.component.css'
})
export class MuscleCardComponent implements OnInit {
  imageUrl: string = "";
  readonly muscle = input.required<Muscle>();
  readonly illustrationService = inject(IllustrationService);

  ngOnInit() {
    this.imageUrl = this.illustrationService.getImageUrl(this.muscle().illustrationPath);
  }
}
