import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Project } from '../models/project';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.css']
})
export class DeleteProjectModalComponent implements OnInit {

  modalVisible: boolean = false;
  project: Project;

  constructor(private projectService: ProjectService,
    private modalService: ModalService,
    private router: Router) {
    modalService.deleteProjectModalTriggered$.subscribe((projectToDelete: Project) => {
      this.showModal(projectToDelete);
    });
  }

  ngOnInit() {
  }

  public showModal(projectToDelete: Project): void {
    //set Project
    this.project = projectToDelete;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public deleteProject(): void {
    //delete Project
    this.projectService.deleteProject(this.project.projectId)
      .subscribe(() => {
        //hide modal
        this.modalVisible = false;
        //navigate home
        this.router.navigate(['/']);
      });
  }
}
