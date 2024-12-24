import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TextAnimationService } from 'app/service/animation/text-animation.service';
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
export class HeaderComponent implements AfterViewInit, OnInit {

  @ViewChild('animatedText', { static: true }) animatedText!: ElementRef;


  protected appFacade = inject(AppFacade);
  private textAnim = inject(TextAnimationService);
  protected media = computed(() => this.appFacade.headerData().media);

  ngOnInit(): void {

  }
  

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
    this.textAnim.showAndHide(
      this.animatedText.nativeElement,
      'Pokaż i schowaj w trybie słownym',
      { opacity: 0, y: 30, duration: .4 },
      null,   // hideParams = null -> chowamy do showInitParams
      0.2,    // showDelay
      0.2,    // showStagger
      1.5,    // hideDelay
      0.2,    // hideStagger
      'word', // <--- tryb wspólny
      () => console.log('start show & hide words'),
      () => console.log('update show & hide words'),
      () => console.log('end show words'),
      () => console.log('start hide words'),
      () => console.log('end hide words')
    );;

  }

}
