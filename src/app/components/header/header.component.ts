import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [MatTooltipModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements AfterViewInit {

  ngAfterViewInit() {
    // Rejestracja elementów Swiper
    register();
  }

  onLogoClick() {
    console.log('Logo clicked!');
  }

}
