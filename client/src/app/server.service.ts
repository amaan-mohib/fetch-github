import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { baseURL, IRepos, IUser } from './types';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  user: IUser | null = null;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.message || 'Something bad happened; please try again later.'));
  }

  fetchUser(username: string) {
    return this.http.get<IUser>(baseURL + `/user/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  fetchUserRepos(username: string, page = 1, page_size = 10) {
    return this.http.get<IRepos[]>(baseURL + `/repos/${username}?page=${page}&page_size=${page_size}`).pipe(
      catchError(this.handleError)
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
