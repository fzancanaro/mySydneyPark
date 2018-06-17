webpackJsonp([10],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_result_search_result__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_facility__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_user__ = __webpack_require__(83);
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
    function HomePage(navCtrl, _dbService, _authService, _preloader) {
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
        this._preloader = _preloader;
        this.userModel = new __WEBPACK_IMPORTED_MODULE_7__models_user__["a" /* User */]();
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
            console.log(data.data());
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
                    var facility = new __WEBPACK_IMPORTED_MODULE_6__models_facility__["a" /* Facility */]();
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__search_result_search_result__["a" /* SearchResultPage */], this.filterList);
        //let test : string = facility.name;
        //test = test.replace(/\s/g, '');
        console.log("searched pressed!");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar color="blue">\n      <button ion-button menuToggle ion-buttons end>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <!-- <ion-buttons start >\n        <button ion-button (click)="openSearchPage()">\n        <ion-icon name="search" class="searchIcon"></ion-icon>\n       </button>\n      </ion-buttons> -->\n      <ion-title>Home</ion-title>\n    </ion-navbar>\n    <ion-row>\n        <ion-col text-center>\n          <p>Hello, {{userModel.name}}</p>\n          <p>What would you like to do today?</p>\n        </ion-col>\n      </ion-row>\n  </ion-header>\n  \n  <ion-content class="card-background-page">\n      <ion-list *ngFor="let facility of facilitiesModel">\n        <ion-card *ngIf="facility.addedToFilter === false">\n          <div class="img">\n            <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n            <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n          </div>\n        </ion-card>\n        <ion-card *ngIf="facility.addedToFilter === true" data-status="true">\n            <div class="img">\n              <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n              <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n            </div>\n            <div class="img-bg"></div>\n          </ion-card>\n      </ion-list>\n    </ion-content>\n\n    <ion-footer class="footer">\n        <ion-row text-wrap>\n          <ion-col text-center ion-text color="white">\n              {{selectedFacilities}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <button *ngIf="filterList.length == 0" ion-button round color="lightprimary" class="marginTop" disabled (click)="search()">Search!</button>\n              <button *ngIf="filterList.length > 0" ion-button round color="lightprimary" class="marginTop" (click)="search()">Search!</button>\n          </ion-col>\n        </ion-row>\n      </ion-footer>\n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forget_forget__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, _authService, _dbService, _utils, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._authService = _authService;
        this._dbService = _dbService;
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
        this._authService.getProvidersForEmail(this._loginForm.value.email)
            .then(function (providers) {
            console.log(providers);
            if (providers.length > 0) {
                _this._authService.emailLogin(_this._loginForm.value.email, _this._loginForm.value.password)
                    .then(function (user) {
                    _this.setHomePage("with email and password");
                })
                    .catch(function (error) {
                    var providersText = "";
                    providers.forEach(function (provider) {
                        providersText = providersText + " " + provider;
                    });
                    if (providers.some(function (p) { return p === "password"; })) {
                        _this._utils.showToast("Invalid Password!");
                        console.log("Login attempt with invalid password!");
                    }
                    else {
                        _this._utils.showToast("Account created with: " + providersText);
                        console.log("Password login attempt for account(s) from: " + providersText);
                    }
                });
            }
            else {
                _this._utils.showToast("There is no account for the given email");
                console.log("Invalid email account for login");
            }
        })
            .catch(function (err) { console.log(err.message); });
    };
    LoginPage.prototype.navForget = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__forget_forget__["a" /* ForgetPage */]);
    };
    LoginPage.prototype.navRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.doSocialLogin = function (social) {
        var _this = this;
        if (social == 'google') {
            this._authService.googleLogin()
                .then(function (credential) {
                console.log(credential.additionalUserInfo.profile.email);
                _this._dbService.getDocument("Users", credential.additionalUserInfo.profile.email)
                    .then(function (user) {
                    console.log(user.exists);
                    if (user.exists) {
                        _this.setHomePage("with Google");
                    }
                    else {
                        _this.createMyParkUserFromGoogle(credential);
                    }
                })
                    .catch(function (err) { console.log(err.message); });
            })
                .catch(function (error) {
                //this._utils.showToast("Account email exists but from different provider");
                _this._utils.showToast(error.message);
                console.log(error.message);
            });
        }
        else if (social == 'facebook') {
            this._authService.facebookLogin()
                .then(function (credential) {
                _this._dbService.getDocument("Users", credential.additionalUserInfo.profile.email)
                    .then(function (user) {
                    if (user.exists) {
                        _this.setHomePage("with Facebook");
                    }
                    else {
                        _this.createMyParkUserFromFacebook(credential);
                    }
                })
                    .catch(function (err) { console.log(err.message); });
            })
                .catch(function (error) {
                //this._utils.showToast("Account email exists but from different provider");
                _this._utils.showToast(error.message);
                console.log(error.message);
            });
        }
        else if (social == 'twitter') {
            this._authService.twitterLogin()
                .then(function (credential) {
                _this._dbService.getDocument("Users", credential.additionalUserInfo.profile.email)
                    .then(function (user) {
                    if (user.exists) {
                        _this.setHomePage("with Twitter");
                    }
                    else {
                        _this.createMyParkUserFromTwitter(credential);
                    }
                })
                    .catch(function (err) { console.log(err.message); });
            })
                .catch(function (error) {
                //this._utils.showToast("Account email exists but from different provider");
                _this._utils.showToast(error.message);
                console.log(error.message);
            });
        }
    };
    LoginPage.prototype.createMyParkUserFromGoogle = function (credential) {
        this.collection = "Users";
        var email = credential.additionalUserInfo.profile.email;
        var username = credential.additionalUserInfo.profile.given_name;
        var user = {
            email: email,
            name: username,
            dateCreated: this._authService.getUserCreationDate(),
            favouriteParks: new Array(),
            userRatings: new Array(),
            imageURL: credential.additionalUserInfo.profile.picture
        };
        this.addParkUserDb(user, email, "with Google2");
    };
    LoginPage.prototype.createMyParkUserFromFacebook = function (credential) {
        this.collection = "Users";
        var email = credential.additionalUserInfo.profile.email;
        var username = credential.additionalUserInfo.profile.first_name;
        var user = {
            email: email,
            name: username,
            dateCreated: this._authService.getUserCreationDate(),
            favouriteParks: new Array(),
            userRatings: new Array(),
            imageURL: this._authService.getUserImage()
        };
        this.addParkUserDb(user, email, "with Facebook2");
    };
    LoginPage.prototype.createMyParkUserFromTwitter = function (credential) {
        this.collection = "Users";
        var email = credential.additionalUserInfo.profile.email;
        var username = credential.additionalUserInfo.profile.name;
        var user = {
            email: email,
            name: username,
            dateCreated: this._authService.getUserCreationDate(),
            favouriteParks: new Array(),
            userRatings: new Array(),
            imageURL: credential.additionalUserInfo.profile.profile_image_url
        };
        this.addParkUserDb(user, email, "with Twitter2");
    };
    LoginPage.prototype.addParkUserDb = function (user, email, origin) {
        var _this = this;
        this._dbService.addDocument(this.collection, email, user).then(function () {
            _this.setHomePage(origin);
        });
    };
    LoginPage.prototype.setHomePage = function (origin) {
        console.log("User logged in " + origin);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
        this._utils.showToast("Logged in successfully!");
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/login/login.html"*/'<ion-header>\n    <ion-navbar color="blue">\n      <ion-title>Login</ion-title>\n    </ion-navbar>  \n  </ion-header>  \n  \n  <ion-content padding class="background" scroll="false">\n    <form [formGroup]="_loginForm" (ngSubmit)="doLogin()">\n  \n      <ion-list>  \n        <ion-item>\n          <ion-label color="dark" floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>  \n        <ion-item>\n          <ion-label color="dark" floating>Password</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button ion-button block color="lightprimary" class="login" type="submit" [disabled]="!_loginForm.valid">Sign In</button>\n      </div>\n  \n    </form>\n  \n    <ion-grid text-center>\n      <ion-row class="forget-register">\n        <ion-col>\n          <a href="#" class="login-optons" (click)="navForget()">Forgot Password</a>\n        </ion-col>\n        <ion-col>\n          <a href="#" class="login-optons" (click)="navRegister()">Register</a>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  \n    <div padding>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <button ion-button color="facebook" block class="btn-facebook" (click)="doSocialLogin(\'facebook\')">\n              <ion-icon name="logo-facebook" md="logo-facebook"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-4>\n            <button ion-button color="twitter" block class="btn-twitter" (click)="doSocialLogin(\'twitter\')">\n              <ion-icon ios="logo-twitter" md="logo-twitter"></ion-icon>\n            </button>\n          </ion-col>\n          <ion-col col-4>\n            <button ion-button color="google" block class="btn-gplus" (click)="doSocialLogin(\'google\')">\n              <ion-icon ios="logo-google" md="logo-google"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_map__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_prohibition__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_facility__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_user__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_favourite_park__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_rating__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__review_review__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var map;
var mapData = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* Map */]();
var ParkDetailsPage = /** @class */ (function () {
    //public mapData : Map = new Map();
    function ParkDetailsPage(navParams, navCtrl, socialSharing, _platform, _dbService, _authService, _utilsService, _geolocation, _preloader) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.socialSharing = socialSharing;
        this._platform = _platform;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._geolocation = _geolocation;
        this._preloader = _preloader;
        this.user = new __WEBPACK_IMPORTED_MODULE_12__models_user__["a" /* User */]();
        this.parkDetails = navParams.data;
    }
    ParkDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ParkDetailsPage');
        this._preloader.displayPreloader();
        this._platform.ready().then(function () {
            _this.loadMap();
            _this.loadParkDetails();
        });
        //this._preloader.hidePreloader();
    };
    ParkDetailsPage.prototype.loadParkDetails = function () {
        this.parkDetails = this.navParams.data;
        this.loadUserData();
        this.loadFacilityData();
        this.loadProhibitionData();
        console.log(this.parkDetails);
    };
    ParkDetailsPage.prototype.loadUserData = function () {
        var _this = this;
        this.collection = "Users";
        console.log(this._authService.getUserEmail());
        this._dbService.getDocument(this.collection, this._authService.getUserEmail())
            .then(function (data) {
            _this.user.parseToUserModel(data);
            console.log(_this.user);
            _this.SetUserFavouriteOption();
            _this.SetUserRatingOption();
        })
            .catch(function (err) {
            console.log("it did not retrieved user data from db");
            console.log(err);
        });
    };
    ParkDetailsPage.prototype.SetUserFavouriteOption = function () {
        var _this = this;
        console.log(this.parkDetails.id);
        if (this.user.favouriteParks.some(function (p) { return p.id == _this.parkDetails.id; })) {
            this.parkDetails.addedToFavourites = true;
            console.log("park is a user favourite");
        }
        else {
            this.parkDetails.addedToFavourites = false;
            console.log("parks is not a user favourite");
        }
    };
    ParkDetailsPage.prototype.SetUserRatingOption = function () {
        var _this = this;
        if (this.user.ratings.some(function (p) { return p.parkId == _this.parkDetails.id; })) {
            var rating = new __WEBPACK_IMPORTED_MODULE_14__models_rating__["a" /* Rating */]();
            rating = this.user.ratings.find(function (r) { return r.parkId == _this.parkDetails.id; });
            this.parkDetails.updateUserStarRatingArray(rating.rate);
        }
        else {
            this.parkDetails.updateUserStarRatingArray(0);
        }
    };
    ParkDetailsPage.prototype.loadFacilityData = function () {
        var _this = this;
        var parkFacilities = new Array();
        this.parkDetails.facilities.forEach(function (item) {
            var facility = new __WEBPACK_IMPORTED_MODULE_11__models_facility__["a" /* Facility */]();
            console.log(item.id);
            _this._dbService.getDocument("Facilities", item.id)
                .then(function (data) {
                facility.parseToFacilityModel(data);
                facility.quantity = item.quantity;
                parkFacilities.push(facility);
                console.log("Facilities added correctly");
            })
                .catch(function () {
                _this._utilsService.showToast("Facilities did not load");
                console.log("Could not load facilities from database");
            });
        });
        this.parkDetails.facilities = parkFacilities;
    };
    ParkDetailsPage.prototype.loadProhibitionData = function () {
        var _this = this;
        var parkProhibitions = new Array();
        console.log(this.parkDetails.prohibitions);
        try {
            this.parkDetails.prohibitions.forEach(function (item) {
                var prohibition = new __WEBPACK_IMPORTED_MODULE_10__models_prohibition__["a" /* Prohibition */]();
                console.log(item.id);
                _this._dbService.getDocument("Prohibitions", item.id)
                    .then(function (data) {
                    prohibition.parseDocToProhibitionModel(data);
                    prohibition.restriction = item.restriction;
                    parkProhibitions.push(prohibition);
                })
                    .catch(function () {
                    _this._utilsService.showToast("Prohibitions did not load");
                    console.log("Could not load prohibitions from database");
                });
            });
            this.parkDetails.prohibitions = parkProhibitions;
            this._preloader.hidePreloader();
        }
        catch (_a) {
            console.log("Error iterating in prohibitions list");
            this._preloader.hidePreloader();
        }
    };
    ParkDetailsPage.prototype.viewRestriction = function (prohibition) {
        if (prohibition.hiddenRestriction) {
            prohibition.hiddenRestriction = false;
        }
        else {
            prohibition.hiddenRestriction = true;
        }
    };
    ParkDetailsPage.prototype.openReviews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__review_review__["a" /* ReviewPage */], this.parkDetails);
    };
    ParkDetailsPage.prototype.doFavourite = function () {
        this.updateUserObj();
        this.updateUserFavDb();
        this.updateParkDetailsObj();
    };
    ParkDetailsPage.prototype.updateParkDetailsObj = function () {
        if (this.parkDetails.addedToFavourites) {
            this.parkDetails.addedToFavourites = false;
        }
        else {
            this.parkDetails.addedToFavourites = true;
        }
    };
    ParkDetailsPage.prototype.updateUserObj = function () {
        var _this = this;
        this.collection = "Users";
        if (this.parkDetails.addedToFavourites) {
            var userFav = this.user.favouriteParks.find(function (f) { return f.id == _this.parkDetails.id; });
            var userFavIndex = this.user.favouriteParks.indexOf(userFav);
            console.log(userFavIndex);
            this.user.favouriteParks.splice(userFavIndex, 1);
            console.log(this.user.favouriteParks);
        }
        else {
            var park = new __WEBPACK_IMPORTED_MODULE_9__models_park__["a" /* Park */]();
            park.id = this.parkDetails.id;
            this.user.favouriteParks.push(park);
            console.log(this.user.favouriteParks);
        }
    };
    ParkDetailsPage.prototype.updateUserFavDb = function () {
        this.collection = "Users";
        var userFavParks = Array();
        this.user.favouriteParks.forEach(function (park) {
            var favPark = new __WEBPACK_IMPORTED_MODULE_13__models_favourite_park__["a" /* FavouritePark */]();
            favPark.id = park.id;
            userFavParks.push(favPark);
        });
        var dataObj = JSON.parse(JSON.stringify(userFavParks));
        console.log(dataObj);
        var user = {
            favouriteParks: dataObj
        };
        this._dbService.updateDocument(this.collection, this.user.email, user);
    };
    ParkDetailsPage.prototype.openRate = function (parkDetails) {
        //parkDetails.updateUserStarRatingArray(3);
        if (parkDetails.userRateHidden) {
            parkDetails.userRateHidden = false;
        }
        else {
            parkDetails.userRateHidden = true;
        }
    };
    ParkDetailsPage.prototype.ratePark = function (rate) {
        this.parkDetails.updateUserStarRatingArray(rate + 1);
        this.updateParkRating(rate + 1);
    };
    ParkDetailsPage.prototype.removeUserRate = function () {
        this.parkDetails.updateUserStarRatingArray(0);
        this.updateParkRating(0);
    };
    ParkDetailsPage.prototype.updateParkRating = function (rate) {
        var _this = this;
        this.collection = "Parks";
        this._dbService.getDocument(this.collection, this.parkDetails.id).then(function (data) {
            var newPark = new __WEBPACK_IMPORTED_MODULE_9__models_park__["a" /* Park */]();
            newPark.parseToParkModel(data);
            _this.parkDetails.rating = newPark.rating;
            // if user rate for this park exists
            if (_this.user.ratings.some(function (r) { return r.parkId == _this.parkDetails.id; })) {
                var userRate = _this.user.ratings.find(function (r) { return r.parkId == _this.parkDetails.id; });
                var userRateIndex = _this.user.ratings.indexOf(userRate);
                // if user wants to clear any rate for this park, remove from user rates and from park rates
                if (rate == 0) {
                    console.log("user removing rate for park");
                    _this.parkDetails.rating.numberOfRatings = _this.parkDetails.rating.numberOfRatings - 1;
                    _this.parkDetails.rating.sumOfRateValues = _this.parkDetails.rating.sumOfRateValues - userRate.rate;
                    _this.user.ratings.splice(userRateIndex, 1);
                }
                else {
                    console.log("user updating rate of park");
                    _this.parkDetails.rating.sumOfRateValues = _this.parkDetails.rating.sumOfRateValues - userRate.rate + rate;
                    _this.user.ratings[userRateIndex].rate = rate;
                }
            }
            else {
                console.log("user adding rate to park");
                _this.parkDetails.rating.numberOfRatings = _this.parkDetails.rating.numberOfRatings + 1;
                _this.parkDetails.rating.sumOfRateValues = _this.parkDetails.rating.sumOfRateValues + rate;
                var rating = new __WEBPACK_IMPORTED_MODULE_14__models_rating__["a" /* Rating */]();
                rating.parkId = _this.parkDetails.id;
                rating.rate = rate;
                _this.user.ratings.push(rating);
            }
            console.log(_this.parkDetails.rating.numberOfRatings);
            console.log(_this.parkDetails.rating.sumOfRateValues);
            _this.updateParkRateDb();
            _this.updateUserRateDb(rate);
            _this.parkDetails.updateParkRating();
        })
            .catch(function (err) { console.log(err.message); });
    };
    ParkDetailsPage.prototype.updateParkRateDb = function () {
        this.collection = "Parks";
        var parkRating = {
            rating: {
                sumOfRateValues: this.parkDetails.rating.sumOfRateValues,
                numberOfRatings: this.parkDetails.rating.numberOfRatings
            }
        };
        this._dbService.updateDocument(this.collection, this.parkDetails.id, parkRating);
    };
    ParkDetailsPage.prototype.updateUserRateDb = function (rate) {
        this.collection = "Users";
        var dataObj = JSON.parse(JSON.stringify(this.user.ratings));
        console.log(dataObj);
        var user = {
            userRatings: dataObj
        };
        this._dbService.updateDocument(this.collection, this.user.email, user);
    };
    // facebook share configuration
    ParkDetailsPage.prototype.facebookShare = function (parkDetails) {
        var _this = this;
        var image = parkDetails.images[0].imageURL;
        var url = parkDetails.contact.officialWebsite;
        if (this._platform.is("ios")) {
            this.socialSharing.canShareVia('com.apple.social.facebook', null, null, image, url).then(function () {
                _this.facebookIosShare(image, url);
            })
                .catch(function () {
                _this._utilsService.showToast("Facebook not available");
            });
        }
        else if (this._platform.is("android")) {
            this.socialSharing.canShareVia('com.facebook.katana', null, null, null, url).then(function () {
                _this.facebookAndroidShare(url);
            })
                .catch(function () {
                _this._utilsService.showToast("Facebook not available!");
            });
        }
        else {
            console.error("Facebook share not available in this platform");
            this._utilsService.showToast("Share not supported in this platform");
        }
    };
    ParkDetailsPage.prototype.facebookIosShare = function (image, url) {
        var _this = this;
        this.socialSharing.shareViaFacebook(null, image, url).then(function () {
            console.log("shareViaFacebook: Success");
            _this._utilsService.showToast("Sharing Success!");
        }).catch(function (er) {
            console.error("shareViaFacebook: failed");
            _this._utilsService.showToast("Sharing failed!");
        });
    };
    ParkDetailsPage.prototype.facebookAndroidShare = function (url) {
        var _this = this;
        this.socialSharing.shareViaFacebook(null, null, url).then(function () {
            console.log("shareViaFacebook: Success");
            _this._utilsService.showToast("Sharing Success!");
        }).catch(function (er) {
            console.error("shareViaFacebook: failed");
            _this._utilsService.showToast("Sharing failed!");
        });
    };
    // Twitter share configuration
    ParkDetailsPage.prototype.twitterShare = function (parkDetails) {
        var _this = this;
        var url = parkDetails.contact.officialWebsite;
        var message = "Check this Park features! It is awsome!";
        if (this._platform.is("ios")) {
            this.socialSharing.canShareVia('com.apple.social.twitter', message, null, null, url).then(function () {
                _this.twitterSharing(message, url);
            })
                .catch(function () {
                _this._utilsService.showToast("Twitter not available");
            });
        }
        else if (this._platform.is("android")) {
            this.socialSharing.canShareVia('twitter', message, null, null, url).then(function () {
                _this.twitterSharing(message, url);
            })
                .catch(function () {
                _this._utilsService.showToast("Twitter not available!");
            });
        }
        else {
            console.error("Twitter share not available in this platform");
            this._utilsService.showToast("Share not supported in this platform");
        }
    };
    ParkDetailsPage.prototype.twitterSharing = function (message, url) {
        var _this = this;
        this.socialSharing.shareViaTwitter(message, null, url).then(function () {
            console.log("shareViaTwitter: Success");
            _this._utilsService.showToast("Sharing Success!");
        }).catch(function (er) {
            console.error("shareViaTwitter: failed");
            _this._utilsService.showToast("Sharing failed!");
        });
    };
    // Instagram share configuration
    ParkDetailsPage.prototype.instagramShare = function (parkDetails) {
        var _this = this;
        var image = parkDetails.images[0].imageURL;
        if (this._platform.is("ios")) {
            this.socialSharing.canShareVia('instagram', null, null, image, null).then(function () {
                _this.instagramSharing(image);
            })
                .catch(function () {
                _this._utilsService.showToast("Instagram not available");
            });
        }
        else if (this._platform.is("android")) {
            this.socialSharing.canShareVia('instagram', null, null, image, null).then(function () {
                _this.instagramSharing(image);
            })
                .catch(function () {
                _this._utilsService.showToast("Instagram not available!");
            });
        }
        else {
            console.error("Instagram share not available in this platform");
            this._utilsService.showToast("Share not supported in this platform");
        }
    };
    ParkDetailsPage.prototype.instagramSharing = function (image) {
        var _this = this;
        this.socialSharing.shareViaInstagram(null, image).then(function () {
            console.log("shareViaInstagram: Success");
            _this._utilsService.showToast("Sharing Success!");
        }).catch(function (er) {
            console.error("shareViaInstagram: failed");
            _this._utilsService.showToast("Sharing failed!");
        });
    };
    // mapServiceCallback(results, status) {
    //   console.log(status);
    //   console.log(google.maps.places.PlacesServiceStatus.OK);
    //   if(status == google.maps.places.PlacesServiceStatus.OK){
    //     console.log(results[0].place_id);
    //     let placeId = results[0].place_id;
    //     console.log(results.length);
    //     console.log(placeId);
    //     console.log(mapData);
    //     console.log(map);
    //     let serv = new google.maps.places.PlacesService(map);
    //     console.log(serv);
    //     serv.getDetails({placeId: placeId},(place, status) => {
    //       console.log(status);
    //       console.log(google.maps.places.PlacesServiceStatus.OK)
    //       if(status == google.maps.places.PlacesServiceStatus.OK) {
    //         mapData.parkMapLocation = place;
    //         console.log(mapData.parkMapLocation);
    //         //this.addMarker();
    //       }
    //     });
    //   }
    //   else {
    //     console.log("Status not Ok");
    //   }
    // }
    ParkDetailsPage.prototype.loadMap = function () {
        var _this = this;
        this._geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            mapData.userMapLatLng = latLng;
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            console.log(map);
            _this.findParkMapPosition();
        })
            .catch(function (err) {
            console.log(err);
            _this._utilsService.showToast(err.message);
        });
    };
    ParkDetailsPage.prototype.findParkMapPosition = function () {
        var _this = this;
        var request = {
            fields: ['formatted_address', 'name', 'geometry', 'id', 'place_id'],
            query: this.parkDetails.address.fullAddress
        };
        console.log(request);
        var service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                mapData.parkMapLocation = results[0].geometry.location;
                console.log(mapData.parkMapLocation);
                _this.addParkMarker();
            }
            else {
                console.log("Status not Ok");
            }
        });
    };
    ParkDetailsPage.prototype.addParkMarker = function () {
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: mapData.parkMapLocation
        });
        map.setCenter(mapData.parkMapLocation);
        this.addParkInfoWindow(marker);
    };
    ParkDetailsPage.prototype.addParkInfoWindow = function (marker) {
        var place = mapData.parkMapLocation;
        place.name = this.parkDetails.name;
        place.formatted_address = this.parkDetails.address.fullAddress;
        var content = "<div><strong>" + place.name + "</strong><br>" +
            place.formatted_address + "</div>";
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
    };
    ParkDetailsPage.prototype.addUserMarker = function () {
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            //position: this.map.getCenter()
            position: mapData.userMapLatLng
        });
        map.setCenter(mapData.userMapLatLng);
        this.addUserInfoWindow(marker);
    };
    ParkDetailsPage.prototype.addUserInfoWindow = function (marker) {
        var content = "Your current position";
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
    };
    ParkDetailsPage.prototype.getDirections = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["t" /* ElementRef */])
    ], ParkDetailsPage.prototype, "mapElement", void 0);
    ParkDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-park-details',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/park-details/park-details.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-title>Park Details</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content class="background-page">\n\n      <ion-fab top right edge>\n        <button ion-fab mini color="danger">\n          <ion-icon small name="md-share"></ion-icon>\n        </button>\n        <ion-fab-list>\n          <button ion-fab (click)="facebookShare(parkDetails)">\n            <ion-icon name="logo-facebook"></ion-icon>\n          </button>\n          <button ion-fab (click)="twitterShare(parkDetails)">\n            <ion-icon name="logo-twitter"></ion-icon>\n          </button>\n          <button ion-fab (click)="instagramShare(parkDetails)">\n            <ion-icon name="logo-instagram"></ion-icon>\n          </button>\n        </ion-fab-list>\n      </ion-fab>\n    \n      <ion-card class="adv-map">\n        <ion-card-header text-wrap class="park-name">\n          {{parkDetails.name}}\n          <div class="star-rate">\n            <ion-icon *ngFor="let starName of parkDetails.starRatingArray" [name]="starName"></ion-icon>\n            <div class="rate-text">\n                ({{parkDetails.parkRating | number:\'1.1-1\'}})\n                {{parkDetails.rating.numberOfRatings}}\n            </div>\n          </div>\n        </ion-card-header>\n          <ion-slides text-center autoplay="2000" loop="true" pager="true">\n            <ion-slide  *ngFor="let image of parkDetails.images; let i:index">\n              <ion-row>\n                <ion-col col-12 class="img">\n                    <img [src]="image.imageURL">\n                </ion-col>\n              </ion-row>\n            </ion-slide>\n          </ion-slides>\n          <ion-card-title text-wrap>\n            {{parkDetails.address.suburb}}\n          </ion-card-title>\n        <!-- <ion-item actions>\n          <span ion-text item-start color="secondary" class="item-bold">18 min</span>\n          <span ion-text item-start color="subtle">(2.6 mi)</span>\n          <button ion-button color="primary" clear item-end icon-start>\n            <ion-icon name=\'navigate\'></ion-icon>\n            Start\n          </button>\n        </ion-item> -->\n    \n      </ion-card>\n    \n      <ion-row class="fav-rev-rate-buttons" no-padding>\n        <ion-col text-center>\n          <button class="action-button" (click)="openReviews()" ion-button small round icon-start>\n            <ion-icon name=\'chatboxes\'></ion-icon>\n            Review\n          </button>\n        </ion-col>\n        <ion-col text-center *ngIf="parkDetails.userRateHidden === true">\n          <button class="action-button" (click)="openRate(parkDetails)"  ion-button small round icon-start>\n            <ion-icon name=\'star-half\'></ion-icon>\n            Rate\n          </button>\n        </ion-col>\n        <ion-col text-center *ngIf="parkDetails.userRateHidden === false">\n          <button class="action-button rate" (click)="openRate(parkDetails)"  ion-button small round icon-start>\n            <ion-icon name=\'star-half\'></ion-icon>\n            Rate\n          </button>\n        </ion-col>       \n        <ion-col text-center *ngIf="parkDetails.addedToFavourites === false">\n          <button class="action-button" (click)="doFavourite(parkDetails)" ion-button small round icon-start>\n            <ion-icon name=\'heart\'></ion-icon>\n            Favourite\n          </button>\n        </ion-col>\n        <ion-col text-center *ngIf="parkDetails.addedToFavourites === true" data-status="true">\n          <button class="action-button" (click)="doFavourite(parkDetails)" ion-button small round icon-start>\n            <ion-icon name=\'heart\'></ion-icon>\n            Favourite\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="parkDetails.userRateHidden === false">\n        <ion-col text-center>\n          <div class="user-stars">\n              <div class="user-star-rate" *ngFor="let starName of parkDetails.userStarRatingArray; let i = index;">\n                  <ion-icon [name]="starName" (click)="ratePark(i)"></ion-icon>\n                </div>\n                <div style="display:block">\n                  <button class="action-button" (click)="removeUserRate()"  ion-button small round icon-start>\n                    <!-- <ion-icon name=\'star-half\'></ion-icon> -->\n                    Clear\n                  </button>\n                </div>\n          </div>\n        </ion-col>\n      </ion-row>\n    \n      <ion-card class="adv-map">\n        <ion-card-header text-wrap class="park-full-address">\n          {{parkDetails.address.fullAddress}}        \n        </ion-card-header>\n        <ion-card-content>\n            <ion-row>\n              <ion-col #map col-12 class="map">                \n              </ion-col>\n            </ion-row>\n          </ion-card-content>\n        <ion-card-title>\n          <ion-row no-padding>\n            <!-- <ion-col text-center>\n                <span ion-text item-end clear color="secondary" class="item-bold">26 min</span>\n            </ion-col>\n            <ion-col text-center>\n                <span ion-text clear color="subtle">(8.1 mi)</span>\n            </ion-col> -->\n            <ion-col text-center>\n              <button class="map-action-button" color="secondary" (click)="getDirections()" ion-button small round icon-start>\n                <ion-icon name=\'navigate\'></ion-icon>\n                Directions\n              </button>\n            </ion-col>\n            <!-- <ion-col class="map-button">\n                <button ion-button color="secondary" clear icon-start>\n                    <ion-icon name=\'navigate\'></ion-icon>\n                    Start\n                  </button>\n            </ion-col> -->\n          </ion-row>\n            <!-- <span ion-text item-start color="secondary" class="item-bold">26 min</span>\n            <span ion-text item-start color="subtle">(8.1 mi)</span>\n            <button ion-button color="secondary" clear item-end icon-start>\n              <ion-icon name=\'navigate\'></ion-icon>\n              Start\n            </button> -->\n        </ion-card-title>    \n      </ion-card>\n    \n      <ion-list no-border>    \n        <ion-list-header text-center>\n          FACILITIES\n        </ion-list-header>    \n        <ion-item *ngFor="let facility of parkDetails.facilities">\n            <div class="fac-pro-ico">\n                <img [src]="facility.iconURL">\n            </div>\n          {{facility.id}}\n          <ion-note item-end>\n            {{facility.quantity}}\n          </ion-note>\n        </ion-item>\n      </ion-list>\n    \n    \n     <ion-list no-border>    \n        <ion-list-header text-center>\n          PROHIBITIONS\n        </ion-list-header>    \n        <ion-item *ngFor="let prohibition of parkDetails.prohibitions">\n            <div class="fac-pro-ico">\n                <img [src]="prohibition.iconURL">\n            </div>\n          {{prohibition.id}}\n            <ion-note item-end *ngIf=\'prohibition.restriction\'>\n              <img [src]="prohibition.iconAlertURL" (click)="viewRestriction(prohibition)">\n            </ion-note>\n            <ion-item [hidden]="prohibition.hiddenRestriction">\n              <ion-note item-middle text-wrap>\n                {{prohibition.restriction}}\n              </ion-note>\n            </ion-item>\n        </ion-item>\n      </ion-list>   \n\n      <ion-list no-border>    \n        <ion-list-header text-center>\n          CONTACT\n        </ion-list-header>    \n        <ion-item text-wrap>\n          <div>Opening Hours: {{parkDetails.contact.openingHours}}</div>\n        </ion-item>\n        <ion-item text-wrap>\n          <div>Email: <a href="mailto:{{parkDetails.contact.email}}">{{parkDetails.contact.email}}</a></div>\n        </ion-item>\n        <ion-item text-wrap>\n          <div>Phone: {{parkDetails.contact.telephone}}</div>\n        </ion-item>\n        <ion-item text-wrap>\n          <div><a [href]="parkDetails.contact.officialWebsite">Official Website</a></div>\n        </ion-item>\n      </ion-list>\n\n      <ion-list no-border>    \n        <ion-list-header text-center>\n          EXTRA INFORMATION\n        </ion-list-header>    \n        <ion-item text-wrap>\n          <div>{{parkDetails.description}}</div>\n        </ion-item>\n      </ion-list>\n  </ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/park-details/park-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], ParkDetailsPage);
    return ParkDetailsPage;
}());

//# sourceMappingURL=park-details.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(43);
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
            selector: 'page-forget',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/forget/forget.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Reset Password</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding class="background">\n  \n    <form [formGroup]="forgetForm" (ngSubmit)="doForget()">\n  \n      <ion-list>\n        <ion-item>\n          <ion-label color="dark" floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button class="button-style" ion-button color="primary" block type="submit" [disabled]="!forgetForm.valid">Forgot my password</button>\n      </div>\n    </form>\n  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/forget/forget.html"*/,
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

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(106);
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
    function RegisterPage(navCtrl, navParams, formBuilder, _authService, _dbService, utils) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this._dbService = _dbService;
        this.utils = utils;
        this.registerForm = this.formBuilder.group({
            username: [''],
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
            _this.createMyParkUser();
            _this.utils.showToast('User created successfully!');
            console.log(user.email + " account created successfully!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        })
            .catch(function (error) {
            console.log(error);
            _this.utils.showToast("Email address already in use");
        });
    };
    RegisterPage.prototype.createMyParkUser = function () {
        this.collection = "Users";
        var email = this._authService.getUserEmail();
        var username = this.registerForm.value.username;
        var user = {
            email: email,
            name: username,
            dateCreated: this._authService.getUserCreationDate(),
            favouriteParks: new Array(),
            ratings: new Array(),
            imageURL: "https://firebasestorage.googleapis.com/v0/b/mypark-5778d.appspot.com/o/default_avatar3.jpg?alt=media&token=2e974e1e-d391-4c59-b318-40424150cf59"
        };
        this._dbService.addDocument(this.collection, email, user);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/register/register.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Register</ion-title>\n    </ion-navbar>\n  \n</ion-header>  \n  \n<ion-content padding class="background">\n\n  <form [formGroup]="registerForm" (ngSubmit)="doRegister()">\n\n    <ion-list>\n      \n      <ion-item>\n        <ion-label color="dark" floating>Username</ion-label>\n        <ion-input type="text" formControlName="username"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="dark" floating>Email</ion-label>\n        <ion-input type="email" formControlName="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="dark" floating>Password</ion-label>\n        <ion-input type="password" formControlName="password"></ion-input>\n      </ion-item>\n\n    </ion-list>\n\n    <div padding>\n      <button class="button-style" ion-button color="primary" block type="submit" [disabled]="!registerForm.valid">Register</button>\n    </div>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__["a" /* UtilsProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__park_details_park_details__ = __webpack_require__(121);
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
    function SearchResultPage(navParams, navCtrl, _dbService, _authService, _preloader) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
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
            console.log(data);
            if (data.length === 0) {
                console.log("Parks collection is empty");
            }
            else {
                data.forEach(function (element) {
                    console.log(element.data());
                    var park = new __WEBPACK_IMPORTED_MODULE_5__models_park__["a" /* Park */]();
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
                if (_this.parksFiltered.length == 0) {
                    _this.isParksFound = false;
                }
                else {
                    _this.isParksFound = true;
                }
                _this._preloader.hidePreloader();
                console.log(_this.parksFiltered);
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    SearchResultPage.prototype.getParkDetails = function (park) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__park_details_park_details__["a" /* ParkDetailsPage */], park);
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-result',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/search-result/search-result.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-buttons menu-toggle>\n          <button ion-button menuToggle icon-only color="primary">\n              <ion-icon color="white" name="menu"></ion-icon>\n            </button>\n      </ion-buttons>\n\n      <ion-title>Search Result</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content class="card-background-page">\n    <div *ngIf="isParksFound === false" class="parksNotFound">\n        No Parks Found!\n    </div>\n    <div *ngIf="isParksFound === true">\n      <ion-list *ngFor="let park of parksFiltered">\n        <ion-card >\n          <div class="img">\n              <img [src]="park.images[0].imageURL" (click)="getParkDetails(park)">\n              <div class="card-title" (click)="getParkDetails(park)">{{park.name}}</div>\n          </div>\n        </ion-card>\n        <div class="card-subtitle">\n            {{park.address.suburb}}\n        </div>   \n      </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/search-result/search-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__review_add_review_add__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_user__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ReviewPage = /** @class */ (function () {
    function ReviewPage(navCtrl, navParams, _dbService, _authService, _utilsService, _preloader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._preloader = _preloader;
        this.user = new __WEBPACK_IMPORTED_MODULE_8__models_user__["a" /* User */]();
        this.park = navParams.data;
        console.log(this.park);
    }
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad ReviewPage');
    //   this._preloader.displayPreloader();
    //   this.loadUserData();
    // }
    ReviewPage.prototype.ionViewWillEnter = function () {
        console.log('ionViewWillEnter ReviewPage');
        this._preloader.displayPreloader();
        this.loadUserData();
    };
    ReviewPage.prototype.OpenReviewAddPage = function () {
        console.log(this.park);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__review_add_review_add__["a" /* ReviewAddPage */], this.park);
    };
    ReviewPage.prototype.loadUserData = function () {
        var _this = this;
        this.collection = "Users";
        console.log(this._authService.getUserEmail());
        this._dbService.getDocument(this.collection, this._authService.getUserEmail())
            .then(function (data) {
            console.log(data.data());
            _this.user.parseToUserModel(data);
            console.log(_this.user);
            _this.loadParkReviews();
        })
            .catch(function (err) {
            console.log("it did not retrieved user data from db");
            console.log(err);
        });
    };
    ReviewPage.prototype.loadParkReviews = function () {
        var _this = this;
        this.collection = "Parks";
        this._dbService.getDocument(this.collection, this.park.id)
            .then(function (docRef) {
            var park = new __WEBPACK_IMPORTED_MODULE_7__models_park__["a" /* Park */]();
            park.parseToParkModel(docRef);
            console.log(park);
            _this.parkComments = park.comments;
            console.log(_this.parkComments);
            console.log(_this.parkComments.length);
            if (_this.parkComments.length == 0) {
                _this.availableComments = false;
                _this._utilsService.showToast("No reviews! Be the first to add one!");
            }
            else {
                _this.availableComments = true;
                console.log(_this.availableComments);
                _this.parkComments.forEach(function (comment) {
                    comment.dateNotString = new Date(comment.date);
                });
                console.log(_this.parkComments);
                if (_this.parkComments.length > 1) {
                    console.log("more than 1 comment");
                    var parkCommentsSorted = park.comments.sort(function (obj1, obj2) {
                        if (obj1.dateNotString > obj2.dateNotString) {
                            return -1;
                        }
                        if (obj2.dateNotString < obj2.dateNotString) {
                            return 1;
                        }
                        return 0;
                    });
                    _this.parkComments = parkCommentsSorted;
                }
                console.log(_this.parkComments);
                _this.parkComments.forEach(function (comment) {
                    comment.date = _this.convertToDisplayFormat(comment.dateNotString);
                });
                console.log(_this.parkComments);
            }
            _this._preloader.hidePreloader();
        })
            .catch(function (err) { console.log(err.message); });
    };
    ReviewPage.prototype.convertToDisplayFormat = function (date) {
        var month = date.toLocaleDateString("en-au", { month: "short" });
        var dateString = month.replace(/\./g, "");
        dateString = dateString + ", " + date.getDate();
        dateString = dateString + " " + date.getFullYear();
        dateString = dateString + " " + date.getHours();
        dateString = dateString + ":" + date.getMinutes();
        return dateString;
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/review/review.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-buttons end >\n      <button ion-button (click)="OpenReviewAddPage()">\n        <ion-icon ios="ios-add" md="md-add"></ion-icon>\n     </button>\n    </ion-buttons>\n    <ion-title>Reviews</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n  <div *ngIf="availableComments === false" class="commentsNotFound">\n      No reviews added!\n  </div>\n  <div *ngIf="availableComments === true">\n      <ion-card class="insideCard" *ngFor="let comment of parkComments">\n  \n          <ion-card-header>\n            {{comment.name}}\n          </ion-card-header>  \n          <ion-card-content >\n            {{comment.comment}}\n          </ion-card-content>\n          <div class="date">\n              {{comment.date}}\n              <!-- <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="comment.date"></ion-datetime> -->\n          </div>  \n        </ion-card>\n    </div>  \n  </ion-content>\n  \n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/review/review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_comment__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_user__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ReviewAddPage = /** @class */ (function () {
    function ReviewAddPage(navCtrl, navParams, formBuilder, _dbService, _authService, _utilsService, _preloader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this._dbService = _dbService;
        this._authService = _authService;
        this._utilsService = _utilsService;
        this._preloader = _preloader;
        this.user = new __WEBPACK_IMPORTED_MODULE_9__models_user__["a" /* User */]();
        this.park = navParams.data;
        this.addReviewForm = this.formBuilder.group({
            review: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
        console.log(this.park);
    }
    ReviewAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReviewAddPage');
        this._preloader.displayPreloader();
        this.loadUserData();
    };
    ReviewAddPage.prototype.loadUserData = function () {
        var _this = this;
        this.collection = "Users";
        console.log(this._authService.getUserEmail());
        this._dbService.getDocument(this.collection, this._authService.getUserEmail())
            .then(function (data) {
            console.log(data.data());
            _this.user.parseToUserModel(data);
            console.log(_this.user);
            _this._preloader.hidePreloader();
        })
            .catch(function (err) {
            console.log("it did not retrieved user data from db");
            console.log(err);
        });
    };
    ReviewAddPage.prototype.sendReview = function () {
        var _this = this;
        this.collection = "Parks";
        this._dbService.getDocument(this.collection, this.park.id)
            .then(function (docRef) {
            var newPark = new __WEBPACK_IMPORTED_MODULE_7__models_park__["a" /* Park */]();
            newPark.parseToParkModel(docRef);
            _this.park = newPark;
            _this.updateParkComments();
        })
            .catch(function (err) { console.log(err.message); });
    };
    ReviewAddPage.prototype.updateParkComments = function () {
        console.log("user adding comment to park");
        var comment = new __WEBPACK_IMPORTED_MODULE_8__models_comment__["a" /* Comment */]();
        comment.comment = this.addReviewForm.value.review;
        comment.name = this.user.name;
        comment.userId = this.user.userID;
        comment.date = new Date().toISOString();
        this.park.comments.push(comment);
        console.log(comment);
        this.addReviewForm.reset();
        this.updateParkCommentsDb();
    };
    ReviewAddPage.prototype.updateParkCommentsDb = function () {
        var _this = this;
        this.collection = "Parks";
        var dataObj = JSON.parse(JSON.stringify(this.park.comments));
        console.log(dataObj);
        var park = {
            comments: dataObj
        };
        this._dbService.updateDocument(this.collection, this.park.id, park)
            .then(function () {
            _this._utilsService.showToast("Review added successfully");
            console.log("Review added to database");
        });
    };
    ReviewAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review-add',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/review-add/review-add.html"*/'<ion-header>\n    <ion-navbar color="blue">    \n      <ion-title>Add Review</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding scroll="false" class="card-background-page">\n    <form [formGroup]="addReviewForm" (ngSubmit)="sendReview()">\n      <ion-card>     \n          <ion-card-header>\n              {{park.name}}\n            </ion-card-header>  \n            <ion-card-content  class="insideCard">\n                <ion-textarea formControlName="review" class="textarea" rows="5" type="text" text-wrap  placeholder="Write a review"></ion-textarea>\n            </ion-card-content>        \n      </ion-card>\n      <div padding>\n        <button ion-button block color="yellow" full>Submit</button>\n      </div>\n  </form>\n</ion-content>\n    \n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/review-add/review-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], ReviewAddPage);
    return ReviewAddPage;
}());

//# sourceMappingURL=review-add.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_favourite_park__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__park_details_park_details__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProfilePage = /** @class */ (function () {
    function ProfilePage(navParams, navCtrl, _dbService, _authService, _platform, _preloader) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this._dbService = _dbService;
        this._authService = _authService;
        this._platform = _platform;
        this._preloader = _preloader;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]();
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewDidLoad ProfilePage');
        this._preloader.displayPreloader();
        this._platform.ready().then(function () {
            _this.loadUserData();
        });
    };
    ProfilePage.prototype.loadUserData = function () {
        var _this = this;
        this.collection = "Users";
        console.log(this._authService.getUserEmail());
        this._dbService.getDocument(this.collection, this._authService.getUserEmail())
            .then(function (data) {
            _this.user.parseToUserModel(data);
            _this.loadUserFavourites();
        })
            .catch(function (err) {
            console.log("it did not retrieved user data from db");
            console.log(err);
        });
    };
    ProfilePage.prototype.loadUserFavourites = function () {
        var _this = this;
        if (this.user.favouriteParks.length == 0) {
            this.userHasFavourites = false;
        }
        else {
            this.collection = "Parks";
            this.favouriteParks = [];
            console.log(this.favouriteParks);
            console.log(this.user.favouriteParks);
            var favParks_1 = new Array();
            this.user.favouriteParks.forEach(function (favPark) {
                _this._dbService.getDocument(_this.collection, favPark.id).then(function (result) {
                    var park = new __WEBPACK_IMPORTED_MODULE_6__models_park__["a" /* Park */]();
                    park.parseToParkModel(result);
                    favParks_1.push(park);
                })
                    .catch(function () {
                    console.log("It could not get a park");
                    _this.userHasFavourites = false;
                });
            });
            this.favouriteParks = favParks_1;
            this.userHasFavourites = true;
        }
        this._preloader.hidePreloader();
    };
    ProfilePage.prototype.openParkDetails = function (park) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__park_details_park_details__["a" /* ParkDetailsPage */], park);
    };
    ProfilePage.prototype.removeFavPark = function (parkId) {
        console.log("removing " + parkId);
        this.updateFavouriteParksObj(parkId);
        this.updateUserFavDb();
    };
    ProfilePage.prototype.updateFavouriteParksObj = function (parkId) {
        this.collection = "Users";
        var userFav = this.favouriteParks.find(function (f) { return f.id == parkId; });
        var userFavIndex = this.favouriteParks.indexOf(userFav);
        this.favouriteParks.splice(userFavIndex, 1);
        if (this.favouriteParks.length == 0) {
            this.userHasFavourites = false;
        }
    };
    ProfilePage.prototype.updateUserFavDb = function () {
        this.collection = "Users";
        var userFavParks = Array();
        this.favouriteParks.forEach(function (park) {
            var favPark = new __WEBPACK_IMPORTED_MODULE_7__models_favourite_park__["a" /* FavouritePark */]();
            favPark.id = park.id;
            userFavParks.push(favPark);
        });
        var dataObj = JSON.parse(JSON.stringify(userFavParks));
        var user = {
            favouriteParks: dataObj
        };
        this._dbService.updateDocument(this.collection, this.user.email, user);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/profile/profile.html"*/'\n<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Profile</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  <ion-content class="background-page">\n         <!-- Profile Cover Page -->\n         <div class="support-nav col-md-3">\n          <div class="panel">\n            <div class="user-heading round">\n              <a href="#">\n                <img [src]="user.imageURL">\n              </a>\n              <p>{{user.name}}</p>\n            </div>\n          </div>\n        </div>\n        <ion-list-header color="blue" text-center>\n          FAVOURITE PARKS\n        </ion-list-header>\n        <div class="favNotFound" *ngIf="userHasFavourites === false">\n            No Favourites\n        </div>\n        <div *ngIf="userHasFavourites === true">\n            <ion-list *ngFor="let park of favouriteParks">  \n                <ion-item (click)="openParkDetails(park)">\n                  <ion-thumbnail item-start>\n                    <img [src]="park.images[0].imageURL">\n                  </ion-thumbnail>\n                  <h2>{{park.name}}</h2>\n                  <p>{{park.address.suburb}} {{park.address.state}} * {{park.address.postCode}}</p>\n                  <!-- <p>Alexandria NSW • 2015</p> -->\n                  <ion-icon clear item-end name="trash" color="danger" (click)="removeFavPark(park.id)"></ion-icon>\n                </ion-item>\n            </ion-list>\n        </div>\n        \n  </ion-content>\n  \n      \n          \n         \n  \n  '/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
            selector: 'page-settings',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="background" >\n\n    <ion-item-group>\n        <ion-item-divider class="grey"><em>&nbsp;VERSION INFORMATION</em></ion-item-divider>\n        <ion-item class="background">App Version 1.0.0 June 2018</ion-item>\n      </ion-item-group>\n\n    <ion-item-group>\n          <ion-item-divider class="grey"><em>&nbsp;CONTACT US</em></ion-item-divider>\n          <ion-item class="background">MyPark is also available online  <br>at\n              www.myparkapp.com\n            <br>\n            <br>\n              If you are having any problems with the <br>\n              MyPark app or wish to make any suggestion, <br>\n              please contact us at team@myparkapp.com\n           </ion-item>\n      </ion-item-group>  \n</ion-content>'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



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
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/welcome/welcome.html"*/'<ion-content padding class="myView" id="welcome">\n\n  <img src="assets/imgs/novoLogo.png" class="logo" align="middle" />\n  <h1 align="center"> Welcome </h1>\n  <h2 align="center">Discover great Parks areas and opportunities</h2>\n\n  <button ion-button block color="lightprimary" class="marginTop" (click)="start()">Get Started</button>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 219:
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
webpackEmptyAsyncContext.id = 219;

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/forget/forget.module": [
		594,
		9
	],
	"../pages/login/login.module": [
		595,
		8
	],
	"../pages/park-details/park-details.module": [
		596,
		7
	],
	"../pages/profile/profile.module": [
		597,
		6
	],
	"../pages/register/register.module": [
		598,
		5
	],
	"../pages/review-add/review-add.module": [
		599,
		4
	],
	"../pages/review/review.module": [
		601,
		3
	],
	"../pages/search-result/search-result.module": [
		600,
		2
	],
	"../pages/settings/settings.module": [
		602,
		1
	],
	"../pages/welcome/welcome.module": [
		603,
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
webpackAsyncContext.id = 263;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 312:
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
        this.iconAlertURL = "https://firebasestorage.googleapis.com/v0/b/mypark-5778d.appspot.com/o/prohibition-ico%2Fprohibited_alert.png?alt=media&token=58ad87a2-1feb-48d2-b0cb-0afc273727cd";
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

/***/ 316:
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

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rating; });
var Rating = /** @class */ (function () {
    function Rating() {
    }
    return Rating;
}());

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavouritePark; });
var FavouritePark = /** @class */ (function () {
    function FavouritePark() {
    }
    return FavouritePark;
}());

//# sourceMappingURL=favourite-park.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(274);
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
    AuthServiceProvider.prototype.setUserImage = function (imageURL) {
        var profile = {
            displayName: this._authService.auth.currentUser.displayName,
            photoURL: imageURL
        };
        console.log(profile);
        this._authService.auth.currentUser.updateProfile(profile);
    };
    AuthServiceProvider.prototype.getUserEmail = function () {
        return this._authService.auth.currentUser.email;
    };
    AuthServiceProvider.prototype.getUserCreationDate = function () {
        return this._authService.auth.currentUser.metadata.creationTime;
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
        console.log("social sign in");
        if (this.platform.is('cordova')) {
            console.log("social with cordova");
            return this._authService.auth.signInWithRedirect(provider);
        }
        else {
            // It will work only in browser
            return this._authService.auth.signInWithPopup(provider);
        }
    };
    // Return the list of registered providers for the given email.
    // If the email was not registered, the provider's array length will be 0.
    AuthServiceProvider.prototype.getProvidersForEmail = function (email) {
        return this._authService.auth.fetchProvidersForEmail(email);
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

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(388);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_utils_preloader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config_environment__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_firestore__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_component__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_forget_forget__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_register_register__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_search_result_search_result__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_park_details_park_details__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_settings_settings__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_review_review__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_profile_profile__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_review_add_review_add__ = __webpack_require__(206);
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
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_forget_forget__["a" /* ForgetPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_park_details_park_details__["a" /* ParkDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_review_add_review_add__["a" /* ReviewAddPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_profile_profile__["a" /* ProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/park-details/park-details.module#ParkDetailsPageModule', name: 'ParkDetailsPage', segment: 'park-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review-add/review-add.module#ReviewAddPageModule', name: 'ReviewAddPage', segment: 'review-add', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result/search-result.module#SearchResultPageModule', name: 'SearchResultPage', segment: 'search-result', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review/review.module#ReviewPageModule', name: 'ReviewPage', segment: 'review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__config_environment__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_firestore__["a" /* AngularFirestoreModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_forget_forget__["a" /* ForgetPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_park_details_park_details__["a" /* ParkDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_review_add_review_add__["a" /* ReviewAddPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_profile_profile__["a" /* ProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["a" /* DbServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__["a" /* UtilsProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_utils_preloader__["a" /* PreloaderProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilsProvider = /** @class */ (function () {
    function UtilsProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    UtilsProvider.prototype.showToast = function (message, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
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

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(274);
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
    DbServiceProvider.prototype.getUserReference = function (userDoc) {
        return this._db.collection("Users").doc(userDoc);
    };
    DbServiceProvider.prototype.getDocuments = function (collectionObj) {
        return this._db.collection(collectionObj).get();
    };
    DbServiceProvider.prototype.getDocument = function (collectionObj, docID) {
        return this._db.collection(collectionObj).doc(docID).get();
    };
    DbServiceProvider.prototype.getCurrentTimestamp = function () {
        return this._db.FieldValue.serverTimestamp();
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

/***/ 510:
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

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
var Map = /** @class */ (function () {
    function Map() {
    }
    return Map;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Comment; });
var Comment = /** @class */ (function () {
    function Comment() {
    }
    return Comment;
}());

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 541:
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

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(67);
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

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_welcome_welcome__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__ = __webpack_require__(207);
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
    function MyApp(platform, statusBar, splashScreen, afAuth, storage, _utilsService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.storage = storage;
        this._utilsService = _utilsService;
        this.firstRun = false;
        // object used to render the menu and give the proper navigation between pages
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', icon: 'contact', component: __WEBPACK_IMPORTED_MODULE_11__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'Settings', icon: 'settings', component: __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Log out', icon: 'log-out', component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */] }
        ];
        this.activePage = this.pages[0];
        // read the local storage to identify if it is the first
        // run of the app after installation.
        this.storage.ready().then(function () {
            _this.storage.get('first_time').then(function (val) {
                console.log(val);
                if (val !== null) {
                    console.log('Not app first run');
                    //this._utilsService.showToast("Not app first run");
                }
                else {
                    // if the was the first run it will create a register in the local storage
                    console.log('App first run');
                    _this.firstRun = true;
                    _this.storage.set('first_time', 'done');
                    //this._utilsService.showToast("App first run");
                }
                // observer to check if user is authenticated
                var authObserver = afAuth.authState.subscribe(function (user) {
                    if (user) {
                        // if user is authenticated return Home page
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */];
                        authObserver.unsubscribe();
                    }
                    else {
                        // if user is not authenticated and it is first run, it will return Welcome Screen
                        if (_this.firstRun === true) {
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_welcome_welcome__["a" /* WelcomePage */];
                        }
                        else {
                            // if user is not authenticated and it is not the first run, it will return Login Page
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                        }
                        authObserver.unsubscribe();
                    }
                });
                _this.initializeApp();
            });
        });
    }
    ///
    /// It removes the splash screen to display the first app page.
    ///
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        })
            .catch(function (err) {
            console.log(err.message);
        });
    };
    // 
    // Open the right page when selected from the side menu.
    // 
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]) {
            this.doLogout();
            this.activePage = this.pages[0];
        }
        else if (page.component == __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]) {
            this.nav.setRoot(page.component);
            this.activePage = page;
        }
        else {
            this.nav.push(page.component);
            this.activePage = page;
        }
    };
    // 
    // return true or false when checking if the current page is the active page.
    // 
    MyApp.prototype.checkActivePage = function (page) {
        return page == this.activePage;
    };
    // 
    // Executes the log out function from the option inside the side menu.
    // 
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
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fzancanaro/Desktop/MyParkApp-master/src/app/app.html"*/'<ion-menu [content]="content" side="right">\n        <ion-header class="menu-style">\n          <ion-toolbar class="menu-style">\n            <ion-title class="menu-style">Menu</ion-title>\n          </ion-toolbar>\n        </ion-header>\n      \n        <ion-content class="menu-style">\n          <ion-list class="menu-style">\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)"[class.active]="checkActivePage(p)">\n                <ion-icon name="{{p.icon}}"></ion-icon>\n              {{p.title}}\n            </button>\n          </ion-list>\n        </ion-content>\n      \n      </ion-menu>\n      \n      <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n      <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/fzancanaro/Desktop/MyParkApp-master/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Park; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prohibition__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address__ = __webpack_require__(510);


var Park = /** @class */ (function () {
    function Park() {
        this.address = new __WEBPACK_IMPORTED_MODULE_1__address__["a" /* Address */]();
        this.comments = [];
        this.prohibitions = new Array();
        this.parkRating = 0;
        this.starRatingArray = [];
        this.addedToFavourites = false;
        this.userParkRating = 0;
        this.userStarRatingArray = [];
        this.userRateHidden = true;
    }
    Park.prototype.parseToParkModel = function (docRef) {
        var _this = this;
        console.log(docRef.data());
        this.id = docRef.id;
        this.address.parseToAddressModel(docRef.data().address);
        // if(docRef.data().comments != undefined) {
        //     docRef.data().comments.forEach(element => {
        //         let comment : Comment = new Comment();
        //         console.log(comment);
        //         console.log(element);
        //         comment.parseObjToCommentModel(element);
        //         console.log(comment);
        //         this.comments.push(comment);
        //     });
        // }
        // console.log(this.comments);
        if (docRef.data().comments != undefined) {
            this.comments = docRef.data().comments;
        }
        else {
            this.comments = [];
        }
        this.contact = docRef.data().contact;
        this.description = docRef.data().description;
        this.facilities = docRef.data().facilities;
        this.images = docRef.data().images;
        this.name = docRef.data().name;
        if (docRef.data().prohibitions != undefined) {
            docRef.data().prohibitions.forEach(function (element) {
                var prohibition = new __WEBPACK_IMPORTED_MODULE_0__prohibition__["a" /* Prohibition */]();
                prohibition.parseObjToProhibitionModel(element);
                _this.prohibitions.push(prohibition);
            });
            console.log(this.prohibitions);
        }
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
        this.starRatingArray = [];
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
    Park.prototype.updateParkRating = function () {
        this.calculateParkRating();
        this.updateStarRatingArray();
    };
    Park.prototype.updateUserStarRatingArray = function (rate) {
        this.userParkRating = rate;
        this.userStarRatingArray = [];
        for (var i = 1; i <= 5; i++) {
            if (i <= this.userParkRating) {
                this.userStarRatingArray.push("star");
            }
            else {
                this.userStarRatingArray.push("star-outline");
            }
        }
    };
    return Park;
}());

//# sourceMappingURL=park.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__park__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rating__ = __webpack_require__(317);


var User = /** @class */ (function () {
    function User() {
        this.favouriteParks = [];
        this.ratings = [];
    }
    User.prototype.parseToUserModel = function (docRef) {
        var _this = this;
        this.id = docRef.id;
        this.userID = this.id;
        this.dateCreated = new Date(docRef.data().dateCreated);
        this.email = docRef.data().email;
        this.name = docRef.data().name;
        this.imageURL = docRef.data().imageURL;
        if (docRef.data().favouriteParks != undefined) {
            this.favouriteParks = [];
            docRef.data().favouriteParks.forEach(function (element) {
                var park = new __WEBPACK_IMPORTED_MODULE_0__park__["a" /* Park */]();
                park.id = element.id;
                _this.favouriteParks.push(park);
            });
        }
        if (docRef.data().userRatings != undefined) {
            docRef.data().userRatings.forEach(function (element) {
                var rating = new __WEBPACK_IMPORTED_MODULE_1__rating__["a" /* Rating */]();
                rating.parkId = element.parkId;
                rating.rate = element.rate;
                _this.ratings.push(rating);
            });
        }
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

/***/ })

},[371]);
//# sourceMappingURL=main.js.map