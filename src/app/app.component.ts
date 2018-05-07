import { Component, ViewChild } from '@angular/core';
import {Nav, Platform,NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular/components/app/app';
import { UtilsProvider } from "../providers/utils/utils";

import { AngularFireAuth } from "angularfire2/auth"
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { app } from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = WelcomePage;
  @ViewChild(Nav) nav: Nav;
  activePage:any;

  pages: Array<{title: string, icon: string, component: any}>;
  
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth : AngularFireAuth, public _utilsService:UtilsProvider) {
    this.initializeApp();
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon:'home', component: HomePage },
      { title: 'Search', icon:'search', component: SearchPage },
      { title: 'Login', icon:'log-in',component: LoginPage },
      { title: 'Favourites', icon:'heart',component: FavouritesPage },
      { title: 'Settings', icon:'contact',component: SettingsPage},
      { title: 'Log out', icon:'log-out', component: LoginPage}
     
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
}


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component==LoginPage){
      this.doLogout();
     } else{
      this.nav.push(page.component);
     }    
     this.activePage = page;
  }
  checkActivePage(page) {
    return page ==this.activePage;
  }

  doLogout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this._utilsService.showToast('You have been successfully logged out!');
        console.log("User logged out!");
        this.nav.setRoot(LoginPage);
      })
      .catch(err =>console.log(err))
  }
}
