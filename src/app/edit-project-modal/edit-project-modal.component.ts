import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ModalService } from '../modal.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit {

  modalVisible: boolean = false;
  project: Project;
  name: string;
  description: string;

  constructor(private projectService: ProjectService,
    private modalService: ModalService) {
    modalService.editProjectModalTriggered$.subscribe((projectToEdit: Project) => this.showModal(projectToEdit));
  }

  ngOnInit() {
  }

  public showModal(projectToEdit: Project): void {
    //set Project
    this.project = projectToEdit;
    //set name & description
    this.name = projectToEdit.name;
    this.description = projectToEdit.description;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public saveProject(): void {
    //save Project
    this.projectService.updateProject(this.project.projectId,
      this.name,
      this.description)
      .subscribe((updatedProject) => {
        //to do: toast notification
      });
    //hide modal
    this.modalVisible = false;
  }
}
