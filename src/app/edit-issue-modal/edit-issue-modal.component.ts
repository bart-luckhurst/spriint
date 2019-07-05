import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';
import { IssueService } from '../issue.service';
import { ModalService } from '../modal.service';
import { Epic } from '../models/Epic';
import { EpicService } from '../epic.service';

@Component({
  selector: 'app-edit-issue-modal',
  templateUrl: './edit-issue-modal.component.html',
  styleUrls: ['./edit-issue-modal.component.css']
})
export class EditIssueModalComponent implements OnInit {
  modalVisible: boolean = false;
  issue: Issue;
  projectId: string;
  epics: Epic[];
  issueType: string = 'Story';
  name: string;
  selectedEpicId: string = null;
  description: string;
  status: string;

  constructor(private issueService: IssueService,
    private epicService: EpicService,
    private modalService: ModalService) {
    modalService.editIssueModalTriggered$.subscribe((issueToEdit: Issue) => {
      this.projectId = issueToEdit.projectId;
      this.showModal(issueToEdit);
    });
  }

  ngOnInit() {
  }

  public showModal(issueToEdit: Issue): void {
    //load epics
    this.loadEpics(this.projectId);
    //set Issue (get from server to get extra details)
    this.issueService.getIssue(issueToEdit.projectId,
      issueToEdit.issueId)
      .subscribe((issue) => {
        this.issue = issue;
        //set name & description
        this.issueType = issue.issueType;
        this.name = issue.name;
        this.selectedEpicId = issue.epicId;
        this.description = issue.description;
        this.status = issue.status;
        //show modal
        this.modalVisible = true;
      });
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

  public saveIssue(): void {
    //save Issue
    this.issueService.updateIssue(this.issue.projectId,
      this.issue.issueId,
      this.selectedEpicId,
      this.issueType,
      this.name,
      this.description,
      this.issue.status,
      0)
      .subscribe((updatedIssue) => {
        //to do: toast notification
      });
    //hide modal
    this.modalVisible = false;
  }
}
