import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './main-content/content.component';
import { FooterComponent } from './footer/footer.component';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { ScrollComponent } from './scroll/scroll.component';
import { environment } from '../environments/environment';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { CardComponent } from './main-content/card/card.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    NgOptimizedImage,
    ScrollComponent,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  exports: [ContentComponent],
  providers: [provideImgixLoader('https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_216,q_auto,w_216/d_ecommerce:backend-fallback.png/'), ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
