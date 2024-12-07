import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuLink } from '@model/menu-link.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private http: HttpClient = inject(HttpClient)

  loadData(lang: string, path: string): Observable<Array<MenuLink>> {
    const uri = `assets/data/${lang}/${path}`;
    return this.http.get<any>(uri);
  }

  loadApplicationStructure(lang: string): Observable<Array<MenuLink>> {
    return this.loadData(lang, 'structure.json');
  }

}