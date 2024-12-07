import { Injectable, signal } from '@angular/core';
import { Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageStore {
  
  private currentLang = signal('pl');


  get currentLanguage(): Signal<string> {
    return this.currentLang;
  }

  get language(): string {
    return this.currentLanguage();
  }

  set language(lang: string) {
    this.currentLang.set(lang);
  }
}
