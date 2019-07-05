import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css']
})
export class CreateProjectModalComponent implements OnInit {

  modalVisible: boolean = false;
  name: string;
  description: string;

  constructor(private projectService: ProjectService,
    private modalService: ModalService,
  private router: Router) {
    modalService.createProjectModalTriggered$.subscribe(() => this.showModal());
  }

  ngOnInit() {
  }

  public showModal(): void {
    //reset form
    this.name = null;
    this.description = null;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public createProject(): void {
    //create Project
    this.projectService.createProject(this.name, this.description)
      .subscribe((newProject) => {
        //hide modal
        this.modalVisible = false;
        //navigate to Project
        this.router.navigate(['/' + newProject.projectId + '/overview']);
      });
  }

}
