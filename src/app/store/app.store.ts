import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User } from '../model/user.model';
import { inject, InjectionToken } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { DataService } from '../service/app-structure/structure-data.service';
import { MenuLink } from '@model/menu-link.model';

type AppState = {
    user: User;
    language: string;
    isLoading: boolean;
    structure: Array<MenuLink>;
}

const initialState: AppState = {
    user: {
        name: 'iehova'
    },
    isLoading: false,
    language: 'pl',
    structure: []
};

const APP_STATE = new InjectionToken<AppState>('AppState', {
    factory: () => initialState,
});

export const AppStore = signalStore(
    withState<AppState>(() => inject(APP_STATE)),
    withMethods((store, dataService: DataService = inject(DataService)) => ({
        loadStructure: rxMethod<void>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => {
                    return dataService.loadApplicationStructure(store.language()).pipe(
                        tapResponse({
                            next: (structure: Array<MenuLink>) => {
                                console.log('Structure loaded :=', structure);
                                patchState(store, { structure });
                              },
                              error: (err) => {
                                console.error('Error loading structure:', err);
                                patchState(store, { isLoading: false }); // Obsługa błędu
                              },
                              finalize: () => patchState(store, { isLoading: false }),
                        })
                    );
                })
            )
        ),
        setUser(user: User) {
            patchState(store, { user });
        },
        setLoading(isLoading: boolean) {
            patchState(store, { isLoading });
        },
        setLanguage(language: string) {
            patchState(store, { language });
        },
    })),
    withHooks({
        onInit: (store) => console.log('Store initialized', store),
        onDestroy: (store) => console.log('Store destroyed', store)
    })
);

