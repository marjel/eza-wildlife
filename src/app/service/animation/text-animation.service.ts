import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class TextAnimationService {

  show(
    element: HTMLElement,
    newText: string | null,
    showInitParams: gsap.TweenVars,
    delay: number,
    stagger: number,
    mode: 'char' | 'word' | 'line' = 'char',
    onTextShow?: () => void,
    onUpdate?: () => void,
    onShowed?: () => void
  ): gsap.core.Timeline {
    if (newText) {
      element.textContent = newText;
    }

    const spans = this.splitText(element, mode);

    const tl = gsap.timeline();

    tl.call(() => onTextShow?.());

    tl.from(spans, {
      ...showInitParams,
      delay,
      stagger,
      onUpdate: () => onUpdate?.(),
      onComplete: () => {
        this.mergeText(element);
        onShowed?.();
      }
    });

    return tl;
  }

  hide(
    element: HTMLElement,
    hideParams: gsap.TweenVars,
    delay: number,
    stagger: number,
    mode: 'char' | 'word' | 'line' = 'char',
    onStartHide?: () => void,
    onHided?: () => void
  ): gsap.core.Timeline {
    const spans = this.splitText(element, mode);

    const tl = gsap.timeline();
    tl.call(() => onStartHide?.());
    tl.to(spans, {
      ...hideParams,
      delay,
      stagger,
      onComplete: () => {
        onHided?.();
        element.textContent = '';
      }
    });

    return tl;
  }

  showAndHide(
    element: HTMLElement,
    newText: string | null,
    showInitParams: gsap.TweenVars,
    hideParams: gsap.TweenVars | null,
    showDelay: number,
    showStagger: number,
    hideDelay: number,
    hideStagger: number,
    mode: 'char' | 'word' | 'line' = 'char',
    onTextShow?: () => void,
    onUpdate?: () => void,
    onShowed?: () => void,
    onStartHide?: () => void,
    onHided?: () => void
  ): void {
    this.show(
      element,
      newText,
      showInitParams,
      showDelay,
      showStagger,
      mode,
      onTextShow,
      onUpdate,
      () => {
        onShowed?.();

        const finalHideParams = hideParams ?? showInitParams;
        this.hide(
          element,
          finalHideParams,
          hideDelay,
          hideStagger,
          mode,
          onStartHide,
          onHided
        );
      }
    );
  }

  private splitText(element: HTMLElement, mode: 'char' | 'word' | 'line'): HTMLSpanElement[] {
    const text = element.textContent ?? '';
    let spans: HTMLSpanElement[] = [];
  
    switch (mode) {
      case 'word': {
        let words = text.split(' '); 
        words = words.map((w, i) => i < words.length - 1 ? w + ' ' : w);
        spans = words.map(w => this.createSpan(w, 'word'));
        break;
      }
      case 'line': {
        const lines = text.split('\n');
        spans = lines.map(line => this.createSpan(line, 'line'));
        break;
      }
      case 'char':
      default: {
        const chars = text.split('');
        spans = chars.map(ch => this.createSpan(ch, 'char'));
        break;
      }
    }
  
    element.innerHTML = '';
    spans.forEach(s => element.appendChild(s));
    return spans;
  }
  
  private createSpan(fragment: string, mode: 'char' | 'word' | 'line'): HTMLSpanElement {
    const span = document.createElement('span');
  
    if (mode === 'char') {
      if (fragment === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = fragment;
      }
    } else if (mode === 'word') {
      span.style.whiteSpace = 'pre';
      span.textContent = fragment; 
    } else if (mode === 'line') {
      span.textContent = fragment;
      span.style.display = 'block';
    }
    return span;
  }
  
  private mergeText(element: HTMLElement): void {
    const combined = Array.from(element.querySelectorAll('span'))
      .map(span => {
        return span.innerHTML === '&nbsp;' ? ' ' : span.textContent ?? '';
      })
      .join('');
    element.textContent = combined; 
  }  
}
