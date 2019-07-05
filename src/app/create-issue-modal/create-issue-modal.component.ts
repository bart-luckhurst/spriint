import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { ModalService } from '../modal.service';
import { EpicService } from '../epic.service';
import { Epic } from '../models/Epic';

@Component({
  selector: 'app-create-issue-modal',
  templateUrl: './create-issue-modal.component.html',
  styleUrls: ['./create-issue-modal.component.css']
})
export class CreateIssueModalComponent implements OnInit {
  modalVisible: boolean = false;
  projectId: string;
  epics: Epic[];
  issueType: string = 'Story';
  name: string;
  selectedEpicId: string = null;
  description: string;

  constructor(private issueService: IssueService,
    private epicService: EpicService,
    private modalService: ModalService) {
    modalService.createIssueModalTriggered$.subscribe((projectId) => {
      this.projectId = projectId;
      this.showModal();
    });
  }

  ngOnInit() {
  }

  public showModal(): void {
    //load epics
    this.loadEpics(this.projectId);
    //reset form
    this.name = null;
    this.description = null;
    this.issueType = 'Story';
    this.selectedEpicId = null;
    //show modal
    this.modalVisible = true;
  }

  public loadEpics(projectId: string): void {
    this.epicService.getEpics(projectId)
      .subscribe((epics) => this.epics = epics);
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public selectType(type: string): void {
    this.issueType = type;
  }

  public setEpic(epicId: string): void {
    this.selectedEpicId = epicId;
  }

  public createIssue(): void {
    //create Issue
    this.issueService.createIssue(this.projectId,
      this.selectedEpicId,
      this.issueType,
      this.name,
      this.description,
      'ToDo',
      null)
      .subscribe((newIssue) => {
        //hide modal
        this.modalVisible = false;
      });
  }
}
