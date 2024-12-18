import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainToolBarComponent } from './components/main-tool-bar/main-tool-bar.component';
import { AccessibilityToolsComponent } from './components/accessibility-tools/accessibility-tools.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    MainToolBarComponent, 
    AccessibilityToolsComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eza-wildlife';
}
