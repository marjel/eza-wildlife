import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {

  private translations: any = {};
  private currentLang: string = 'pl';
  private translationsLoaded = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  public get currentLanguage(): string {
    return this.currentLang;
  }

  public get isTranslationsLoaded(): Observable<boolean> {
    return this.translationsLoaded.asObservable();
  }

  loadTranslations(lang: string): void {
    this.currentLang = lang;
    this.http.get(`/assets/i18n/${lang}.json`).subscribe((data) => {
      this.translations = data;
      this.translationsLoaded.next(true);
    });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;

    for (const k of keys) {
      result = result?.[k];
      if (!result) break;
    }

    return result || key;
  }

}
