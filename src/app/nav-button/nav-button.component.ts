import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css']
})
export class NavButtonComponent implements OnInit {

  @Input() materialIcon: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
