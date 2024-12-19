import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent {
  cookieConsentGiven: boolean;

  constructor() {
    this.cookieConsentGiven = localStorage.getItem('cookieConsent') === 'true';
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    this.cookieConsentGiven = true;
    window.location.reload();
  }

  declineCookies() {
    localStorage.setItem('cookieConsent', 'false');
    this.cookieConsentGiven = false;
  }
}
