import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class SplitTextService {
  private timeline!: gsap.core.Timeline;
  private elements: HTMLElement[] = [];

  show(
    element: HTMLElement,
    text: string,
    type: 'chars' | 'words' | 'lines' = 'chars',
    showParams: { [key: string]: any },
    animationProps: { ease?: string; duration?: number; stagger?: number; delay?: number } = {},
    callbacks?: {
      onStart?: () => void;
      onUpdate?: () => void;
      onFinish?: () => void;
      onShow?: () => void;
    }
  ): void {
    this.clearElement(element); // Clears previous text content
    this.splitText(element, text, type); // Split the text for transition
    this.createAnimation(element, true, showParams, animationProps, callbacks);
  }

  hide(
    element: HTMLElement,
    hideParams: { [key: string]: any },
    animationProps: { ease?: string; duration?: number; stagger?: number; delay?: number } = {},
    callbacks?: {
      onStart?: () => void;
      onUpdate?: () => void;
      onFinish?: () => void;
      onHide?: () => void;
    }
  ): void {
    this.createAnimation(element, false, hideParams, animationProps, callbacks);
  }

  showAndHide(
    element: HTMLElement,
    text: string,
    type: 'chars' | 'words' | 'lines' = 'chars',
    showParams: { [key: string]: any },
    hideParams: { [key: string]: any } | null = null,
    animationProps: {
      ease?: string;
      duration?: number;
      stagger?: number;
      showDelay?: number;
      hideDelay?: number;
    } = {},
    callbacks?: {
      onStart?: () => void;
      onUpdate?: () => void;
      onFinish?: () => void;
      onShow?: () => void;
      onHide?: () => void;
    }
  ): void {
    this.clearElement(element); // Clears previous text content
    this.splitText(element, text, type); // Split the text for transition

    const defaultProps = {
      ease: 'power2.out',
      duration: 0.5,
      stagger: 0.1,
      showDelay: 0,
      hideDelay: 0,
    };

    const config = { ...defaultProps, ...animationProps };

    this.timeline = gsap.timeline({
      paused: true,
      onStart: () => callbacks?.onStart?.(),
      onUpdate: () => callbacks?.onUpdate?.(),
      onComplete: () => callbacks?.onFinish?.(),
    });

    // Mode "show"
    this.timeline.fromTo(
      this.elements,
      showParams,
      {
        opacity: 1,
        y: 0,
        ...config,
        delay: config.showDelay,
        onComplete: () => callbacks?.onShow?.(),
      }
    );

    // Mode "hide"
    this.timeline.to(
      this.elements,
      hideParams
        ? { ...hideParams, delay: config.hideDelay, ...config, onComplete: () => callbacks?.onHide?.() }
        : {
            ...showParams, // Reverse to wartości z `showParams`
            opacity: 0,
            y: -50,
            delay: config.hideDelay,
            ...config,
            onComplete: () => callbacks?.onHide?.(),
          }
    );

    this.timeline.play();
  }

  // Remove the previous content
  private clearElement(element: HTMLElement): void {
    element.textContent = '';
    this.elements = [];
  }

  private splitText(element: HTMLElement, text: string, type: 'chars' | 'words' | 'lines'): void {
    this.elements = [];

    if (type === 'lines') {
      text.split('\n').forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = line;
        lineDiv.style.display = 'block';
        element.appendChild(lineDiv);
        this.elements.push(lineDiv);
      });
    } else if (type === 'words') {
      text.split(' ').forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        element.appendChild(wordSpan);
        this.elements.push(wordSpan);

        if (index < text.split(' ').length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.innerHTML = '&nbsp;';
          spaceSpan.style.display = 'inline-block';
          element.appendChild(spaceSpan);
          this.elements.push(spaceSpan);
        }
      });
    } else {
      text.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        charSpan.style.display = 'inline-block';
        element.appendChild(charSpan);
        this.elements.push(charSpan);
      });
    }
  }

  private createAnimation(
    originalElement: HTMLElement,
    isShow: boolean,
    params: { [key: string]: any },
    animationProps: { ease?: string; duration?: number; stagger?: number; delay?: number },
    callbacks?: {
      onStart?: () => void;
      onUpdate?: () => void;
      onFinish?: () => void;
      onShow?: () => void;
      onHide?: () => void;
    }
  ): void {
    const defaultProps = {
      ease: 'power2.out',
      duration: 0.5,
      stagger: 0.1,
      delay: 0,
    };

    const config = { ...defaultProps, ...animationProps };

    this.timeline = gsap.timeline({
      paused: true,
      onStart: () => callbacks?.onStart?.(),
      onUpdate: () => callbacks?.onUpdate?.(),
      onComplete: () => {
        callbacks?.onFinish?.();

        if (isShow) {
          callbacks?.onShow?.();
        } else {
          callbacks?.onHide?.();
        }

        // Merge spans elemenst after the transition
        this.mergeText(originalElement);
      },
    });

    if (isShow) {
      this.timeline.fromTo(
        this.elements,
        params,
        { ...config, opacity: 1, y: 0 }
      );
    } else {
      this.timeline.to(this.elements, { ...params, ...config });
    }

    this.timeline.play();
  }


  private mergeText(element: HTMLElement): void {
    const originalText = this.elements.map((el) => el.textContent).join('');
    element.textContent = originalText;
    this.elements = [];
  }
}
