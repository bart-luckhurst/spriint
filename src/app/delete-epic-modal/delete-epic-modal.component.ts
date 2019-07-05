import { Component, OnInit } from '@angular/core';
import { EpicService } from '../epic.service';
import { ModalService } from '../modal.service';
import { Epic } from '../models/Epic';

@Component({
  selector: 'app-delete-epic-modal',
  templateUrl: './delete-epic-modal.component.html',
  styleUrls: ['./delete-epic-modal.component.css']
})
export class DeleteEpicModalComponent implements OnInit {
  modalVisible: boolean = false;
  epic: Epic;

  constructor(private epicService: EpicService,
    private modalService: ModalService) {
    modalService.deleteEpicModalTriggered$.subscribe((epicToDelete: Epic) => {
      this.showModal(epicToDelete);
    });
  }

  ngOnInit() {
  }

  public showModal(epicToDelete: Epic): void {
    //set Epic
    this.epic = epicToDelete;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public deleteEpic(): void {
    //delete Epic
    this.epicService.deleteEpic(this.epic.projectId,
      this.epic.epicId)
      .subscribe(() => {
        //hide modal
        this.modalVisible = false;
      });
  }
}
