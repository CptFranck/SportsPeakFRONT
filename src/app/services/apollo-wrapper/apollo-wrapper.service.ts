import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {Observable} from "rxjs";
import {MutationOptions, QueryOptions} from "@apollo/client";
import {EmptyObject} from "apollo-angular/types";
import {QueryRef} from "apollo-angular/query-ref";

@Injectable({
  providedIn: 'root'
})
export class ApolloWrapperService {

  private readonly apollo = inject(Apollo);

  public watchQuery<T>(options: QueryOptions<EmptyObject, T>): QueryRef<any> {
    return this.apollo.watchQuery<T>({
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
