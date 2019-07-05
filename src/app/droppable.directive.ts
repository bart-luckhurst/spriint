import { Directive, HostListener, ElementRef } from '@angular/core';
import { IssueService } from './issue.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {

  constructor(private el: ElementRef,
    private issueService: IssueService,
    private activatedRoute: ActivatedRoute) { }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    //set background/border color
    this.el.nativeElement.style.backgroundColor = 'var(--background-color)';
    this.el.nativeElement.style.borderColor = 'var(--accent-color)';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    //set background/border color
    this.el.nativeElement.style.backgroundColor = 'var(--faded-background-color)';
    this.el.nativeElement.style.borderColor = 'var(--faded-background-color)';
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    //set background/border color
    this.el.nativeElement.style.backgroundColor = 'var(--faded-background-color)';
    this.el.nativeElement.style.borderColor = 'var(--faded-background-color)';
    //get IDs
    let projectId: string = this.activatedRoute.snapshot.paramMap.get('projectId');
    let issueId: string = event.dataTransfer.getData('text');
    let status: string = this.el.nativeElement.id;
    //update Issue
    this.issueService.updateIssueStatus(projectId, issueId, status)
      .subscribe((updatedIssue) => {

      });
    console.log(issueId + ' to ' + status);
  }
}
