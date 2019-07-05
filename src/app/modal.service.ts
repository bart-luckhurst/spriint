import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from './models/project';
import { Epic } from './models/Epic';
import { Issue } from './models/Issue';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //---- Projects ----//
  private createProjectModalTriggeredSource = new Subject<void>();
  createProjectModalTriggered$ = this.createProjectModalTriggeredSource.asObservable();

  private editProjectModalTriggeredSource = new Subject<Project>();
  editProjectModalTriggered$ = this.editProjectModalTriggeredSource.asObservable();

  private deleteProjectModalTriggeredSource = new Subject<Project>();
  deleteProjectModalTriggered$ = this.deleteProjectModalTriggeredSource.asObservable();

  //---- Epics ----//
  private createEpicModalTriggeredSource = new Subject<string>();
  createEpicModalTriggered$ = this.createEpicModalTriggeredSource.asObservable();

  private editEpicModalTriggeredSource = new Subject<Epic>();
  editEpicModalTriggered$ = this.editEpicModalTriggeredSource.asObservable();

  private deleteEpicModalTriggeredSource = new Subject<Epic>();
  deleteEpicModalTriggered$ = this.deleteEpicModalTriggeredSource.asObservable();

  //---- Issues ----//
  private createIssueModalTriggeredSource = new Subject<string>();
  createIssueModalTriggered$ = this.createIssueModalTriggeredSource.asObservable();

  private editIssueModalTriggeredSource = new Subject<Issue>();
  editIssueModalTriggered$ = this.editIssueModalTriggeredSource.asObservable();

  private deleteIssueModalTriggeredSource = new Subject<Issue>();
  deleteIssueModalTriggered$ = this.deleteIssueModalTriggeredSource.asObservable();

  constructor() { }
  //---- Projects ----//
  public displayCreateProjectModal(): void {
    this.createProjectModalTriggeredSource.next();
  }

  public displayEditProjectModal(projectToEdit: Project): void {
    this.editProjectModalTriggeredSource.next(projectToEdit);
  }

  public displayDeleteProjectModal(projectToDelete: Project): void {
    this.deleteProjectModalTriggeredSource.next(projectToDelete);
  }

  //---- Epics ---//
  public displayCreateEpicModal(projectId: string): void {
    this.createEpicModalTriggeredSource.next(projectId);
  }

  public displayEditEpicModal(epicToEdit: Epic): void {
    this.editEpicModalTriggeredSource.next(epicToEdit);
  }

  public displayDeleteEpicModal(epicToDelete: Epic): void {
    this.deleteEpicModalTriggeredSource.next(epicToDelete);
  }

  //---- Issues ----//
  public displayCreateIssueModal(projectId: string): void {
    this.createIssueModalTriggeredSource.next(projectId);
  }

  public displayEditIssueModal(issueToEdit: Issue): void {
    this.editIssueModalTriggeredSource.next(issueToEdit);
  }

  public displayDeleteIssueModal(issueToDelete: Issue): void {
    this.deleteIssueModalTriggeredSource.next(issueToDelete);
  }
}
