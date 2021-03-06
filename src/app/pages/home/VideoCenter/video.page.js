var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BasePage } from '../../base/BasePage';
var VideoItem = (function () {
    function VideoItem() {
    }
    return VideoItem;
}());
var VideoPage = (function (_super) {
    __extends(VideoPage, _super);
    function VideoPage(http, loading, navCtrl, plt) {
        var _this = _super.call(this, loading) || this;
        _this.http = http;
        _this.loading = loading;
        _this.navCtrl = navCtrl;
        _this.plt = plt;
        return _this;
    }
    VideoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.presentLoading();
        this.http.get(this.config.BaseUrl + "video/videolist")
            .subscribe(function (rep) {
            var result = rep.json();
            var data = JSON.parse(result.data);
            data = data.msg;
            console.log(data);
            _this.mpvList = data.mpvlist;
            _this.newList = data.newlist;
            _this.tpvList = data.tpvlist;
            _this.wpvList = data.wpvlist;
            console.log(_this.mpvList);
            _this.hideLoadding();
        });
    };
    // 点击每一行
    VideoPage.prototype.itemClick = function (item) {
        //如果是Android平台
        if (this.plt.is('android')) {
            IQWebview.openNewWindow(item.appurl, function (success) {
                console.log(success);
            }, function (error) {
                console.log(error);
            });
        }
        else if (this.plt.is('ios')) {
            wizViewManager.create("detail", { src: item.appurl }, function (success) {
                var animation = {
                    type: "slideInFromRight",
                    duration: 300
                };
                wizViewManager.show("detail", { animation: animation }, function (success) { console.log("show scucess"), function (error) { console.log("show error"); }; });
            }, function (error) { console.log("create error"); });
        }
    };
    return VideoPage;
}(BasePage));
VideoPage = __decorate([
    Component({
        templateUrl: 'video.page.html'
    }),
    __metadata("design:paramtypes", [Http,
        LoadingController,
        NavController,
        Platform])
], VideoPage);
export { VideoPage };
//# sourceMappingURL=video.page.js.map