import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { formatDate } from '@angular/common';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  project: Project = {
    projectId: '',
    name: '',
    description: '',
    dateTimeCreated: new Date()
  };

  epicCount: number = 0;
  storyCount: number = 0;
  bugCount: number = 0;

  constructor(private projectService: ProjectService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
    this.projectService.projectsUpdated.subscribe(() => {
      this.getProjectDetails();
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getProjectDetails();
    });
  }

  private getProjectDetails(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.projectService.getProject(projectId)
      .subscribe(project => {
        this.project = project;
        this.projectService.selectProject(project);
      });
    this.projectService.getProjectCountCollection(projectId)
      .subscribe(projectCountCollection => {
        this.epicCount = projectCountCollection.epicCount;
        this.storyCount = projectCountCollection.storyCount;
        this.bugCount = projectCountCollection.bugCount;
      });
  }

  public editProject(): void {
    this.modalService.displayEditProjectModal(this.project);
  }

  public deleteProject(): void {
    this.modalService.displayDeleteProjectModal(this.project);
  }

  formatDateTime(dateTime: Date): string {
    let currentDateTime = new Date();
    let dateString = formatDate(dateTime, 'dd/MM/yy', 'en-gb');
    let timeString = formatDate(dateTime, 'HH:mm', 'en-gb');

    return dateString + ' at ' + timeString;
  }

}
