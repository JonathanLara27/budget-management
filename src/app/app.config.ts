import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { RouteReuseStrategy, provideRouter, withHashLocation } from "@angular/router";
import { routes } from "./app.routes";
import { environment } from "src/environments/environment.prod";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { IonicRouteStrategy } from "@ionic/angular";
import { provideIonicAngular } from "@ionic/angular/standalone";

export const appConfig: ApplicationConfig = {
    providers : [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withHashLocation()),
        provideIonicAngular(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ],
}   