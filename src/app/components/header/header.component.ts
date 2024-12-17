import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [MatTooltipModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent  implements AfterViewInit {

  ngAfterViewInit() {
     const swiperEl = document.querySelector('swiper-container');

     const params = {
      injectStyles: [`
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
      }
      .swiper-pagination-bullet-active {
        color: #fff;
        background: #ff7a00;
      }
      `],
      pagination: {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    }

    

    if(swiperEl) {
      Object.assign(swiperEl, params)
    }
  

    register();
  }

  onLogoClick() {
    console.log('Logo clicked!');
  }

}
