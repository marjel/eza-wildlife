import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { inject, InjectionToken, effect } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

const destroy$ = new Subject<void>();

export const AppStore = signalStore(
    withState<AppState>(() => inject(APP_STATE)),
    withMethods((store, dataService: DataService = inject(DataService)) => {

        const fetchStructure = (language: string) => {
            patchState(store, { isLoading: true });
            return dataService
                .loadApplicationStructure(language)
                .pipe(
                    tap((structure) => patchState(store, { structure, isLoading: false })),
                    takeUntil(destroy$)
                )
                .subscribe();
        };

        effect(() => {
            const currentLanguage = store.language();
            if (currentLanguage) {
                fetchStructure(currentLanguage);
            }
        });

        return {
            loadStructure() {
                fetchStructure(store.language());
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
        }
    }),
    
    withHooks({
        onInit: (store) => {
            console.log('App Store initialized', store);
            store.loadStructure();
            return null;
        },
        onDestroy: (store) => {
            console.log('App Store destroyed', store);
            destroy$.next();
            destroy$.complete();
            return null;
        }
    })
);

