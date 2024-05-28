import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_MUSCLES} from '../../../graphql/grapgql.operations';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphqlError} from "../../../interface/graphql/graphqlError";
import {GraphqlResponse} from "../../../interface/graphql/graphqlResponse";
import {MuscleFormComponent} from "../muscle-form/muscle-form.component";
import {ModalButtonComponent} from "../../../components/button/modalButton/modal-button.component";
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule, ModalComponent, MusclesArrayComponent, MuscleFormComponent, ModalButtonComponent, MultiSelectComponent, SelectExercisesComponent],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  muscles: Muscle[] = [];
  loading = true;
  error?: GraphqlError;
  modalId: string = "muscleModal"

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_MUSCLES,
      })
      .valueChanges.subscribe((result: GraphqlResponse): void => {
      this.muscles = result.data.getMuscles;
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
