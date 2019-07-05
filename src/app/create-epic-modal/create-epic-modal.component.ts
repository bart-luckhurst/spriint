import { Component, OnInit } from '@angular/core';
import { EpicService } from '../epic.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-epic-modal',
  templateUrl: './create-epic-modal.component.html',
  styleUrls: ['./create-epic-modal.component.css']
})
export class CreateEpicModalComponent implements OnInit {
  modalVisible: boolean = false;
  projectId: string;
  name: string;
  description: string;

  constructor(private epicService: EpicService,
    private modalService: ModalService) {
    modalService.createEpicModalTriggered$.subscribe((projectId) => {
      this.projectId = projectId;
      this.showModal();
    });
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

  public createEpic(): void {
    //create Epic
    this.epicService.createEpic(this.projectId, this.name, this.description)
      .subscribe((newEpic) => {
        //hide modal
        this.modalVisible = false;
      });
  }
}
