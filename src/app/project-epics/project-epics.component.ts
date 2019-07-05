import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { ModalService } from '../modal.service';
import { EpicService } from '../epic.service';
import { Epic } from '../models/Epic';

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.css']
})
export class ProjectEpicsComponent implements OnInit {

  project: Project = {
    projectId: '',
    name: '',
    description: '',
    dateTimeCreated: new Date()
  };
  epics: Epic[];

  constructor(private projectService: ProjectService,
    private epicService: EpicService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
    this.epicService.epicsUpdated.subscribe(() => {
      this.getEpics();
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getProjectDetails();
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

  private getEpics(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.epicService.getEpics(projectId)
      .subscribe(epics => {
        this.epics = epics;
      });
  }

  public createEpic(): void {
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');

    this.modalService.displayCreateEpicModal(projectId);
  }

  public editEpic(epicToEdit: Epic) {
    this.modalService.displayEditEpicModal(epicToEdit);
  }

  public deleteEpic(epicToDelete: Epic) {
    this.modalService.displayDeleteEpicModal(epicToDelete);
  }
}
