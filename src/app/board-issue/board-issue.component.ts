import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-board-issue',
  templateUrl: './board-issue.component.html',
  styleUrls: ['./board-issue.component.css']
})
export class BoardIssueComponent implements OnInit {

  @Input() issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
