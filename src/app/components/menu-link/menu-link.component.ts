import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { MenuLink } from '../../model/menu-link.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-menu-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
  animations: [
    trigger('submenu', [
      state('closed', style({ 
        height: '0', 
        opacity: 0, 
        visibility: 'hidden', 
      })),
      state('open', style({ 
        height: '*', 
        opacity: 1, 
        visibility: 'visible' 
      })),
      transition('closed => open', [
        group([
          animate('300ms ease-in-out', style({ height: '*', visibility: 'visible' })),
          animate('300ms ease-in-out', style({ opacity: 1 }))
        ])
      ]),
      transition('open => closed', [
        group([
          animate('300ms ease-in-out', style({ height: '0', visibility: 'hidden' })),
          animate('300ms ease-in-out', style({ opacity: 0 }))
        ])
      ]),
    ]),
  ],
})
export class MenuLinkComponent {
  @Input() link!: MenuLink;
  @Output() linkClicked = new EventEmitter<string>();
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  toggleSubmenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeSubmenu(): void {
    this.isOpen = false;
  }

  onLinkClick(): void {
    if (!this.link.submenu) {
      this.linkClicked.emit(this.link.value);
      this.closeSubmenu();
    }
  }

  onSubLinkClicked(value: string): void {
    this.linkClicked.emit(value);
    this.closeSubmenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeSubmenu();
    }
  }
}
