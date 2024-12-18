import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, ViewEncapsulation } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AppFacade } from 'app/service/app.facade';

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
export class HeaderComponent implements AfterViewInit {

  protected appFacade = inject(AppFacade);
  protected media = computed(() => this.appFacade.headerData().media);

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
        font-family: 'Roboto'
      }
      `],
      pagination: {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    }

    if (swiperEl) {
      Object.assign(swiperEl, params)
    }

    register();
  }

  onLogoClick() {
    console.log('Logo clicked!');
  }

}
