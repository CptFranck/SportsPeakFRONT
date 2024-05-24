import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_MUSCLES} from '../../../graphql/grapgql.operations';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule, ModalComponent, MusclesArrayComponent],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  muscles: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_MUSCLES,
      })
      .valueChanges.subscribe(({data, error}: any) => {
      this.muscles = data.getMuscles;
      this.error = error;
    });
  }


}
