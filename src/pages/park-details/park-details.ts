import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { PreloaderProvider } from './../../providers/utils/preloader';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { DbServiceProvider } from './../../providers/db-service/db-service';

import { Park } from '../../models/park';
import { Prohibition } from '../../models/prohibition';
import { Facility } from './../../models/facility';
import { ReviewPage } from '../review/review';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

declare var google;

@IonicPage()
@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
 

  public parkDetails : Park;
  constructor(public navParams : NavParams,
    public navCtrl: NavController, 
    private socialSharing: SocialSharing,
    public _dbService : DbServiceProvider, 
    public _authService : AuthServiceProvider,
    private _utilsService : UtilsProvider,
    private _preloader : PreloaderProvider, 
    private plt: Platform,
     private geolocation: Geolocation, 
     private storage: Storage,
    public _platform : Platform) {
      this.parkDetails = navParams.data;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkDetailsPage');
    this._preloader.displayPreloader();
    this.loadParkDetails();
    this._preloader.hidePreloader();
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();
 
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
 
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
 
  }
 
  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);
   
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }
   
  showHistoryRoute(route) {
    this.redrawPath(route);
  }
  

  loadParkDetails() {
    this.parkDetails = this.navParams.data;
    this.loadFacilityData();
    this.loadProhibitionData();
    console.log(this.parkDetails);
  }

  loadFacilityData()
  {
    let parkFacilities : Array<Facility> = new Array<Facility>();
    this.parkDetails.facilities.forEach(item => {
      let facility : Facility = new Facility();
      console.log(item.id);
      this._dbService.getDocument("Facilities", item.id)
      .then (data => {
        facility.parseToFacilityModel(data);
        facility.quantity = item.quantity;
        parkFacilities.push(facility);
      });
    });
    this.parkDetails.facilities = parkFacilities;
  }

  loadProhibitionData()
  {
    let parkProhibitions : Array<Prohibition> = new Array<Prohibition>();
    console.log(this.parkDetails.prohibitions);
    this.parkDetails.prohibitions.forEach(item => {
      let prohibition : Prohibition = new Prohibition();
      console.log(item.id);
      this._dbService.getDocument("Prohibitions", item.id)
      .then (data => {
        prohibition.parseDocToProhibitionModel(data);
        prohibition.restriction = item.restriction;
        parkProhibitions.push(prohibition);
      });
    });
    this.parkDetails.prohibitions = parkProhibitions;
  }

  viewRestriction(prohibition : any) {
    if(prohibition.hiddenRestriction) {
      prohibition.hiddenRestriction = false;
    }
    else {
      prohibition.hiddenRestriction = true;
    }
  }

  openReviewPage() {
    this.navCtrl.push(ReviewPage)
    console.log("ReviewPage pressed!");
  }
  // facebook share configuration
  facebookShare(parkDetails : Park) {
    let image : string = parkDetails.images[0].imageURL;
    let url : string = parkDetails.contact.officialWebsite;

    if(this._platform.is("ios")) {
      this.socialSharing.canShareVia('com.apple.social.facebook',null, null, image, url).then(() => {
        this.facebookIosShare(image, url);
      })
      .catch(() => {
        this._utilsService.showToast("Facebook not available");
      });
    }
    else if(this._platform.is("android")) {
      this.socialSharing.canShareVia('com.facebook.katana',null, null, null, url).then(() => {
        this.facebookAndroidShare(url);
      })
      .catch(() => {
        this._utilsService.showToast("Facebook not available!");
      });
    }
    else {
      console.error("Facebook share not available in this platform");
      this._utilsService.showToast("Share not supported in this platform");
    }
  }

  facebookIosShare(image : string, url : string) {
    this.socialSharing.shareViaFacebook(null, image , url).then(() => {
      console.log("shareViaFacebook: Success");
      this._utilsService.showToast("Sharing Success!");
    }).catch((er) => {
      console.error("shareViaFacebook: failed");
      this._utilsService.showToast("Sharing failed!");
    });
  }

  facebookAndroidShare(url : string) {
    this.socialSharing.shareViaFacebook(null, null , url).then(() => {
      console.log("shareViaFacebook: Success");
      this._utilsService.showToast("Sharing Success!");
    }).catch((er) => {
      console.error("shareViaFacebook: failed");
      this._utilsService.showToast("Sharing failed!");
    });
  }

    // Twitter share configuration
    twitterShare(parkDetails : Park) {
      let url : string = parkDetails.contact.officialWebsite;
      let message : string = "Check this Park features! It is awsome!";
  
      if(this._platform.is("ios")) {
        // this.socialSharing.canShareVia('com.apple.social.twitter',message, null, null, null).then(() =>  {
        //   this.twitterIosShare(message);
        // })
        // .catch(() =>  {
        //   this._utilsService.showToast("Twitter not available");
        // })
        this.twitterIosShare(message, url);
      }
      else if(this._platform.is("android")) {
        this.socialSharing.canShareVia('twitter',message,null,null,url).then(() => {
          this.twitterAndroidShare(message, url);
        })
        .catch(() => {
          this._utilsService.showToast("Twitter not available!");
        });
      }
      else {
        console.error("Twitter share not available in this platform");
        this._utilsService.showToast("Share not supported in this platform");
      }
    }
  
    twitterAndroidShare(message : string, url : string) {
      this.socialSharing.shareViaTwitter(message, null , url).then(() => {
        console.log("shareViaTwitter: Success");
        this._utilsService.showToast("Sharing Success!");
      }).catch((er) => {
        console.error("shareViaTwitter: failed");
        this._utilsService.showToast("Sharing failed!");
      });
    }
    twitterIosShare(message : string, url : string) {
      this.socialSharing.shareViaTwitter(message, null, url).then(() => {
        console.log("shareViaTwitter: Success");
        this._utilsService.showToast("Sharing Success!");
      }).catch((er) => {
        console.error("shareViaTwitter: failed");
        this._utilsService.showToast("Sharing failed!");
      });
    }

    // Instagram share configuration
    instagramShare(parkDetails : Park) {
      let image : string = parkDetails.images[0].imageURL;

      if(this._platform.is("ios")) {
        this.socialSharing.canShareVia('instagram', null, null, image, null).then(() =>  {
          this.instagramSharing(image);
        })
        .catch(() => {
          this._utilsService.showToast("Instagram not available");
        });
      }
      else if(this._platform.is("android")) {
        this.socialSharing.canShareVia('instagram', null, null, image, null).then(() => {
          this.instagramSharing(image);
        })
        .catch(() => {
          this._utilsService.showToast("Instagram not available!");
        });
      }
      else {
        console.error("Instagram share not available in this platform");
        this._utilsService.showToast("Share not supported in this platform");
      }
    }
  
    instagramSharing(image : string) {
        this.socialSharing.shareViaInstagram(null, image).then(() => {
        console.log("shareViaInstagram: Success");
        this._utilsService.showToast("Sharing Success!");
      }).catch((er) => {
        console.error("shareViaInstagram: failed");
        this._utilsService.showToast("Sharing failed!");
      });
    }

}
