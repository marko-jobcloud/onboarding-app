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
import { provideRouter } from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store'
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ [usersFeature.name]: usersFeature.reducer }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(UsersApiEffects, UsersNotificationEffects),
    provideRouter(appRoutes),
    provideRouterStore()
  ],
});
