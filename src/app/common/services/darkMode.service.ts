import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkMode = false

  public toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    this.applyTheme(this.darkMode);
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }

  constructor() { }

}
