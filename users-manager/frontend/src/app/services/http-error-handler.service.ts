import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

export type HandleError = <T> (
    operation?: string,
    result?: T
) => (error: HttpErrorResponse) => Observable <T>;

@Injectable()
export class HttpErrorHandler {
    public constructor(private messageService: MessageService) {};

    public createHandleError: any = (serviceName = '') => <T> (
        operation = 'operation',
        result = {} as T
    ) => this.handleError(serviceName, operation, result); 

    handleError <T>(serviceName = '', operation = 'operation', result = {} as T) {
        return (error: HttpErrorResponse): Observable <T> => {
            console.log(error);

            const message = error.error instanceof ErrorEvent
                            ? error.error.message
                            : `Server returned code ${ error.status } with request body "${ error.error }"`;
            this.messageService.add(
                `${ serviceName }: ${ operation } failed with message: ${ message }`
            );

            return of(result as T);
        }
    };
}
