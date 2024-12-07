import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuLink } from '../../model/menu-link.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
})
export class MenuLinkComponent {
  @Input() link!: MenuLink;
  @Output() linkClicked = new EventEmitter<string>();
  isOpen = false; // Kontroluje widoczność submenu

  toggleSubmenu(): void {
    this.isOpen = !this.isOpen;
    console.log('isOpen:', this.isOpen); // Debugging
  }

  onLinkClick(): void {
    if (!this.link.submenu) {
      this.linkClicked.emit(this.link.value);
    }
  }

  onSubLinkClicked(value: string): void {
    this.linkClicked.emit(value);
  }
}
