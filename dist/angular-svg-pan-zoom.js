var AngularSvgPanZoom;
(function (AngularSvgPanZoom) {
    var SvgPanZoomDirective = (function () {
        function SvgPanZoomDirective(spz, $rootScope) {
            var _this = this;
            this.spz = spz;
            this.restrict = "A";
            this.link = function ($scope, $element, $attrs) {
                var svgmx=$element[0];
                var instance=null;
                var bZoom = function (scale) {
                    _this.$rootScope.$broadcast("beforeZoom", scale);
                };
                var oZoom = function (scale) {
                    //instance.panBy(1);
                    _this.$rootScope.$broadcast("onZoom", scale);
                    var tx=svgmx.children[0].transform.baseVal[0].matrix
                    var mx=[tx.a,tx.b,tx.c,tx.d,tx.e,tx.f];
                    _this.$rootScope.$broadcast("svgUpdateMatrix", mx);
                };
                var bPan = function (point) {
                    _this.$rootScope.$broadcast("beforePan", point);
                };
                var oPan = function (point) {
                    _this.$rootScope.$broadcast('onPan', point);
                    var tx=svgmx.children[0].transform.baseVal[0].matrix
                    var mx=[tx.a,tx.b,tx.c,tx.d,tx.e,tx.f];
                    _this.$rootScope.$broadcast("svgUpdateMatrix", mx);
                };
                var panEnabled = _this.CheckForBoolean($attrs.panEnabled, true), controlIconEnabled = _this.CheckForBoolean($attrs.controlIconsEnabled, false), zoomEnabled = _this.CheckForBoolean($attrs.zoomEnabled, true), dblClickZoomEnabled = _this.CheckForBoolean($attrs.dblClickZoomEnabled, true), zoomScaleSensitivity = $attrs.zoomScaleSensitivity || 0.2, minZoom = $attrs.minZoom || 0.5, maxZoom = $attrs.maxZoom || 10, fit = _this.CheckForBoolean($attrs.fit, true), center = _this.CheckForBoolean($attrs.center, true), refreshRate = $attrs.refreshRate || 'auto', beforeZoom = $attrs.beforeZoom || bZoom, onZoom = $attrs.onZoom || oZoom, beforePan = $attrs.beforePan || bPan, onPan = $attrs.onPan || oPan;

                _this.spz($element[0], {
                    panEnabled: panEnabled,
                    controlIconsEnabled: controlIconEnabled,
                    zoomEnabled: zoomEnabled,
                    dblClickZoomEnabled: dblClickZoomEnabled,
                    zoomScaleSensitivity: zoomScaleSensitivity,
                    minZoom: minZoom,
                    maxZoom: maxZoom,
                    fit: fit,
                    center: center,
                    refreshRate: refreshRate,
                    beforeZoom: beforeZoom,
                    onZoom: onZoom,
                    beforePan: beforePan,
                    onPan: onPan,
                    customEventsHandler:{
                        init:function(data){
                            console.log("init",data.instance);
                            instance=data.instance;
                            data.instance.zoom(10);
                        },
                        destroy:function(data){
                            console.log("destroy",arguments);
                        }
                    }
                });
            };
            this.$rootScope = $rootScope;
        }
        SvgPanZoomDirective.prototype.CheckForBoolean = function (value, defaultValue) {
            if (value === undefined)
                return defaultValue;
            return value === "false" ? false : true;
        };
        return SvgPanZoomDirective;
    })();
    AngularSvgPanZoom.SvgPanZoomDirective = SvgPanZoomDirective;
})(AngularSvgPanZoom || (AngularSvgPanZoom = {}));

angular.module("SvgPanZoom", []).constant("spz", svgPanZoom).directive("svgPanZoom", [
    "spz", "$rootScope", function (spz, $rootScope) {
        return new AngularSvgPanZoom.SvgPanZoomDirective(spz, $rootScope);
    }]);
