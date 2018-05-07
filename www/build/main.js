webpackJsonp([11],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_facility__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__search_result_search_result__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__search_search__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, _dbService, _authService, _utilsService, _preloader) {
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._preloader = _preloader;
        this.userModel = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]();
        this.facilitiesModel = new Array();
        this.filterList = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this._preloader.displayPreloader();
        this.getUserData();
        this.getFacilities();
        this.updateSelectedFacilitiesText();
        this._preloader.hidePreloader();
    };
    HomePage.prototype.ionViewCanEnter = function () {
    };
    // ionViewDidEnter() {
    //   this.getFacilities();
    // }
    HomePage.prototype.getUserData = function () {
        var _this = this;
        this.collection = "Users";
        console.log(this._authService.getUserEmail());
        this._dbService.getDocument(this.collection, this._authService.getUserEmail())
            .then(function (data) {
            _this.userModel.parseToUserModel(data);
            console.log(_this.userModel);
        })
            .catch(function (err) { return console.log(err); });
    };
    HomePage.prototype.getFacilities = function () {
        var _this = this;
        this._dbService.getDocuments("Facilities")
            .then(function (data) {
            if (data.length === 0) {
                console.log("Facilities collection is empty");
            }
            else {
                //this.documents = data;
                data.forEach(function (document) {
                    var facility = new __WEBPACK_IMPORTED_MODULE_0__models_facility__["a" /* Facility */]();
                    facility.parseToFacilityModel(document);
                    console.log(facility);
                    if (facility.category == "activity") {
                        _this.facilitiesModel.push(facility);
                    }
                });
                console.log("Data collected!");
                console.log(_this.facilitiesModel);
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    HomePage.prototype.doLogout = function () {
        var _this = this;
        this._authService.signOut()
            .then(function () {
            _this._utilsService.showToast('You have been successfully logged out!');
            console.log("User logged out!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */]);
        })
            .catch(function (err) { return console.log(err); });
    };
    HomePage.prototype.selectFacility = function (facility) {
        var listItemIndex = undefined;
        this.filterList.forEach(function (item, index) {
            if (facility.id === item.id)
                listItemIndex = index;
        });
        if (facility.addedToFilter) {
            this.removeFromFilter(facility, listItemIndex);
        }
        else {
            this.addToFilter(facility);
        }
        console.log(this.filterList);
    };
    HomePage.prototype.addToFilter = function (facility) {
        facility.addedToFilter = true;
        this.filterList.push(facility);
        this.updateSelectedFacilitiesText();
        console.log(facility.name + " added to filter");
    };
    HomePage.prototype.removeFromFilter = function (facility, index) {
        facility.addedToFilter = false;
        this.filterList.splice(index, 1);
        this.updateSelectedFacilitiesText();
        console.log(facility.name + " removed from filter");
    };
    HomePage.prototype.updateSelectedFacilitiesText = function () {
        var _this = this;
        if (this.filterList.length == 0) {
            this.selectedFacilities = "Nothing Selected!";
        }
        else {
            this.selectedFacilities = "Selected: ";
            this.filterList.forEach(function (element) {
                if (_this.filterList.length - 1 == _this.filterList.indexOf(element)) {
                    _this.selectedFacilities += element.name;
                }
                else {
                    _this.selectedFacilities += element.name + ", ";
                }
            });
        }
    };
    HomePage.prototype.search = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__search_result_search_result__["a" /* SearchResultPage */], this.filterList);
        //let test : string = facility.name;
        //test = test.replace(/\s/g, '');
        console.log("searched pressed!");
    };
    HomePage.prototype.openSearchPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__search_search__["a" /* SearchPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <button ion-button menuToggle ion-buttons end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-buttons start >\n      <button ion-button (click)="openSearchPage()">\n      <ion-icon name="search" class="searchIcon"></ion-icon>\n     </button>\n    </ion-buttons>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n  \n  <ion-content class="card-background-page">\n      <ion-list *ngFor="let facility of facilitiesModel">\n        <ion-card *ngIf="facility.addedToFilter === false">\n          <div class="img">\n            <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n            <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n          </div>\n        </ion-card>\n        <ion-card *ngIf="facility.addedToFilter === true" data-status="true">\n            <div class="img">\n              <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n              <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n            </div>\n          </ion-card>\n      </ion-list>\n    </ion-content>\n\n    <ion-footer class="footer">\n        <ion-row text-wrap>\n          <ion-col text-center ion-text color="white">\n              {{selectedFacilities}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <button *ngIf="filterList.length == 0" ion-button round color="lightprimary" class="marginTop" disabled (click)="search()">Search!</button>\n              <button *ngIf="filterList.length > 0" ion-button round color="lightprimary" class="marginTop" (click)="search()">Search!</button>\n          </ion-col>\n        </ion-row>\n      </ion-footer>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DbServiceProvider = /** @class */ (function () {
    function DbServiceProvider() {
        this._db = __WEBPACK_IMPORTED_MODULE_1_firebase__["firestore"]();
        console.log('Hello DbServiceProvider Provider');
    }
    /*
   * Return documents from specific database collection
   */
    // getDocuments(collectionObj: string) : Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     this._db.collection(collectionObj).get()
    //     .then((querySnapshot) => {        
    //       let obj : any = [];
    //       querySnapshot.forEach((doc: any) => {
    //         if (collectionObj === "Facilities") {
    //           obj.push({
    //               id             : doc.id,
    //               name           : doc.data().name,
    //               imageURL       : doc.data().imageURL
    //             });
    //           }
    //       });
    //       resolve(obj);
    //     })
    //     .catch((error : any) => {
    //       reject(error);
    //     });
    //   });
    // }
    DbServiceProvider.prototype.getDocuments = function (collectionObj) {
        return this._db.collection(collectionObj).get();
    };
    DbServiceProvider.prototype.getDocument = function (collectionObj, docID) {
        return this._db.collection(collectionObj).doc(docID).get();
    };
    /**
     * Add a new document to a selected database collection
     */
    DbServiceProvider.prototype.addDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._db.collection(collectionObj).doc(docID).set(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
    * Delete an existing document from a selected database collection
    */
    DbServiceProvider.prototype.deleteDocument = function (collectionObj, docID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._db.collection(collectionObj).doc(docID)
                .delete()
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
    * Update an existing document within a selected database collection
    */
    DbServiceProvider.prototype.updateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._db.collection(collectionObj).doc(docID)
                .update(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DbServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DbServiceProvider);
    return DbServiceProvider;
}());

//# sourceMappingURL=db-service.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
* Class for the Preloader provider.
* @author Cliverson
* Date: 24/04/2018
* @version 1.0
*/
var PreloaderProvider = /** @class */ (function () {
    function PreloaderProvider(loadingCtrl, _utils) {
        this.loadingCtrl = loadingCtrl;
        this._utils = _utils;
    }
    PreloaderProvider.prototype.displayPreloader = function () {
        try {
            this.loading = this.loadingCtrl.create({
                content: 'Please wait..'
            });
            this.loading.present();
        }
        catch (e) {
            this._utils.showToast(e);
        }
    };
    PreloaderProvider.prototype.hidePreloader = function () {
        try {
            this.loading.dismiss();
        }
        catch (e) {
            this._utils.showToast(e);
        }
    };
    PreloaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* UtilsProvider */]])
    ], PreloaderProvider);
    return PreloaderProvider;
}());

//# sourceMappingURL=preloader.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <button ion-button menuToggle ion-buttons end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="card-background-page">\n\n    \n        <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n        <ion-list>\n          <ion-item *ngFor="let item of items">\n            {{ item }}\n            <ion-input type="text" placeholder="Search by Park Name or Postcode"></ion-input>\n          </ion-item>\n        </ion-list>\n        <ion-list>\n\n            <ion-item>\n              <ion-thumbnail item-start>\n                <img src="assets/imgs/SydneyPark.jpg">\n              </ion-thumbnail>\n              <h2>Sydney Park</h2>\n              <p>Alexandria NSW • 2015</p>\n              <button ion-button clear item-end>View</button>\n            </ion-item>\n        \n            <ion-item>\n              <ion-thumbnail item-start>\n                <img src="assets/imgs/VictoriaPark.jpg">\n              </ion-thumbnail>\n              <h2>Victoria Park</h2>\n              <p>Broadway NSW • 2008</p>\n              <button ion-button clear item-end>View</button>\n            </ion-item>\n        </ion-list>\n        </ion-content>\n           \n\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgetPage = /** @class */ (function () {
    function ForgetPage(navCtrl, navParams, formBuilder, _authService, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this.utils = utils;
        this.forgetForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    ForgetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPage');
    };
    ForgetPage.prototype.doForget = function () {
        var _this = this;
        this._authService.resetPassword(this.forgetForm.value.email)
            .then(function () {
            console.log("Reset email sent!");
            _this.navCtrl.pop();
            _this.utils.showToast('Forgotten Password Email Sent');
        })
            .catch(function (error) { return console.log(error); });
    };
    ForgetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forget',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/forget/forget.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>Reset Password</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content class="background">\n  \n    <form [formGroup]="forgetForm" (ngSubmit)="doForget()">\n  \n      <ion-list>\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button ion-button color="primary" block type="submit" [disabled]="!forgetForm.valid">Forgot my password</button>\n      </div>\n    </form>\n  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/forget/forget.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]])
    ], ForgetPage);
    return ForgetPage;
}());

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavouritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FavouritesPage = /** @class */ (function () {
    function FavouritesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FavouritesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavouritesPage');
    };
    FavouritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-favourites',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/favourites/favourites.html"*/'\n<ion-header>\n  <ion-navbar color="blue">\n    <button ion-button menuToggle ion-buttons end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Favoutites</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-list>\n        <ion-item-sliding\n          *ngFor="let list of parks">\n          <ion-item\n            color="parkBackground"\n            [ngClass]="{alt: isAltBackground()}"\n            (click)="onViewPark(park)">\n            <h2>{{ quote.person }}</h2>\n            <p>{{ quote.text }}</p>\n          </ion-item>\n          <ion-item-options>\n            <button\n              ion-button\n              color="danger"\n              (click)="onRemoveFromFavorites(quote)">\n              <ion-icon name="trash"></ion-icon>\n              Delete\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/favourites/favourites.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], FavouritesPage);
    return FavouritesPage;
}());

//# sourceMappingURL=favourites.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, formBuilder, _authService, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this.utils = utils;
        this.registerForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.doRegister = function () {
        var _this = this;
        this._authService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password)
            .then(function (user) {
            _this.utils.showToast('User created successfully!');
            console.log(user.email + " account created successfully!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        })
            .catch(function (error) { return console.log(error); });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/register/register.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Register</ion-title>\n    </ion-navbar>\n  \n</ion-header>\n   \n  <ion-content class="background" scroll="false">\n    <form [formGroup]="registerForm" (ngSubmit)="doRegister()">\n  \n      <ion-list>\n\n          <ion-item>\n              <ion-label color="dark" floating>Name</ion-label>\n              <ion-input type="text" ></ion-input>\n            </ion-item>\n\n        <ion-item>\n          <ion-label color="dark" floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label color="dark" floating>Password</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n   \n      </ion-list>\n  \n      <div padding>\n        <button ion-button color="primary" block type="submit" [disabled]="!registerForm.valid">Register</button>\n      </div>\n  \n    </form>\n  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_park__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__park_details_park_details__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchResultPage = /** @class */ (function () {
    function SearchResultPage(navParams, navCtrl, _dbService, _authService, _utilsService, _preloader) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._preloader = _preloader;
        this.facilitiesFilterList = new Array();
        this.parksFiltered = new Array();
        this.facilitiesFilterList = navParams.data;
    }
    SearchResultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchResultPage');
        this._preloader.displayPreloader();
        this.getSearchedParks();
        //this.getUserData();
    };
    SearchResultPage.prototype.ionViewCanEnter = function () {
    };
    SearchResultPage.prototype.getSearchedParks = function () {
        var _this = this;
        this._dbService.getDocuments("Parks")
            .then(function (data) {
            if (data.length === 0) {
                console.log("Parks collection is empty");
            }
            else {
                data.forEach(function (element) {
                    var park = new __WEBPACK_IMPORTED_MODULE_6__models_park__["a" /* Park */]();
                    var filterCount = _this.facilitiesFilterList.length;
                    var parksFacilityCount = 0;
                    park.parseToParkModel(element);
                    park.facilities.forEach(function (parkFacility) {
                        _this.facilitiesFilterList.forEach(function (filterFacility) {
                            if (parkFacility.id == filterFacility.id) {
                                parksFacilityCount++;
                            }
                        });
                    });
                    if (parksFacilityCount == filterCount) {
                        _this.parksFiltered.push(park);
                    }
                });
                _this._preloader.hidePreloader();
                console.log(_this.parksFiltered);
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    SearchResultPage.prototype.getParkDetails = function (park) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__park_details_park_details__["a" /* ParkDetailsPage */], park);
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-result',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/search-result/search-result.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-buttons menu-toggle>\n          <button ion-button menuToggle icon-only color="primary">\n              <ion-icon color="white" name="menu"></ion-icon>\n            </button>\n      </ion-buttons>\n\n      <ion-title>Search Result</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content class="card-background-page">\n    <div *ngIf="parksFiltered.length == 0" class="parksNotFound">\n        <h1>No Parks Found!</h1>\n    </div>\n    <div *ngIf="parksFiltered.length > 0">\n      <ion-list *ngFor="let park of parksFiltered">\n        <ion-card >\n          <div class="img">\n              <img [src]="park.images[0].imageURL" (click)="getParkDetails(park)">\n              <div class="card-title" (click)="getParkDetails(park)">{{park.name}}</div>\n          </div>        \n        </ion-card>\n        <div class="card-subtitle">\n            {{park.address.suburb}}  -  12 km away\n        </div>        \n      </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/search-result/search-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_prohibition__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_facility__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__review_review__ = __webpack_require__(364);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ParkDetailsPage = /** @class */ (function () {
    function ParkDetailsPage(navParams, navCtrl, _dbService, _authService, _utilsService, _preloader) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._preloader = _preloader;
        this.parkDetails = navParams.data;
    }
    ParkDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParkDetailsPage');
        this._preloader.displayPreloader();
        this.loadParkDetails();
        this._preloader.hidePreloader();
    };
    ParkDetailsPage.prototype.loadParkDetails = function () {
        this.parkDetails = this.navParams.data;
        this.loadFacilityData();
        this.loadProhibitionData();
        console.log(this.parkDetails);
    };
    ParkDetailsPage.prototype.loadFacilityData = function () {
        var _this = this;
        var parkFacilities = new Array();
        this.parkDetails.facilities.forEach(function (item) {
            var facility = new __WEBPACK_IMPORTED_MODULE_7__models_facility__["a" /* Facility */]();
            console.log(item.id);
            _this._dbService.getDocument("Facilities", item.id)
                .then(function (data) {
                facility.parseToFacilityModel(data);
                facility.quantity = item.quantity;
                parkFacilities.push(facility);
            });
        });
        this.parkDetails.facilities = parkFacilities;
    };
    ParkDetailsPage.prototype.loadProhibitionData = function () {
        var _this = this;
        var parkProhibitions = new Array();
        console.log(this.parkDetails.prohibitions);
        this.parkDetails.prohibitions.forEach(function (item) {
            var prohibition = new __WEBPACK_IMPORTED_MODULE_6__models_prohibition__["a" /* Prohibition */]();
            console.log(item.id);
            _this._dbService.getDocument("Prohibitions", item.id)
                .then(function (data) {
                prohibition.parseDocToProhibitionModel(data);
                prohibition.restriction = item.restriction;
                parkProhibitions.push(prohibition);
            });
        });
        this.parkDetails.prohibitions = parkProhibitions;
    };
    ParkDetailsPage.prototype.viewRestriction = function (prohibition) {
        if (prohibition.hiddenRestriction) {
            prohibition.hiddenRestriction = false;
        }
        else {
            prohibition.hiddenRestriction = true;
        }
    };
    ParkDetailsPage.prototype.openReviewPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__review_review__["a" /* ReviewPage */]);
        console.log("ReviewPage pressed!");
    };
    ParkDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-park-details',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/park-details/park-details.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-title>Park Details</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content class="background-page">\n\n      <ion-fab top right edge>\n        <button ion-fab mini color="danger">\n          <ion-icon small name="md-share"></ion-icon>\n        </button>\n        <ion-fab-list>\n          <button ion-fab>\n            <ion-icon name="logo-facebook"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-twitter"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-vimeo"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-googleplus"></ion-icon>\n          </button>\n        </ion-fab-list>\n      </ion-fab>\n    \n      <ion-card class="adv-map">\n        <ion-card-header text-wrap class="park-name">\n          {{parkDetails.name}}\n          <div class="star-rate">\n            <ion-icon *ngFor="let starName of parkDetails.starRatingArray" [name]="starName"></ion-icon>\n            <div class="rate-text">\n                ({{parkDetails.parkRating | number:\'1.1-1\'}})\n                {{parkDetails.rating.numberOfRatings}}\n            </div>\n          </div>\n        </ion-card-header>\n          <ion-slides>\n            <ion-slide  *ngFor="let image of parkDetails.images; let i:index">\n              <ion-row>\n                <ion-col col-12 class="img">\n                    <img [src]="image.imageURL">\n                </ion-col>\n              </ion-row>\n            </ion-slide>\n          </ion-slides>\n          <ion-card-title text-wrap>\n            {{parkDetails.address.suburb}}  -  12 Km away\n          </ion-card-title>\n        <!-- <ion-item actions>\n          <span ion-text item-start color="secondary" class="item-bold">18 min</span>\n          <span ion-text item-start color="subtle">(2.6 mi)</span>\n          <button ion-button color="primary" clear item-end icon-start>\n            <ion-icon name=\'navigate\'></ion-icon>\n            Start\n          </button>\n        </ion-item> -->\n    \n      </ion-card>\n    \n      <ion-row no-padding>\n        <ion-col text-center>\n          \n          <button class="action-button" ion-button (click)="openReviewPage()" small round icon-start  >\n            <ion-icon name=\'chatboxes\'></ion-icon>\n            Review\n          </button>\n       \n        </ion-col>\n        <ion-col text-center>\n          <button class="action-button" ion-button small round icon-start>\n            <ion-icon name=\'star-half\'></ion-icon>\n            Rate\n          </button>\n        </ion-col>    \n        <ion-col text-center>\n          <button class="action-button" ion-button small round icon-start>\n            <ion-icon name=\'heart\'></ion-icon>\n            Favourite\n          </button>\n        </ion-col>\n      </ion-row>\n    \n      <ion-card class="adv-map">\n        <ion-card-header text-wrap class="park-full-address">\n          {{parkDetails.address.fullAddress}}        \n        </ion-card-header>\n        <div class="map">\n          <img src="assets/imgs/advance-card-map-paris.png">\n        </div>\n        <ion-card-title>\n          <ion-row no-padding>\n            <ion-col>\n                <span ion-text item-end clear color="secondary" class="item-bold">26 min</span>\n            </ion-col>\n            <ion-col>\n                <span ion-text clear color="subtle">(8.1 mi)</span>\n            </ion-col>\n            <ion-col>\n                <button ion-button color="secondary" clear icon-start>\n                    <ion-icon name=\'navigate\'></ion-icon>\n                    Start\n                  </button>\n            </ion-col>\n          </ion-row>\n            <!-- <span ion-text item-start color="secondary" class="item-bold">26 min</span>\n            <span ion-text item-start color="subtle">(8.1 mi)</span>\n            <button ion-button color="secondary" clear item-end icon-start>\n              <ion-icon name=\'navigate\'></ion-icon>\n              Start\n            </button> -->\n        </ion-card-title>    \n      </ion-card>\n    \n      <ion-list no-border>    \n        <ion-list-header text-center>\n          Facilities\n        </ion-list-header>    \n        <ion-item *ngFor="let facility of parkDetails.facilities">\n            <div class="fac-pro-ico">\n                <img [src]="facility.iconURL">\n            </div>\n          {{facility.id}}\n          <ion-note item-end>\n            {{facility.quantity}}\n          </ion-note>\n        </ion-item>\n      </ion-list>\n    \n    \n     <ion-list no-border>    \n        <ion-list-header text-center>\n          Prohibitions\n        </ion-list-header>    \n        <ion-item *ngFor="let prohibition of parkDetails.prohibitions">\n            <div class="fac-pro-ico">\n                <img [src]="prohibition.iconURL">\n            </div>\n          {{prohibition.id}}\n            <ion-note item-end *ngIf=\'prohibition.restriction\'>\n              <img [src]="prohibition.iconAlertURL" (click)="viewRestriction(prohibition)">\n            </ion-note>\n            <ion-item [hidden]="prohibition.hiddenRestriction">\n              <ion-note item-middle text-wrap>\n                {{prohibition.restriction}}\n              </ion-note>\n            </ion-item>\n        </ion-item>\n      </ion-list>   \n  </ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/park-details/park-details.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */]) === "function" && _f || Object])
    ], ParkDetailsPage);
    return ParkDetailsPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=park-details.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <button ion-button menuToggle ion-buttons end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  \n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="background" >\n\n    <ion-item-group>\n        <ion-item-divider class="grey"><em>&nbsp;VERSION INFORMATION</em></ion-item-divider>\n        <ion-item class="background">App Version 1.0.0 June 2018</ion-item>\n      </ion-item-group>\n\n    <ion-item-group>\n          <ion-item-divider class="grey"><em>&nbsp;CONTACT US</em></ion-item-divider>\n          <ion-item class="background">MyPark is also available online  <br>at\n              www.myParkSydney.com\n            <br>\n            <br>\n              If you are having any problemas with the <br>\n               MyPark app or wish to make any suggestions, <br>\n               please contact us at team@mypark.com\n           </ion-item>\n      </ion-item-group>\n\n      <ion-item-group>\n          <ion-item-divider class="grey"><em>&nbsp;NOTIFICATIONS</em></ion-item-divider>\n          <ion-item class="background">\n            <ion-label>Enable Push Notifications</ion-label>\n            <ion-toggle value="foo" checked="true"></ion-toggle>\n          </ion-item>\n        </ion-item-group>\n\n        <ion-item-group>\n            <ion-item-divider class="grey"><em>  &nbsp;ACCOUNT</em></ion-item-divider>\n            <ion-item class="background">\n                <ion-label>Remove Account</ion-label>\n                <ion-toggle value="foo" checked="true"></ion-toggle>\n              </ion-item>\n          </ion-item-group>\n\n  \n  \n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage.prototype.start = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/welcome/welcome.html"*/'<ion-content padding class="myView" id="welcome">\n\n  <img src="assets/imgs/novoLogo.png" class="logo" align="middle" />\n  <h1 align="center"> Welcome </h1>\n  <h2 align="center">Discover great Parks areas and opportunities</h2>\n\n  <button ion-button block color="lightprimary" class="marginTop" (click)="start()">Get Started</button>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 216;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/favourites/favourites.module": [
		586,
		10
	],
	"../pages/forget/forget.module": [
		585,
		9
	],
	"../pages/information/information.module": [
		587,
		8
	],
	"../pages/login/login.module": [
		588,
		7
	],
	"../pages/park-details/park-details.module": [
		589,
		6
	],
	"../pages/register/register.module": [
		590,
		5
	],
	"../pages/review/review.module": [
		591,
		4
	],
	"../pages/search-result/search-result.module": [
		592,
		3
	],
	"../pages/search/search.module": [
		594,
		2
	],
	"../pages/settings/settings.module": [
		593,
		1
	],
	"../pages/welcome/welcome.module": [
		595,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 260;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Facility; });
var Facility = /** @class */ (function () {
    function Facility() {
        this.addedToFilter = false;
    }
    Facility.prototype.parseToFacilityModel = function (docRef) {
        this.id = docRef.id;
        this.name = docRef.data().name;
        this.iconURL = docRef.data().iconURL;
        this.imageURL = docRef.data().imageURL;
        this.category = docRef.data().category;
        this.quantity = docRef.data().quantity;
    };
    return Facility;
}());

//# sourceMappingURL=facility.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prohibition; });
var Prohibition = /** @class */ (function () {
    function Prohibition() {
        this.id = "";
        this.name = "";
        this.iconURL = "";
        this.restriction = "";
        this.hiddenRestriction = true;
        this.iconAlertURL = "https://firebasestorage.googleapis.com/v0/b/mypark-5778d.appspot.com/o/prohibition-ico%2Fprohibited_alert.gif?alt=media&token=494ceb79-3c74-40f0-abf1-c3159c5b7a2d";
    }
    Prohibition.prototype.parseObjToProhibitionModel = function (docRef) {
        this.id = docRef.id;
        this.name = docRef.name;
        this.iconURL = docRef.iconURL;
        this.restriction = docRef.restriction;
    };
    Prohibition.prototype.parseDocToProhibitionModel = function (docRef) {
        this.id = docRef.id;
        this.name = docRef.data().name;
        this.iconURL = docRef.data().iconURL;
        this.restriction = docRef.data().restriction;
    };
    return Prohibition;
}());

//# sourceMappingURL=prohibition.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewPage = /** @class */ (function () {
    function ReviewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReviewPage');
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/review/review.html"*/'<ion-header>\n    <ion-navbar color="blue">\n      <button ion-button menuToggle ion-buttons end>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Review</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/review/review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(382);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_environment__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_welcome_welcome__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_forget_forget__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_register_register__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_search_result_search_result__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_favourites_favourites__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_settings_settings__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_search_search__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_review_review__ = __webpack_require__(364);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_forget_forget__["a" /* ForgetPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__["a" /* ParkDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_favourites_favourites__["a" /* FavouritesPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_review_review__["a" /* ReviewPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/favourites/favourites.module#FavouritesPageModule', name: 'FavouritesPage', segment: 'favourites', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/information/information.module#InformationPageModule', name: 'InformationPage', segment: 'information', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/park-details/park-details.module#ParkDetailsPageModule', name: 'ParkDetailsPage', segment: 'park-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result/search-result.module#SearchResultPageModule', name: 'SearchResultPage', segment: 'search-result', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__config_environment__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__["a" /* AngularFirestoreModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_forget_forget__["a" /* ForgetPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__["a" /* ParkDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_favourites_favourites__["a" /* FavouritesPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_review_review__["a" /* ReviewPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__["a" /* UtilsProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_utils_preloader__["a" /* PreloaderProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UtilsProvider = /** @class */ (function () {
    function UtilsProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    UtilsProvider.prototype.showToast = function (message, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position || 'bottom'
        });
        toast.present(toast);
    };
    UtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.parseToUserModel = function (docRef) {
        this.id = docRef.id;
        this.userID = this.id;
        this.dateCreated = docRef.data().dateCreated;
        this.email = docRef.data().email;
        this.name = docRef.data().name;
        this.imageURL = docRef.data().imageURL;
        this.favoriteParks = docRef.data().FavoriteParks;
        this.ratings = docRef.data().UserRatings;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getImage = function () {
        return this.imageURL;
    };
    User.prototype.addFavoritePark = function (parkID) {
        // todo:
    };
    User.prototype.removeFavoritePark = function (parkID) {
        // todo
    };
    User.prototype.addParkRate = function (parkID, rate) {
        // todo:
    };
    User.prototype.removeParkRate = function (parkID) {
        // todo:
    };
    User.prototype.updateParkRate = function (parkID, newRate) {
        // todo:
    };
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Park; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prohibition__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address__ = __webpack_require__(506);


var Park = /** @class */ (function () {
    function Park() {
        this.address = new __WEBPACK_IMPORTED_MODULE_1__address__["a" /* Address */]();
        this.prohibitions = new Array();
        this.parkRating = 0;
        this.starRatingArray = [];
    }
    Park.prototype.parseToParkModel = function (docRef) {
        var _this = this;
        this.id = docRef.id;
        this.address.parseToAddressModel(docRef.data().address);
        this.comments = docRef.data().comments;
        this.contact = docRef.data().contact;
        this.description = docRef.data().description;
        this.facilities = docRef.data().facilities;
        this.images = docRef.data().images;
        this.name = docRef.data().name;
        docRef.data().prohibitions.forEach(function (element) {
            var prohibition = new __WEBPACK_IMPORTED_MODULE_0__prohibition__["a" /* Prohibition */]();
            console.log(prohibition);
            prohibition.parseObjToProhibitionModel(element);
            console.log(prohibition);
            _this.prohibitions.push(prohibition);
        });
        console.log(this.prohibitions);
        this.rating = docRef.data().rating;
        this.calculateParkRating();
    };
    Park.prototype.calculateParkRating = function () {
        if (this.rating.sumOfRateValues == 0 && this.rating.numberOfRatings == 0) {
            this.parkRating = 0;
        }
        else {
            this.parkRating = this.rating.sumOfRateValues / this.rating.numberOfRatings;
        }
        this.updateStarRatingArray();
    };
    Park.prototype.updateStarRatingArray = function () {
        var rat;
        if (this.parkRating == 0) {
            rat = 0;
        }
        else {
            rat = (this.rating.sumOfRateValues / (this.rating.numberOfRatings * 5)) * 10;
        }
        var noDecimal = 2;
        while (rat - Math.trunc(rat) > 0) {
            rat = rat * 10;
            noDecimal = noDecimal * 10;
        }
        for (var i = 0; i < 5; i++) {
            if ((rat / noDecimal) <= 0) {
                this.starRatingArray.push("star-outline");
            }
            else if ((rat / noDecimal) > 0 && (rat / noDecimal) < 1) {
                this.starRatingArray.push("star-half");
            }
            else if ((rat / noDecimal) >= 1) {
                this.starRatingArray.push("star");
            }
            if (i != 4) {
                rat = rat - noDecimal;
            }
        }
    };
    return Park;
}());

//# sourceMappingURL=park.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = /** @class */ (function () {
    function Address() {
        this.suburb = "";
        this.fullAddress = "";
        this.postCode = "";
        this.state = "";
        this.street = "";
    }
    Address.prototype.parseToAddressModel = function (docRef) {
        this.suburb = docRef.suburb;
        this.fullAddress = docRef.fullAddress;
        this.postCode = docRef.postCode;
        this.state = docRef.state;
        this.street = docRef.street;
    };
    return Address;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(_authService, platform) {
        this._authService = _authService;
        this.platform = platform;
        console.log('Hello AuthServiceProvider Provider');
        this.user = _authService.authState;
    }
    AuthServiceProvider.prototype.isAuthenticated = function () {
        if (this.user !== null) {
            return true;
        }
        return false;
    };
    AuthServiceProvider.prototype.getUserImage = function () {
        return this._authService.auth.currentUser.photoURL;
    };
    AuthServiceProvider.prototype.getUserEmail = function () {
        return this._authService.auth.currentUser.email;
    };
    AuthServiceProvider.prototype.googleLogin = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth.GoogleAuthProvider();
        return this.socialSignIn(provider);
    };
    AuthServiceProvider.prototype.facebookLogin = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth.FacebookAuthProvider();
        return this.socialSignIn(provider);
    };
    AuthServiceProvider.prototype.twitterLogin = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth.TwitterAuthProvider();
        return this.socialSignIn(provider);
    };
    AuthServiceProvider.prototype.socialSignIn = function (provider) {
        if (this.platform.is('cordova')) {
            return this._authService.auth.signInWithRedirect(provider);
        }
        else {
            // It will work only in browser
            return this._authService.auth.signInWithPopup(provider);
        }
    };
    // Email / Password Registration
    AuthServiceProvider.prototype.emailSignUp = function (email, password) {
        return this._authService.auth.createUserWithEmailAndPassword(email, password);
    };
    // Email / Password Authentication //
    AuthServiceProvider.prototype.emailLogin = function (email, password) {
        return this._authService.auth.signInWithEmailAndPassword(email, password);
    };
    // Sends email allowing user to reset password
    AuthServiceProvider.prototype.resetPassword = function (email) {
        return this._authService.auth.sendPasswordResetEmail(email);
    };
    // Sign Out
    AuthServiceProvider.prototype.signOut = function () {
        return this._authService.auth.signOut();
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    apiKey: 'AIzaSyBPci2n-gH-9Wybpd3Oo-faGLEz4_EK-OM',
    authDomain: 'mypark-5778d.firebaseapp.com',
    databaseURL: 'https://mypark-5778d.firebaseio.com',
    projectId: 'mypark-5778d',
    storageBucket: 'mypark-5778d.appspot.com',
    messagingSenderId: '609039081087'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_favourites_favourites__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_search_search__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, _utilsService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this._utilsService = _utilsService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */];
        this.initializeApp();
        var authObserver = afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */];
                authObserver.unsubscribe();
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                authObserver.unsubscribe();
            }
        });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */] },
            { title: 'Search', icon: 'search', component: __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */] },
            { title: 'Login', icon: 'log-in', component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */] },
            { title: 'Favourites', icon: 'heart', component: __WEBPACK_IMPORTED_MODULE_9__pages_favourites_favourites__["a" /* FavouritesPage */] },
            { title: 'Settings', icon: 'contact', component: __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Log out', icon: 'log-out', component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */] }
        ];
        this.activePage = this.pages[0];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]) {
            this.doLogout();
        }
        else {
            this.nav.push(page.component);
        }
        this.activePage = page;
    };
    MyApp.prototype.checkActivePage = function (page) {
        return page == this.activePage;
    };
    MyApp.prototype.doLogout = function () {
        var _this = this;
        this.afAuth.auth.signOut()
            .then(function () {
            _this._utilsService.showToast('You have been successfully logged out!');
            console.log("User logged out!");
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
        })
            .catch(function (err) { return console.log(err); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)"[class.active]="checkActivePage(p)">\n          <ion-icon name="{{p.icon}}"></ion-icon>\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]) === "function" && _f || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forget_forget__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, _authService, _utils, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._authService = _authService;
        this._utils = _utils;
        this.formBuilder = formBuilder;
        this._loginForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this._authService.emailLogin(this._loginForm.value.email, this._loginForm.value.password)
            .then(function (user) {
            _this._utils.showToast('Logged in successfully!');
            console.log(user + " logged in!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
        })
            .catch(function (error) { return console.log(error); });
    };
    LoginPage.prototype.navForget = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__forget_forget__["a" /* ForgetPage */]);
    };
    LoginPage.prototype.navRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.doSocialLogin = function (social) {
        var _this = this;
        if (social == 'google') {
            this._authService.googleLogin()
                .then(function (credential) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                _this._utils.showToast("Logged in successfully!");
                console.log(credential.user + " logged in successfully!");
            })
                .catch(function (error) { return console.log(error); });
        }
        else if (social == 'facebook') {
            this._authService.facebookLogin()
                .then(function (credential) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                _this._utils.showToast("Logged in successfully!");
                console.log(credential.user + " logged in successfully!");
            })
                .catch(function (error) { return console.log(error); });
        }
        else if (social == 'twitter') {
            this._authService.twitterLogin()
                .then(function (credential) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                _this._utils.showToast("Logged in successfully!");
                console.log(credential.user + " logged in successfully!");
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/login/login.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Login</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding class="background" scroll="false">\n    <form [formGroup]="_loginForm" (ngSubmit)="doLogin()">\n  \n      <ion-list>\n\n        <ion-item>\n          <ion-label color="dark" floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label color="dark" floating>Password</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button ion-button block color="lightprimary" class="login" type="submit" [disabled]="!_loginForm.valid">Sign In</button>\n      </div>\n  \n    </form>\n  \n    <ion-grid text-center>\n      <ion-row>\n        <ion-col>\n          <a href="#" class="login-options" (click)="navForget()">Forgot Password</a>\n        </ion-col>\n        <ion-col>\n          <a href="#" class="login-opitons" (click)="navRegister()">Register</a>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  \n    <div padding>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <button ion-button color="facebook" block class="btn-facebook" (click)="doSocialLogin(\'facebook\')">\n              <ion-icon name="logo-facebook" md="logo-facebook"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-4>\n            <button ion-button color="twitter" block class="btn-twitter" (click)="doSocialLogin(\'twitter\')">\n              <ion-icon ios="logo-twitter" md="logo-twitter"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-4>\n            <button ion-button color="google" block class="btn-gplus" (click)="doSocialLogin(\'google\')">\n              <ion-icon ios="logo-google" md="logo-google"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <!--  <button ion-button color="google" block icon-left margin-bottom (click)="doSocialLogin(\'google\')">\n        <ion-icon ios="logo-google" md="logo-google"></ion-icon>\n        Login with Google\n      </button> -->\n      <!-- <div class="row">\n        <div class="column">\n          <button (click)="doSocialLogin(\'google\')">\n            <img src="../../assets/icon/google+_icon.png">\n          </button>\n        </div>\n        <div class="column">\n          <button (click)="doSocialLogin(\'facebook\')">\n            <img src="../../assets/icon/facebook-icon1.png">\n          </button>\n        </div>\n        <div class="column">\n          <button (click)="doSocialLogin(\'twitter\')">\n            <img src="../../assets/icon/twitter_icon.png">\n          </button>\n        </div>\n      </div> -->\n    </div>  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[365]);
//# sourceMappingURL=main.js.map