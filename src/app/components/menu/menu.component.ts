import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuLink } from '../../model/menu-link.model';
import { MenuLinkComponent } from '../menu-link/menu-link.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [CommonModule, MatButtonModule, MenuLinkComponent],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menuData: Array<MenuLink> = [];
  @Output() linkClicked = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('menuData ==', this.menuData);
  }

  onLinkClicked(value: string): void {
    this.linkClicked.emit(value);
  }

  trackByFn(item: MenuLink): string {
    return item.value || item.label;
  }
}