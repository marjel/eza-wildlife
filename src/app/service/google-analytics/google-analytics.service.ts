import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  public logEvent(eventName: string, eventParams?: { [key: string]: any }) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, eventParams);
    }
  }
}
