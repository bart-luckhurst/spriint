import { Component, OnInit } from '@angular/core';
import { Epic } from '../models/Epic';
import { EpicService } from '../epic.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-edit-epic-modal',
  templateUrl: './edit-epic-modal.component.html',
  styleUrls: ['./edit-epic-modal.component.css']
})
export class EditEpicModalComponent implements OnInit {
  modalVisible: boolean = false;
  epic: Epic;
  name: string;
  description: string;

  constructor(private epicService: EpicService,
    private modalService: ModalService) {
    modalService.editEpicModalTriggered$.subscribe((epicToEdit: Epic) => this.showModal(epicToEdit));
  }

  ngOnInit() {
  }

  public showModal(epicToEdit: Epic): void {
    //set Epic
    this.epic = epicToEdit;
    //set name & description
    this.name = epicToEdit.name;
    this.description = epicToEdit.description;
    //show modal
    this.modalVisible = true;
  }

  public cancelModal(): void {
    //hide modal
    this.modalVisible = false;
  }

  public saveEpic(): void {
    //save Epic
    this.epicService.updateEpic(this.epic.projectId,
      this.epic.epicId,
      this.name,
      this.description)
      .subscribe((updatedEpic) => {
        //to do: toast notification
      });
    //hide modal
    this.modalVisible = false;
  }
}
