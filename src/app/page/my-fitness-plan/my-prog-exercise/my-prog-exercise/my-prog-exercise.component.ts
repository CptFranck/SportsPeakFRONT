import {Component, inject, OnInit} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-my-prog-exercise',
  standalone: true,
  imports: [],
  templateUrl: './my-prog-exercise.component.html',
})
export class MyProgExerciseComponent implements OnInit {
  id: string | undefined;
  loading: boolean = true;
  progExercise: ProgExercise | undefined;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private proExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.proExerciseService.userProgExercises.subscribe((progExercises: ProgExercise[]) => {
      this.progExercise = progExercises.find((progExercise: ProgExercise) => {
        return progExercise.id.toString() === this.id
      });
    });
    this.proExerciseService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }
}
