import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, FontAwesomeModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  ICONS = {
    faFacebook: faFacebook,
    faInstagram: faInstagram,
    faYoutube: faYoutube,
    faEnvelope: faEnvelope,
    faPhone: faPhone
  }

  navigateTo(value: string) {
    console.log(value);
  }

}
