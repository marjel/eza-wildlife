import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { SplitTextService } from 'app/service/animation/split-text.service';
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

  private readonly splitTextService = inject(SplitTextService);

  protected appFacade = inject(AppFacade);
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

    this.splitTextService.showAndHide(
      this.animatedText.nativeElement,
      'Inicjatywa dla bioróżnorodności',
      'words',
      { opacity: 0, y: -50 },
      { opacity: 0, y: 50 },
      { duration: .5, stagger: 0.1, showDelay: 3, hideDelay: 3 },
      {
        onStart: () => console.log('Animation started'),
        onShow: () => console.log('Show completed'),
        onHide: () => console.log('Hide completed'),
      }
    );
    
/*     this.splitTextService.show(
      this.animatedText.nativeElement,
      "Inicjatywa dla bioróżnorodności",
      'chars', // Podziel tekst na znaki
      { opacity: 0, y: -50 }, // Początkowe wartości
      { duration: 1, stagger: 0.1, delay: 1 }, // Parametry animacji
      {
        onStart: () => console.log('Animation started'),
        onShow: () => console.log('Animation completed'),
      }
    ); */
    
  
    // Odwróć animację po 10 sekundach
    // setTimeout(() => {
    //   console.log('Reversing animation...');
    //   this.splitTextService.reverse();
    // }, 10000);
  
    // // Zatrzymaj animację po 20 sekundach
    // setTimeout(() => {
    //   console.log('Stopping animation...');
    //   this.splitTextService.stop();
    // }, 20000);
    // console.log('Logo clicked!');
  }

}
