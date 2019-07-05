import { Injectable, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeUpdatedSource = new Subject<Object>();
  themeUpdated$ = this.themeUpdatedSource.asObservable();
   
  private themes = {
    lightTheme: {
      '--accent-color': '#5e53b0',
      '--faded-accent-color': 'rgba(94, 83, 176, 0.10)',
      '--hover-accent-color': '#6e64b8',
      '--feature-color1': '#00c9dd',
      '--feature-color2': '#eb00db',
      '--background-color': '#fbfbfb',
      '--faded-background-color': '#f0f0f0',
      '--foreground-color': '#121212',
      '--faded-foreground-color': '#484848',
      '--ultra-faded-foreground-color': '#b0b0b0',
      '--border-color': '#e0e0e0',
      '--white-color': '#ffffff',
      '--black-color': '#121212',
      '--warning-color': '#c41728',
    },
    darkTheme: {
      '--accent-color': '#5e53b0',
      '--faded-accent-color': 'rgba(94, 83, 176, 0.10)',
      '--hover-accent-color': '#6e64b8',
      '--feature-color1': '#00c9dd',
      '--feature-color2': '#eb00db',
      '--background-color': '#000000',
      '--faded-background-color': '#0f0f16',
      '--foreground-color': '#fbfbfb',
      '--faded-foreground-color': '#f0f0f0',
      '--ultra-faded-foreground-color': '#b0b0b0',
      '--border-color': '#242424',
      '--white-color': '#ffffff',
      '--black-color': '#121212',
      '--warning-color': '#c41728',
    }
  }

  constructor(@Inject(DOCUMENT) private document: any) { }

  setTheme(lightTheme): void {
    let themeName: string;
    if (lightTheme) {
      themeName = 'lightTheme';
    }
    else {
      themeName = 'darkTheme';
    }

    let theme = this.themes[themeName];
    this.themeUpdatedSource.next(theme);

    //const element = this.elementRef.nativeElement;

    for (const key in theme) {
      //element.style.setProperty(key, theme[key]);
      this.document.body.style.setProperty(key, theme[key]);
    }
  }
}
