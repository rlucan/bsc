import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {MessageBoxService} from './messasge-box.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private messageBoxService: MessageBoxService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let apiRequest = request;

    if (!request.url.startsWith('/assets/')) {
      apiRequest = request.clone({
        url: 'https://private-anon-9003346e3f-note10.apiary-mock.com/' + request.url
      });
    }

    return next.handle(apiRequest).pipe(
      delay(1500),
      catchError(e => {
        const message = e.status + ': ' + e.statusText + '<br />' + e.message;
        this.messageBoxService.confirm(message, { title: 'API Error' });
        return throwError(e);
      }));

  }
}
