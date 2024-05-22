import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_MUSCLES } from '../graphql/grapgql.operations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  muscles: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_MUSCLES,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.muscles = data.getMuscles;
        this.error = error;
      });
  }
}
