import { Component, computed, effect, HostBinding, inject, OnInit } from '@angular/core';
import { AppFacade } from '../../service/app.facade';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common'; // Dodaj CommonModule dla dyrektyw, takich jak *ngIf
import { MenuLink } from '@model/menu-link.model';

@Component({
  selector: 'app-main-tool-bar',
  standalone: true,
  imports: [CommonModule, MenuComponent], // Upewnij się, że CommonModule i MenuComponent są poprawnie zaimportowane
  providers: [AppFacade],
  templateUrl: './main-tool-bar.component.html',
  styleUrls: ['./main-tool-bar.component.scss'],
})
export class MainToolBarComponent implements OnInit {

  protected appFacade = inject(AppFacade);
  protected structure = computed(() => this.appFacade.structure());

  @HostBinding('style.height') height = 'auto';

  adjustHeight(hasOpenSubmenu: boolean): void {
    this.height = hasOpenSubmenu ? '300px' : 'auto'; // Dostosuj wysokość
  }

  ngOnInit(): void {
    this.appFacade.loadStructure();
  }

  

  onLinkClicked($event: string): void {
    console.log('Link clicked:', $event);
  }
}
