import { Component, Renderer2, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { 
  faUniversalAccess, 
  faTextHeight, 
  faToggleOn, 
  faToggleOff, 
  faEye, 
  faEyeSlash, 
  faRedo 
} from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-accessibility-tools',
  templateUrl: './accessibility-tools.component.html',
  styleUrls: ['./accessibility-tools.component.scss'],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule, FontAwesomeModule, TranslateModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class AccessibilityToolsComponent {

  ICONS = {
    universalAccess: faUniversalAccess,
    textHeight: faTextHeight,
    toggleOn: faToggleOn,
    toggleOff: faToggleOff,
    eye: faEye,
    eyeSlash: faEyeSlash,
    redo: faRedo,
  };

  private fontSize = 100;

  grayscaleEnabled = false;
  highContrastEnabled = false;

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  isPanelVisible: boolean = false;

  togglePanel() {
    this.isPanelVisible = !this.isPanelVisible;
  }

  increaseTextSize() {
    this.fontSize += 10;
    this.renderer.setStyle(this.document.body, 'font-size', `${this.fontSize}%`);
  }

  decreaseTextSize() {
    this.fontSize -= 10;
    this.renderer.setStyle(this.document.body, 'font-size', `${this.fontSize}%`);
  }

  toggleGrayscale() {
    this.grayscaleEnabled = !this.grayscaleEnabled;
    this.document.body.classList.toggle('grayscale');
  }

  toggleHighContrast() {
    this.highContrastEnabled = !this.highContrastEnabled;
    this.document.body.classList.toggle('high-contrast');
  }

  reset() {
    this.fontSize = 100;
    this.grayscaleEnabled = false;
    this.highContrastEnabled = false;
    this.renderer.removeStyle(this.document.body, 'font-size');
    this.document.body.classList.remove('grayscale', 'high-contrast');
  }
}
