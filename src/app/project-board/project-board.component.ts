import { Component, OnInit } from '@angular/core';
import { Epic } from '../models/Epic';
import { Project } from '../models/project';
import { EpicService } from '../epic.service';
import { ProjectService } from '../project.service';
import { ModalService } from '../modal.service';
import { ActivatedRoute } from '@angular/router';
import { Issue } from '../models/Issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {
  project: Project = {
    projectId: '',
    name: '',
    description: '',
    dateTimeCreated: new Date()
  };
  epics: Epic[];
  issues: Issue[];
  toDoIssues: Issue[];
  inProgressIssues: Issue[];
  inTestIssues: Issue[];
  completeIssues: Issue[];
  issueOverDropTarget: boolean = false;

  constructor(private projectService: ProjectService,
    private issueService: IssueService,
    private epicService: EpicService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
    this.epicService.epicsUpdated.subscribe(() => {
      this.getEpics();
    });
    this.issueService.issuesUpdated$.subscribe(() => {
      this.getIssues();
    });
    this.issueService.issueDragging$.subscribe((value) => {
      this.issueOverDropTarget = value;
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getProjectDetails();
      this.getIssues();
      this.getEpics();
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
        this.toDoIssues = issues.filter(x => x.status === 'ToDo');
        this.inProgressIssues = issues.filter(x => x.status === 'InProgress');
        this.inTestIssues = issues.filter(x => x.status === 'InTest');
        this.completeIssues = issues.filter(x => x.status === 'Complete');
      });
  }

  private getEpics(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.epicService.getEpics(projectId)
      .subscribe(epics => {
        this.epics = epics;
      });
  }

  onDragStart(event): void {
    let element: Element = event.currentTarget;
  }

  onDragMove(event): void {
    let element: Element = event.currentTarget;
  }

  onDragEnd(event): void {
    let a = event;
  }
}
