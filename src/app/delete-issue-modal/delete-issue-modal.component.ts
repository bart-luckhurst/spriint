import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { ModalService } from '../modal.service';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-delete-issue-modal',
  templateUrl: './delete-issue-modal.component.html',
  styleUrls: ['./delete-issue-modal.component.css']
})
export class DeleteIssueModalComponent implements OnInit {
  modalVisible: boolean = false;
  issue: Issue;

  constructor(private issueService: IssueService,
    private modalService: ModalService) {
    modalService.deleteIssueModalTriggered$.subscribe((issueToDelete: Issue) => {
      this.showModal(issueToDelete);
    });
  }

  ngOnInit() {
  }

  public showModal(issueToDelete: Issue): void {
    //set Issue
    this.issue = issueToDelete;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public deleteIssue(): void {
    //delete Issue
    this.issueService.deleteIssue(this.issue.projectId,
      this.issue.issueId)
      .subscribe(() => {
        //hide modal
        this.modalVisible = false;
      });
  }
}
