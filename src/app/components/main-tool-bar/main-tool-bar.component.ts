import { Component, computed, effect, HostBinding, inject, OnInit, signal } from '@angular/core';
import { AppFacade } from '../../service/app.facade';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule dla dyrektyw, takich jak *ngIf
import { MenuLink } from '@model/menu-link.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-main-tool-bar',
  standalone: true,
  imports: [CommonModule, MenuComponent, MatTooltipModule], // Upewnij się, że CommonModule i MenuComponent są poprawnie zaimportowane
  providers: [AppFacade],
  templateUrl: './main-tool-bar.component.html',
  styleUrls: ['./main-tool-bar.component.scss'],
})
export class MainToolBarComponent implements OnInit {

  protected appFacade = inject(AppFacade);
  protected structure = computed(() => this.appFacade.structure());
  currentLanguage = signal<string>('EN');

  ngOnInit(): void {
    this.appFacade.loadStructure();
    this.currentLanguage.set(this.appFacade.language());
  }

  onLinkClicked($event: string): void {
    console.log('Link clicked:', $event);
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage() === 'EN' ? 'PL' : 'EN';
    this.appFacade.setLanguage(newLanguage);
    this.appFacade.loadStructure();
    this.currentLanguage.set(newLanguage);
  }
}
