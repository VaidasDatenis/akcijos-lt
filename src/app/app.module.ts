import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './main-content/content.component';
import { FooterComponent } from './footer/footer.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  exports: [ContentComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
