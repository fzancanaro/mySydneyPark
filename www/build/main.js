webpackJsonp([6],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_facility__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__search_result_search_result__ = __webpack_require__(200);
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
                    _this.facilitiesModel.push(facility);
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
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-toolbar color="dark">\n      <ion-buttons start>\n        <button ion-button icon-only color="primary" (click)="doLogout()">\n          <ion-icon color="white" name="log-out"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>Home</ion-title>\n    </ion-toolbar>\n  </ion-navbar>\n</ion-header>\n  \n  <ion-content class="card-background-page">\n      <ion-list *ngFor="let facility of facilitiesModel">\n        <ion-card *ngIf="facility.addedToFilter === false">\n          <div class="img">\n            <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n            <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n          </div>\n        </ion-card>\n        <ion-card *ngIf="facility.addedToFilter === true" data-status="true">\n            <div class="img">\n              <img [src]="facility.imageURL" (click)="selectFacility(facility)">\n              <div class="card-title" (click)="selectFacility(facility)">{{facility.name}}</div>\n            </div>\n          </ion-card>\n      </ion-list>\n    </ion-content>\n\n    <ion-footer class="footer">\n        <ion-row>\n          <ion-col text-center ion-text color="white">\n              {{selectedFacilities}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <button *ngIf="filterList.length == 0" ion-button round color="lightprimary" class="marginTop" disabled (click)="search()">Search!</button>\n              <button *ngIf="filterList.length > 0" ion-button round color="lightprimary" class="marginTop" (click)="search()">Search!</button>\n          </ion-col>\n        </ion-row>\n      </ion-footer>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(267);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
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
* @author Pablo Vieira
* Date: 07/02/2018
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

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(48);
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
            selector: 'page-forget',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/forget/forget.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>Reset Password</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content>\n  \n    <form [formGroup]="forgetForm" (ngSubmit)="doForget()">\n  \n      <ion-list>\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button ion-button color="primary" block type="submit" [disabled]="!forgetForm.valid">Forgot my password</button>\n      </div>\n    </form>\n  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/forget/forget.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]])
    ], ForgetPage);
    return ForgetPage;
}());

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(48);
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
            selector: 'page-register',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/register/register.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Register</ion-title>\n    </ion-navbar>\n  \n</ion-header>\n  \n  \n  <ion-content>\n  \n    <form [formGroup]="registerForm" (ngSubmit)="doRegister()">\n  \n      <ion-list>\n  \n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n  \n      </ion-list>\n  \n      <div padding>\n        <button ion-button color="primary" block type="submit" [disabled]="!registerForm.valid">Register</button>\n      </div>\n  \n    </form>\n  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_park__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__park_details_park_details__ = __webpack_require__(201);
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
        //this.getUserData();
        this.getSearchedParks();
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
                        //console.log(parkFacility);
                        _this.facilitiesFilterList.forEach(function (filterFacility) {
                            //console.log(filterFacility);
                            if (parkFacility.id == filterFacility.id) {
                                parksFacilityCount++;
                            }
                        });
                    });
                    //console.log(filterCount);
                    //console.log(parksFacilityCount);
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
            selector: 'page-search-result',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/search-result/search-result.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-buttons menu-toggle>\n          <button ion-button menuToggle icon-only color="primary">\n              <ion-icon color="white" name="menu"></ion-icon>\n            </button>\n      </ion-buttons>\n\n      <ion-title>Search Result</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content class="card-background-page">\n    <div *ngIf="parksFiltered.length == 0" class="parksNotFound">\n        <h1>No Parks Found!</h1>\n    </div>\n    <div *ngIf="parksFiltered.length > 0">\n      <ion-list *ngFor="let park of parksFiltered">\n        <ion-card >\n          <div class="img">\n              <img [src]="park.images[0].imageURL" (click)="getParkDetails(park)">\n              <div class="card-title" (click)="getParkDetails(park)">{{park.name}}</div>\n          </div>        \n        </ion-card>\n        <div class="card-subtitle">\n            {{park.address.Suburb}} - XXX km away\n        </div>        \n      </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/search-result/search-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParkDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
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
        console.log(this.parkDetails);
    };
    ParkDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-park-details',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/park-details/park-details.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-title>Park Details</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content class="background-page">\n\n      <ion-fab top right edge>\n        <button ion-fab color="danger">\n          <ion-icon name="md-share"></ion-icon>\n        </button>\n        <ion-fab-list>\n          <button ion-fab>\n            <ion-icon name="logo-facebook"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-twitter"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-vimeo"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon name="logo-googleplus"></ion-icon>\n          </button>\n        </ion-fab-list>\n      </ion-fab>\n    \n      <ion-card class="adv-map">\n        <ion-card-header>\n          {{parkDetails.name}}\n          <div class="star-rate">\n            <ion-icon *ngFor="let starName of parkDetails.starRatingArray" [name]="starName"></ion-icon>\n            {{parkDetails.parkRating | number:\'1.1-1\'}}\n          </div>\n        </ion-card-header>\n          <ion-slides>\n            <ion-slide  *ngFor="let image of parkDetails.images; let i:index">\n              <ion-row>\n                <ion-col col-12 class="img">\n                    <img [src]="image.imageURL">\n                </ion-col>\n              </ion-row>\n            </ion-slide>\n          </ion-slides>\n        <ion-item>\n          <h2>Sydney Park</h2>\n          <p>416 Sydney Park Rd, Alexandria NSW 2015</p>\n        </ion-item>\n        <!-- <ion-item actions>\n          <span ion-text item-start color="secondary" class="item-bold">18 min</span>\n          <span ion-text item-start color="subtle">(2.6 mi)</span>\n          <button ion-button color="primary" clear item-end icon-start>\n            <ion-icon name=\'navigate\'></ion-icon>\n            Start\n          </button>\n        </ion-item> -->\n    \n      </ion-card>\n    \n      <ion-row no-padding>\n        <ion-col>\n          <button ion-button clear small color="" icon-start>\n            <ion-icon name=\'star\'></ion-icon>\n            Favorite\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button clear small color="danger" icon-start>\n            <ion-icon name=\'search\'></ion-icon>\n            Search\n          </button>\n        </ion-col>    \n        <ion-col text-right>\n          <button ion-button clear small color="danger" icon-start>\n            <ion-icon name=\'map\'></ion-icon>\n            Map\n          </button>\n        </ion-col>\n      </ion-row>\n    \n      <ion-card class="adv-map">\n        <div style="position: relative">\n          <img src="../../assets/imgs/advance-card-map-paris.png">\n        </div>\n    \n        <ion-item actions>\n          <span ion-text item-start color="secondary" class="item-bold">26 min</span>\n          <span ion-text item-start color="subtle">(8.1 mi)</span>\n          <button ion-button color="secondary" clear item-end icon-start>\n            <ion-icon name=\'navigate\'></ion-icon>\n            Start\n          </button>\n        </ion-item>\n    \n      </ion-card>\n    \n      <ion-list no-border>\n    \n        <ion-list-header text-center color="white">\n          Activities\n        </ion-list-header>\n    \n        <ion-item>\n          <ion-icon name=\'car\' item-start></ion-icon>\n          Car Parking\n          <ion-note item-end>\n            Free\n          </ion-note>\n        </ion-item>\n    \n        <ion-item>\n          <ion-label>\n            Gym\n          </ion-label>\n          <ion-icon name=\'body\' item-start></ion-icon>\n        </ion-item>\n    \n        <ion-item>\n          <ion-icon name=\'leaf\' item-start></ion-icon>\n          Picnic Table\n        </ion-item>\n    \n        <ion-item>\n          <ion-icon name=\'hand\' item-start></ion-icon>\n          Toilets\n        </ion-item>\n    \n      </ion-list>\n    \n    \n      <ion-list>\n    \n        <ion-list-header>\n          Permissions\n        </ion-list-header>\n    \n        <ion-item>\n          Facilities\n          <ion-icon name=\'color-wand\' item-start></ion-icon>\n          <ion-note item-end>5</ion-note>\n        </ion-item>\n    \n        <ion-item>\n          <ion-label>\n            Quidditch Practice\n          </ion-label>\n          <ion-icon name=\'brush\' item-start></ion-icon>\n          <ion-note item-end>5</ion-note>\n        </ion-item>\n    \n    \n        <ion-item>\n          <ion-icon name=\'wine\' item-start></ion-icon>\n          Mead Drinking\n          <ion-note item-end>no</ion-note>\n        </ion-item>\n    \n    \n      </ion-list>\n    \n      <ion-list>\n    \n        <ion-list-header>\n          phohibitios\n        </ion-list-header>\n    \n        <ion-item>\n          <ion-icon name=\'paw\' item-start></ion-icon>\n          Unleashed Dogs\n        </ion-item>\n    \n        <ion-item>\n          <ion-icon name=\'wineglass\' item-start></ion-icon>\n          Drink\n          <ion-note item-end>not allow</ion-note>\n        </ion-item>\n    \n    \n    \n      </ion-list>\n    \n    \n    \n    \n    </ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/park-details/park-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_preloader__["a" /* PreloaderProvider */]])
    ], ParkDetailsPage);
    return ParkDetailsPage;
}());

//# sourceMappingURL=park-details.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/welcome/welcome.html"*/'<ion-content padding class="myView" id="welcome">\n\n  <img src="assets/imgs/novoLogo.png" class="logo" align="middle" />\n  <h1 align="center"> Welcome </h1>\n  <h2 align="center">Discover great Parks areas and opportunities</h2>\n\n  <button ion-button block color="lightprimary" class="marginTop" (click)="start()">Get Started</button>\n</ion-content>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 212:
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
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/forget/forget.module": [
		578,
		5
	],
	"../pages/login/login.module": [
		579,
		4
	],
	"../pages/park-details/park-details.module": [
		580,
		3
	],
	"../pages/register/register.module": [
		581,
		2
	],
	"../pages/search-result/search-result.module": [
		582,
		1
	],
	"../pages/welcome/welcome.module": [
		583,
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
webpackAsyncContext.id = 256;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(375);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_preloader__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_environment__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_welcome_welcome__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_forget_forget__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_register_register__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_search_result_search_result__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__ = __webpack_require__(201);
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
                __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__["a" /* ParkDetailsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/park-details/park-details.module#ParkDetailsPageModule', name: 'ParkDetailsPage', segment: 'park-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result/search-result.module#SearchResultPageModule', name: 'SearchResultPage', segment: 'search-result', priority: 'low', defaultHistory: [] },
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
                __WEBPACK_IMPORTED_MODULE_20__pages_park_details_park_details__["a" /* ParkDetailsPage */]
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

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 497:
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
        //this.iconURL = docRef.data().iconURL;
        this.imageURL = docRef.data().imageURL;
    };
    return Facility;
}());

//# sourceMappingURL=facility.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.parseToUserModel = function (docRef) {
        this.userId = docRef.id;
        this.dateCreated = docRef.data().DateCreated;
        this.email = docRef.data().Email;
        this.name = docRef.data().Name;
        this.imageURL = docRef.data().UserImageURL;
        this.favoriteParks = docRef.data().FavoriteParks;
        this.ratings = docRef.data().UserRatings;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getId = function () {
        return this.userId;
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

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Park; });
var Park = /** @class */ (function () {
    function Park() {
        this.parkRating = 0;
        this.starRatingArray = [];
    }
    Park.prototype.parseToParkModel = function (docRef) {
        this.parkID = docRef.id;
        this.address = docRef.data().Address;
        this.comments = docRef.data().Comments;
        this.contact = docRef.data().Contact;
        this.description = docRef.data().Description;
        this.facilities = docRef.data().Facilities;
        this.images = docRef.data().Images;
        this.name = docRef.data().Name;
        this.permissions = docRef.data().Permissions;
        this.prohibitions = docRef.data().Prohibitions;
        this.rating = docRef.data().Rating;
        this.calculateParkRating();
    };
    Park.prototype.calculateParkRating = function () {
        this.parkRating = this.rating.sumOfRateValues / this.rating.numberOfRatings;
        console.log(this.rating.sumOfRateValues);
        console.log(this.rating.numberOfRatings);
        this.updateStarRatingArray();
    };
    Park.prototype.updateStarRatingArray = function () {
        var rat = (this.rating.sumOfRateValues / (this.rating.numberOfRatings * 5)) * 10;
        for (var i = 0; i < 5; i++) {
            if ((rat / 2) <= 0) {
                this.starRatingArray.push("star-outline");
            }
            else if ((rat / 2) > 0 && (rat / 0.2) < 1) {
                this.starRatingArray.push("star-half");
            }
            else if ((rat / 2) >= 1) {
                this.starRatingArray.push("star");
            }
            rat = rat - 2;
        }
    };
    return Park;
}());

//# sourceMappingURL=park.js.map

/***/ }),

/***/ 525:
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

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(267);
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(85);
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
    function MyApp(platform, statusBar, splashScreen, afAuth) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            var authObserver = afAuth.authState.subscribe(function (user) {
                if (user) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
                    authObserver.unsubscribe();
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
                    authObserver.unsubscribe();
                }
            });
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forget_forget__ = __webpack_require__(198);
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
            selector: 'page-login',template:/*ion-inline-start:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/login/login.html"*/'<ion-header>\n\n    <ion-navbar color="blue">\n      <ion-title>Login</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding class="background" scroll="false">\n    <form [formGroup]="_loginForm" (ngSubmit)="doLogin()">\n  \n      <ion-list>\n  \n        <ion-item>\n          <ion-label color="dark" floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label color="dark" floating>Password</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n      </ion-list>\n  \n      <div padding>\n        <button ion-button block color="lightprimary" class="login" type="submit" [disabled]="!_loginForm.valid">Sign In</button>\n      </div>\n  \n    </form>\n  \n    <ion-grid text-center>\n      <ion-row>\n        <ion-col>\n          <a href="#" class="login-optons" (click)="navForget()">Forgot Password</a>\n        </ion-col>\n        <ion-col>\n          <a href="#" class="login-optons" (click)="navRegister()">Register</a>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  \n    <div padding>\n  \n      <!--  <button ion-button color="google" block icon-left margin-bottom (click)="doSocialLogin(\'google\')">\n        <ion-icon ios="logo-google" md="logo-google"></ion-icon>\n        Login with Google\n      </button> -->\n      <div class="row">\n        <div class="column">\n          <button (click)="doSocialLogin(\'google\')">\n            <img src="../../assets/icon/google+_icon.png">\n          </button>\n        </div>\n        <div class="column">\n          <button (click)="doSocialLogin(\'facebook\')">\n            <img src="../../assets/icon/facebook-icon1.png">\n          </button>\n        </div>\n        <div class="column">\n          <button (click)="doSocialLogin(\'twitter\')">\n            <img src="../../assets/icon/twitter_icon.png">\n          </button>\n        </div>\n      </div>\n    </div>  \n  </ion-content>'/*ion-inline-end:"/Users/fzancanaro/Downloads/MyParkApp-master 2/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[358]);
//# sourceMappingURL=main.js.map