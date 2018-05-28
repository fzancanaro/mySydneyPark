import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DbServiceProvider } from '../providers/db-service/db-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UtilsProvider } from '../providers/utils/utils';
import { PreloaderProvider } from './../providers/utils/preloader';


import { firebaseConfig } from "../config/environment";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { ForgetPage } from '../pages/forget/forget';
import { RegisterPage } from '../pages/register/register';
import { SearchResultPage } from '../pages/search-result/search-result';
import { ParkDetailsPage } from './../pages/park-details/park-details';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { ReviewPage } from '../pages/review/review';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileViewPage } from '../pages/profile-view/profile-view';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    ForgetPage,
    RegisterPage,
    SearchResultPage,
    ParkDetailsPage,
    FavouritesPage,
    SettingsPage,
    SearchPage,
    ReviewPage,
   ProfilePage,
   ProfileViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    ForgetPage,
    RegisterPage,
    SearchResultPage,
    ParkDetailsPage,
    FavouritesPage,
    SettingsPage,
    SearchPage,
    ReviewPage,
    ProfilePage,
    ProfileViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbServiceProvider,
    AuthServiceProvider,
    UtilsProvider,
    PreloaderProvider,
    SocialSharing
  ]
})
export class AppModule {}
