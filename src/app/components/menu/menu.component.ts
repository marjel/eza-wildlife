import { Component, Input, Output, EventEmitter, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MenuLink } from '../../model/menu-link.model';
import { MenuLinkComponent } from '../menu-link/menu-link.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MenuLinkComponent, FontAwesomeModule],
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  
  @Input() menuData: Array<MenuLink> = [];
  @Output() linkClicked = new EventEmitter<string>();

  ICONS = {
    faBars: faBars,
    faTimes: faTimes
  }

  menuOpen = false;
  activeLink = signal<string | null>(null); 

  ngOnInit(): void {
    console.log('menuData ==', this.menuData);
  }

  onLinkClicked(value: string): void {
    this.linkClicked.emit(value);
    if(!value.includes('/')) {
      this.activeLink.set(value);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
