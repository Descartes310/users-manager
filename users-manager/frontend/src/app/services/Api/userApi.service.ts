import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../model/user';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class UserApi {

    private handleError: HandleError;

    public constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler,
    ) {
        this.handleError = httpErrorHandler.createHandleError('UserApi');
    }
    
    public getAllUsers(): Observable <User[]> {
        return this.http
        .get<User[]>('http://localhost:8000/api/users')
        .pipe(catchError(this.handleError('getAllUsers', [])));
    }

    public createUser(user: User): Observable <User> {
        return this.http
        .post<User>('http://localhost:8000/api/user', user)
        .pipe(catchError(this.handleError('createUser', user)));
    }

    public updateUser(user: User): Observable <User> {
        return this.http
        .put<User>('http://localhost:8000/api/user/${user._id}', user)
        .pipe(catchError(this.handleError('updateUser', user)));
    }

    public deleteUser(id: number): Observable <{}> {
        const uri = `http://localhost:8000/api/user/${id}`;
        return this.http
        .delete(uri)
        .pipe(catchError(this.handleError('deleteUser')));
    }

}