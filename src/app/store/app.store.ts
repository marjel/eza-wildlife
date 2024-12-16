import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { inject, InjectionToken, effect } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MenuLink } from '@model/menu-link.model';
import { UserType } from '@model/user-type.enum';
import { User } from '@model/user.model';
import { DataService } from 'app/service/app-data/data.service';
import { TranslateService } from '@ngx-translate/core';

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
    withMethods((store, dataService: DataService = inject(DataService)) => {
        const translateService = inject(TranslateService);

        const fetchStructure = async (language: string) => {
            patchState(store, { isLoading: true });
            try {
                const structure = await firstValueFrom(dataService.loadApplicationStructure(language));
                patchState(store, { structure, isLoading: false });
            } catch (error) {
                console.error('Failed to load structure:', error);
                patchState(store, { isLoading: false });
            }
        };

        effect(() => {
            const currentLanguage = store.language();
            translateService.use(currentLanguage);
            fetchStructure(currentLanguage);
        });

        return {
            loadStructure() {
                fetchStructure(store.language());
            },
            setUser(user: User) {
                patchState(store, { user });
            },
            setLanguage(language: string) {
                patchState(store, { language });
            }
        }
    }),

    withHooks({
        onInit: (store) => {
            console.log('App Store initialized', store);
            store.loadStructure();
        },
        onDestroy: () => {
            console.log('App Store destroyed');
        }
    })
);
