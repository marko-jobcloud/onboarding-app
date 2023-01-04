import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { usersFeature } from './app/users/state/users.reducer';
import { UsersApiEffects } from './app/users/effects/users-api.effects';
import { UsersNotificationEffects } from './app/users/effects/users-notification.effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideRouter, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { SaveUserEffects } from './app/users/effects/save-user.effects';
import { RouteChangeEffects } from './app/users/effects/route-change.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({
      [usersFeature.name]: usersFeature.reducer,
      router: routerReducer,
    }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideRouterStore(),
    provideEffects(
      UsersApiEffects,
      UsersNotificationEffects,
      SaveUserEffects,
      RouteChangeEffects
    ),
    provideRouter(APP_ROUTES),
  ],
});
