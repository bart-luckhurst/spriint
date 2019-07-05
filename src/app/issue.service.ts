import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Issue } from './models/Issue';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issuesUpdatedSource = new Subject<void>();
  issuesUpdated$ = this.issuesUpdatedSource.asObservable();

  private issueDraggingSource = new Subject<boolean>();
  issueDragging$ = this.issueDraggingSource.asObservable();

  baseUrl: string = ConfigService.settings.api.baseUrl + '/projects';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  setIssueDragging(value: boolean): void {
    this.issueDraggingSource.next(value);
  }

  createIssue(projectId: string,
    epicId: string,
    issueType: string,
    name: string,
    description: string,
    status: string,
    estimate:number): Observable<Issue> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues';
    let body = {
      epicId: epicId,
      issueType: issueType,
      name: name,
      description: description,
      status: status,
      estimate: estimate
    };

    return this.http.post<Issue>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((newIssue: Issue) => {
          this.issuesUpdatedSource.next();
        }),
        catchError(this.handleError<Issue>('createIssue', null))
      );
  }

  getIssues(projectId: string): Observable<Issue[]> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues';

    return this.http.get<Issue[]>(apiUrl)
      .pipe(
        catchError(this.handleError<Issue[]>('getIssues', []))
      );
  }

  getIssue(projectId: string, issueId: string): Observable<Issue> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues/' + issueId;

    return this.http.get<Issue>(apiUrl)
      .pipe(
        catchError(this.handleError<Issue>('getIssue', null))
      );
  }

  updateIssue(projectId: string,
    issueId: string,
    epicId: string,
    issueType: string,
    name: string,
    description: string,
    status: string,
    estimate: number) {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues/' + issueId;

    let body = {
      epicId: epicId,
      issueType: issueType,
      name: name,
      description: description,
      status: status,
      estimate: estimate
    }

    return this.http.put<Issue>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((updatedIssue: Issue) => {
          this.issuesUpdatedSource.next();
        }),
        catchError(this.handleError<Issue>('updateIssue', null))
      );
  }

  updateIssueStatus(projectId: string,
    issueId: string,
    status: string) {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues/' + issueId;

    let body = JSON.stringify(status);

    return this.http.patch<Issue>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((updatedIssue: Issue) => {
          this.issuesUpdatedSource.next();
        }),
        catchError(this.handleError<Issue>('updateIssueStatus', null))
      );
  }

  deleteIssue(projectId: string,
    issueId: string) {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/issues/' + issueId;

    return this.http.delete(apiUrl, this.httpOptions)
      .pipe(
        tap(() => {
          this.issuesUpdatedSource.next();
        }),
        catchError(this.handleError<void>('deleteIssue', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
