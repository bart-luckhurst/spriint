import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { IssueService } from './issue.service';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  constructor(private el: ElementRef,
    private issueService: IssueService) {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    //settimeout to address chrome bug
    setTimeout(() => {
      this.issueService.setIssueDragging(true);
    }, 10);
    
    //set issue ID
    let issueId: string = this.el.nativeElement.id;
    event.dataTransfer.setData('text', issueId);
    //allow move
    event.dataTransfer.effectAllowed = 'move';

    this.dragStart.emit(event);
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent): void {
    this.dragMove.emit(event);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    this.issueService.setIssueDragging(false);
    this.dragEnd.emit(event);
  }
}
