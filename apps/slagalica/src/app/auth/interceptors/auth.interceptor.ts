import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@slagalica-app/auth/reducers';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userToken$ = this.store.pipe(select(fromAuth.getToken));

  constructor(private store: Store<any>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.headers instanceof HttpHeaders &&
      request.headers.has('x-no-auth')
    ) {
      return next.handle(request);
    }

    return this.userToken$.pipe(
      take(1),
      map(token =>
        token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          : request
      ),
      mergeMap(modifiedRequest => next.handle(modifiedRequest))
    );
  }
}
