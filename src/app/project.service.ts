import { Injectable } from '@angular/core';
import { Project } from './models/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProjectCountCollection } from './models/ProjectCountCollection';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUpdatedSource = new Subject<void>();
  projectsUpdated = this.projectsUpdatedSource.asObservable();

  private projectSelectedSource = new Subject<Project>();
  projectSelected = this.projectSelectedSource.asObservable();

  constructor(private http: HttpClient) { }

  baseUrl: string = ConfigService.settings.api.baseUrl + '/projects';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  selectProject(projectToSelect: Project) {
    this.projectSelectedSource.next(projectToSelect);
  }

  createProject(name: string, description: string): Observable<Project> {
    let body = {
      name: name,
      description: description
    };
    let apiUrl: string = this.baseUrl;
    return this.http.post<Project>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((newProject: Project) => {
          this.projectsUpdatedSource.next();
        }),
        catchError(this.handleError<Project>('createProject', null))
      );
  }

  getProjects(): Observable<Project[]> {
    let apiUrl: string = this.baseUrl;

    return this.http.get<Project[]>(apiUrl)
      .pipe(
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getProject(projectId: string): Observable<Project> {
    let apiUrl: string = this.baseUrl + '/' + projectId;

    return this.http.get<Project>(apiUrl)
      .pipe(
        catchError(this.handleError<Project>('getProject', null))
      );
  }

  getProjectCountCollection(projectId: string): Observable<ProjectCountCollection> {
    let apiUrl: string = this.baseUrl + '/' + projectId + '/counts';

    return this.http.get<ProjectCountCollection>(apiUrl)
      .pipe(
        catchError(this.handleError<ProjectCountCollection>('getProjectCountCollection', null))
      );
  }

  updateProject(projectId: string, name: string, description: string): Observable<Project> {
    let body = {
      name: name,
      description: description
    };
    let apiUrl: string = this.baseUrl + '/' + projectId;
    return this.http.put<Project>(apiUrl, body, this.httpOptions)
      .pipe(
        tap((newProject: Project) => {
          this.projectsUpdatedSource.next();
        }),
        catchError(this.handleError<Project>('updateProject', null))
      );
  }

  deleteProject(projectId: string) {
    let apiUrl: string = this.baseUrl + '/' + projectId;
    return this.http.delete(apiUrl, this.httpOptions)
      .pipe(
        tap(() => {
          this.projectsUpdatedSource.next();
        }),
        catchError(this.handleError<void>('deleteProject', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
