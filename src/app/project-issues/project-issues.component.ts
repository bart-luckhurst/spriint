import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { IssueService } from '../issue.service';
import { ModalService } from '../modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-issues',
  templateUrl: './project-issues.component.html',
  styleUrls: ['./project-issues.component.css']
})
export class ProjectIssuesComponent implements OnInit {
  project: Project = {
    projectId: '',
    name: '',
    description: '',
    dateTimeCreated: new Date()
  };
  issues: Issue[];

  constructor(private projectService: ProjectService,
    private issueService: IssueService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
    this.issueService.issuesUpdated$.subscribe(() => {
      this.getIssues();
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getProjectDetails();
      this.getIssues();
    });
  }

  private getProjectDetails(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.projectService.getProject(projectId)
      .subscribe(project => {
        this.project = project;
        this.projectService.selectProject(project);
      });
  }

  private getIssues(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.issueService.getIssues(projectId)
      .subscribe(issues => {
        this.issues = issues;
      });
  }

  public createIssue(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.modalService.displayCreateIssueModal(projectId);
  }

  public editIssue(issueToEdit: Issue) {
    this.modalService.displayEditIssueModal(issueToEdit);
  }

  public deleteIssue(issueToDelete: Issue) {
    this.modalService.displayDeleteIssueModal(issueToDelete);
  }
}
