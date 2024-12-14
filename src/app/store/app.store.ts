import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { inject, InjectionToken } from '@angular/core';
import { tap } from 'rxjs';
import { MenuLink } from '@model/menu-link.model';
import { UserType } from '@model/user-type.enum';
import { User } from '@model/user.model';
import { DataService } from 'app/service/app-data/data.service';

type AppState = {
    user: User;
    language: string;
    isLoading: boolean;
    structure: Array<MenuLink>;
}

const initialState: AppState = {
    user: {
        name: 'iehova',
        type: UserType.USER
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
        loadStructure() {
            patchState(store, { isLoading: true });
            dataService.loadApplicationStructure(store.language()).pipe(
                tap(
                    (structure) => patchState(store, { structure,  })
                )
            ).subscribe();
        },
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

