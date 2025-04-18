import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloQueryResult, MutationOptions, QueryOptions} from "@apollo/client";
import {EmptyObject} from "apollo-angular/types";

@Injectable({
  providedIn: 'root'
})
export class ApolloWrapperServiceService {

  private readonly apollo = inject(Apollo);

  public query<T>(options: QueryOptions<EmptyObject, T>): Observable<ApolloQueryResult<T>> {
    return this.apollo.query<T>({
      ...options,
      errorPolicy: options.errorPolicy || 'all',
    });
  }

  public mutate<T>(options: MutationOptions<T, EmptyObject>): Observable<MutationResult<T>> {
    return this.apollo.mutate<T>({
      ...options,
      errorPolicy: options.errorPolicy || 'all',
    });
  }
}
