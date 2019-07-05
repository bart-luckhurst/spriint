import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;

  constructor(private projectService: ProjectService,
    private modalService: ModalService) {
    this.projectService.projectsUpdated.subscribe(() => {
      this.loadProjects();
    });
    this.projectService.projectSelected.subscribe((project: Project) => {
      this.selectedProject = project;
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;

        if (this.projects.length > 0) {
          this.selectedProject = this.projects[0];
        }
        else {
          this.selectedProject = null;
        }
      });
  }

  public createProject(): void {
    this.modalService.displayCreateProjectModal();
  }
}
