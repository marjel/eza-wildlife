import { Injectable } from '@angular/core';
import { AppStore } from "../store/app.store";

@Injectable({
    providedIn: 'root'
})
export class AppFacade extends AppStore {
}