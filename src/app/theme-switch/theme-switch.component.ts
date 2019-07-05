import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.css']
})
export class ThemeSwitchComponent implements OnInit {

  lightTheme: boolean = true;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.lightTheme = !this.lightTheme;
    this.themeService.setTheme(this.lightTheme);
  }

  setTheme(lightTheme: boolean): void {
    this.lightTheme = lightTheme;
    this.themeService.setTheme(this.lightTheme);
  }

}
