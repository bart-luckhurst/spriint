import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Epic } from './models/Epic';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  private epicsUpdatedSource = new Subject<void>();
  epicsUpdated = this.epicsUpdatedSource.asObservable();

  baseUrl: string = ConfigService.settings.api.baseUrl + '/projects';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createEpic(projectId: string,
    name: string,
    description: string): Observable<Epic> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/epics';
    let body = {
      name: name,
      description: description
    };

    return this.http.post<Epic>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((newEpic: Epic) => {
          this.epicsUpdatedSource.next();
        }),
        catchError(this.handleError<Epic>('createEpic', null))
      );
  }

  getEpics(projectId: string): Observable<Epic[]> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/epics';

    return this.http.get<Epic[]>(apiUrl)
      .pipe(
        catchError(this.handleError<Epic[]>('getEpics', []))
      );
  }

  updateEpic(projectId: string,
    epicId: string,
    name: string,
    description: string) {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/epics/' + epicId;

    let body = {
      name: name,
      description: description
    }

    return this.http.put<Epic>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((updatedEpic: Epic) => {
          this.epicsUpdatedSource.next();
        }),
        catchError(this.handleError<Epic>('updateEpic', null))
      );
  }

  deleteEpic(projectId: string,
    epicId: string) {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/epics/' + epicId;

    return this.http.delete(apiUrl, this.httpOptions)
      .pipe(
        tap(() => {
          this.epicsUpdatedSource.next();
        }),
        catchError(this.handleError<void>('deleteEpic', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
