import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject, Signal, signal } from '@angular/core';
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
        visibility: 'hidden', 
      })),
      state('open', style({ 
        height: '*', 
        opacity: 1, 
        visibility: 'visible' 
      })),
      transition('closed => open', [
          animate('260ms ease-in-out', style({ height: '*', visibility: 'visible' })),
      ]),
      transition('open => closed', [
          animate('300ms ease-in-out', style({ height: '0', visibility: 'hidden' })),
      ]),
    ]),
  ],
})
export class MenuLinkComponent {

  @Input() activeLink!: Signal<string | null>;
  
  private elementRef: ElementRef = inject(ElementRef);
  
  @Input() link!: MenuLink;
  @Output() linkClicked = new EventEmitter<string>();
  isOpen = false;

  closeSubmenu(): void {
    this.isOpen = false;
  }

  toggleSubmenu(): void {
    this.isOpen = !this.isOpen;
  }

  onLinkClicked(): void {
    this.linkClicked.emit(this.link.value);
    if (!this.link.submenu) {
      this.closeSubmenu();
    } else {
      this.toggleSubmenu();
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
