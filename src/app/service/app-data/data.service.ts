import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuLink } from '@model/menu-link.model';
import { HeaderData } from '@model/header-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  static readonly BASE_URL: string = 'assets/data';

  private http: HttpClient = inject(HttpClient);

  loadData(lang: string, path: string): Observable<Array<MenuLink>> | Observable<HeaderData> {
    const uri = `${DataService.BASE_URL}/${lang}/${path}`;
    return this.http.get<any>(uri);
  }

  loadApplicationStructure(lang: string): Observable<Array<MenuLink>> {
    return this.loadData(lang.toLowerCase(), 'structure.json') as Observable<Array<MenuLink>>;
  }

  loadHeaderData(lang: string): Observable<HeaderData> {
    return this.loadData(lang, 'header.json') as Observable<HeaderData>;
  }

}