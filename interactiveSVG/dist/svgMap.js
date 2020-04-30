/*! svgMap | https://github.com/StephanWagner/svgMap | MIT License | Copyright Stephan Wagner | https://stephanwagner.me */
/*! svg-pan-zoom | https://github.com/ariutta/svg-pan-zoom | BSD 2-Clause "Simplified" License | Copyright Andrea Leofreddi <a.leofreddi@itcharm.com> */
// svg-pan-zoom v3.6.1
// https://github.com/ariutta/svg-pan-zoom
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var SvgUtils = require("./svg-utilities");

module.exports = {
  enable: function(instance) {
    // Select (and create if necessary) defs
    var defs = instance.svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(SvgUtils.svgNS, "defs");
      instance.svg.appendChild(defs);
    }

    // Check for style element, and create it if it doesn't exist
    var styleEl = defs.querySelector("style#svg-pan-zoom-controls-styles");
    if (!styleEl) {
      var style = document.createElementNS(SvgUtils.svgNS, "style");
      style.setAttribute("id", "svg-pan-zoom-controls-styles");
      style.setAttribute("type", "text/css");
      style.textContent =
        ".svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }";
      defs.appendChild(style);
    }

    // Zoom Group
    var zoomGroup = document.createElementNS(SvgUtils.svgNS, "g");
    zoomGroup.setAttribute("id", "svg-pan-zoom-controls");
    zoomGroup.setAttribute(
      "transform",
      "translate(" +
        (instance.width - 70) +
        " " +
        (instance.height - 76) +
        ") scale(0.75)"
    );
    zoomGroup.setAttribute("class", "svg-pan-zoom-control");

    // Control elements
    zoomGroup.appendChild(this._createZoomIn(instance));
    zoomGroup.appendChild(this._createZoomReset(instance));
    zoomGroup.appendChild(this._createZoomOut(instance));

    // Finally append created element
    instance.svg.appendChild(zoomGroup);

    // Cache control instance
    instance.controlIcons = zoomGroup;
  },

  _createZoomIn: function(instance) {
    var zoomIn = document.createElementNS(SvgUtils.svgNS, "g");
    zoomIn.setAttribute("id", "svg-pan-zoom-zoom-in");
    zoomIn.setAttribute("transform", "translate(30.5 5) scale(0.015)");
    zoomIn.setAttribute("class", "svg-pan-zoom-control");
    zoomIn.addEventListener(
      "click",
      function() {
        instance.getPublicInstance().zoomIn();
      },
      false
    );
    zoomIn.addEventListener(
      "touchstart",
      function() {
        instance.getPublicInstance().zoomIn();
      },
      false
    );

    var zoomInBackground = document.createElementNS(SvgUtils.svgNS, "rect"); // TODO change these background space fillers to rounded rectangles so they look prettier
    zoomInBackground.setAttribute("x", "0");
    zoomInBackground.setAttribute("y", "0");
    zoomInBackground.setAttribute("width", "1500"); // larger than expected because the whole group is transformed to scale down
    zoomInBackground.setAttribute("height", "1400");
    zoomInBackground.setAttribute("class", "svg-pan-zoom-control-background");
    zoomIn.appendChild(zoomInBackground);

    var zoomInShape = document.createElementNS(SvgUtils.svgNS, "path");
    zoomInShape.setAttribute(
      "d",
      "M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z"
    );
    zoomInShape.setAttribute("class", "svg-pan-zoom-control-element");
    zoomIn.appendChild(zoomInShape);

    return zoomIn;
  },

  _createZoomReset: function(instance) {
    // reset
    var resetPanZoomControl = document.createElementNS(SvgUtils.svgNS, "g");
    resetPanZoomControl.setAttribute("id", "svg-pan-zoom-reset-pan-zoom");
    resetPanZoomControl.setAttribute("transform", "translate(5 35) scale(0.4)");
    resetPanZoomControl.setAttribute("class", "svg-pan-zoom-control");
    resetPanZoomControl.addEventListener(
      "click",
      function() {
        instance.getPublicInstance().reset();
      },
      false
    );
    resetPanZoomControl.addEventListener(
      "touchstart",
      function() {
        instance.getPublicInstance().reset();
      },
      false
    );

    var resetPanZoomControlBackground = document.createElementNS(
      SvgUtils.svgNS,
      "rect"
    ); // TODO change these background space fillers to rounded rectangles so they look prettier
    resetPanZoomControlBackground.setAttribute("x", "2");
    resetPanZoomControlBackground.setAttribute("y", "2");
    resetPanZoomControlBackground.setAttribute("width", "182"); // larger than expected because the whole group is transformed to scale down
    resetPanZoomControlBackground.setAttribute("height", "58");
    resetPanZoomControlBackground.setAttribute(
      "class",
      "svg-pan-zoom-control-background"
    );
    resetPanZoomControl.appendChild(resetPanZoomControlBackground);

    var resetPanZoomControlShape1 = document.createElementNS(
      SvgUtils.svgNS,
      "path"
    );
    resetPanZoomControlShape1.setAttribute(
      "d",
      "M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z"
    );
    resetPanZoomControlShape1.setAttribute(
      "class",
      "svg-pan-zoom-control-element"
    );
    resetPanZoomControl.appendChild(resetPanZoomControlShape1);

    var resetPanZoomControlShape2 = document.createElementNS(
      SvgUtils.svgNS,
      "path"
    );
    resetPanZoomControlShape2.setAttribute(
      "d",
      "M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z"
    );
    resetPanZoomControlShape2.setAttribute(
      "class",
      "svg-pan-zoom-control-element"
    );
    resetPanZoomControl.appendChild(resetPanZoomControlShape2);

    return resetPanZoomControl;
  },

  _createZoomOut: function(instance) {
    // zoom out
    var zoomOut = document.createElementNS(SvgUtils.svgNS, "g");
    zoomOut.setAttribute("id", "svg-pan-zoom-zoom-out");
    zoomOut.setAttribute("transform", "translate(30.5 70) scale(0.015)");
    zoomOut.setAttribute("class", "svg-pan-zoom-control");
    zoomOut.addEventListener(
      "click",
      function() {
        instance.getPublicInstance().zoomOut();
      },
      false
    );
    zoomOut.addEventListener(
      "touchstart",
      function() {
        instance.getPublicInstance().zoomOut();
      },
      false
    );

    var zoomOutBackground = document.createElementNS(SvgUtils.svgNS, "rect"); // TODO change these background space fillers to rounded rectangles so they look prettier
    zoomOutBackground.setAttribute("x", "0");
    zoomOutBackground.setAttribute("y", "0");
    zoomOutBackground.setAttribute("width", "1500"); // larger than expected because the whole group is transformed to scale down
    zoomOutBackground.setAttribute("height", "1400");
    zoomOutBackground.setAttribute("class", "svg-pan-zoom-control-background");
    zoomOut.appendChild(zoomOutBackground);

    var zoomOutShape = document.createElementNS(SvgUtils.svgNS, "path");
    zoomOutShape.setAttribute(
      "d",
      "M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z"
    );
    zoomOutShape.setAttribute("class", "svg-pan-zoom-control-element");
    zoomOut.appendChild(zoomOutShape);

    return zoomOut;
  },

  disable: function(instance) {
    if (instance.controlIcons) {
      instance.controlIcons.parentNode.removeChild(instance.controlIcons);
      instance.controlIcons = null;
    }
  }
};

},{"./svg-utilities":5}],2:[function(require,module,exports){
var SvgUtils = require("./svg-utilities"),
  Utils = require("./utilities");

var ShadowViewport = function(viewport, options) {
  this.init(viewport, options);
};

/**
 * Initialization
 *
 * @param  {SVGElement} viewport
 * @param  {Object} options
 */
ShadowViewport.prototype.init = function(viewport, options) {
  // DOM Elements
  this.viewport = viewport;
  this.options = options;

  // State cache
  this.originalState = { zoom: 1, x: 0, y: 0 };
  this.activeState = { zoom: 1, x: 0, y: 0 };

  this.updateCTMCached = Utils.proxy(this.updateCTM, this);

  // Create a custom requestAnimationFrame taking in account refreshRate
  this.requestAnimationFrame = Utils.createRequestAnimationFrame(
    this.options.refreshRate
  );

  // ViewBox
  this.viewBox = { x: 0, y: 0, width: 0, height: 0 };
  this.cacheViewBox();

  // Process CTM
  var newCTM = this.processCTM();

  // Update viewport CTM and cache zoom and pan
  this.setCTM(newCTM);

  // Update CTM in this frame
  this.updateCTM();
};

/**
 * Cache initial viewBox value
 * If no viewBox is defined, then use viewport size/position instead for viewBox values
 */
ShadowViewport.prototype.cacheViewBox = function() {
  var svgViewBox = this.options.svg.getAttribute("viewBox");

  if (svgViewBox) {
    var viewBoxValues = svgViewBox
      .split(/[\s\,]/)
      .filter(function(v) {
        return v;
      })
      .map(parseFloat);

    // Cache viewbox x and y offset
    this.viewBox.x = viewBoxValues[0];
    this.viewBox.y = viewBoxValues[1];
    this.viewBox.width = viewBoxValues[2];
    this.viewBox.height = viewBoxValues[3];

    var zoom = Math.min(
      this.options.width / this.viewBox.width,
      this.options.height / this.viewBox.height
    );

    // Update active state
    this.activeState.zoom = zoom;
    this.activeState.x = (this.options.width - this.viewBox.width * zoom) / 2;
    this.activeState.y = (this.options.height - this.viewBox.height * zoom) / 2;

    // Force updating CTM
    this.updateCTMOnNextFrame();

    this.options.svg.removeAttribute("viewBox");
  } else {
    this.simpleViewBoxCache();
  }
};

/**
 * Recalculate viewport sizes and update viewBox cache
 */
ShadowViewport.prototype.simpleViewBoxCache = function() {
  var bBox = this.viewport.getBBox();

  this.viewBox.x = bBox.x;
  this.viewBox.y = bBox.y;
  this.viewBox.width = bBox.width;
  this.viewBox.height = bBox.height;
};

/**
 * Returns a viewbox object. Safe to alter
 *
 * @return {Object} viewbox object
 */
ShadowViewport.prototype.getViewBox = function() {
  return Utils.extend({}, this.viewBox);
};

/**
 * Get initial zoom and pan values. Save them into originalState
 * Parses viewBox attribute to alter initial sizes
 *
 * @return {CTM} CTM object based on options
 */
ShadowViewport.prototype.processCTM = function() {
  var newCTM = this.getCTM();

  if (this.options.fit || this.options.contain) {
    var newScale;
    if (this.options.fit) {
      newScale = Math.min(
        this.options.width / this.viewBox.width,
        this.options.height / this.viewBox.height
      );
    } else {
      newScale = Math.max(
        this.options.width / this.viewBox.width,
        this.options.height / this.viewBox.height
      );
    }

    newCTM.a = newScale; //x-scale
    newCTM.d = newScale; //y-scale
    newCTM.e = -this.viewBox.x * newScale; //x-transform
    newCTM.f = -this.viewBox.y * newScale; //y-transform
  }

  if (this.options.center) {
    var offsetX =
        (this.options.width -
          (this.viewBox.width + this.viewBox.x * 2) * newCTM.a) *
        0.5,
      offsetY =
        (this.options.height -
          (this.viewBox.height + this.viewBox.y * 2) * newCTM.a) *
        0.5;

    newCTM.e = offsetX;
    newCTM.f = offsetY;
  }

  // Cache initial values. Based on activeState and fix+center opitons
  this.originalState.zoom = newCTM.a;
  this.originalState.x = newCTM.e;
  this.originalState.y = newCTM.f;

  return newCTM;
};

/**
 * Return originalState object. Safe to alter
 *
 * @return {Object}
 */
ShadowViewport.prototype.getOriginalState = function() {
  return Utils.extend({}, this.originalState);
};

/**
 * Return actualState object. Safe to alter
 *
 * @return {Object}
 */
ShadowViewport.prototype.getState = function() {
  return Utils.extend({}, this.activeState);
};

/**
 * Get zoom scale
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.getZoom = function() {
  return this.activeState.zoom;
};

/**
 * Get zoom scale for pubilc usage
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.getRelativeZoom = function() {
  return this.activeState.zoom / this.originalState.zoom;
};

/**
 * Compute zoom scale for pubilc usage
 *
 * @return {Float} zoom scale
 */
ShadowViewport.prototype.computeRelativeZoom = function(scale) {
  return scale / this.originalState.zoom;
};

/**
 * Get pan
 *
 * @return {Object}
 */
ShadowViewport.prototype.getPan = function() {
  return { x: this.activeState.x, y: this.activeState.y };
};

/**
 * Return cached viewport CTM value that can be safely modified
 *
 * @return {SVGMatrix}
 */
ShadowViewport.prototype.getCTM = function() {
  var safeCTM = this.options.svg.createSVGMatrix();

  // Copy values manually as in FF they are not itterable
  safeCTM.a = this.activeState.zoom;
  safeCTM.b = 0;
  safeCTM.c = 0;
  safeCTM.d = this.activeState.zoom;
  safeCTM.e = this.activeState.x;
  safeCTM.f = this.activeState.y;

  return safeCTM;
};

/**
 * Set a new CTM
 *
 * @param {SVGMatrix} newCTM
 */
ShadowViewport.prototype.setCTM = function(newCTM) {
  var willZoom = this.isZoomDifferent(newCTM),
    willPan = this.isPanDifferent(newCTM);

  if (willZoom || willPan) {
    // Before zoom
    if (willZoom) {
      // If returns false then cancel zooming
      if (
        this.options.beforeZoom(
          this.getRelativeZoom(),
          this.computeRelativeZoom(newCTM.a)
        ) === false
      ) {
        newCTM.a = newCTM.d = this.activeState.zoom;
        willZoom = false;
      } else {
        this.updateCache(newCTM);
        this.options.onZoom(this.getRelativeZoom());
      }
    }

    // Before pan
    if (willPan) {
      var preventPan = this.options.beforePan(this.getPan(), {
          x: newCTM.e,
          y: newCTM.f
        }),
        // If prevent pan is an object
        preventPanX = false,
        preventPanY = false;

      // If prevent pan is Boolean false
      if (preventPan === false) {
        // Set x and y same as before
        newCTM.e = this.getPan().x;
        newCTM.f = this.getPan().y;

        preventPanX = preventPanY = true;
      } else if (Utils.isObject(preventPan)) {
        // Check for X axes attribute
        if (preventPan.x === false) {
          // Prevent panning on x axes
          newCTM.e = this.getPan().x;
          preventPanX = true;
        } else if (Utils.isNumber(preventPan.x)) {
          // Set a custom pan value
          newCTM.e = preventPan.x;
        }

        // Check for Y axes attribute
        if (preventPan.y === false) {
          // Prevent panning on x axes
          newCTM.f = this.getPan().y;
          preventPanY = true;
        } else if (Utils.isNumber(preventPan.y)) {
          // Set a custom pan value
          newCTM.f = preventPan.y;
        }
      }

      // Update willPan flag
      // Check if newCTM is still different
      if ((preventPanX && preventPanY) || !this.isPanDifferent(newCTM)) {
        willPan = false;
      } else {
        this.updateCache(newCTM);
        this.options.onPan(this.getPan());
      }
    }

    // Check again if should zoom or pan
    if (willZoom || willPan) {
      this.updateCTMOnNextFrame();
    }
  }
};

ShadowViewport.prototype.isZoomDifferent = function(newCTM) {
  return this.activeState.zoom !== newCTM.a;
};

ShadowViewport.prototype.isPanDifferent = function(newCTM) {
  return this.activeState.x !== newCTM.e || this.activeState.y !== newCTM.f;
};

/**
 * Update cached CTM and active state
 *
 * @param {SVGMatrix} newCTM
 */
ShadowViewport.prototype.updateCache = function(newCTM) {
  this.activeState.zoom = newCTM.a;
  this.activeState.x = newCTM.e;
  this.activeState.y = newCTM.f;
};

ShadowViewport.prototype.pendingUpdate = false;

/**
 * Place a request to update CTM on next Frame
 */
ShadowViewport.prototype.updateCTMOnNextFrame = function() {
  if (!this.pendingUpdate) {
    // Lock
    this.pendingUpdate = true;

    // Throttle next update
    this.requestAnimationFrame.call(window, this.updateCTMCached);
  }
};

/**
 * Update viewport CTM with cached CTM
 */
ShadowViewport.prototype.updateCTM = function() {
  var ctm = this.getCTM();

  // Updates SVG element
  SvgUtils.setCTM(this.viewport, ctm, this.defs);

  // Free the lock
  this.pendingUpdate = false;

  // Notify about the update
  if (this.options.onUpdatedCTM) {
    this.options.onUpdatedCTM(ctm);
  }
};

module.exports = function(viewport, options) {
  return new ShadowViewport(viewport, options);
};

},{"./svg-utilities":5,"./utilities":7}],3:[function(require,module,exports){
var svgPanZoom = require("./svg-pan-zoom.js");

// UMD module definition
(function(window, document) {
  // AMD
  if (typeof define === "function" && define.amd) {
    define("svg-pan-zoom", function() {
      return svgPanZoom;
    });
    // CMD
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = svgPanZoom;

    // Browser
    // Keep exporting globally as module.exports is available because of browserify
    window.svgPanZoom = svgPanZoom;
  }
})(window, document);

},{"./svg-pan-zoom.js":4}],4:[function(require,module,exports){
var Wheel = require("./uniwheel"),
  ControlIcons = require("./control-icons"),
  Utils = require("./utilities"),
  SvgUtils = require("./svg-utilities"),
  ShadowViewport = require("./shadow-viewport");

var SvgPanZoom = function(svg, options) {
  this.init(svg, options);
};

var optionsDefaults = {
  viewportSelector: ".svg-pan-zoom_viewport", // Viewport selector. Can be querySelector string or SVGElement
  panEnabled: true, // enable or disable panning (default enabled)
  controlIconsEnabled: false, // insert icons to give user an option in addition to mouse events to control pan/zoom (default disabled)
  zoomEnabled: true, // enable or disable zooming (default enabled)
  dblClickZoomEnabled: true, // enable or disable zooming by double clicking (default enabled)
  mouseWheelZoomEnabled: true, // enable or disable zooming by mouse wheel (default enabled)
  preventMouseEventsDefault: true, // enable or disable preventDefault for mouse events
  zoomScaleSensitivity: 0.1, // Zoom sensitivity
  minZoom: 0.5, // Minimum Zoom level
  maxZoom: 10, // Maximum Zoom level
  fit: true, // enable or disable viewport fit in SVG (default true)
  contain: false, // enable or disable viewport contain the svg (default false)
  center: true, // enable or disable viewport centering in SVG (default true)
  refreshRate: "auto", // Maximum number of frames per second (altering SVG's viewport)
  beforeZoom: null,
  onZoom: null,
  beforePan: null,
  onPan: null,
  customEventsHandler: null,
  eventsListenerElement: null,
  onUpdatedCTM: null
};

var passiveListenerOption = { passive: true };

SvgPanZoom.prototype.init = function(svg, options) {
  var that = this;

  this.svg = svg;
  this.defs = svg.querySelector("defs");

  // Add default attributes to SVG
  SvgUtils.setupSvgAttributes(this.svg);

  // Set options
  this.options = Utils.extend(Utils.extend({}, optionsDefaults), options);

  // Set default state
  this.state = "none";

  // Get dimensions
  var boundingClientRectNormalized = SvgUtils.getBoundingClientRectNormalized(
    svg
  );
  this.width = boundingClientRectNormalized.width;
  this.height = boundingClientRectNormalized.height;

  // Init shadow viewport
  this.viewport = ShadowViewport(
    SvgUtils.getOrCreateViewport(this.svg, this.options.viewportSelector),
    {
      svg: this.svg,
      width: this.width,
      height: this.height,
      fit: this.options.fit,
      contain: this.options.contain,
      center: this.options.center,
      refreshRate: this.options.refreshRate,
      // Put callbacks into functions as they can change through time
      beforeZoom: function(oldScale, newScale) {
        if (that.viewport && that.options.beforeZoom) {
          return that.options.beforeZoom(oldScale, newScale);
        }
      },
      onZoom: function(scale) {
        if (that.viewport && that.options.onZoom) {
          return that.options.onZoom(scale);
        }
      },
      beforePan: function(oldPoint, newPoint) {
        if (that.viewport && that.options.beforePan) {
          return that.options.beforePan(oldPoint, newPoint);
        }
      },
      onPan: function(point) {
        if (that.viewport && that.options.onPan) {
          return that.options.onPan(point);
        }
      },
      onUpdatedCTM: function(ctm) {
        if (that.viewport && that.options.onUpdatedCTM) {
          return that.options.onUpdatedCTM(ctm);
        }
      }
    }
  );

  // Wrap callbacks into public API context
  var publicInstance = this.getPublicInstance();
  publicInstance.setBeforeZoom(this.options.beforeZoom);
  publicInstance.setOnZoom(this.options.onZoom);
  publicInstance.setBeforePan(this.options.beforePan);
  publicInstance.setOnPan(this.options.onPan);
  publicInstance.setOnUpdatedCTM(this.options.onUpdatedCTM);

  if (this.options.controlIconsEnabled) {
    ControlIcons.enable(this);
  }

  // Init events handlers
  this.lastMouseWheelEventTime = Date.now();
  this.setupHandlers();
};

/**
 * Register event handlers
 */
SvgPanZoom.prototype.setupHandlers = function() {
  var that = this,
    prevEvt = null; // use for touchstart event to detect double tap

  this.eventListeners = {
    // Mouse down group
    mousedown: function(evt) {
      var result = that.handleMouseDown(evt, prevEvt);
      prevEvt = evt;
      return result;
    },
    touchstart: function(evt) {
      var result = that.handleMouseDown(evt, prevEvt);
      prevEvt = evt;
      return result;
    },

    // Mouse up group
    mouseup: function(evt) {
      return that.handleMouseUp(evt);
    },
    touchend: function(evt) {
      return that.handleMouseUp(evt);
    },

    // Mouse move group
    mousemove: function(evt) {
      return that.handleMouseMove(evt);
    },
    touchmove: function(evt) {
      return that.handleMouseMove(evt);
    },

    // Mouse leave group
    mouseleave: function(evt) {
      return that.handleMouseUp(evt);
    },
    touchleave: function(evt) {
      return that.handleMouseUp(evt);
    },
    touchcancel: function(evt) {
      return that.handleMouseUp(evt);
    }
  };

  // Init custom events handler if available
  // eslint-disable-next-line eqeqeq
  if (this.options.customEventsHandler != null) {
    this.options.customEventsHandler.init({
      svgElement: this.svg,
      eventsListenerElement: this.options.eventsListenerElement,
      instance: this.getPublicInstance()
    });

    // Custom event handler may halt builtin listeners
    var haltEventListeners = this.options.customEventsHandler
      .haltEventListeners;
    if (haltEventListeners && haltEventListeners.length) {
      for (var i = haltEventListeners.length - 1; i >= 0; i--) {
        if (this.eventListeners.hasOwnProperty(haltEventListeners[i])) {
          delete this.eventListeners[haltEventListeners[i]];
        }
      }
    }
  }

  // Bind eventListeners
  for (var event in this.eventListeners) {
    // Attach event to eventsListenerElement or SVG if not available
    (this.options.eventsListenerElement || this.svg).addEventListener(
      event,
      this.eventListeners[event],
      !this.options.preventMouseEventsDefault ? passiveListenerOption : false
    );
  }

  // Zoom using mouse wheel
  if (this.options.mouseWheelZoomEnabled) {
    this.options.mouseWheelZoomEnabled = false; // set to false as enable will set it back to true
    this.enableMouseWheelZoom();
  }
};

/**
 * Enable ability to zoom using mouse wheel
 */
SvgPanZoom.prototype.enableMouseWheelZoom = function() {
  if (!this.options.mouseWheelZoomEnabled) {
    var that = this;

    // Mouse wheel listener
    this.wheelListener = function(evt) {
      return that.handleMouseWheel(evt);
    };

    // Bind wheelListener
    var isPassiveListener = !this.options.preventMouseEventsDefault;
    Wheel.on(
      this.options.eventsListenerElement || this.svg,
      this.wheelListener,
      isPassiveListener
    );

    this.options.mouseWheelZoomEnabled = true;
  }
};

/**
 * Disable ability to zoom using mouse wheel
 */
SvgPanZoom.prototype.disableMouseWheelZoom = function() {
  if (this.options.mouseWheelZoomEnabled) {
    var isPassiveListener = !this.options.preventMouseEventsDefault;
    Wheel.off(
      this.options.eventsListenerElement || this.svg,
      this.wheelListener,
      isPassiveListener
    );
    this.options.mouseWheelZoomEnabled = false;
  }
};

/**
 * Handle mouse wheel event
 *
 * @param  {Event} evt
 */
SvgPanZoom.prototype.handleMouseWheel = function(evt) {
  if (!this.options.zoomEnabled || this.state !== "none") {
    return;
  }

  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  // Default delta in case that deltaY is not available
  var delta = evt.deltaY || 1,
    timeDelta = Date.now() - this.lastMouseWheelEventTime,
    divider = 3 + Math.max(0, 30 - timeDelta);

  // Update cache
  this.lastMouseWheelEventTime = Date.now();

  // Make empirical adjustments for browsers that give deltaY in pixels (deltaMode=0)
  if ("deltaMode" in evt && evt.deltaMode === 0 && evt.wheelDelta) {
    delta = evt.deltaY === 0 ? 0 : Math.abs(evt.wheelDelta) / evt.deltaY;
  }

  delta =
    -0.3 < delta && delta < 0.3
      ? delta
      : ((delta > 0 ? 1 : -1) * Math.log(Math.abs(delta) + 10)) / divider;

  var inversedScreenCTM = this.svg.getScreenCTM().inverse(),
    relativeMousePoint = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(
      inversedScreenCTM
    ),
    zoom = Math.pow(1 + this.options.zoomScaleSensitivity, -1 * delta); // multiplying by neg. 1 so as to make zoom in/out behavior match Google maps behavior

  this.zoomAtPoint(zoom, relativeMousePoint);
};

/**
 * Zoom in at a SVG point
 *
 * @param  {SVGPoint} point
 * @param  {Float} zoomScale    Number representing how much to zoom
 * @param  {Boolean} zoomAbsolute Default false. If true, zoomScale is treated as an absolute value.
 *                                Otherwise, zoomScale is treated as a multiplied (e.g. 1.10 would zoom in 10%)
 */
SvgPanZoom.prototype.zoomAtPoint = function(zoomScale, point, zoomAbsolute) {
  var originalState = this.viewport.getOriginalState();

  if (!zoomAbsolute) {
    // Fit zoomScale in set bounds
    if (
      this.getZoom() * zoomScale <
      this.options.minZoom * originalState.zoom
    ) {
      zoomScale = (this.options.minZoom * originalState.zoom) / this.getZoom();
    } else if (
      this.getZoom() * zoomScale >
      this.options.maxZoom * originalState.zoom
    ) {
      zoomScale = (this.options.maxZoom * originalState.zoom) / this.getZoom();
    }
  } else {
    // Fit zoomScale in set bounds
    zoomScale = Math.max(
      this.options.minZoom * originalState.zoom,
      Math.min(this.options.maxZoom * originalState.zoom, zoomScale)
    );
    // Find relative scale to achieve desired scale
    zoomScale = zoomScale / this.getZoom();
  }

  var oldCTM = this.viewport.getCTM(),
    relativePoint = point.matrixTransform(oldCTM.inverse()),
    modifier = this.svg
      .createSVGMatrix()
      .translate(relativePoint.x, relativePoint.y)
      .scale(zoomScale)
      .translate(-relativePoint.x, -relativePoint.y),
    newCTM = oldCTM.multiply(modifier);

  if (newCTM.a !== oldCTM.a) {
    this.viewport.setCTM(newCTM);
  }
};

/**
 * Zoom at center point
 *
 * @param  {Float} scale
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.zoom = function(scale, absolute) {
  this.zoomAtPoint(
    scale,
    SvgUtils.getSvgCenterPoint(this.svg, this.width, this.height),
    absolute
  );
};

/**
 * Zoom used by public instance
 *
 * @param  {Float} scale
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.publicZoom = function(scale, absolute) {
  if (absolute) {
    scale = this.computeFromRelativeZoom(scale);
  }

  this.zoom(scale, absolute);
};

/**
 * Zoom at point used by public instance
 *
 * @param  {Float} scale
 * @param  {SVGPoint|Object} point    An object that has x and y attributes
 * @param  {Boolean} absolute Marks zoom scale as relative or absolute
 */
SvgPanZoom.prototype.publicZoomAtPoint = function(scale, point, absolute) {
  if (absolute) {
    // Transform zoom into a relative value
    scale = this.computeFromRelativeZoom(scale);
  }

  // If not a SVGPoint but has x and y then create a SVGPoint
  if (Utils.getType(point) !== "SVGPoint") {
    if ("x" in point && "y" in point) {
      point = SvgUtils.createSVGPoint(this.svg, point.x, point.y);
    } else {
      throw new Error("Given point is invalid");
    }
  }

  this.zoomAtPoint(scale, point, absolute);
};

/**
 * Get zoom scale
 *
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.getZoom = function() {
  return this.viewport.getZoom();
};

/**
 * Get zoom scale for public usage
 *
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.getRelativeZoom = function() {
  return this.viewport.getRelativeZoom();
};

/**
 * Compute actual zoom from public zoom
 *
 * @param  {Float} zoom
 * @return {Float} zoom scale
 */
SvgPanZoom.prototype.computeFromRelativeZoom = function(zoom) {
  return zoom * this.viewport.getOriginalState().zoom;
};

/**
 * Set zoom to initial state
 */
SvgPanZoom.prototype.resetZoom = function() {
  var originalState = this.viewport.getOriginalState();

  this.zoom(originalState.zoom, true);
};

/**
 * Set pan to initial state
 */
SvgPanZoom.prototype.resetPan = function() {
  this.pan(this.viewport.getOriginalState());
};

/**
 * Set pan and zoom to initial state
 */
SvgPanZoom.prototype.reset = function() {
  this.resetZoom();
  this.resetPan();
};

/**
 * Handle double click event
 * See handleMouseDown() for alternate detection method
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleDblClick = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  // Check if target was a control button
  if (this.options.controlIconsEnabled) {
    var targetClass = evt.target.getAttribute("class") || "";
    if (targetClass.indexOf("svg-pan-zoom-control") > -1) {
      return false;
    }
  }

  var zoomFactor;

  if (evt.shiftKey) {
    zoomFactor = 1 / ((1 + this.options.zoomScaleSensitivity) * 2); // zoom out when shift key pressed
  } else {
    zoomFactor = (1 + this.options.zoomScaleSensitivity) * 2;
  }

  var point = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(
    this.svg.getScreenCTM().inverse()
  );
  this.zoomAtPoint(zoomFactor, point);
};

/**
 * Handle click event
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleMouseDown = function(evt, prevEvt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  Utils.mouseAndTouchNormalize(evt, this.svg);

  // Double click detection; more consistent than ondblclick
  if (this.options.dblClickZoomEnabled && Utils.isDblClick(evt, prevEvt)) {
    this.handleDblClick(evt);
  } else {
    // Pan mode
    this.state = "pan";
    this.firstEventCTM = this.viewport.getCTM();
    this.stateOrigin = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(
      this.firstEventCTM.inverse()
    );
  }
};

/**
 * Handle mouse move event
 *
 * @param  {Event} evt
 */
SvgPanZoom.prototype.handleMouseMove = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  if (this.state === "pan" && this.options.panEnabled) {
    // Pan mode
    var point = SvgUtils.getEventPoint(evt, this.svg).matrixTransform(
        this.firstEventCTM.inverse()
      ),
      viewportCTM = this.firstEventCTM.translate(
        point.x - this.stateOrigin.x,
        point.y - this.stateOrigin.y
      );

    this.viewport.setCTM(viewportCTM);
  }
};

/**
 * Handle mouse button release event
 *
 * @param {Event} evt
 */
SvgPanZoom.prototype.handleMouseUp = function(evt) {
  if (this.options.preventMouseEventsDefault) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  if (this.state === "pan") {
    // Quit pan mode
    this.state = "none";
  }
};

/**
 * Adjust viewport size (only) so it will fit in SVG
 * Does not center image
 */
SvgPanZoom.prototype.fit = function() {
  var viewBox = this.viewport.getViewBox(),
    newScale = Math.min(
      this.width / viewBox.width,
      this.height / viewBox.height
    );

  this.zoom(newScale, true);
};

/**
 * Adjust viewport size (only) so it will contain the SVG
 * Does not center image
 */
SvgPanZoom.prototype.contain = function() {
  var viewBox = this.viewport.getViewBox(),
    newScale = Math.max(
      this.width / viewBox.width,
      this.height / viewBox.height
    );

  this.zoom(newScale, true);
};

/**
 * Adjust viewport pan (only) so it will be centered in SVG
 * Does not zoom/fit/contain image
 */
SvgPanZoom.prototype.center = function() {
  var viewBox = this.viewport.getViewBox(),
    offsetX =
      (this.width - (viewBox.width + viewBox.x * 2) * this.getZoom()) * 0.5,
    offsetY =
      (this.height - (viewBox.height + viewBox.y * 2) * this.getZoom()) * 0.5;

  this.getPublicInstance().pan({ x: offsetX, y: offsetY });
};

/**
 * Update content cached BorderBox
 * Use when viewport contents change
 */
SvgPanZoom.prototype.updateBBox = function() {
  this.viewport.simpleViewBoxCache();
};

/**
 * Pan to a rendered position
 *
 * @param  {Object} point {x: 0, y: 0}
 */
SvgPanZoom.prototype.pan = function(point) {
  var viewportCTM = this.viewport.getCTM();
  viewportCTM.e = point.x;
  viewportCTM.f = point.y;
  this.viewport.setCTM(viewportCTM);
};

/**
 * Relatively pan the graph by a specified rendered position vector
 *
 * @param  {Object} point {x: 0, y: 0}
 */
SvgPanZoom.prototype.panBy = function(point) {
  var viewportCTM = this.viewport.getCTM();
  viewportCTM.e += point.x;
  viewportCTM.f += point.y;
  this.viewport.setCTM(viewportCTM);
};

/**
 * Get pan vector
 *
 * @return {Object} {x: 0, y: 0}
 */
SvgPanZoom.prototype.getPan = function() {
  var state = this.viewport.getState();

  return { x: state.x, y: state.y };
};

/**
 * Recalculates cached svg dimensions and controls position
 */
SvgPanZoom.prototype.resize = function() {
  // Get dimensions
  var boundingClientRectNormalized = SvgUtils.getBoundingClientRectNormalized(
    this.svg
  );
  this.width = boundingClientRectNormalized.width;
  this.height = boundingClientRectNormalized.height;

  // Recalculate original state
  var viewport = this.viewport;
  viewport.options.width = this.width;
  viewport.options.height = this.height;
  viewport.processCTM();

  // Reposition control icons by re-enabling them
  if (this.options.controlIconsEnabled) {
    this.getPublicInstance().disableControlIcons();
    this.getPublicInstance().enableControlIcons();
  }
};

/**
 * Unbind mouse events, free callbacks and destroy public instance
 */
SvgPanZoom.prototype.destroy = function() {
  var that = this;

  // Free callbacks
  this.beforeZoom = null;
  this.onZoom = null;
  this.beforePan = null;
  this.onPan = null;
  this.onUpdatedCTM = null;

  // Destroy custom event handlers
  // eslint-disable-next-line eqeqeq
  if (this.options.customEventsHandler != null) {
    this.options.customEventsHandler.destroy({
      svgElement: this.svg,
      eventsListenerElement: this.options.eventsListenerElement,
      instance: this.getPublicInstance()
    });
  }

  // Unbind eventListeners
  for (var event in this.eventListeners) {
    (this.options.eventsListenerElement || this.svg).removeEventListener(
      event,
      this.eventListeners[event],
      !this.options.preventMouseEventsDefault ? passiveListenerOption : false
    );
  }

  // Unbind wheelListener
  this.disableMouseWheelZoom();

  // Remove control icons
  this.getPublicInstance().disableControlIcons();

  // Reset zoom and pan
  this.reset();

  // Remove instance from instancesStore
  instancesStore = instancesStore.filter(function(instance) {
    return instance.svg !== that.svg;
  });

  // Delete options and its contents
  delete this.options;

  // Delete viewport to make public shadow viewport functions uncallable
  delete this.viewport;

  // Destroy public instance and rewrite getPublicInstance
  delete this.publicInstance;
  delete this.pi;
  this.getPublicInstance = function() {
    return null;
  };
};

/**
 * Returns a public instance object
 *
 * @return {Object} Public instance object
 */
SvgPanZoom.prototype.getPublicInstance = function() {
  var that = this;

  // Create cache
  if (!this.publicInstance) {
    this.publicInstance = this.pi = {
      // Pan
      enablePan: function() {
        that.options.panEnabled = true;
        return that.pi;
      },
      disablePan: function() {
        that.options.panEnabled = false;
        return that.pi;
      },
      isPanEnabled: function() {
        return !!that.options.panEnabled;
      },
      pan: function(point) {
        that.pan(point);
        return that.pi;
      },
      panBy: function(point) {
        that.panBy(point);
        return that.pi;
      },
      getPan: function() {
        return that.getPan();
      },
      // Pan event
      setBeforePan: function(fn) {
        that.options.beforePan =
          fn === null ? null : Utils.proxy(fn, that.publicInstance);
        return that.pi;
      },
      setOnPan: function(fn) {
        that.options.onPan =
          fn === null ? null : Utils.proxy(fn, that.publicInstance);
        return that.pi;
      },
      // Zoom and Control Icons
      enableZoom: function() {
        that.options.zoomEnabled = true;
        return that.pi;
      },
      disableZoom: function() {
        that.options.zoomEnabled = false;
        return that.pi;
      },
      isZoomEnabled: function() {
        return !!that.options.zoomEnabled;
      },
      enableControlIcons: function() {
        if (!that.options.controlIconsEnabled) {
          that.options.controlIconsEnabled = true;
          ControlIcons.enable(that);
        }
        return that.pi;
      },
      disableControlIcons: function() {
        if (that.options.controlIconsEnabled) {
          that.options.controlIconsEnabled = false;
          ControlIcons.disable(that);
        }
        return that.pi;
      },
      isControlIconsEnabled: function() {
        return !!that.options.controlIconsEnabled;
      },
      // Double click zoom
      enableDblClickZoom: function() {
        that.options.dblClickZoomEnabled = true;
        return that.pi;
      },
      disableDblClickZoom: function() {
        that.options.dblClickZoomEnabled = false;
        return that.pi;
      },
      isDblClickZoomEnabled: function() {
        return !!that.options.dblClickZoomEnabled;
      },
      // Mouse wheel zoom
      enableMouseWheelZoom: function() {
        that.enableMouseWheelZoom();
        return that.pi;
      },
      disableMouseWheelZoom: function() {
        that.disableMouseWheelZoom();
        return that.pi;
      },
      isMouseWheelZoomEnabled: function() {
        return !!that.options.mouseWheelZoomEnabled;
      },
      // Zoom scale and bounds
      setZoomScaleSensitivity: function(scale) {
        that.options.zoomScaleSensitivity = scale;
        return that.pi;
      },
      setMinZoom: function(zoom) {
        that.options.minZoom = zoom;
        return that.pi;
      },
      setMaxZoom: function(zoom) {
        that.options.maxZoom = zoom;
        return that.pi;
      },
      // Zoom event
      setBeforeZoom: function(fn) {
        that.options.beforeZoom =
          fn === null ? null : Utils.proxy(fn, that.publicInstance);
        return that.pi;
      },
      setOnZoom: function(fn) {
        that.options.onZoom =
          fn === null ? null : Utils.proxy(fn, that.publicInstance);
        return that.pi;
      },
      // Zooming
      zoom: function(scale) {
        that.publicZoom(scale, true);
        return that.pi;
      },
      zoomBy: function(scale) {
        that.publicZoom(scale, false);
        return that.pi;
      },
      zoomAtPoint: function(scale, point) {
        that.publicZoomAtPoint(scale, point, true);
        return that.pi;
      },
      zoomAtPointBy: function(scale, point) {
        that.publicZoomAtPoint(scale, point, false);
        return that.pi;
      },
      zoomIn: function() {
        this.zoomBy(1 + that.options.zoomScaleSensitivity);
        return that.pi;
      },
      zoomOut: function() {
        this.zoomBy(1 / (1 + that.options.zoomScaleSensitivity));
        return that.pi;
      },
      getZoom: function() {
        return that.getRelativeZoom();
      },
      // CTM update
      setOnUpdatedCTM: function(fn) {
        that.options.onUpdatedCTM =
          fn === null ? null : Utils.proxy(fn, that.publicInstance);
        return that.pi;
      },
      // Reset
      resetZoom: function() {
        that.resetZoom();
        return that.pi;
      },
      resetPan: function() {
        that.resetPan();
        return that.pi;
      },
      reset: function() {
        that.reset();
        return that.pi;
      },
      // Fit, Contain and Center
      fit: function() {
        that.fit();
        return that.pi;
      },
      contain: function() {
        that.contain();
        return that.pi;
      },
      center: function() {
        that.center();
        return that.pi;
      },
      // Size and Resize
      updateBBox: function() {
        that.updateBBox();
        return that.pi;
      },
      resize: function() {
        that.resize();
        return that.pi;
      },
      getSizes: function() {
        return {
          width: that.width,
          height: that.height,
          realZoom: that.getZoom(),
          viewBox: that.viewport.getViewBox()
        };
      },
      // Destroy
      destroy: function() {
        that.destroy();
        return that.pi;
      }
    };
  }

  return this.publicInstance;
};

/**
 * Stores pairs of instances of SvgPanZoom and SVG
 * Each pair is represented by an object {svg: SVGSVGElement, instance: SvgPanZoom}
 *
 * @type {Array}
 */
var instancesStore = [];

var svgPanZoom = function(elementOrSelector, options) {
  var svg = Utils.getSvg(elementOrSelector);

  if (svg === null) {
    return null;
  } else {
    // Look for existent instance
    for (var i = instancesStore.length - 1; i >= 0; i--) {
      if (instancesStore[i].svg === svg) {
        return instancesStore[i].instance.getPublicInstance();
      }
    }

    // If instance not found - create one
    instancesStore.push({
      svg: svg,
      instance: new SvgPanZoom(svg, options)
    });

    // Return just pushed instance
    return instancesStore[
      instancesStore.length - 1
    ].instance.getPublicInstance();
  }
};

module.exports = svgPanZoom;

},{"./control-icons":1,"./shadow-viewport":2,"./svg-utilities":5,"./uniwheel":6,"./utilities":7}],5:[function(require,module,exports){
var Utils = require("./utilities"),
  _browser = "unknown";

// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
if (/*@cc_on!@*/ false || !!document.documentMode) {
  // internet explorer
  _browser = "ie";
}

module.exports = {
  svgNS: "http://www.w3.org/2000/svg",
  xmlNS: "http://www.w3.org/XML/1998/namespace",
  xmlnsNS: "http://www.w3.org/2000/xmlns/",
  xlinkNS: "http://www.w3.org/1999/xlink",
  evNS: "http://www.w3.org/2001/xml-events",

  /**
   * Get svg dimensions: width and height
   *
   * @param  {SVGSVGElement} svg
   * @return {Object}     {width: 0, height: 0}
   */
  getBoundingClientRectNormalized: function(svg) {
    if (svg.clientWidth && svg.clientHeight) {
      return { width: svg.clientWidth, height: svg.clientHeight };
    } else if (!!svg.getBoundingClientRect()) {
      return svg.getBoundingClientRect();
    } else {
      throw new Error("Cannot get BoundingClientRect for SVG.");
    }
  },

  /**
   * Gets g element with class of "viewport" or creates it if it doesn't exist
   *
   * @param  {SVGSVGElement} svg
   * @return {SVGElement}     g (group) element
   */
  getOrCreateViewport: function(svg, selector) {
    var viewport = null;

    if (Utils.isElement(selector)) {
      viewport = selector;
    } else {
      viewport = svg.querySelector(selector);
    }

    // Check if there is just one main group in SVG
    if (!viewport) {
      var childNodes = Array.prototype.slice
        .call(svg.childNodes || svg.children)
        .filter(function(el) {
          return el.nodeName !== "defs" && el.nodeName !== "#text";
        });

      // Node name should be SVGGElement and should have no transform attribute
      // Groups with transform are not used as viewport because it involves parsing of all transform possibilities
      if (
        childNodes.length === 1 &&
        childNodes[0].nodeName === "g" &&
        childNodes[0].getAttribute("transform") === null
      ) {
        viewport = childNodes[0];
      }
    }

    // If no favorable group element exists then create one
    if (!viewport) {
      var viewportId =
        "viewport-" + new Date().toISOString().replace(/\D/g, "");
      viewport = document.createElementNS(this.svgNS, "g");
      viewport.setAttribute("id", viewportId);

      // Internet Explorer (all versions?) can't use childNodes, but other browsers prefer (require?) using childNodes
      var svgChildren = svg.childNodes || svg.children;
      if (!!svgChildren && svgChildren.length > 0) {
        for (var i = svgChildren.length; i > 0; i--) {
          // Move everything into viewport except defs
          if (svgChildren[svgChildren.length - i].nodeName !== "defs") {
            viewport.appendChild(svgChildren[svgChildren.length - i]);
          }
        }
      }
      svg.appendChild(viewport);
    }

    // Parse class names
    var classNames = [];
    if (viewport.getAttribute("class")) {
      classNames = viewport.getAttribute("class").split(" ");
    }

    // Set class (if not set already)
    if (!~classNames.indexOf("svg-pan-zoom_viewport")) {
      classNames.push("svg-pan-zoom_viewport");
      viewport.setAttribute("class", classNames.join(" "));
    }

    return viewport;
  },

  /**
   * Set SVG attributes
   *
   * @param  {SVGSVGElement} svg
   */
  setupSvgAttributes: function(svg) {
    // Setting default attributes
    svg.setAttribute("xmlns", this.svgNS);
    svg.setAttributeNS(this.xmlnsNS, "xmlns:xlink", this.xlinkNS);
    svg.setAttributeNS(this.xmlnsNS, "xmlns:ev", this.evNS);

    // Needed for Internet Explorer, otherwise the viewport overflows
    if (svg.parentNode !== null) {
      var style = svg.getAttribute("style") || "";
      if (style.toLowerCase().indexOf("overflow") === -1) {
        svg.setAttribute("style", "overflow: hidden; " + style);
      }
    }
  },

  /**
   * How long Internet Explorer takes to finish updating its display (ms).
   */
  internetExplorerRedisplayInterval: 300,

  /**
   * Forces the browser to redisplay all SVG elements that rely on an
   * element defined in a 'defs' section. It works globally, for every
   * available defs element on the page.
   * The throttling is intentionally global.
   *
   * This is only needed for IE. It is as a hack to make markers (and 'use' elements?)
   * visible after pan/zoom when there are multiple SVGs on the page.
   * See bug report: https://connect.microsoft.com/IE/feedback/details/781964/
   * also see svg-pan-zoom issue: https://github.com/ariutta/svg-pan-zoom/issues/62
   */
  refreshDefsGlobal: Utils.throttle(
    function() {
      var allDefs = document.querySelectorAll("defs");
      var allDefsCount = allDefs.length;
      for (var i = 0; i < allDefsCount; i++) {
        var thisDefs = allDefs[i];
        thisDefs.parentNode.insertBefore(thisDefs, thisDefs);
      }
    },
    this ? this.internetExplorerRedisplayInterval : null
  ),

  /**
   * Sets the current transform matrix of an element
   *
   * @param {SVGElement} element
   * @param {SVGMatrix} matrix  CTM
   * @param {SVGElement} defs
   */
  setCTM: function(element, matrix, defs) {
    var that = this,
      s =
        "matrix(" +
        matrix.a +
        "," +
        matrix.b +
        "," +
        matrix.c +
        "," +
        matrix.d +
        "," +
        matrix.e +
        "," +
        matrix.f +
        ")";

    element.setAttributeNS(null, "transform", s);
    if ("transform" in element.style) {
      element.style.transform = s;
    } else if ("-ms-transform" in element.style) {
      element.style["-ms-transform"] = s;
    } else if ("-webkit-transform" in element.style) {
      element.style["-webkit-transform"] = s;
    }

    // IE has a bug that makes markers disappear on zoom (when the matrix "a" and/or "d" elements change)
    // see http://stackoverflow.com/questions/17654578/svg-marker-does-not-work-in-ie9-10
    // and http://srndolha.wordpress.com/2013/11/25/svg-line-markers-may-disappear-in-internet-explorer-11/
    if (_browser === "ie" && !!defs) {
      // this refresh is intended for redisplaying the SVG during zooming
      defs.parentNode.insertBefore(defs, defs);
      // this refresh is intended for redisplaying the other SVGs on a page when panning a given SVG
      // it is also needed for the given SVG itself, on zoomEnd, if the SVG contains any markers that
      // are located under any other element(s).
      window.setTimeout(function() {
        that.refreshDefsGlobal();
      }, that.internetExplorerRedisplayInterval);
    }
  },

  /**
   * Instantiate an SVGPoint object with given event coordinates
   *
   * @param {Event} evt
   * @param  {SVGSVGElement} svg
   * @return {SVGPoint}     point
   */
  getEventPoint: function(evt, svg) {
    var point = svg.createSVGPoint();

    Utils.mouseAndTouchNormalize(evt, svg);

    point.x = evt.clientX;
    point.y = evt.clientY;

    return point;
  },

  /**
   * Get SVG center point
   *
   * @param  {SVGSVGElement} svg
   * @return {SVGPoint}
   */
  getSvgCenterPoint: function(svg, width, height) {
    return this.createSVGPoint(svg, width / 2, height / 2);
  },

  /**
   * Create a SVGPoint with given x and y
   *
   * @param  {SVGSVGElement} svg
   * @param  {Number} x
   * @param  {Number} y
   * @return {SVGPoint}
   */
  createSVGPoint: function(svg, x, y) {
    var point = svg.createSVGPoint();
    point.x = x;
    point.y = y;

    return point;
  }
};

},{"./utilities":7}],6:[function(require,module,exports){
// uniwheel 0.1.2 (customized)
// A unified cross browser mouse wheel event handler
// https://github.com/teemualap/uniwheel

module.exports = (function(){

  //Full details: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel

  var prefix = "", _addEventListener, _removeEventListener, support, fns = [];
  var passiveOption = {passive: true};

  // detect event model
  if ( window.addEventListener ) {
    _addEventListener = "addEventListener";
    _removeEventListener = "removeEventListener";
  } else {
    _addEventListener = "attachEvent";
    _removeEventListener = "detachEvent";
    prefix = "on";
  }

  // detect available wheel event
  support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox


  function createCallback(element,callback) {

    var fn = function(originalEvent) {

      !originalEvent && ( originalEvent = window.event );

      // create a normalized event object
      var event = {
        // keep a ref to the original event object
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: "wheel",
        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        delatZ: 0,
        preventDefault: function() {
          originalEvent.preventDefault ?
            originalEvent.preventDefault() :
            originalEvent.returnValue = false;
        }
      };

      // calculate deltaY (and deltaX) according to the event
      if ( support == "mousewheel" ) {
        event.deltaY = - 1/40 * originalEvent.wheelDelta;
        // Webkit also support wheelDeltaX
        originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
      } else {
        event.deltaY = originalEvent.detail;
      }

      // it's time to fire the callback
      return callback( event );

    };

    fns.push({
      element: element,
      fn: fn,
    });

    return fn;
  }

  function getCallback(element) {
    for (var i = 0; i < fns.length; i++) {
      if (fns[i].element === element) {
        return fns[i].fn;
      }
    }
    return function(){};
  }

  function removeCallback(element) {
    for (var i = 0; i < fns.length; i++) {
      if (fns[i].element === element) {
        return fns.splice(i,1);
      }
    }
  }

  function _addWheelListener(elem, eventName, callback, isPassiveListener ) {
    var cb;

    if (support === "wheel") {
      cb = callback;
    } else {
      cb = createCallback(elem, callback);
    }

    elem[_addEventListener](prefix + eventName, cb, isPassiveListener ? passiveOption : false);
  }

  function _removeWheelListener(elem, eventName, callback, isPassiveListener ) {

    var cb;

    if (support === "wheel") {
      cb = callback;
    } else {
      cb = getCallback(elem);
    }

    elem[_removeEventListener](prefix + eventName, cb, isPassiveListener ? passiveOption : false);

    removeCallback(elem);
  }

  function addWheelListener( elem, callback, isPassiveListener ) {
    _addWheelListener(elem, support, callback, isPassiveListener );

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
      _addWheelListener(elem, "MozMousePixelScroll", callback, isPassiveListener );
    }
  }

  function removeWheelListener(elem, callback, isPassiveListener){
    _removeWheelListener(elem, support, callback, isPassiveListener);

    // handle MozMousePixelScroll in older Firefox
    if( support == "DOMMouseScroll" ) {
      _removeWheelListener(elem, "MozMousePixelScroll", callback, isPassiveListener);
    }
  }

  return {
    on: addWheelListener,
    off: removeWheelListener
  };

})();

},{}],7:[function(require,module,exports){
module.exports = {
  /**
   * Extends an object
   *
   * @param  {Object} target object to extend
   * @param  {Object} source object to take properties from
   * @return {Object}        extended object
   */
  extend: function(target, source) {
    target = target || {};
    for (var prop in source) {
      // Go recursively
      if (this.isObject(source[prop])) {
        target[prop] = this.extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  },

  /**
   * Checks if an object is a DOM element
   *
   * @param  {Object}  o HTML element or String
   * @return {Boolean}   returns true if object is a DOM element
   */
  isElement: function(o) {
    return (
      o instanceof HTMLElement ||
      o instanceof SVGElement ||
      o instanceof SVGSVGElement || //DOM2
      (o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string")
    );
  },

  /**
   * Checks if an object is an Object
   *
   * @param  {Object}  o Object
   * @return {Boolean}   returns true if object is an Object
   */
  isObject: function(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  },

  /**
   * Checks if variable is Number
   *
   * @param  {Integer|Float}  n
   * @return {Boolean}   returns true if variable is Number
   */
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  /**
   * Search for an SVG element
   *
   * @param  {Object|String} elementOrSelector DOM Element or selector String
   * @return {Object|Null}                   SVG or null
   */
  getSvg: function(elementOrSelector) {
    var element, svg;

    if (!this.isElement(elementOrSelector)) {
      // If selector provided
      if (
        typeof elementOrSelector === "string" ||
        elementOrSelector instanceof String
      ) {
        // Try to find the element
        element = document.querySelector(elementOrSelector);

        if (!element) {
          throw new Error(
            "Provided selector did not find any elements. Selector: " +
              elementOrSelector
          );
          return null;
        }
      } else {
        throw new Error("Provided selector is not an HTML object nor String");
        return null;
      }
    } else {
      element = elementOrSelector;
    }

    if (element.tagName.toLowerCase() === "svg") {
      svg = element;
    } else {
      if (element.tagName.toLowerCase() === "object") {
        svg = element.contentDocument.documentElement;
      } else {
        if (element.tagName.toLowerCase() === "embed") {
          svg = element.getSVGDocument().documentElement;
        } else {
          if (element.tagName.toLowerCase() === "img") {
            throw new Error(
              'Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.'
            );
          } else {
            throw new Error("Cannot get SVG.");
          }
          return null;
        }
      }
    }

    return svg;
  },

  /**
   * Attach a given context to a function
   * @param  {Function} fn      Function
   * @param  {Object}   context Context
   * @return {Function}           Function with certain context
   */
  proxy: function(fn, context) {
    return function() {
      return fn.apply(context, arguments);
    };
  },

  /**
   * Returns object type
   * Uses toString that returns [object SVGPoint]
   * And than parses object type from string
   *
   * @param  {Object} o Any object
   * @return {String}   Object type
   */
  getType: function(o) {
    return Object.prototype.toString
      .apply(o)
      .replace(/^\[object\s/, "")
      .replace(/\]$/, "");
  },

  /**
   * If it is a touch event than add clientX and clientY to event object
   *
   * @param  {Event} evt
   * @param  {SVGSVGElement} svg
   */
  mouseAndTouchNormalize: function(evt, svg) {
    // If no clientX then fallback
    if (evt.clientX === void 0 || evt.clientX === null) {
      // Fallback
      evt.clientX = 0;
      evt.clientY = 0;

      // If it is a touch event
      if (evt.touches !== void 0 && evt.touches.length) {
        if (evt.touches[0].clientX !== void 0) {
          evt.clientX = evt.touches[0].clientX;
          evt.clientY = evt.touches[0].clientY;
        } else if (evt.touches[0].pageX !== void 0) {
          var rect = svg.getBoundingClientRect();

          evt.clientX = evt.touches[0].pageX - rect.left;
          evt.clientY = evt.touches[0].pageY - rect.top;
        }
        // If it is a custom event
      } else if (evt.originalEvent !== void 0) {
        if (evt.originalEvent.clientX !== void 0) {
          evt.clientX = evt.originalEvent.clientX;
          evt.clientY = evt.originalEvent.clientY;
        }
      }
    }
  },

  /**
   * Check if an event is a double click/tap
   * TODO: For touch gestures use a library (hammer.js) that takes in account other events
   * (touchmove and touchend). It should take in account tap duration and traveled distance
   *
   * @param  {Event}  evt
   * @param  {Event}  prevEvt Previous Event
   * @return {Boolean}
   */
  isDblClick: function(evt, prevEvt) {
    // Double click detected by browser
    if (evt.detail === 2) {
      return true;
    }
    // Try to compare events
    else if (prevEvt !== void 0 && prevEvt !== null) {
      var timeStampDiff = evt.timeStamp - prevEvt.timeStamp, // should be lower than 250 ms
        touchesDistance = Math.sqrt(
          Math.pow(evt.clientX - prevEvt.clientX, 2) +
            Math.pow(evt.clientY - prevEvt.clientY, 2)
        );

      return timeStampDiff < 250 && touchesDistance < 10;
    }

    // Nothing found
    return false;
  },

  /**
   * Returns current timestamp as an integer
   *
   * @return {Number}
   */
  now:
    Date.now ||
    function() {
      return new Date().getTime();
    },

  // From underscore.
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  throttle: function(func, wait, options) {
    var that = this;
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) {
      options = {};
    }
    var later = function() {
      previous = options.leading === false ? 0 : that.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    };
    return function() {
      var now = that.now();
      if (!previous && options.leading === false) {
        previous = now;
      }
      var remaining = wait - (now - previous);
      context = this; // eslint-disable-line consistent-this
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },

  /**
   * Create a requestAnimationFrame simulation
   *
   * @param  {Number|String} refreshRate
   * @return {Function}
   */
  createRequestAnimationFrame: function(refreshRate) {
    var timeout = null;

    // Convert refreshRate to timeout
    if (refreshRate !== "auto" && refreshRate < 60 && refreshRate > 1) {
      timeout = Math.floor(1000 / refreshRate);
    }

    if (timeout === null) {
      return window.requestAnimationFrame || requestTimeout(33);
    } else {
      return requestTimeout(timeout);
    }
  }
};

/**
 * Create a callback that will execute after a given timeout
 *
 * @param  {Function} timeout
 * @return {Function}
 */
function requestTimeout(timeout) {
  return function(callback) {
    window.setTimeout(callback, timeout);
  };
}

},{}]},{},[3]);

// Wrapper function
var svgMap = function (options) {
  this.init(options)
};

// Initialize SVG Worldmap
svgMap.prototype.init = function (options) {

  // Default options, pass a custom options object to overwrite specific
  var defaultOptions = {

    // The element to render the map in
    targetElementID: '',

    // Minimum and maximum zoom
    minZoom: 1,
    maxZoom: 25,

    // Initial zoom
    initialZoom: 1.06,

    // Zoom sensitivity
    zoomScaleSensitivity: 0.2,

    // Zoom with mousewheel
    mouseWheelZoomEnabled: true,

    // Data colors
    colorMax: '#CC0033',
    colorMin: '#FFE5D9',
    colorNoData: '#E2E2E2',

    // The flag type can be 'image' or 'emoji'
    flagType: 'image',

    // The URL to the flags when using flag type 'image', {0} will get replaced with the lowercase county id
    flagURL: 'https://cdn.jsdelivr.net/gh/hjnilsson/county-flags@latest/svg/{0}.svg',

    // Decide whether to show the flag option or not
    hideFlag: true,

    // The default text to be shown when no data is present
    noDataText: 'No data available',

    // Country specific options
    counties: {
      // Western Sahara: Set to false to combine Morocco (MA) and Western Sahara (EH)
      EH: true
    }
  };

  this.options = Object.assign({}, defaultOptions, (options || {}));

  // Abort if target element not found
  if (!this.options.targetElementID || !document.getElementById(this.options.targetElementID)) {
    this.error('Target element not found');
  }

  // Abort if no data
  if (!this.options.data) {
    this.error('No data');
  }

  // Global id
  this.id = this.options.targetElementID;

  // Cache wrapper element
  this.wrapper = document.getElementById(this.options.targetElementID);

  // Create the map
  this.createMap();

  // Apply map data
  this.applyData(this.options.data);
};

svgMap.prototype.counties = {
  C: 'Cork',
  CE: 'Clare',
  CN: 'Cavan',
  CW: 'Carlow',
  D: 'Dublin',
  DL: 'Donegal',
  G: 'Galway',
  KE: 'Kildare',
  KK: 'Kilkenny',
  KY: 'Kerry',
  LD: 'Longford',
  LH: 'Louth',
  LK: 'Limerick',
  LM: 'Leitrim',
  LS: 'Laois',
  MH: 'Meath',
  MN: 'Monaghan',
  MO: 'Mayo',
  OY: 'Offaly',
  RN: 'Roscommon',
  SO: 'Sligo',
  T: 'Tipperary',
  WD: 'Waterford',
  WH: 'Westmeath',
  WW: 'Wicklow',
  WX: 'Wexford',
  AM: 'Antrim',
  AH: 'Armagh',
  DN: 'Down',
  DY: 'Derry',
  FH: 'Fermanagh',
  TE: 'Tyrone',
};


// Apply the data to the map
svgMap.prototype.applyData = function (data) {

  var max = null;
  var min = null;

  // Get highest and lowest value
  Object.keys(data.values).forEach(function (countyID) {
    var value = parseInt(data.values[countyID]["cases"], 10);
    max === null && (max = value);
    min === null && (min = value);
    value > max && (max = value);
    value < min && (min = value);
  });



  // Loop through counties and set colors
  Object.keys(this.counties).forEach(function (countyID) {
    var element = document.getElementById(this.id + '-map-county-' + countyID);
    if (!element) {
      return;
    }
    if (!data.values[countyID]) {
      element.setAttribute('fill', this.options.colorNoData);
      return;
    }
    var value = Math.max(min, parseInt(data.values[countyID]["cases"], 10));
    var ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
    var color = this.getColor(this.options.colorMax, this.options.colorMin, ratio);
    element.setAttribute('fill', color);
  }.bind(this));

};
svgMap.prototype.emojiFlags = {
  AF: '🇦🇫',
  AX: '🇦🇽',
  AL: '🇦🇱',
  DZ: '🇩🇿',
  AS: '🇦🇸',
  AD: '🇦🇩',
  AO: '🇦🇴',
  AI: '🇦🇮',
  AQ: '🇦🇶',
  AG: '🇦🇬',
  AR: '🇦🇷',
  AM: '🇦🇲',
  AW: '🇦🇼',
  AU: '🇦🇺',
  AT: '🇦🇹',
  AZ: '🇦🇿',
  BS: '🇧🇸',
  BH: '🇧🇭',
  BD: '🇧🇩',
  BB: '🇧🇧',
  BY: '🇧🇾',
  BE: '🇧🇪',
  BZ: '🇧🇿',
  BJ: '🇧🇯',
  BM: '🇧🇲',
  BT: '🇧🇹',
  BO: '🇧🇴',
  BA: '🇧🇦',
  BW: '🇧🇼',
  BR: '🇧🇷',
  IO: '🇮🇴',
  VG: '🇻🇬',
  BN: '🇧🇳',
  BG: '🇧🇬',
  BF: '🇧🇫',
  BI: '🇧🇮',
  KH: '🇰🇭',
  CM: '🇨🇲',
  CA: '🇨🇦',
  CV: '🇨🇻',
  BQ: '🇧🇶',
  KY: '🇰🇾',
  CF: '🇨🇫',
  TD: '🇹🇩',
  CL: '🇨🇱',
  CN: '🇨🇳',
  CX: '🇨🇽',
  CC: '🇨🇨',
  CO: '🇨🇴',
  KM: '🇰🇲',
  CG: '🇨🇬',
  CK: '🇨🇰',
  CR: '🇨🇷',
  HR: '🇭🇷',
  CU: '🇨🇺',
  CW: '🇨🇼',
  CY: '🇨🇾',
  CZ: '🇨🇿',
  CD: '🇨🇩',
  DK: '🇩🇰',
  DJ: '🇩🇯',
  DM: '🇩🇲',
  DO: '🇩🇴',
  EC: '🇪🇨',
  EG: '🇪🇬',
  SV: '🇸🇻',
  GQ: '🇬🇶',
  ER: '🇪🇷',
  EE: '🇪🇪',
  ET: '🇪🇹',
  FK: '🇫🇰',
  FO: '🇫🇴',
  FM: '🇫🇲',
  FJ: '🇫🇯',
  FI: '🇫🇮',
  FR: '🇫🇷',
  GF: '🇬🇫',
  PF: '🇵🇫',
  TF: '🇹🇫',
  GA: '🇬🇦',
  GM: '🇬🇲',
  GE: '🇬🇪',
  DE: '🇩🇪',
  GH: '🇬🇭',
  GI: '🇬🇮',
  GR: '🇬🇷',
  GL: '🇬🇱',
  GD: '🇬🇩',
  GP: '🇬🇵',
  GU: '🇬🇺',
  GT: '🇬🇹',
  GN: '🇬🇳',
  GW: '🇬🇼',
  GY: '🇬🇾',
  HT: '🇭🇹',
  HN: '🇭🇳',
  HK: '🇭🇰',
  HU: '🇭🇺',
  IS: '🇮🇸',
  IN: '🇮🇳',
  ID: '🇮🇩',
  IR: '🇮🇷',
  IQ: '🇮🇶',
  IE: '🇮🇪',
  IM: '🇮🇲',
  IL: '🇮🇱',
  IT: '🇮🇹',
  CI: '🇨🇮',
  JM: '🇯🇲',
  JP: '🇯🇵',
  JE: '🇯🇪',
  JO: '🇯🇴',
  KZ: '🇰🇿',
  KE: '🇰🇪',
  KI: '🇰🇮',
  XK: '🇽🇰',
  KW: '🇰🇼',
  KG: '🇰🇬',
  LA: '🇱🇦',
  LV: '🇱🇻',
  LB: '🇱🇧',
  LS: '🇱🇸',
  LR: '🇱🇷',
  LY: '🇱🇾',
  LI: '🇱🇮',
  LT: '🇱🇹',
  LU: '🇱🇺',
  MO: '🇲🇴',
  MK: '🇲🇰',
  MG: '🇲🇬',
  MW: '🇲🇼',
  MY: '🇲🇾',
  MV: '🇲🇻',
  ML: '🇲🇱',
  MT: '🇲🇹',
  MH: '🇲🇭',
  MQ: '🇲🇶',
  MR: '🇲🇷',
  MU: '🇲🇺',
  YT: '🇾🇹',
  MX: '🇲🇽',
  MD: '🇲🇩',
  MC: '🇲🇨',
  MN: '🇲🇳',
  ME: '🇲🇪',
  MS: '🇲🇸',
  MA: '🇲🇦',
  MZ: '🇲🇿',
  MM: '🇲🇲',
  NA: '🇳🇦',
  NR: '🇳🇷',
  NP: '🇳🇵',
  NL: '🇳🇱',
  NC: '🇳🇨',
  NZ: '🇳🇿',
  NI: '🇳🇮',
  NE: '🇳🇪',
  NG: '🇳🇬',
  NU: '🇳🇺',
  NF: '🇳🇫',
  KP: '🇰🇵',
  MP: '🇲🇵',
  NO: '🇳🇴',
  OM: '🇴🇲',
  PK: '🇵🇰',
  PW: '🇵🇼',
  PS: '🇵🇸',
  PA: '🇵🇦',
  PG: '🇵🇬',
  PY: '🇵🇾',
  PE: '🇵🇪',
  PH: '🇵🇭',
  PN: '🇵🇳',
  PL: '🇵🇱',
  PT: '🇵🇹',
  PR: '🇵🇷',
  QA: '🇶🇦',
  RE: '🇷🇪',
  RO: '🇷🇴',
  RU: '🇷🇺',
  RW: '🇷🇼',
  SH: '🇸🇭',
  KN: '🇰🇳',
  LC: '🇱🇨',
  PM: '🇵🇲',
  VC: '🇻🇨',
  WS: '🇼🇸',
  SM: '🇸🇲',
  ST: '🇸🇹',
  SA: '🇸🇦',
  SN: '🇸🇳',
  RS: '🇷🇸',
  SC: '🇸🇨',
  SL: '🇸🇱',
  SG: '🇸🇬',
  SX: '🇸🇽',
  SK: '🇸🇰',
  SI: '🇸🇮',
  SB: '🇸🇧',
  SO: '🇸🇴',
  ZA: '🇿🇦',
  GS: '🇬🇸',
  KR: '🇰🇷',
  SS: '🇸🇸',
  ES: '🇪🇸',
  LK: '🇱🇰',
  SD: '🇸🇩',
  SR: '🇸🇷',
  SJ: '🇸🇯',
  SZ: '🇸🇿',
  SE: '🇸🇪',
  CH: '🇨🇭',
  SY: '🇸🇾',
  TW: '🇹🇼',
  TJ: '🇹🇯',
  TZ: '🇹🇿',
  TH: '🇹🇭',
  TL: '🇹🇱',
  TG: '🇹🇬',
  TK: '🇹🇰',
  TO: '🇹🇴',
  TT: '🇹🇹',
  TN: '🇹🇳',
  TR: '🇹🇷',
  TM: '🇹🇲',
  TC: '🇹🇨',
  TV: '🇹🇻',
  UG: '🇺🇬',
  UA: '🇺🇦',
  AE: '🇦🇪',
  GB: '🇬🇧',
  US: '🇺🇸',
  UM: '🇺🇲',
  VI: '🇻🇮',
  UY: '🇺🇾',
  UZ: '🇺🇿',
  VU: '🇻🇺',
  VA: '🇻🇦',
  VE: '🇻🇪',
  VN: '🇻🇳',
  WF: '🇼🇫',
  EH: '🇪🇭',
  YE: '🇾🇪',
  ZM: '🇿🇲',
  ZW: '🇿🇼'
};
// Create the SVG map
svgMap.prototype.createMap = function () {

  // Create the tooltip
  this.createTooltip();

  // Create map wrappers
  this.mapWrapper = this.createElement('div', 'svgMap-map-wrapper', this.wrapper);
  this.mapImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  this.mapImage.setAttribute('viewBox', '0 0 2000 1001');
  this.mapImage.classList.add('svgMap-map-image');
  this.mapWrapper.appendChild(this.mapImage);

  // Add controls
  var mapControlsWrapper = this.createElement('div', 'svgMap-map-controls-wrapper', this.mapWrapper);
  var zoomContainer = this.createElement('div', 'svgMap-map-controls-zoom', mapControlsWrapper);
  ['in', 'out'].forEach(function (item) {
    var zoomControlName = 'zoomControl' + item.charAt(0).toUpperCase() + item.slice(1);
    this[zoomControlName] = this.createElement('div', 'svgMap-control-button svgMap-zoom-button svgMap-zoom-' + item + '-button', zoomContainer);
    this[zoomControlName].addEventListener('click', function () {
      this.zoomMap(item);
    }.bind(this));
  }.bind(this));

  // Fix counties
  var mapPaths = Object.assign({}, this.mapPaths);

  

  // Add map elements
  Object.keys(mapPaths).forEach(function (countyID) {
    var countyData = this.mapPaths[countyID];
    if (!countyData.d) {
      return;
    }

    var countyElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    countyElement.setAttribute('d', countyData.d);
    countyElement.setAttribute('id', this.id + '-map-county-' + countyID);
    countyElement.setAttribute('data-id', countyID);
    countyElement.classList.add('svgMap-county');

    this.mapImage.appendChild(countyElement);

    ['mouseenter', 'touchdown'].forEach(function (event) {
      countyElement.addEventListener(event, function () {
        countyElement.closest('g').appendChild(countyElement);
      }.bind(this));
    }.bind(this));

    // TODO Tooltip events
    // Make Country fixed on click
    /* countyElement.addEventListener('click', function () {
      var countyID = countyElement.getAttribute('data-id');
      console.log(countyID);
    });*/

    // Tooltip events
    countyElement.addEventListener('mouseenter', function (e) {
      var countyID = countyElement.getAttribute('data-id');
      this.setTooltipContent(this.getTooltipContent(countyID));
      this.showTooltip(e);
    }.bind(this));

    countyElement.addEventListener('mousemove', function (e) {
      this.moveTooltip(e);
    }.bind(this));

    countyElement.addEventListener('mouseleave', function () {
      this.hideTooltip();
    }.bind(this));

  }.bind(this));

  // Expose instance
  var me = this;

  // Init pan zoom
  this.mapPanZoom = svgPanZoom(this.mapImage, {
    zoomEnabled: true,
    fit: true,
    center: true,
    minZoom: this.options.minZoom,
    maxZoom: this.options.maxZoom,
    zoomScaleSensitivity: this.options.zoomScaleSensitivity,
    controlIconsEnabled: false,
    mouseWheelZoomEnabled: this.options.mouseWheelZoomEnabled, // TODO Only with key pressed
    onZoom: function () {
      me.setControlStatuses();
    },
    beforePan: function (oldPan, newPan) {
      var gutterWidth = me.mapWrapper.offsetWidth * 0.85;
      var gutterHeight = me.mapWrapper.offsetHeight * 0.85;
      var sizes = this.getSizes();
      var leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
      var rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
      var topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
      var bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
      return {
        x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
        y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
      }
    }
  });

  // Init pan zoom
  this.mapPanZoom.zoom(this.options.initialZoom);

  // Initial zoom statuses
  this.setControlStatuses();
}

// Create the tooltip content
svgMap.prototype.getTooltipContent = function (countyID) {
  var tooltipContentWrapper = this.createElement('div', 'svgMap-tooltip-content-container');

  if (this.options.hideFlag === false) {
    // Flag
    var flagContainer = this.createElement('div', 'svgMap-tooltip-flag-container svgMap-tooltip-flag-container-' + this.options.flagType, tooltipContentWrapper)

    if (this.options.flagType === 'image') {
      this.createElement('img', 'svgMap-tooltip-flag', flagContainer)
          .setAttribute('src', this.options.flagURL.replace('{0}', countyID.toLowerCase()));
    } else if (this.options.flagType === 'emoji') {
      flagContainer.innerHTML = this.emojiFlags[countyID];
    }
  }

  // Title
  this.createElement('div', 'svgMap-tooltip-title', tooltipContentWrapper)
    .innerHTML = this.getCountryName(countyID);

  // Content
  var tooltipContent = this.createElement('div', 'svgMap-tooltip-content', tooltipContentWrapper);
  if (!this.options.data.values[countyID]) {
    this.createElement('div', 'svgMap-tooltip-no-data', tooltipContent).innerHTML = this.options.noDataText;
  } else {
    tooltipContentTable = '<table>';
    Object.keys(this.options.data.data).forEach(function (key) {
      var item = this.options.data.data[key];
      var value = this.options.data.values[countyID][key];
      item.floatingNumbers && (value = value.toFixed(1));
      item.thousandSeparator && (value = this.numberWithCommas(value, item.thousandSeparator));
      value = item.format ? item.format.replace('{0}', '<span>' + value + '</span>') : '<span>' + value + '</span>';
      tooltipContentTable += '<tr><td>' + (item.name || '') + '</td><td>' + value + '</td></tr>';
    }.bind(this));
    tooltipContentTable += '</table>';
    tooltipContent.innerHTML = tooltipContentTable;
  }
  return tooltipContentWrapper;
};

// Set the disabled statuses for buttons
svgMap.prototype.setControlStatuses = function () {

  this.zoomControlIn.classList.remove('svgMap-disabled');
  this.zoomControlOut.classList.remove('svgMap-disabled');

  if (this.mapPanZoom.getZoom().toFixed(3) <= this.options.minZoom) {
    this.zoomControlOut.classList.add('svgMap-disabled');
  }
  if (this.mapPanZoom.getZoom().toFixed(3) >= this.options.maxZoom) {
    this.zoomControlIn.classList.add('svgMap-disabled');
  }
};

// Zoom map
svgMap.prototype.zoomMap = function (direction) {
  if (this['zoomControl' + direction.charAt(0).toUpperCase() + direction.slice(1)].classList.contains('svgMap-disabled')) {
    return false;
  }
  this.mapPanZoom[direction == 'in' ? 'zoomIn' : 'zoomOut']();
};

// https://upload.wikimedia.org/wikipedia/commons/9/9b/Population_density_of_Ireland_map2002.svg
svgMap.prototype.mapPaths = {
  "C": {
    "d": "M 300.35712,744.867 C 298.77341,744.8555 297.57573,745.18 297.14464,746.0421 C 296.63352,747.0643 298.26213,749.2277 297.14464,749.467 C 280.57589,753.0176 293.51069,752.5386 288.58213,757.467 C 288.07997,757.9693 274.29462,765.829 274.29462,761.467 C 274.29462,756.7835 268.66816,756.7624 265.14462,757.467 C 262.89266,757.9174 257.19576,759.2051 254.86963,758.0421 C 253.29168,757.2531 250.34936,754.4504 247.43213,755.1797 C 244.41848,755.9331 239.77264,761.2765 238.29462,762.6171 C 237.15178,762.9981 238.96202,766.2475 238.86963,766.6171 C 238.49346,768.1218 235.47242,773.6093 234.29462,775.1797 C 232.0511,778.171 225.44688,779.3992 229.14462,784.3296 C 231.94694,788.0659 234.96286,790.5333 236.00714,795.7546 C 236.40762,797.7571 238.86963,802.8694 238.86963,804.9046 C 238.86963,807.9782 236.85877,813.1813 239.43213,815.7546 C 243.43483,819.7573 240.89749,820.2739 238.86963,824.3296 C 235.71822,830.6323 244.00714,827.5093 244.00714,832.3296 C 244.00714,839.2342 233.30373,838.4008 229.71963,843.1797 C 227.57742,846.036 226.86963,849.8198 226.86963,853.467 C 226.86963,855.8418 227.98894,864.6805 225.71963,866.0421 C 222.3971,868.0357 211.77027,866.8539 209.71963,868.9046 C 206.39934,872.225 205.99616,878.6171 200.00714,878.6171 C 197.94682,878.6171 196.9264,881.9211 194.86963,882.0421 C 191.63154,882.2326 188.38832,882.6171 185.14462,882.6171 C 179.00013,882.6171 173.41786,880.9742 172.00714,886.6171 C 171.07149,890.3597 167.22827,893.3806 164.58213,894.0421 C 160.01,895.1851 156.03824,898.3078 154.29462,899.1797 C 152.49037,900.0818 147.43213,904.3814 147.43213,899.1797 C 147.43213,895.7632 147.73803,888.1867 146.75714,885.2421 C 146.60965,885.2845 146.45565,885.3046 146.28213,885.3046 C 145.6087,885.3046 144.93058,885.3045 144.25714,885.3046 C 142.79226,885.3046 138.59462,882.363 138.59462,885.7171 C 138.59462,890.2123 136.79115,890.9302 132.54462,891.7797 C 125.40552,893.2074 129.8696,894.6795 132.94462,896.2171 C 136.02054,897.755 136.44869,899.515 132.54462,901.467 C 128.53694,903.471 124.74078,901.7506 122.03213,900.667 C 119.74246,899.7512 115.00528,899.4546 111.53213,899.4546 C 108.33762,899.4546 108.79326,900.8643 109.90714,903.0922 C 110.53066,904.3392 113.90686,907.265 112.33213,909.1546 C 109.20758,912.9042 105.15029,912.1066 101.01963,915.2046 C 99.87616,916.0622 95.75702,920.2608 98.59462,921.6797 C 100.59406,922.6794 104.89491,925.0667 107.48213,922.4797 C 109.5325,920.4293 112.45912,919.5275 114.75714,917.2296 C 118.23568,913.751 119.77677,916.5531 124.45714,915.6171 C 128.52902,914.8027 131.48445,915.2046 135.76963,915.2046 C 135.76963,914.9352 135.50026,914.4045 135.76963,914.4046 C 139.11466,914.4046 143.02509,920.2645 145.86963,918.8421 C 149.5836,916.9851 152.01214,915.9062 154.35714,912.7797 C 155.29445,911.5298 157.76757,904.7046 159.20714,904.7046 C 161.8295,904.7046 164.9109,901.8795 165.26963,901.8797 C 167.06403,901.8797 172.39578,903.7006 173.75714,902.6797 C 176.4015,900.6963 178.60325,900.5309 181.83213,899.4546 C 185.69478,898.167 187.28714,895.8187 189.10714,893.3922 C 190.43856,891.6168 193.60339,888.0978 194.76963,892.1797 C 196.35398,897.7248 195.9915,895.8266 198.40714,898.2421 C 199.39568,899.2307 205.25464,901.8322 205.66963,903.4922 C 206.65122,907.4184 204.44819,907.7349 200.41963,908.7421 C 197.75046,909.4094 194.94386,912.2597 192.34462,912.7797 C 188.41541,913.5654 178.50966,912.2346 176.58213,914.8046 C 172.8497,919.7811 170.30738,918.992 164.05714,920.867 C 159.77336,922.1522 154.83515,922.0459 150.71963,923.6922 C 146.26203,925.4752 147.41979,927.9925 149.10714,931.367 C 149.94589,933.0446 150.93528,935.0395 153.54462,934.6046 C 156.96709,934.0341 158.91634,931.8914 161.23213,930.1546 C 162.40374,929.2758 168.06544,927.14 168.90714,926.9296 C 171.64283,926.2456 175.3591,924.028 177.79462,922.0797 C 181.20331,919.3526 182.24338,920.0546 185.46963,920.0546 C 186.60928,920.0546 193.2249,922.4256 189.91963,924.9046 C 182.91752,930.1562 192.78317,927.4262 180.21963,930.567 C 175.69328,931.6987 168.28747,932.4766 166.08213,935.4171 C 160.95512,942.2531 163.74274,938.4965 156.78213,941.4797 C 154.18827,942.5912 148.61282,949.1546 152.33213,949.1546 C 155.52706,949.1546 158.38691,949.9546 162.03213,949.9546 C 163.83963,949.9546 167.14974,951.8445 168.09462,949.9546 C 169.20747,947.729 169.79218,944.6621 172.13213,943.4922 C 174.10462,942.5059 176.74242,942.6795 179.40714,942.6797 C 181.60955,942.6795 187.52832,943.8373 188.70714,941.4797 C 190.73246,937.429 191.38531,940.221 194.76963,941.067 C 196.44531,941.4861 198.17366,941.7006 199.60714,940.267 C 201.9657,937.9085 201.46368,933.3531 204.86963,934.2046 C 208.42675,935.0939 209.30714,936.3542 209.30714,939.8546 C 209.30714,943.68 211.2457,945.591 214.15714,942.6797 C 216.7876,940.0491 218.60712,941.2221 218.60714,944.7046 C 218.60714,949.1355 218.4268,949.1546 222.24462,949.1546 C 225.76642,949.1546 227.50403,946.3171 229.91963,946.3171 C 233.60638,946.3171 234.96384,948.6717 237.99462,949.1546 C 238.66398,949.2613 239.33778,949.3605 240.00714,949.467 C 240.00714,947.0856 239.62112,944.3581 240.00714,942.0421 C 240.61278,938.4082 246.29462,937.4894 246.29462,937.467 C 246.29462,931.8578 244.51203,932.0771 248.58213,930.0421 C 252.5271,928.0696 252.45192,934.0715 254.86963,933.467 C 257.81384,932.731 262.44074,934.419 265.59462,932.8421 C 269.97918,930.6498 270.80506,929.9776 274.29462,933.467 C 278.17285,937.3453 281.91997,936.7107 283.13213,932.7296 C 283.13213,931.5867 285.86309,931.7414 286.36965,930.7171 C 288.31469,926.7834 285.41485,920.2896 289.71965,920.9046 C 290.47184,921.0122 300.60168,922.4557 301.14464,923.1797 C 304.10965,927.133 308.30957,930.7235 314.29464,928.3296 C 318.95061,926.4672 316.50856,922.3563 314.86965,920.3296 C 314.07824,919.3509 301.59525,913.5878 309.14464,912.3296 C 311.7548,911.8946 313.58904,908.8674 316.00712,909.9421 C 324.8768,913.8842 328.18552,914.2205 334.29464,920.3296 C 336.09728,922.1323 337.05517,918.8418 340.30712,915.2421 C 342.93352,912.3349 338.89568,909.6184 340.88213,906.1421 C 346.91813,895.579 349.13997,905.4718 353.14464,901.467 C 355.01368,899.5981 356.62405,895.7546 360.58213,895.7546 C 363.13624,895.7546 372.40117,895.2117 370.86965,890.6171 C 370.60656,889.8278 370.6512,882.069 369.71965,880.9046 C 368.95773,879.9522 366.98157,877.5819 366.21965,876.6296 C 367.03781,876.016 374.78229,870.2642 373.71965,869.467 C 370.92229,867.3691 365.18984,861.1776 368.58213,860.3296 C 371.6144,859.5715 372.47272,863.864 374.29464,862.0421 C 375.64088,860.6958 383.81989,857.8664 381.71965,859.1797 C 380.12565,860.1763 386.86248,859.2605 385.71965,870.6171 C 385.24477,875.3358 372.00133,873.5837 379.43213,878.0421 C 381.41232,879.2302 389.43445,884.1784 391.43213,883.1797 C 394.20045,881.7955 400.37632,883.0038 401.14464,881.467 C 403.02192,877.7126 411.92304,876.2 412.58208,872.9046 C 413.63408,867.6451 415.98896,868.453 420.0072,866.0421 C 421.09968,865.3866 433.64416,861.9666 431.43216,859.7546 C 430.42048,858.743 425.62032,857.3142 426.29472,854.6171 C 426.55536,853.5741 434.66992,845.8954 432.58208,844.3296 C 430.54656,842.803 430.00944,840.6288 430.18208,838.0922 C 430.02352,838.0754 429.89328,838.0576 429.71968,838.0421 C 432.60608,837.3205 418.82464,833.3795 417.71968,830.6171 C 416.65712,827.9608 415.50544,824.4029 413.71968,822.6171 C 407.66736,816.5648 416.23376,816.5064 405.14464,814.0421 C 401.98464,813.3398 398.14973,808.1846 396.00712,806.0421 C 392.18861,802.2235 389.14464,802.0373 389.14464,795.7546 C 389.14464,792.3322 393.83272,789.777 395.53213,786.667 C 395.20384,786.361 394.87933,786.0464 394.55712,785.7296 C 393.24976,785.7822 386.29464,784.4134 386.29464,778.6171 C 386.29464,774.9587 387.43213,774.5883 387.43213,770.7046 C 390.28928,767.0856 387.04941,766.6099 387.14464,765.467 C 380.1432,766.1102 377.8628,764.9045 370.86965,764.9046 C 369.51944,764.9046 361.14464,761.2763 361.14464,761.467 C 361.14464,761.848 361.44213,762.379 361.14464,762.6171 C 359.13304,764.2264 348.47032,770.5674 345.71965,769.467 C 344.0092,768.7829 335.77189,769.8069 334.29464,768.3296 C 334.09877,768.1338 327.1068,759.7546 326.86965,759.7546 C 320.17317,759.7546 326.44765,753.7352 322.29464,752.9046 C 308.73717,750.1931 321.85957,753.0986 314.86965,748.9046 C 313.35453,747.9955 305.10829,744.9016 300.35712,744.867 z M 394.55712,785.7296 C 394.88397,785.7165 394.87309,785.6117 394.29464,785.467 C 394.38261,785.5549 394.46872,785.6426 394.55712,785.7296 z M 430.9696,833.667 C 430.84576,834.1627 430.73504,834.6478 430.63216,835.1296 C 430.73488,834.6488 430.84592,834.1619 430.9696,833.667 z"
  },
  "CE": {
    "d": "M 265.0625,562.1517 C 259.19064,562.1517 261.42499,562.479 261.42501,566.1891 C 261.42501,570.0704 259.31738,572.6834 254.9625,571.4392 C 250.93394,570.2882 250.72189,570.6392 248.5,570.6392 C 243.94414,570.639 245.33227,568.2267 242.0375,564.5766 C 237.68669,559.7565 233.57994,564.3971 233.55,564.5766 C 233.11938,567.1603 234.05194,574.8853 231.52501,576.2891 C 225.1084,579.8539 228.33704,582.3176 226.67501,583.5642 C 223.80754,585.7147 221.36413,586.5717 220.2125,590.0267 C 219.11843,593.3088 217.52851,596.3429 216.17501,599.7267 C 215.41725,601.6211 209.3,603.9357 209.3,605.3891 C 209.3,608.4206 209.1061,609.4274 208.5,611.8517 C 208.00589,613.8282 202.11926,617.9142 207.6875,617.9142 C 207.7773,617.9142 207.33272,617.9142 208.5,617.9142 C 212.30034,617.9141 213.45485,614.6766 216.97501,614.6766 C 222.01549,614.6766 222.7051,616.6216 219.4,619.9267 C 216.62883,622.6978 219.81685,624.7744 215.7625,626.8016 C 212.81382,628.276 212.43235,632.5104 211.72501,632.8642 C 206.84443,635.3045 206.36027,635.5061 204.05,640.1267 C 202.81411,642.5984 198.4,643.4256 198.4,646.1891 C 198.4,649.5546 200.31717,650.2704 200.8125,652.2517 C 202.20616,657.8262 195.89005,654.6766 192.7375,654.6766 C 187.4185,654.6766 188.46648,659.1365 185.4625,661.1392 C 181.08312,664.0587 179,665.8658 179,670.8392 C 179,673.9774 179.55078,676.9018 175.7625,676.9016 C 173.99392,676.9016 168.43291,676.2824 167.2875,677.7142 C 166.4672,678.7395 164.81267,683.3954 164.05,683.7766 C 161.3204,685.1414 157.77733,689.4267 154.35,689.4267 C 150.20448,689.4267 150.47794,690.6555 147.4875,691.8517 C 145.99782,692.4475 136.16282,698.7267 141.42501,698.7267 C 144.95909,698.7267 152.07752,697.5222 154.75,699.5267 C 158.03168,701.9878 156.8957,698.3141 158.3875,698.3142 C 159.19562,698.3141 160.00438,698.3141 160.8125,698.3142 C 162.4657,698.3142 169.19451,695.9382 170.9125,693.8766 C 171.99739,692.5747 177.24995,687.7142 178.1875,687.4016 C 180.61187,686.5936 183.65547,691.6336 185.4625,689.8267 C 188.00515,687.284 189.23483,685.541 188.2875,681.7517 C 187.68437,679.3392 188.01896,677.6782 191.12501,676.9016 C 193.46984,676.3155 194.64341,680.701 195.97501,683.3642 C 196.96026,685.3347 198.08445,690.7907 202.4375,688.6142 C 209.14418,685.2608 204.21501,689.8267 211.32501,689.8267 C 215.70358,689.8267 216.11539,688.6182 219.8125,686.6016 C 221.53512,685.6621 230.36989,681.0539 232.3375,684.9891 C 234.82608,689.9664 229.28898,684.6237 227.0875,689.0267 C 224.95074,693.3002 228.33414,692.2517 231.92501,692.2517 C 234.10806,692.2517 238.4021,690.8318 240.4125,689.8267 C 245.0139,687.5259 241.06379,688.501 247.2875,685.3891 C 250.91627,683.5747 253.22979,680.2594 255.77501,677.7142 C 257.75504,675.7341 257.88894,671.5627 259.4125,670.0392 C 261.35896,668.0926 264.70795,666.196 263.85,662.7642 C 263.5683,661.6374 263.05416,654.6766 265.0625,654.6766 C 273.46594,654.6766 269.87285,653.6624 271.12501,647.4016 C 271.87355,643.6589 273.04813,643.0536 275.1625,640.9392 C 278.27666,637.825 278.39909,648.2446 278,650.6392 C 277.42467,654.091 272.3375,656.1584 272.3375,659.1267 C 272.3375,662.7942 275.57501,664.1874 275.57501,667.2016 C 275.57501,668.6334 278.68078,669.0352 278.4,670.4392 C 278.26531,671.1126 277.32432,672.3288 278,672.4517 C 280.97886,672.9933 288.7889,673.2642 292.5375,673.2642 C 296.91632,673.2642 299.83104,675.456 304.2625,676.0891 C 305.58939,676.2787 319.48122,677.8827 320.0125,680.5392 C 320.94827,682.7885 325.58395,680.344 326.8625,679.4392 C 327.59966,678.7021 335.67872,677.2317 336,676.5891 C 336.92125,674.7466 339.42501,671.9184 339.42501,669.7267 C 339.42501,667.2883 344.68346,657.8888 346.0125,658.1642 C 346.06547,658.1752 346.11032,658.2069 346.15,658.2517 C 346.19547,658.0766 346.24202,657.9016 346.2875,657.7267 C 344.06619,659.948 347.17011,651.3989 348.57501,648.5891 C 350.048,645.643 344.14301,640.4251 344.14301,637.7267 C 344.14301,633.0674 356.4195,625.3326 340.00952,623.9944 C 336.86923,623.7382 346.95024,617.648 350.13422,615.7376 C 354.44597,613.1506 363.32379,617.8595 363.32381,613.2456 C 363.32381,607.4904 366.20016,607.8555 365.1375,604.3016 C 365.79126,607.6043 354.04286,602.9989 350.8625,604.5891 C 346.84648,606.5971 342.14515,599.8718 341.1375,598.8642 C 339.72357,597.4502 332.77603,596.7306 330.2875,594.8642 C 326.3072,591.879 322.41886,595.2682 320.57501,597.7267 C 318.51926,600.4677 315.36014,600.0141 310.8625,600.0142 C 310.21298,600.0142 305.60021,604.0141 301.7125,604.0142 C 297.55125,604.0142 295.49554,609.6037 289.1375,608.0142 C 287.60459,607.6309 289.1375,600.0682 289.1375,598.8642 C 289.1375,595.3565 285.3467,592.4477 284.57501,588.5891 C 283.78854,584.6568 281.08669,583.7512 277.7125,581.7267 C 272.23912,578.4426 272.76757,575.6718 271.42501,570.3016 C 271.324,569.8976 271.226,569.4931 271.12501,569.0891 C 270.63906,568.8144 270.10008,568.3893 269.5125,567.8016 C 267.94656,566.2357 267.53005,562.1517 265.0625,562.1517 z"
  },
  "CN": {
    "d": "M 417.02496,301.4141 C 416.68,301.7019 416.33712,301.9958 416,302.3016 C 415.44448,304.5237 414.972,305.4259 412.57504,306.8642 C 406.96304,310.2314 407.42496,310.7066 407.42496,317.1517 C 407.42496,319.6614 406.22912,326.1974 407.42496,328.5891 C 409.82624,333.3917 411.83616,328.6858 416,329.7267 C 419.28272,330.5474 421.11488,331.9438 422.86256,335.4392 C 424.87888,339.472 427.10128,338.5403 429.71248,341.1517 C 434.12544,345.5646 436.55744,343.2482 441.1376,346.3016 C 445.24048,349.037 444.79072,351.0923 448,354.3016 C 450.34976,356.6514 453.02448,359.545 454.86256,362.3016 C 456.84496,365.2755 461.1376,368.4315 461.1376,371.4392 C 461.1376,374.6829 459.4224,382.8581 462.28752,385.1517 C 468.0192,385.1517 465.19792,386.3494 468,389.1517 C 471.04416,392.1958 472.23712,393.9637 475.42496,397.1517 C 477.90016,399.6269 481.41984,403.4286 483.42496,407.4392 C 484.74672,410.0824 487.9792,414.2061 488.57504,416.5891 C 488.884,417.8254 491.85104,428.2995 495.42496,421.1517 C 495.7112,421.1034 495.97024,421.0246 496.21248,420.9392 C 495.75824,420.6875 495.59632,420.2464 496,419.4392 C 497.38576,416.6677 499.57232,418.2342 502.86256,416.5891 C 505.44144,415.2995 514.76432,420.6749 517.71248,417.7267 C 519.34048,416.0986 525.65584,411.9451 528.57504,414.8642 C 529.20304,415.4922 533.26864,420.347 533.71248,420.0142 C 536.5808,417.8629 537.2528,418.6979 541.1376,417.7267 C 542.12528,417.4797 551.53648,418.1902 552.57504,417.1517 C 553.96128,415.7654 555.60544,413.907 553.1376,411.4392 C 552.19488,410.4965 551.82224,405.9043 554.28752,403.4392 C 557.33936,400.3874 553.08144,400.8384 554.28752,396.0141 C 555.90368,389.5491 557.69872,394.8581 561.71248,397.1517 C 562.92624,397.8453 571.94928,401.215 573.71248,398.8642 C 575.72816,396.1766 582.99824,393.0355 584.91248,392.1141 C 584.9048,391.827 584.8944,391.5389 584.88752,391.2517 C 584.39904,391.3018 583.9096,391.3618 583.42496,391.4392 C 582.7056,391.7989 573.79792,384.0813 571.42496,382.3016 C 567.02512,379.0018 567.08192,380.4248 566.28752,374.8642 C 566.15456,373.9338 560.06176,368.0635 558.86256,366.8642 C 556.10016,364.1019 555.21216,366.4509 553.1376,362.3016 C 551.82416,359.6747 548.71616,356.0464 546.28752,355.4392 C 543.97184,354.8603 541.21824,354.012 540.57504,351.4392 C 539.27232,346.2286 541.6592,345.7267 535.42496,345.7267 C 528.95568,345.7267 524.52208,344.6184 518.86256,348.0141 C 515.06544,350.2923 507.75616,346.3629 504.57504,345.7267 C 504.2192,345.6555 508,338.9662 508,337.1517 C 508,334.1973 509.73808,332.5984 506.86256,330.5891 C 506.86592,330.5627 506.87152,330.5403 506.87504,330.5141 C 506.62128,330.6731 506.40384,330.8075 506.28752,330.8642 C 506.74912,329.0176 497.28256,338.8278 497.1376,338.8642 C 494.02992,339.6411 488.84512,343.4069 487.42496,337.7267 C 486.27344,333.1202 482.18768,340.6766 481.71248,341.1517 C 476.64848,346.2157 473.49776,335.2386 472,334.8642 C 467.40832,333.7163 464.54,332.0141 459.42496,332.0141 C 454.5608,332.0141 454.28752,330.6574 454.28752,326.3016 C 454.28752,321.8432 451.87536,322.1205 448,321.1517 C 443.76128,320.092 443.24672,321.1517 438.86256,321.1517 C 435.66656,321.1517 434.4536,317.3178 432,314.8642 C 429.70464,312.5688 427.92288,309.6496 425.71248,307.4392 C 422.8048,304.5314 424.5768,303.5896 419.42496,302.3016 C 419.3928,302.2936 418.00912,301.3477 417.02496,301.4141 z"
  },
  "CW": {
    "d": "M 585.31248,619.7642 C 585.25392,619.847 585.19328,619.929 585.1376,620.0142 C 584.31824,621.6528 582.04624,623.8168 581.71248,625.1517 C 580.61504,629.5416 574.2968,627.9643 573.71248,630.3016 C 572.66304,634.4998 561.71072,631.9154 561.42496,632.3016 C 560.936,632.6258 558.86256,634.9261 558.86256,636.5891 C 558.8624,644.1522 557.5248,639.5738 553.1376,642.8642 C 549.6904,645.4496 544.77904,649.5173 542.57504,650.8642 C 542.10352,651.0357 539.89536,661.8312 539.42496,662.3016 C 535.61104,666.1157 535.5936,669.0765 540,672.0142 C 543.65472,674.4507 549.71248,675.3067 549.71248,680.0142 C 549.71248,684.1816 548.7352,688.7494 551.42496,691.4392 C 553.3632,693.3774 558.17856,696.7037 558.86256,699.4392 C 559.52864,702.1043 564.6536,703.8446 563.42496,706.3016 C 562.53488,708.0819 559.87392,711.3936 558.86256,715.4392 C 557.67776,720.1782 559.93424,721.661 562.28752,724.0142 C 562.33072,724.1366 562.36,724.2459 562.4,724.3642 C 564.08704,721.4336 572.37424,717.3546 573.1376,714.3016 C 574.66016,708.2112 584.96784,713.0109 582.86256,704.5891 C 581.88256,700.6693 582.8624,695.5285 582.86256,691.4392 C 582.8624,684.1176 593.24512,684.5891 597.71248,684.5891 C 602.49488,684.5891 603.92912,681.6558 601.1376,678.8642 C 597.45184,675.1786 600.20944,674.6432 606.28752,670.3016 C 606.63472,670.1162 606.9752,669.9298 607.3,669.7392 C 604.40704,669.391 606.7712,659.3478 604.57504,657.1517 C 602.01152,654.5882 599.42496,657.3578 599.42496,651.4392 C 599.42496,647.94 603.0392,645.1138 605.1376,644.5891 C 608.48,643.7534 612.58448,642.8642 617.1376,642.8642 C 618.61184,642.864 617.1376,632.5091 617.1376,631.4392 C 617.1376,628.2706 620.49264,621.7739 614.86256,624.5891 C 613.86912,625.0859 612.95248,625.7302 612,626.3016 C 607.75696,628.8475 606.85936,625.1486 604.57504,622.8642 C 601.89824,620.1874 599.54768,622.9256 596,621.1517 C 592.75648,619.5299 590.49184,621.1517 586.86256,621.1517 C 586.26768,620.8542 585.7584,620.3701 585.31248,619.7642 z"
  },
  "D": {
    "d": "M 656.46256,449.9891 C 656.30848,450.096 656.15408,450.192 656,450.3016 C 655.25632,450.153 649.71248,457.9102 649.71248,460.5891 C 649.71248,465.1464 648.52272,464.8605 645.1376,464.0142 C 639.54016,462.6149 639.5416,461.2533 633.71248,463.4392 C 633.07344,463.6789 630.3728,468.2528 628.57504,469.1517 C 624.13088,471.3738 631.33024,476.6494 632,477.1517 C 633.5136,478.2869 638.28752,482.8762 638.28752,485.1517 C 638.28752,489.0517 640.12352,492.4531 637.1376,495.4392 C 634.07888,498.4979 632.53152,501.1672 629.1376,502.8642 C 628.8232,503.0214 627.70512,507.585 624.57504,508.8642 C 625.89312,513.8507 625.30768,518.5715 620.57504,521.7267 C 618.72304,522.9613 616.43984,528.3693 616,528.5891 C 613.00096,530.0886 613.1376,531.471 613.1376,536.0142 C 613.1376,540.8453 617.57776,546.8659 622,547.1517 C 622.85712,547.4374 623.42864,547.4392 624,547.4392 C 629.07136,547.4392 632.85968,547.1613 636,550.3016 C 636.82352,551.1251 644.57504,558.3968 644.57504,557.7267 C 644.57504,554.1674 645.43984,546.0166 650.86256,551.4392 C 651.2368,551.8134 658.28752,559.1056 658.28752,556.5891 C 658.28752,552.9581 659.01808,548.0499 663.42496,549.1517 C 666.00704,549.7971 670.45312,554.0008 673.1376,556.0142 C 673.59952,555.9216 674.05872,555.7522 674.52496,555.7016 C 673.93648,553.2283 675.05632,550.5144 674.28752,547.4392 C 673.37664,543.7957 670.8624,540.5176 670.86256,536.0142 C 670.8624,529.3278 663.13808,532.2896 660,529.1517 C 657.55184,526.7034 658.28752,522.6616 658.28752,518.8642 C 658.28752,512.0686 664.98096,516.0141 669.71248,516.0142 C 677.79904,516.0141 685.07008,517.6667 676,510.8642 C 673.4096,508.9213 667.42496,509.5397 667.42496,506.3016 C 667.42496,505.7302 667.68064,505.1002 667.42496,504.5891 C 666.6816,503.1024 659.28832,494.6947 662.86256,492.0142 C 674.53504,483.2598 667.37104,490.648 665.71248,484.0142 C 663.55168,475.3706 674.28752,479.3722 674.28752,476.5891 C 674.28752,470.675 670.00608,466.3603 665.1376,463.4392 C 659.25072,459.907 660.3456,453.7291 658.28752,452.0142 C 657.51424,451.3698 656.92256,450.6882 656.46256,449.9891 z"
  },
  "DL": {
    "d": "M 498.66256,52.4141 C 496.0368,52.4214 493.3856,52.5891 490.86256,52.5891 C 485.76464,52.5891 487.1968,55.6662 490.28752,57.7266 C 493.76384,60.0442 497.02384,64.2386 500,65.7266 C 501.27952,66.3664 505.37008,73.1346 503.42496,74.3016 C 497.82448,77.6619 496.15568,77.1757 493.1376,73.1515 C 488.17456,66.5342 491.20336,71.3077 488,72.5891 C 485.69344,73.5117 478.35968,73.1155 478.28752,73.1515 C 475.28144,74.6547 470.8624,75.5173 470.86256,80.5891 C 470.8624,84.9864 470.5944,88.0531 472.57504,92.0141 C 473.9024,94.6688 475.85536,96.2998 477.1376,98.8642 C 478.97904,102.5474 478.8624,105.8045 478.86256,110.3016 C 478.8624,114.2602 479.35632,118.4387 477.71248,121.7267 C 477.01008,123.1315 477.20256,132.2885 476,132.5891 C 473.52256,133.2085 465.71248,134.5403 465.71248,137.7267 C 465.71248,143.5907 466.17952,143.3826 462.28752,146.3016 C 460.92176,147.3259 448.55664,152.5509 451.9,145.8642 C 453.5864,142.4912 457.19344,140.9277 458.18752,136.9517 C 459.11728,133.2322 462.42352,132.3206 463.45008,129.8891 C 463.81376,129.0277 460.33376,127.992 460.67504,126.6267 C 461.73456,122.3882 463.79872,121.5542 465.71248,117.7267 C 467.47184,114.208 469.7848,116.8534 468.57504,112.0141 C 467.8552,109.135 466.78752,107.2966 466.78752,103.7141 C 466.78752,100.0443 465.09104,93.5776 461.1376,92.5891 C 455.78256,91.2504 459.50432,88.1952 457.71248,84.0141 C 454.87488,77.3933 452.1728,79.439 444,79.439 C 440.41744,79.439 433.61536,80.5278 432.47504,85.0891 C 431.77136,87.9037 426.548,90.0274 427.02496,92.8891 C 427.67776,96.8051 431.42496,95.5518 431.42496,99.4392 C 431.42496,103.6688 428.67168,106.4883 426.86256,108.5891 C 426.67168,107.9858 422.94384,111.173 423.45008,101.9267 C 423.65072,98.2597 423.58848,96.205 414.76256,95.8642 C 412.19168,95.765 418.2208,92.6843 417.4,89.4016 C 416.40672,85.4283 411.73872,86.3634 408.91248,87.7766 C 406.04224,89.2117 407.69536,95.107 405.67504,97.4766 C 404.1696,99.2424 401.02976,99.7842 398.4,100.3016 C 395.45467,100.8813 400.8352,109.1448 393.7625,107.3766 C 391.40797,106.788 391.77422,105.3042 389.5125,102.7267 C 387.86874,100.8533 385.66838,105.7029 383.05,103.7392 C 377.37173,99.4805 378.81328,104.7517 374.5625,104.7517 C 372.98595,104.7517 368.50002,104.128 368.5,106.3642 C 368.5,107.8933 369.29554,114.1888 370.52501,115.6642 C 373.8124,119.609 371.38898,118.1366 369.7125,121.7267 C 368.02213,125.3464 370.412,129.0302 369.1125,133.4392 C 366.64416,135.5506 365.36333,131.1389 363.65,128.5891 C 361.55867,125.477 362.51046,126.8686 358.6,126.7766 C 353.75126,126.6626 355.21373,135.6386 352.3375,137.0766 C 346.90466,139.7931 351.12499,139.1829 351.12501,144.3517 C 351.12501,147.0486 358.81656,150.3242 358,150.8141 C 355.86552,152.0949 351.052,152.0632 347.9,153.6392 C 344.61829,155.28 347.98658,160.4373 350.32501,161.3141 C 351.4025,161.7182 352.43358,162.2475 353.55,162.5267 C 357.83459,163.5978 357.64741,161.1496 360.82501,160.5141 C 364.80843,159.7174 368.84699,159.0202 366.4875,163.7392 C 365.55773,165.5987 364.90162,170.6338 367.2875,171.8267 C 371.052,173.709 368.64818,175.1062 367.7,177.4766 C 366.76091,179.8243 364.55,181.2891 362.85,177.8891 C 361.57816,175.3454 357.75208,171.753 353.9625,172.2267 C 350.58483,172.6488 349.58573,174.6517 346.6875,174.6517 C 343.77267,174.6517 338.60152,173.0402 339.0125,176.6766 C 339.81298,183.7598 340.88294,180.5139 343.85,182.7392 C 345.77085,184.1798 349.89696,185.1362 351.5375,186.7766 C 352.25315,187.4923 352.78766,189.9389 351.5375,192.4392 C 350.88424,193.7456 347.00389,200.0306 344.6625,197.6891 C 342.31261,195.3392 341.40555,194.0405 338.2,193.2392 C 335.70418,192.6152 333.01222,187.5891 331.7375,187.5891 C 329.18955,187.5891 325.04248,186.7517 324.0625,189.2016 C 323.68902,190.1354 323.75477,196.975 322.85,197.2766 C 317.60299,199.0256 316.70962,199.3795 313.15,202.9392 C 310.23382,205.8554 310.94186,198.7374 308.7,201.7267 C 306.72326,204.3622 304.5961,203.7784 306.27501,206.5766 C 307.49814,208.6152 311.11907,213.744 313.15,214.2517 C 315.13978,214.7491 316.13846,223.8837 318,223.1392 C 324.73622,220.4446 323.73253,226.4184 329.7125,225.5642 C 338.91808,224.2491 330.99416,226.0814 335.37501,227.1766 C 337.94493,227.8192 340.74099,222.165 341.4375,222.3392 C 343.74922,222.9171 345.20936,229.7205 346.27501,227.5891 C 347.40376,225.3317 353.26867,220.7888 354.3625,225.1642 C 355.58866,230.0688 353.44789,227.8792 350.32501,231.6267 C 349.33424,232.8155 346.37402,237.6184 350.32501,237.2891 C 354.10326,236.9742 358.84304,237.917 360.0125,233.2392 C 360.88384,229.7538 362.172,226.2637 362.85,223.5517 C 364.55296,216.7398 371.90851,221.824 371.7375,221.9267 C 369.7489,223.1198 367.73389,230.712 370.52501,230.0141 C 373.87966,229.1755 374.91528,225.1642 378.6,225.1642 C 381.2364,225.1642 382.50282,222.3339 384.6625,220.7141 C 385.03987,220.4312 393.05976,215.4907 393.9625,219.1016 C 394.14019,219.8123 395.59904,226.1584 394.3625,226.7766 C 389.39907,229.2584 388.80094,231.3909 385.47501,234.0517 C 381.92566,236.8912 381.83749,238.3763 381.8375,242.5392 C 381.8375,250.5325 375.5117,241.061 377.8,250.2141 C 378.35683,252.4414 378.06541,256.5398 373.7625,255.4642 C 373.22376,255.3294 372.67626,255.1989 372.1375,255.0642 C 371.81966,255.488 371.70118,256.1046 371.5625,256.6891 C 372.24085,257.1979 372.2159,257.1792 373.7125,258.3016 C 375.53109,259.6656 381.71072,262.4054 383.42501,264.3016 C 386.43664,264.263 388.4419,263.923 389.7125,262.8642 C 392.8645,260.2374 399.30261,261.9715 401.1376,258.3016 C 402.6408,255.295 408.57504,256.6422 408.57504,251.4392 C 408.57504,248.0306 407.96112,244.0187 411.42496,242.8642 C 414.04,241.9925 417.26448,239.4963 420.57504,241.1517 C 423.4896,242.609 425.6208,244.0141 429.71248,244.0141 C 435.92336,244.0141 432.78224,240.528 437.1376,239.4392 C 441.97184,238.2306 436.88656,232.7083 439.42496,231.4392 C 439.68016,231.3117 449.5696,226.5837 449.98752,226.5642 C 448.1296,224.0934 452.17952,220.3851 446.86256,217.7267 C 444.64112,216.616 443.05856,221.7267 440.57504,221.7267 C 437.43696,221.7267 443.84128,229.8307 436.57504,228.0141 C 434.39936,227.4702 433.87152,222.8642 428.57504,222.8642 C 423.37616,222.8642 425.1376,217.2302 425.1376,213.1517 C 425.1376,209.2253 423.32416,210.177 429.71248,207.4392 C 434.39216,205.4336 425.7024,199.4392 434.28752,199.4392 C 438.57616,199.4392 445.17472,200.0266 447.42496,200.5891 C 448.17584,200.7768 461.1376,203.393 461.1376,196.0141 C 461.1376,191.0349 467.9552,196.9003 468.57504,197.7267 C 471.29056,201.3474 472.57504,190.7109 472.57504,189.7267 C 472.57504,186.568 472.42864,183.425 473.1376,180.5891 C 474.58016,174.8187 480,177.9187 480,171.4392 C 480,166.884 480.92432,165.9398 484,162.8642 C 485.10528,161.7589 486.7848,159.3438 488.28752,156.8642 C 488.61696,155.9632 489.94848,154.9821 489.71248,154.8642 C 487.1344,153.575 491.45744,146.3016 488.57504,146.3016 C 484.98256,146.3016 484.36704,138.6627 485.71248,136.0141 C 488.5312,130.4654 485.79168,128.5891 493.1376,128.5891 C 494.94224,128.5891 499.7176,124.5891 500,124.5891 C 504.76544,124.5891 509.77152,125.7251 509.71248,121.1517 C 509.77792,121.1323 509.8992,121.1096 510.01248,121.0891 C 509.17184,120.5 508.58256,120.0446 508.57504,120.0141 C 507.57104,115.9986 508.66768,115.3466 511.42496,112.5891 C 513.35632,110.6579 518.33312,107.2936 520.27504,105.3517 C 522.45328,103.1733 521.844,100.3499 524.57504,98.3016 C 527.14704,96.3726 530.296,95.7766 533.71248,93.7267 C 536.4504,92.0838 542.23616,93.995 542.86256,90.8642 C 543.7624,86.364 546.61248,85.9013 545.71248,82.3016 C 545.10976,79.8907 544.92784,74.4846 541.1376,73.7266 C 536.82864,72.8648 533.88928,70.8642 528.57504,70.8642 C 524.50592,70.8642 523.44112,68.6059 521.1376,65.7266 C 519.69904,63.9283 515.0512,59.6301 514.28752,59.439 C 509.56848,58.2594 509.80608,54.0312 506.28752,53.1515 C 503.88464,52.5509 501.288,52.4067 498.66256,52.4141 z M 449.98752,226.5642 C 449.99312,226.5717 449.99424,226.5818 450,226.5891 C 450.01504,226.5741 450.00432,226.5634 449.98752,226.5642 z"
  },
  "G": {
    "d": "M 335.47501,431.3142 C 335.4125,431.3131 335.35261,431.3197 335.2875,431.3267 C 332.7697,431.5968 328.1232,437.4762 324.57501,436.5891 C 323.26834,436.2624 321.90834,436.2046 320.57501,436.0142 C 317.34734,435.553 320.21578,442.5635 319.42501,445.7267 C 318.9451,447.6462 309.34592,445.9194 308.57501,445.7267 C 307.78776,445.5299 303.12139,443.4374 303.42501,443.1517 C 299.04045,441.4842 290.1953,452.0142 284,452.0142 C 278.45659,452.0141 280.72285,455.1907 276.57501,458.3016 C 273.16746,460.8573 273.1375,461.936 273.1375,466.8642 C 273.1375,470.3787 269.1375,472.8499 269.1375,477.1517 C 269.1375,482.9386 261.88955,478.7558 260.57501,484.0142 C 259.30166,489.1074 249.69432,487.911 246.8625,487.4392 C 245.92622,487.2832 244.75414,486.4859 243.52501,485.3642 C 243.63707,485.5453 243.75859,485.741 243.85,485.9016 C 243.8784,485.9518 243.91106,486.0157 243.9375,486.0642 C 244.04958,486.2693 244.1472,486.4611 244.22501,486.6392 C 244.22638,486.6424 244.22363,486.6485 244.22501,486.6517 C 244.38728,487.0254 244.47627,487.3434 244.5,487.6517 C 244.51786,487.8835 244.50173,488.1082 244.45,488.3392 C 244.43288,488.4157 244.4117,488.4981 244.3875,488.5766 C 244.37867,488.6054 244.37226,488.635 244.3625,488.6642 C 244.3411,488.7299 244.3135,488.796 244.2875,488.8642 C 244.27549,488.8949 244.26291,488.9203 244.25,488.9517 C 244.16656,489.1582 244.07128,489.3738 243.95,489.6142 C 243.36674,490.7709 242.76397,491.9901 242.6,492.3267 C 242.51802,492.4949 242.58011,492.6531 242.75,492.7642 C 242.79246,492.792 242.84499,492.8171 242.9,492.8392 C 243.06506,492.9054 243.28256,492.9392 243.5375,492.9392 C 244.21736,492.9392 245.55406,494.0432 246.5125,495.3891 C 247.92213,497.3688 248.84518,497.8392 251.3375,497.8392 C 251.59314,497.8392 251.83566,497.8472 252.07501,497.8642 C 252.31434,497.8811 252.55206,497.9053 252.77501,497.9392 C 254.11261,498.1424 255.15251,498.652 255.8875,499.4642 C 255.96082,499.5451 256.03722,499.628 256.1125,499.7016 C 257.24182,500.807 258.65869,501.1016 262.4125,501.1016 C 265.18445,501.1016 267.66814,501.3198 267.9375,501.5891 C 267.97117,501.6229 267.98762,501.6755 267.9875,501.7517 C 267.98738,501.8278 267.96883,501.9258 267.9375,502.0392 C 267.81216,502.493 267.44674,503.2234 266.92501,504.0642 C 266.79456,504.2744 266.66126,504.4928 266.5125,504.7142 C 266.36373,504.9355 266.20203,505.1621 266.0375,505.3891 C 264.1003,508.0632 263.6375,509.5189 263.6375,513.0517 C 263.6375,516.4187 263.92792,517.4142 264.8875,517.4142 C 266.51526,517.4141 267.9495,521.2829 267.3,523.9142 C 267.19453,524.3414 266.96317,524.8789 266.65,525.4517 C 266.54562,525.6426 266.43266,525.8438 266.3125,526.0392 C 265.83186,526.8206 265.23682,527.6098 264.65,528.2267 C 264.14662,528.7558 263.66475,529.1787 263.17501,529.5016 C 262.93013,529.6632 262.67723,529.8016 262.42501,529.9142 C 262.04664,530.083 261.66514,530.2002 261.25,530.2642 C 261.11162,530.2854 260.96925,530.2915 260.82501,530.3016 C 259.95946,530.3624 258.97786,530.2286 257.7875,529.9142 C 257.00853,529.7083 255.35515,527.025 253.9625,523.6891 C 251.74184,518.3701 251.63498,517.6989 252.77501,516.4392 C 253.91405,515.1805 253.86573,514.8365 252.27501,512.8142 C 251.44538,511.7595 251.02459,511.1861 250.9875,510.7891 C 250.98286,510.7395 250.99283,510.6965 251,510.6517 C 251.05022,510.3374 251.38331,510.1256 251.9875,509.8016 C 252.7911,509.3709 253.56722,508.9181 253.7125,508.8016 C 253.85771,508.6851 253.4095,507.513 252.72501,506.1891 C 251.6987,504.2045 250.81565,503.6838 247.6625,503.2517 C 245.55931,502.9634 242.6077,502.7266 241.1,502.7267 C 238.87274,502.7267 238.35,502.4094 238.35,501.0392 C 238.35,499.7366 237.99477,499.4731 236.7625,499.8642 C 236.65282,499.899 236.52379,499.9197 236.37501,499.9392 C 236.22621,499.9586 236.05605,499.972 235.87501,499.9766 C 234.78867,500.005 233.18485,499.7792 231.8,499.3642 C 230.35397,498.9309 229.36168,498.4397 228.5625,497.6891 C 228.47371,497.6058 228.3844,497.5294 228.3,497.4392 C 227.79362,496.8979 227.36328,496.2232 226.92501,495.3642 C 226.0855,493.7184 224.42894,491.7491 223.25,490.9766 C 220.5823,489.2286 214.2153,487.2509 211.2,487.2392 C 208.31523,487.228 207.69443,485.6157 209.35,482.4142 C 210.8904,479.4354 210.98427,479.42 213.6625,481.5267 C 215.11858,482.672 216.52765,483.2547 217.2,483.2016 C 217.2747,483.1958 217.34454,483.1859 217.4,483.1642 C 217.73274,483.0339 217.7016,482.6141 217.1,481.8891 C 216.98931,481.7558 216.88984,481.6339 216.8125,481.5142 C 216.27115,480.6762 216.5743,480.0899 218.02501,478.6392 C 219.82,476.8443 220.72266,476.6536 227.97501,476.5267 C 228.5377,476.5168 229.07374,476.5058 229.57501,476.5016 C 230.04493,476.4978 230.49146,476.4979 230.9125,476.5016 C 230.92829,476.5018 230.94678,476.5014 230.9625,476.5016 C 231.78304,476.5098 232.51294,476.5373 233.17501,476.5891 C 233.21504,476.5923 233.26048,476.5982 233.3,476.6016 C 233.31714,476.603 233.33296,476.6002 233.35,476.6016 C 233.67373,476.6301 233.98286,476.6709 234.27501,476.7142 C 234.2789,476.7147 234.28362,476.7136 234.2875,476.7142 C 234.30894,476.7173 234.32872,476.7234 234.35,476.7267 C 234.60763,476.7664 234.8636,476.8107 235.1,476.8642 C 235.26525,476.9019 235.43128,476.944 235.5875,476.9891 C 235.6573,477.0091 235.73184,477.0301 235.8,477.0517 C 235.8595,477.0707 235.91667,477.0939 235.97501,477.1142 C 236.0384,477.136 236.10042,477.1533 236.1625,477.1766 C 236.22579,477.2006 236.28798,477.2261 236.35,477.2517 C 236.59877,477.3534 236.83059,477.4726 237.0625,477.6016 C 237.1745,477.664 237.29093,477.72 237.4,477.7891 C 236.64021,476.5482 236.12555,475.4918 236,474.8642 C 235.07248,470.2266 232.73109,472.0469 228,470.8642 C 226.68408,470.5352 225.20717,470.3346 223.7,470.1766 C 223.22968,470.219 222.73139,470.2776 222.25,470.3392 C 222.11752,470.3562 221.99213,470.371 221.8625,470.3891 C 221.79864,470.3984 221.73786,470.4046 221.67501,470.4142 C 221.56174,470.4307 221.4467,470.4467 221.3375,470.4642 C 221.09806,470.5037 220.84742,470.5472 220.6375,470.5891 C 220.36235,470.6442 220.124,470.6861 219.9,470.7142 C 219.8927,470.715 219.88226,470.7133 219.87501,470.7142 C 219.79274,470.7242 219.70155,470.7339 219.62501,470.7392 C 219.38979,470.7558 219.18157,470.7506 218.9875,470.7142 C 218.96736,470.7102 218.9448,470.7062 218.92501,470.7016 C 218.87464,470.6901 218.82347,470.6803 218.77501,470.6642 C 218.74496,470.6542 218.71693,470.6384 218.6875,470.6267 C 218.63205,470.6043 218.57869,470.5808 218.52501,470.5517 C 218.51672,470.5472 218.50826,470.5437 218.5,470.5392 C 218.39966,470.4834 218.30966,470.4085 218.2125,470.3267 C 218.0091,470.1554 217.80181,469.931 217.5875,469.6267 C 217.58253,469.6195 217.57998,469.6088 217.57501,469.6016 C 216.57758,469.4858 215.65502,469.3498 214.8625,469.1517 C 211.02326,468.1918 206.73898,469.2627 205.1375,470.8642 C 202.74598,473.2557 198.23522,463.3994 197.1375,462.3016 C 194.64994,459.8141 190.47054,460.5891 186.2875,460.5891 C 183.29483,460.5891 179.57834,458.947 177.1375,457.7267 C 176.3335,457.3246 159.82493,456.2141 167.42501,460.0142 C 168.30354,460.4534 162.55477,466.2582 161.1375,460.5891 C 160.82776,459.3502 157.73214,458.3053 156.57501,457.7267 C 156.20242,457.5168 155.83973,457.3381 155.4875,457.1766 C 155.63195,457.58 155.68472,457.9674 155.6375,458.3392 C 155.6225,458.4571 155.59664,458.5757 155.5625,458.6891 C 155.56134,458.693 155.56368,458.6978 155.5625,458.7016 C 155.52912,458.8104 155.48843,458.9102 155.4375,459.0142 C 155.43347,459.0226 155.42915,459.0309 155.42501,459.0392 C 155.37432,459.1394 155.31707,459.244 155.25,459.3392 C 155.24328,459.3488 155.23189,459.3546 155.22501,459.3642 C 155.14789,459.4704 155.06018,459.5778 154.9625,459.6766 C 154.94616,459.6933 154.92942,459.7102 154.9125,459.7267 C 154.82902,459.8072 154.73493,459.8765 154.6375,459.9517 C 154.5269,460.037 154.416,460.1242 154.2875,460.2016 C 154.27928,460.2066 154.2708,460.2091 154.2625,460.2142 C 154.16739,460.2707 154.0672,460.3246 153.9625,460.3766 C 153.86715,460.4243 153.76584,460.4704 153.6625,460.5142 C 153.55898,460.5578 153.44898,460.5995 153.3375,460.6392 C 153.32858,460.6424 153.32147,460.6485 153.3125,460.6517 C 153.14432,460.7106 152.96099,460.7526 152.77501,460.8016 C 152.76578,460.8042 152.75926,460.8117 152.75,460.8142 C 152.58768,460.8563 152.4132,460.8923 152.2375,460.9267 C 152.20238,460.9334 152.17315,460.9451 152.1375,460.9517 C 152.12051,460.9547 152.10461,460.9611 152.0875,460.9642 C 151.89915,460.9978 151.70299,461.0149 151.5,461.0392 C 151.48262,461.0413 151.46749,461.0496 151.45,461.0517 C 151.27176,461.0722 151.10186,461.0885 150.9125,461.1016 C 150.84446,461.1064 150.78197,461.1104 150.7125,461.1142 C 150.45382,461.1283 150.19101,461.139 149.9125,461.1392 C 146.41064,461.1392 142.90187,461.139 139.4,461.1392 C 132.72598,461.139 135.96528,460.7253 136.97501,464.7642 C 137.49403,466.8403 138.01597,467.5694 138.0375,467.7267 C 138.03904,467.7379 138.04128,467.7459 138.0375,467.7517 C 137.97328,467.8491 137.11336,467.1891 134.55,467.1891 C 130.314,467.1891 129.92162,464.7258 126.87501,463.9642 C 122.90027,462.9704 122.86302,465.768 119.8375,466.3016 C 119.73317,466.32 119.63674,466.3389 119.52501,466.3517 C 119.30154,466.3771 119.05648,466.3891 118.8,466.3891 C 117.79674,466.3891 108.69587,463.5432 108.2875,465.1766 C 107.63445,467.7888 108.80917,467.9211 110.3125,470.4267 C 111.8272,472.9512 114.2159,475.5426 116.37501,477.7016 C 118.606,479.9326 124.35546,482.3315 124.05,484.1642 C 123.67163,486.4344 128.53355,489.5974 126.47501,490.6267 C 123.3345,492.197 120.05792,491.8392 116.37501,491.8392 C 115.52205,491.839 107.83043,492.5459 108.0875,493.4642 C 109.60088,496.0208 111.30422,496.6726 112.32501,498.7142 C 113.15437,500.373 118.02642,506.9955 120,504.3642 C 122.65498,500.8242 124.59875,502.4539 128.0875,503.1517 C 131.79803,503.8938 133.41206,510.4267 137.37501,510.4267 C 137.91722,510.4267 138.40755,510.4218 138.85,510.4016 C 139.07123,510.3917 139.27635,510.3808 139.47501,510.3642 C 142.05754,510.1482 142.80267,509.3285 143.4375,506.7891 C 143.64547,505.9573 144.20517,499.8693 146.27501,501.9392 C 148.07974,503.744 149.30677,504.7766 152.32501,504.7766 C 154.89123,504.7766 157.5875,503.9722 157.5875,506.7891 C 157.5875,508.9949 158.48054,514.4642 155.5625,514.4642 C 154.68923,514.4642 144.64229,514.8613 144.65,514.8766 C 145.30144,516.1795 148.36262,522.6674 149.5,522.9517 C 150.01986,523.0816 150.53355,523.0826 151.0375,523.0016 C 151.20547,522.9747 151.37178,522.9318 151.5375,522.8891 C 151.86894,522.8038 152.1916,522.7014 152.5125,522.5766 C 152.83341,522.4518 153.15411,522.3099 153.4625,522.1766 C 154.69608,521.6437 155.82062,521.1666 156.77501,521.7392 C 160.23525,523.8154 163.31378,523.8504 166.87501,525.3766 C 168.57707,526.1061 170.35173,527.1677 171.8,526.7392 C 171.86896,526.7187 171.93256,526.704 172,526.6766 C 172.67448,526.4029 173.27451,525.7654 173.75,524.5766 C 175.29179,520.7221 173.41662,520.3069 177.3875,519.3142 C 180.20325,518.6102 181.02501,517.8653 181.02501,514.8766 C 181.02501,514.4371 181.07218,514.0018 181.1625,513.5891 C 181.43349,512.3515 182.09762,511.3078 183.02501,510.8267 C 183.10229,510.7866 183.18155,510.7461 183.2625,510.7142 C 184.47686,510.2349 186.09085,510.6957 187.8875,512.8517 C 189.47624,514.7581 192.59917,515.4651 190.3125,518.5142 C 188.12098,521.4362 187.3464,522.9733 186.67501,527.0016 C 186.27238,529.4173 186.32946,533.931 188.2875,535.8891 C 188.33184,535.9334 188.39267,535.969 188.4625,536.0016 C 188.53234,536.0344 188.60826,536.0661 188.7,536.0891 C 189.98443,536.4115 193.24339,535.8752 193.55,537.1016 C 194.6703,541.5829 196.44771,542.3944 198.6375,544.2891 C 198.7939,544.4245 198.95197,544.5659 199.1125,544.7142 C 199.27304,544.8624 199.43552,545.0122 199.6,545.1766 C 201.27104,546.8477 203.38562,548.7106 205.55,548.5142 C 205.6441,548.5056 205.73072,548.4931 205.82501,548.4766 C 206.57926,548.3446 207.33974,547.9494 208.0875,547.2016 C 212.0116,543.2776 216.72866,543.5642 222.2375,543.5642 C 222.68206,543.5642 223.13346,543.5626 223.5875,543.5517 C 226.76584,543.4757 230.13539,543.2136 233.1375,543.9642 C 236.56742,544.8216 238.63992,545.3922 240.5875,545.3142 C 241.0744,545.2947 241.55947,545.2338 242.05,545.1267 C 243.52155,544.8054 245.09018,544.0701 247.2875,542.7517 C 248.72586,541.8886 255.99179,538.1002 257.7875,537.5016 C 260.33224,536.6534 262.58854,536.1197 265.0625,534.2642 C 267.94576,532.1018 273.32926,530.8704 276.7875,533.4642 C 277.65131,534.112 279.31075,535.1464 280.4625,536.4517 C 280.59048,536.5966 280.7112,536.7502 280.82501,536.9016 C 281.50779,537.8102 281.89914,538.8302 281.62501,539.9267 C 281.14749,541.8366 271.56002,542.4541 271.9375,543.9642 C 271.96891,544.0898 271.99893,544.211 272.0375,544.3267 C 272.07608,544.4422 272.11709,544.5581 272.1625,544.6642 C 273.52498,547.8461 277.89698,546.8304 280.82501,548.0016 C 284.58624,549.5062 287.14483,549.5376 284.05,553.6642 C 282.59957,555.5981 283.25,556.5797 283.25,559.7267 C 283.25,561.552 282.98923,562.5829 282.5875,562.8142 C 282.56072,562.8296 282.54054,562.8434 282.5125,562.8517 C 282.06378,562.985 281.45512,562.207 280.82501,560.5267 C 279.54907,557.1242 272.04997,555.289 272.3375,557.3016 C 272.46438,558.1899 274.36251,563.7475 274.3625,565.7891 C 274.3625,566.0165 274.35125,566.2286 274.3375,566.4392 C 274.32602,566.615 274.32099,566.7885 274.3,566.9517 C 274.29342,567.0024 274.2825,567.0522 274.27501,567.1016 C 274.25821,567.2133 274.23392,567.3218 274.2125,567.4267 C 274.19318,567.521 274.17304,567.613 274.15,567.7016 C 274.11837,567.8234 274.08862,567.941 274.05,568.0517 C 274.04584,568.0637 274.04173,568.0773 274.0375,568.0891 C 274.02642,568.1198 274.01165,568.1469 274,568.1766 C 273.96629,568.2638 273.92586,568.3474 273.8875,568.4267 C 273.85382,568.4958 273.82472,568.5637 273.7875,568.6267 C 273.74494,568.699 273.69717,568.7627 273.65,568.8267 C 273.57664,568.9261 273.49691,569.0112 273.4125,569.0891 C 273.40824,569.0931 273.40429,569.0978 273.4,569.1016 C 273.37194,569.127 273.34176,569.1538 273.3125,569.1766 C 273.29592,569.1896 273.27946,569.2021 273.2625,569.2142 C 273.2135,569.2494 273.16469,569.2856 273.1125,569.3142 C 273.0612,569.3421 273.00435,569.3678 272.95,569.3891 C 272.93757,569.3939 272.92509,569.3971 272.9125,569.4016 C 272.83478,569.4296 272.75874,569.4499 272.67501,569.4642 C 272.64581,569.4691 272.61742,569.4734 272.5875,569.4766 C 272.56706,569.4789 272.54578,569.4877 272.52501,569.4891 C 272.43218,569.4952 272.32454,569.4869 272.22501,569.4766 C 272.21699,569.4758 272.20806,569.4776 272.2,569.4766 C 272.14347,569.4701 272.08365,569.451 272.02501,569.4392 C 271.90723,569.4152 271.78877,569.3853 271.6625,569.3392 C 271.61256,569.321 271.56376,569.2984 271.5125,569.2766 C 271.38854,569.2235 271.25661,569.1635 271.12501,569.0891 C 271.226,569.4931 271.324,569.8976 271.42501,570.3016 C 272.76757,575.6718 272.23912,578.4426 277.7125,581.7267 C 281.08669,583.7512 283.78854,584.6568 284.57501,588.5891 C 285.3467,592.4477 289.1375,595.3563 289.1375,598.8642 C 289.1375,600.068 287.60459,607.6309 289.1375,608.0142 C 295.49554,609.6035 297.55125,604.0142 301.7125,604.0142 C 305.60021,604.0141 310.21298,600.0141 310.8625,600.0142 C 315.36014,600.0141 318.51926,600.4677 320.57501,597.7267 C 322.41886,595.2682 326.3072,591.879 330.2875,594.8642 C 332.77603,596.7306 339.72357,597.4501 341.1375,598.8642 C 342.14515,599.8718 346.84648,606.5971 350.8625,604.5891 C 352.90854,603.5661 358.49534,605.1016 362.05,605.4517 C 362.03643,605.4222 362.02584,605.3934 362.0125,605.3642 C 361.88488,605.0834 361.76874,604.8074 361.6625,604.5392 C 361.59101,604.3587 361.5243,604.1886 361.4625,604.0142 C 361.43085,603.925 361.40411,603.8392 361.37501,603.7517 C 361.29405,603.5082 361.22389,603.2696 361.1625,603.0392 C 361.1535,603.0054 361.14608,602.9725 361.1375,602.9392 C 361.09693,602.7808 361.05618,602.6285 361.02501,602.4766 C 361.00859,602.3971 360.98883,602.3168 360.97501,602.2392 C 360.93904,602.036 360.91827,601.8416 360.9,601.6517 C 360.86275,601.2646 360.86378,600.9042 360.9,600.5766 C 360.90171,600.561 360.89813,600.5422 360.9,600.5267 C 360.90152,600.5142 360.89837,600.5014 360.9,600.4891 C 360.91914,600.3411 360.9529,600.2112 360.9875,600.0766 C 361.01416,599.973 361.03917,599.872 361.07501,599.7766 C 361.07958,599.7645 361.08277,599.7512 361.0875,599.7392 C 361.11162,599.6774 361.14696,599.6224 361.17501,599.5642 C 361.2144,599.4824 361.25283,599.401 361.3,599.3267 C 361.36248,599.2282 361.43642,599.137 361.5125,599.0517 C 361.52262,599.0403 361.52714,599.0253 361.5375,599.0142 C 361.62126,598.9243 361.71301,598.8506 361.8125,598.7766 C 361.82853,598.7648 361.84606,598.7506 361.8625,598.7392 C 361.95216,598.6768 362.04822,598.6138 362.15,598.5642 C 362.22915,598.5256 362.31352,598.4949 362.4,598.4642 C 362.4255,598.455 362.44886,598.4475 362.47501,598.4392 C 362.55078,598.4149 362.63134,598.395 362.7125,598.3766 C 362.79381,598.3582 362.87581,598.339 362.9625,598.3267 C 363.97299,598.1832 365.17406,597.3552 365.6375,596.4891 C 366.10101,595.623 367.21688,594.9142 368.1125,594.9142 C 369.89936,594.9141 370.69792,593.4794 370.0625,591.9766 C 370.01362,591.8611 369.95354,591.7424 369.8875,591.6267 C 369.75541,591.3952 369.59067,591.1637 369.3875,590.9392 C 367.58762,588.9502 367.71507,587.6437 370.0625,584.1891 C 372.04333,581.2741 372.10642,581.2531 375.9125,581.9642 C 378.82656,582.5086 380.0733,582.4114 381.05,581.5642 C 381.1896,581.443 381.33523,581.3288 381.4875,581.2267 C 381.50501,581.2149 381.5199,581.2006 381.5375,581.1891 C 381.61195,581.1406 381.68731,581.1072 381.7625,581.0642 C 381.83744,581.0211 381.91309,580.9762 381.9875,580.9392 C 382.20264,580.8325 382.41003,580.7494 382.6,580.7016 C 382.65522,580.6878 382.71106,580.6723 382.7625,580.6642 C 382.7756,580.6621 382.78718,580.6659 382.8,580.6642 C 383.39034,578.7298 383.42501,576.2568 383.42501,574.8642 C 383.42501,572.2802 384.70741,568.5528 386.8625,568.0142 C 388.00331,567.729 394.28214,562.8019 395.42501,564.3016 C 398.15606,565.2259 404.05952,555.6726 405.1376,554.8642 C 408.19552,552.5706 408.57504,551.1826 408.57504,546.8642 C 408.57504,542.1482 405.82112,542.7538 401.71248,541.7267 C 400.30512,541.3749 398.92963,535.5994 398.4875,532.9891 C 399.62366,524.4646 390.97645,535.8742 383.42501,528.0142 C 382.84858,525.7085 378.34482,523.5662 377.1375,521.1517 C 376.5701,520.0168 378.2875,512.0421 378.2875,509.7267 C 378.2875,506.6805 372.22478,507.0021 374.8625,501.7267 C 377.02094,497.4098 372,493.237 372,489.1517 C 372,484.3898 372,479.6259 372,474.8642 C 372,473.7213 372,472.5819 372,471.4392 C 372,469.565 363.96424,464.1002 362.8625,463.4392 C 357.0019,459.9229 354.3877,463.4027 353.1375,457.1517 C 352.63494,454.6389 357.71648,454.3062 358.8625,452.0142 C 360.54912,448.6408 354.05154,444.3531 352,442.3016 C 347.07637,437.3781 346.38598,437.8662 340,436.5891 C 337.87042,436.1632 337.94248,432.4104 336,431.4392 C 335.84163,431.36 335.66253,431.3171 335.47501,431.3142 z"
  },
  "KE": {
    "d": "M 558.41248,499.0142 C 555.5496,499.0086 553.18368,499.9896 549.1376,502.3016 C 543.88048,505.3058 534.86384,508.305 533.35008,509.0267 C 534.57648,511.5403 535.94256,514.7917 537.71248,517.1517 C 540.59392,520.9938 542.28752,522.5834 542.28752,528.0142 C 542.28752,533.8592 544.57504,533.6395 544.57504,536.0142 C 544.57504,539.5454 536.43088,543.8699 538.28752,545.7267 C 540.33648,547.7755 545.17536,551.1451 538.86256,554.3016 C 536.94304,555.2614 533.8056,555.4392 530.28752,555.4392 C 529.21424,555.4392 517.8184,556.744 521.71248,558.3016 C 531.716,562.303 530.0224,562.5186 533.47504,565.1142 C 534.23696,565.0189 534.6632,564.9648 535.42496,565.7267 C 545.18016,575.4818 535.48064,568.1006 538.86256,574.8642 C 540.27392,577.687 542.7336,583.1096 541.1376,586.3016 C 539.54208,589.4923 538.28752,591.2752 538.28752,595.4392 C 538.28752,599.232 534.25344,602.1462 539.42496,603.4392 C 542.58208,604.2285 548.20256,602.6942 550.28752,606.8642 C 552.18912,610.6674 557.28976,612.881 559.42496,617.1517 C 560.8904,620.0824 561.02528,630.7883 560.57504,632.5891 C 560.59536,632.636 560.70624,632.8894 560.7376,632.9642 C 561.03216,632.6352 561.29168,632.3901 561.42496,632.3016 C 561.71072,631.9154 572.66304,634.4998 573.71248,630.3016 C 574.2968,627.9643 580.61504,629.5416 581.71248,625.1517 C 582.04624,623.8168 584.31824,621.6528 585.1376,620.0142 C 585.19312,619.929 585.25392,619.847 585.31248,619.7642 C 583.16448,616.8445 582.472,611.0486 580.57504,609.1517 C 578.0728,606.6494 574.55408,606.5976 578.28752,602.8642 C 581.09248,600.059 581.71248,599.2066 581.71248,594.8642 C 581.71248,591.2466 586.69408,587.595 589.1376,585.1517 C 592.06288,582.2264 595.01984,580.3998 598.86256,579.4392 C 601.31872,578.8251 605.84032,573.4834 606.86256,571.4392 C 609.18672,566.7906 613.71248,568.1886 613.71248,562.8642 C 613.71248,560.1195 611.72384,557.7061 612.57504,554.3016 C 613.70592,549.7778 623.32096,553.5061 620.57504,548.0142 C 620.72832,547.6803 620.89968,547.3392 621.08752,547.0016 C 616.9888,546.0278 613.1376,540.5109 613.1376,536.0142 C 613.1376,531.4709 613.00096,530.0886 616,528.5891 C 616.43984,528.3691 618.72304,522.9613 620.57504,521.7267 C 624.99168,518.7822 625.796,514.479 624.81248,509.8642 C 623.35312,509.715 622.00992,509.463 620.95008,509.0392 C 620.42976,508.831 612.53984,504.7437 613.1,504.7267 C 613.66016,504.7096 614.51184,505.0802 610.86256,503.4392 C 604.84016,500.731 599.70768,505.1517 592.57504,505.1517 C 591.87952,505.1517 585.3448,500.0141 580.57504,500.0142 C 579.60384,500.0142 578.6648,500.3987 577.71248,500.5891 C 572.7792,501.5758 569.7224,501.301 564.57504,500.0142 C 562.02464,499.3766 560.13024,499.0173 558.41248,499.0142 z M 605.37504,623.7766 C 605.6264,624.0915 605.86416,624.4125 606.1,624.7267 C 605.86352,624.412 605.62688,624.0922 605.37504,623.7766 z"
  },
  "KK": {
    "d": "M 525.87504,629.4766 C 523.792,629.4808 521.62256,629.7267 520,629.7267 C 515.00832,629.7267 513.68896,630.4082 512.57504,634.8642 C 511.23616,640.2194 511.15792,638.3016 506.28752,638.3016 C 502.1064,638.3016 501.85024,640.261 498.28752,641.1517 C 495.4328,641.8653 496,644.897 496,648.0142 C 496,649.6963 488.48544,649.1517 486.86256,649.1517 C 485.224,649.1517 485.63856,653.1517 484,653.1517 C 480.25216,653.1517 477.70768,649.1522 474.86256,648.0142 C 471.9808,646.8614 473.51584,643.3539 468.57504,644.5891 C 466.0408,645.2227 464.62192,647.4392 460.57504,647.4392 C 460.47312,647.4392 467.55088,654.6366 456,652.8642 C 455.97488,655.3728 456.30944,657.277 457.1376,660.5891 C 457.91856,663.7134 460.05648,667.172 463.42496,668.0142 C 466.05136,668.6707 471.1856,669.2354 472.57504,672.0142 C 473.47104,673.8062 475.21872,683.2437 476,683.4392 C 480.56592,684.5806 476.93216,686.6106 479.42496,689.7267 C 481.73296,692.6117 486.19552,694.473 484,698.8642 C 483.61904,699.6261 483.30064,700.4213 482.86256,701.1517 C 477.33856,710.3582 484.98,706.7838 486.28752,712.0142 C 487.22928,715.7814 483.42496,717.7808 483.42496,721.1517 C 483.42496,725.4435 485.19824,727.4998 488,730.3016 C 490.39808,732.6997 495.33488,733.2637 496,736.5891 C 496.4472,738.825 496.41872,749.0734 496.57504,749.1517 C 496.49904,749.5514 496.44944,749.8797 496.41248,750.1766 C 496.98256,751.6688 499.36176,754.8514 500.01248,755.1766 C 503.4688,756.9048 509.69936,759.049 510.87504,763.7517 C 511.65872,766.8862 512.63072,770.7965 515.4376,772.9016 C 515.93808,773.277 524.31136,781.3938 525.15008,778.0392 C 525.2784,777.5258 530.90944,772.5685 532.01248,774.0392 C 532.12528,774.0506 532.23712,774.9934 532.35008,775.005 C 526.03648,770.8224 548.57776,766.7992 549.71248,765.1517 C 548.4072,760.4856 548.43904,757.415 551.95008,754.8267 C 552.10688,754.5712 552.30208,754.2488 552.57504,753.7267 C 553.46992,750.147 555.53664,747.6819 558.28752,744.0142 C 561.11344,740.2461 555.75424,738.3662 562.86256,736.5891 C 567.08832,735.5326 565.34016,732.2043 562.86256,729.7267 C 560.51408,727.3782 560.6032,728.5592 562.57504,726.3016 C 561.96672,725.7501 561.98192,725.0906 562.4,724.3642 C 562.36,724.2458 562.33072,724.1366 562.28752,724.0142 C 559.93424,721.661 557.67776,720.1781 558.86256,715.4392 C 559.87392,711.3936 562.53488,708.0819 563.42496,706.3016 C 564.6536,703.8446 559.52864,702.1042 558.86256,699.4392 C 558.17856,696.7037 553.3632,693.3773 551.42496,691.4392 C 548.7352,688.7494 549.71248,684.1816 549.71248,680.0142 C 549.71248,675.3067 543.65472,674.4507 540,672.0142 C 535.5936,669.0765 535.61104,666.1157 539.42496,662.3016 C 539.89536,661.8312 542.10352,651.0357 542.57504,650.8642 C 542.77152,650.744 543.01344,650.5746 543.25008,650.4142 C 542.93184,650.371 542.60816,650.3336 542.28752,650.3016 C 542.28752,645.8925 540.63408,641.1517 534.86256,641.1517 C 533.14816,641.1517 531.42672,641.1517 529.71248,641.1517 C 527.05952,641.1517 532.57504,636.3797 532.57504,633.7267 C 532.57504,630.1344 529.34672,629.4698 525.87504,629.4766 z"
  },
  "KY": {
    "d": "M 211.38213,696.5421 C 210.77078,696.5451 210.31798,696.683 210.11963,697.0171 C 207.2912,701.7802 203.96026,703.3834 200.01963,701.867 C 198.61613,701.327 195.62754,696.4106 194.76963,699.8421 C 194.29694,701.7328 189.03624,706.1045 187.89462,702.6797 C 187.03798,700.1096 183.04246,698.2758 182.24462,701.467 C 182.08018,702.125 179.10797,709.4816 179.00714,709.5421 C 173.9565,712.5725 175.87779,714.3184 173.75714,718.0296 C 171.22987,722.4523 168.18936,722.0778 163.65714,724.0922 C 162.44494,724.6309 161.08083,724.9086 160.01963,725.7046 C 158.49582,726.8474 154.8191,724.6693 154.35714,726.5171 C 153.82461,728.6472 150.37925,732.9274 146.68213,730.1546 C 144.55038,728.5558 136.16963,725.1643 136.16963,730.1546 C 136.16963,733.1181 136.06989,739.8421 140.21963,739.8421 C 145.36002,739.8421 144.07787,742.4782 147.08213,743.4797 C 153.76085,745.7058 146.80016,750.0602 150.31963,753.5797 C 152.27085,755.5309 155.04422,759.7022 151.13213,761.267 C 148.8827,762.1669 142.6777,764.7066 149.91963,766.5171 C 151.97451,767.0309 155.02546,765.3046 158.39462,765.3046 C 160.36203,765.3046 166.41566,764.2512 166.88213,766.1171 C 168.10109,770.993 160.31536,772.673 156.78213,773.3797 C 154.67755,773.8005 138.72237,774.4307 138.59462,773.7922 C 137.68298,769.2338 130.71309,771.5086 130.51963,770.1546 C 130.08795,767.1328 126.06963,766.0413 126.06963,763.2797 C 126.06963,760.1949 129.17322,757.472 125.26963,758.0296 C 123.33338,758.3062 117.13454,759.5344 118.80714,762.8797 C 119.6264,764.5182 120.41963,765.0851 120.41963,766.9171 C 120.41963,773.3371 118.91773,769.7421 114.75714,769.7421 C 108.90131,769.7421 107.54662,770.5286 102.64462,772.9797 C 100.42742,774.0882 98.75368,773.2614 100.00714,770.7546 C 100.04669,770.6755 103.50245,763.148 102.84462,763.2797 C 96.89909,764.4686 96.85486,767.5011 92.53213,768.9421 C 91.04974,769.5774 89.22608,771.3899 88.09462,771.767 C 85.20027,772.7318 80.33373,772.261 81.21963,775.8046 C 81.72995,777.8459 82.43213,779.3462 82.43213,781.867 C 82.43213,786.3771 78.43066,781.831 75.96963,784.2922 C 72.86603,787.3957 68.83718,784.1773 67.48213,781.467 C 67.08168,780.6662 62.63213,776.7717 62.63213,780.6546 C 62.63213,783.079 62.63213,785.5053 62.63213,787.9296 C 62.63213,789.6858 57.29112,789.2488 58.19462,790.7546 C 60.57717,794.7256 61.01963,793.8338 61.01963,797.6296 C 61.01963,800.6413 60.15573,803.2539 62.63213,804.4922 C 63.17088,804.7614 63.7067,805.06 64.25714,805.3046 C 65.46931,805.8434 66.4505,805.7973 67.68213,805.3046 C 69.51526,804.5714 71.0753,802.5845 73.14462,802.067 C 75.67984,801.4333 75.51274,798.0893 78.39462,799.2421 C 81.54936,800.504 82.26731,799.0069 84.45714,796.8171 C 88.42262,792.8517 85.7944,797.4837 90.10714,798.4421 C 91.31931,798.7115 92.50288,799.2421 93.74462,799.2421 C 95.62061,799.2421 98.55214,795.4096 99.00714,797.2296 C 99.55515,799.4216 100.84325,802.8795 103.84462,802.8797 C 106.87011,802.8797 108.02034,800.8546 109.10714,800.8546 C 111.99074,800.8546 113.80619,798.8672 116.78213,798.4421 C 120.00782,797.9813 129.66698,800.6909 132.13213,798.8421 C 135.48802,796.3251 137.33618,797.2464 140.61963,795.6046 C 143.84512,793.9918 145.11213,792.3797 149.10714,792.3797 C 149.89237,792.3797 159.60714,792.6264 159.60714,795.2046 C 159.60714,799.6755 158.32544,799.7459 155.96963,803.2797 C 154.36037,805.6934 151.57229,808.749 147.49462,807.7296 C 144.73008,807.0384 142.50205,804.7696 139.00714,806.5171 C 136.07632,807.9826 139.03562,812.4 137.38213,813.3922 C 133.45878,815.7461 129.65379,816.8501 125.26963,819.0421 C 121.78435,820.7848 116.56147,820.0786 111.53213,822.2797 C 108.04734,823.8046 102.98454,827.2282 99.40714,826.7171 C 97.52152,826.4477 95.22347,828.429 93.34462,828.7421 C 89.91872,829.3131 91.79461,833.3976 90.91963,833.5922 C 87.33278,834.3891 81.99194,834.2314 83.24462,839.2421 C 83.81691,841.5312 86.88939,845.6973 84.85714,847.7296 C 81.04277,851.544 83.70486,854.6046 75.56963,854.6046 C 73.60894,854.6046 67.04027,857.8139 67.08213,857.8296 C 68.6605,858.4214 74.75714,860.2805 74.75714,863.0797 C 74.75714,864.327 74.07389,872.0379 74.75714,872.3797 C 75.85237,872.9272 81.57205,874.8045 82.84462,874.8046 C 83.42946,874.8046 88.03459,871.627 88.09462,871.567 C 88.65998,871.0018 89.34002,868.2832 90.51963,866.3171 C 91.04154,865.4472 96.59158,859.0736 98.19462,862.2797 C 100.07522,866.0408 98.8719,869.1405 96.16963,871.167 C 92.48086,873.9336 96.06605,876.3134 98.19462,878.4421 C 99.984,880.2315 105.05714,879.1365 105.05714,881.667 C 105.05714,888.337 104.96088,889.7824 111.11963,887.7296 C 113.41226,886.9653 115.21219,883.6922 118.80714,883.6922 C 124.94387,883.6922 122.40659,880.0266 125.66963,877.2296 C 126.61245,876.4214 127.25288,874.8045 128.49462,874.8046 C 133.29206,874.8046 131.9645,872.9291 135.36963,871.567 C 140.45368,869.5334 146.28213,874.256 146.28213,873.5922 C 146.28213,868.7946 153.0153,873.0382 154.75714,869.5546 C 156.8697,865.3294 157.63901,865.5046 163.24462,865.5046 C 167.34317,865.5046 168.81803,861.467 172.94462,861.467 C 176.22165,861.467 178.96997,860.667 182.24462,860.667 C 185.23653,860.667 185.41506,863.2854 184.65714,866.3171 C 183.51328,870.8925 179.95992,870.767 174.96963,870.767 C 171.50699,870.767 166.66282,869.6194 165.66963,873.5922 C 165.08347,875.9368 157.01666,875.7552 157.18213,876.4171 C 157.84448,879.0666 159.41398,883.0406 155.56963,882.0797 C 154.49214,881.8102 153.40963,881.5365 152.33213,881.267 C 151.3116,881.012 151.11832,878.1576 150.31963,878.8421 C 148.5219,880.383 148.7696,884.6648 146.75714,885.2421 C 147.73803,888.1867 147.43213,895.7632 147.43213,899.1797 C 147.43213,904.3814 152.49037,900.0818 154.29462,899.1797 C 156.03824,898.3078 160.01,895.1851 164.58213,894.0421 C 167.22827,893.3806 171.07149,890.3597 172.00714,886.6171 C 173.41786,880.9742 179.00013,882.6171 185.14462,882.6171 C 188.38832,882.6171 191.63154,882.2326 194.86963,882.0421 C 196.9264,881.9211 197.94682,878.6171 200.00714,878.6171 C 205.99616,878.6171 206.39934,872.225 209.71963,868.9046 C 211.77027,866.8539 222.3971,868.0357 225.71963,866.0421 C 227.98894,864.6805 226.86963,855.8418 226.86963,853.467 C 226.86963,849.8198 227.57742,846.0358 229.71963,843.1797 C 233.30373,838.4008 244.00714,839.2342 244.00714,832.3296 C 244.00714,827.5093 235.71822,830.6323 238.86963,824.3296 C 240.89749,820.2739 243.43483,819.7573 239.43213,815.7546 C 236.85877,813.1811 238.86963,807.9782 238.86963,804.9046 C 238.86963,802.8693 236.40762,797.757 236.00714,795.7546 C 234.96286,790.5333 231.94694,788.0659 229.14462,784.3296 C 225.44688,779.3992 232.0511,778.171 234.29462,775.1797 C 235.47242,773.6091 238.49346,768.1218 238.86963,766.6171 C 238.91347,766.4418 238.52632,765.6128 238.23213,764.7546 C 237.48381,764.2374 236.74315,763.7051 236.00714,763.1797 C 240.35483,763.1797 228.89626,757.4438 224.58213,756.9046 C 218.7979,756.1816 218.96368,753.5133 220.58213,749.467 C 222.48352,744.7136 222.74486,745.2301 220.58213,740.9046 C 218.98034,737.701 223.87624,733.7501 225.14462,732.9046 C 225.80072,732.4672 224.2633,721.939 225.71963,719.7546 C 227.95795,716.3971 223.37819,711.7006 221.71963,710.0421 C 220.26587,708.5883 220.51517,701.7306 220.56963,698.9171 C 220.20872,698.8387 219.79174,698.7277 219.33213,698.5922 C 218.27392,698.9656 218.00914,698.6992 217.95714,698.167 C 215.68114,697.4419 212.98416,696.5341 211.38213,696.5421 z"
  },
  "LD": {
    "d": "M 462.06256,384.9392 C 461.77312,384.9949 461.47056,385.0611 461.1376,385.1517 C 460.49376,385.3126 458.29136,386.1859 457.71248,386.3016 C 452.95952,387.2523 448.92816,388.4579 446.86256,392.5891 C 445.92144,394.471 441.71248,400.2568 441.71248,401.1517 C 441.71248,407.5312 435.82032,403.8619 433.1376,407.4392 C 429.45216,412.3528 418.4888,411.1571 418.86256,411.1517 C 418.86704,411.6378 418.87168,412.1187 418.86256,412.5891 C 416.47936,413.185 412.26608,414.2198 415.42496,416.5891 C 417.52848,418.1667 421.63696,420.3414 420.57504,424.5891 C 420.07744,426.5794 414.8624,424.8126 414.86256,426.8642 C 414.86256,430.1152 412,430.5458 412,432.5891 C 412,437.0494 411.6776,439.9386 410.86256,444.0142 C 410.77008,444.4766 410.5344,445.0488 410.2,445.6766 C 410.48912,446.617 410.35536,448.1957 409.61248,450.3267 C 408.87872,452.4317 409.05072,453.4254 410.75008,456.7642 C 411.85632,458.9378 413.72144,461.6139 414.88752,462.7016 C 416.60432,464.3032 417,465.4262 417,468.6142 C 417,470.7792 417.2824,472.5517 417.62496,472.5517 C 417.96752,472.5517 420.17552,471.2589 422.52496,469.6766 C 426.53488,466.9763 426.8,466.9026 426.8,468.5392 C 426.8,470.2627 426.81168,470.261 428.3376,468.3766 L 429.87504,466.4642 L 431.18752,469.6142 C 431.90896,471.3406 432.5,473.0538 432.5,473.4267 C 432.5,473.7995 430.85648,474.8336 428.8376,475.7267 C 425.73248,477.1002 425.16256,477.7088 425.16256,479.6642 C 425.16256,479.6998 425.16336,479.7402 425.16256,479.7766 C 426.90512,478.9971 428.64016,478.224 429.71248,477.1517 C 433.3832,473.481 434.91552,476.0141 439.42496,476.0142 C 445.16784,476.0141 450.3512,478.3016 456.57504,478.3016 C 461.09712,478.3016 462.66064,476.9443 461.71248,473.1517 C 460.72384,469.1971 456.41904,467.595 460.57504,463.4392 C 463.21232,460.8019 465.38224,459.3538 463.42496,455.4392 C 460.69856,449.9862 462.64688,450.697 466.86256,448.5891 C 473.87344,445.0835 471.89552,444.1451 475.42496,439.4392 C 478.00672,435.9968 476.70672,431.5557 480,427.4392 C 483.6696,422.852 482.8624,431.0003 482.86256,433.1517 C 482.8624,436.6536 492.57504,432.6536 492.57504,429.1517 C 492.57504,427.6278 492.57504,426.113 492.57504,424.5891 C 492.80048,424.2483 493.02544,423.9064 493.25008,423.5642 C 490.71056,424.2549 488.8184,417.563 488.57504,416.5891 C 487.9792,414.2061 484.74672,410.0824 483.42496,407.4392 C 481.41984,403.4286 477.90016,399.6269 475.42496,397.1517 C 472.23712,393.9637 471.04416,392.1958 468,389.1517 C 465.19792,386.3494 468.0192,385.1517 462.28752,385.1517 C 462.2072,385.0874 462.13568,385.0125 462.06256,384.9392 z M 418.8,408.6517 C 418.8296,409.4907 418.85504,410.3336 418.86256,411.1392 C 419.01264,410.3069 418.98208,409.473 418.8,408.6517 z"
  },
  "LH": {
    "d": "M 639.47504,346.3016 C 638.8456,347.9229 631.42496,348.0981 631.42496,350.3016 C 631.42496,350.4842 625.20208,353.5058 624.57504,356.0141 C 623.67856,359.6003 617.36512,359.2813 614.86256,358.8642 C 610.7376,358.1766 606.08864,357.9648 604.86256,361.7267 C 603.4472,362.668 608.42784,371.2253 603.42496,373.7267 C 600.76784,375.0552 598.8624,378.4262 598.86256,382.3016 C 598.8624,385.751 595.06864,387.6237 593.1376,388.5891 C 591.44016,389.4378 587.48672,390.845 584.86256,392.0141 C 589.32384,392.9635 594.99024,396.1418 598.86256,400.0142 C 601.28192,402.4336 603.42496,404.3597 603.42496,408.5891 C 603.42496,410.3989 605.33424,420.0142 608,420.0142 C 610.81104,420.0141 618.37536,418.6331 621.1376,420.0142 C 623.4296,421.1602 624.37648,424.5301 626.86256,425.1517 C 631.45712,426.3003 632.6424,429.3424 636,430.3016 C 637.64336,430.7712 647.97408,429.9917 649.1376,430.8642 C 648.092,429.0779 649.58304,429.3315 649.57504,427.5766 C 649.57504,421.5011 656.62816,417.356 652,412.5891 C 651.11408,411.8805 650.28752,408.6574 650.28752,407.4392 C 650.28752,402.1002 652.14928,402.424 650.86256,398.3016 C 648.50672,390.7547 648.096,394.3016 642.28752,394.3016 C 639.28928,394.3016 634.28752,393.1466 634.28752,389.7267 C 634.28752,386.311 631.83024,383.9581 633.71248,381.1517 C 636.94496,376.332 633.71248,373.5362 633.71248,369.7267 C 630.68208,367.2645 632.46528,359.4419 636.9376,363.9141 C 640.27216,367.2488 643.45024,372.2173 647.42496,372.0141 C 649.02288,371.9325 652.9488,368.1949 654.86256,369.1517 C 658.39344,370.9171 660.95536,369.7267 665.1376,369.7267 C 670.57664,369.7267 667.76432,367.0464 666.86256,363.4392 C 664.68208,354.7174 663.42752,365.1542 659.42496,361.1517 C 655.85552,357.5821 651.32256,354.6992 647.52496,350.9016 C 645.13936,348.5158 640.04944,349.2133 639.47504,346.3016 z"
  },
  "LK": {
    "d": "M 346.0125,658.1642 C 344.68346,657.8888 339.42501,667.2883 339.42501,669.7267 C 339.42501,671.9184 336.92125,674.7466 336,676.5891 C 335.67872,677.2317 327.59966,678.7021 326.8625,679.4392 C 325.21974,681.0819 324.18387,681.1517 320.57501,681.1517 C 320.40992,681.0909 320.24221,681.0253 320.07501,680.9642 C 320.38106,685.4813 309.94605,684.1766 305.87501,684.1766 C 302.11645,684.1766 295.54578,682.2122 292.5375,682.9642 C 287.61534,684.1947 281.02326,678.0654 275.57501,682.1517 C 271.43107,685.2595 273.53336,687.8086 268.7,688.6142 C 264.75331,689.272 261.2495,692.2517 258.2,692.2517 C 251.454,692.2517 247.67755,695.4483 242.0375,696.7016 C 235.84842,698.077 231.80037,700.6411 225.0625,698.7267 C 223.56288,698.6648 222.04496,698.8718 220.5625,698.6016 C 220.50803,701.415 220.25874,708.273 221.7125,709.7267 C 223.37106,711.3853 227.95082,716.0818 225.7125,719.4392 C 224.25616,721.6237 225.7936,732.1517 225.1375,732.5891 C 223.86912,733.4347 218.9732,737.3856 220.57501,740.5891 C 222.73774,744.9146 222.47638,744.3982 220.57501,749.1517 C 218.95654,753.1978 218.79078,755.8661 224.57501,756.5891 C 228.88912,757.1283 240.3477,762.8642 236,762.8642 C 236.73603,763.3896 237.47667,763.9219 238.22501,764.4392 C 237.89933,763.489 237.68704,762.5018 238.2875,762.3016 C 239.7655,760.961 244.41134,755.6176 247.42501,754.8642 C 250.34222,754.1349 253.28454,756.9378 254.8625,757.7267 C 257.18864,758.8898 262.88552,757.6021 265.1375,757.1517 C 268.66102,756.447 274.2875,756.468 274.2875,761.1517 C 274.2875,765.5134 288.07282,757.6539 288.57501,757.1517 C 293.50354,752.2232 280.56874,752.7021 297.1375,749.1517 C 298.25499,748.9122 296.6264,746.7488 297.1375,745.7267 C 297.56858,744.8645 298.76629,744.5402 300.35,744.5517 C 305.10115,744.5862 313.34739,747.68 314.8625,748.5891 C 321.85242,752.783 308.73002,749.8776 322.2875,752.5891 C 326.44051,753.4197 320.16605,759.4392 326.8625,759.4392 C 327.09966,759.4392 334.09163,767.8182 334.2875,768.0142 C 335.76475,769.4914 344.00206,768.4675 345.7125,769.1517 C 348.46318,770.252 359.12592,763.9109 361.1375,762.3016 C 361.43498,762.0637 361.1375,761.5326 361.1375,761.1517 C 361.1375,760.9608 369.5123,764.5891 370.8625,764.5891 C 377.85566,764.5891 380.13608,765.7947 387.1375,765.1517 C 387.10078,765.5923 387.5607,765.9283 387.97501,766.3891 C 387.9852,765.5976 387.98979,764.8058 388,764.0142 C 388,757.8198 392.34965,756.6672 385.1375,754.8642 C 383.23117,754.3877 378.0681,747.7947 376.57501,746.3016 C 373.22086,742.9475 380.3673,738.8642 372,738.8642 C 365.25605,738.8642 366.2875,738.2869 366.2875,732.0142 C 366.2875,728.7261 359.20549,732.2746 356.57501,730.3016 C 354.17797,728.5038 358.46829,722.7285 358.8625,721.1517 C 359.5064,718.576 373.18603,714.8282 374.8625,713.1517 C 380.57424,707.44 381.33805,716.1579 377.7125,702.8642 C 376.92008,699.9586 380.57499,697.3133 380.57501,694.3016 C 380.57501,692.333 375.67502,692.7515 376.57501,689.1517 C 377.45859,685.6173 387.22104,678.5534 389.7125,675.4392 C 390.43062,674.5416 371.71965,678.316 369.7125,674.3016 C 368.80699,672.4906 367.04584,674.6755 365.7125,673.1517 C 363.75323,670.9125 361.74899,676.1608 358.8625,675.4392 C 352.41378,673.827 352.03366,681.219 348,673.1517 C 346.4131,669.9779 347.7196,665.155 346.8625,661.7267 C 346.6776,660.987 346.44155,660.0624 346.2875,658.5891 C 346.24413,658.3354 346.14998,658.1926 346.0125,658.1642 z M 238.8125,766.0392 C 238.83171,766.1016 238.85459,766.1574 238.8625,766.2016 C 238.85504,766.1576 238.83179,766.1022 238.8125,766.0392 z"
  },
  "LM": {
    "d": "M 371.5625,256.6891 C 371.38579,257.4339 371.17979,258.1254 370.52501,258.2891 C 369.1804,258.6253 361.71859,261.5267 360.82501,261.5267 C 360.53394,261.5267 360.15485,261.6942 359.7375,261.9517 C 360.12459,262.5602 360.64051,263.1646 360,265.7267 C 359.47733,267.8173 353.9012,268.7778 355.42501,270.3016 C 356.82595,271.7026 364.57499,274.423 364.57501,276.5891 C 364.57501,277.9813 363.30523,287.5714 362.2875,288.5891 C 357.36371,293.513 363.70981,295.1133 364.57501,299.4392 C 365.042,301.7741 364.38274,306.7075 365.1375,309.7267 C 365.99926,313.1736 368,314.6626 368,318.8642 C 368,321.3848 367.18955,327.7662 368.57501,329.1517 C 370.38061,330.9573 373.728,334.3016 377.1375,334.3016 C 382.61757,334.3016 383.82362,338.1059 384.2875,342.0141 C 384.26723,342.1038 384.24725,342.1893 384.22501,342.2766 C 384.90678,342.4939 385.59181,342.6917 386.2875,342.8642 C 386.91749,339.0843 393.1375,338.0158 393.1375,344.0141 C 393.1375,347.6408 398.2875,347.8966 398.2875,352.5891 C 398.2875,358.2938 399.1917,358.8226 400,362.8642 C 401.76,371.6645 399.18205,368.9347 396,374.3016 C 394.19304,377.3493 398.62518,377.0622 398.2875,380.5891 C 397.82832,385.3851 391.8033,384.2982 401.71248,388.0141 C 403.8816,388.8277 409.72448,390.876 410.86256,393.1517 C 412.46944,396.3656 411.95696,399.3962 414.28752,401.7267 C 417.16976,404.609 419.464,407.8581 418.86256,411.1517 C 418.4888,411.1571 429.45216,412.3528 433.1376,407.4392 C 435.82048,403.8619 441.71248,407.5312 441.71248,401.1517 C 441.71248,400.2568 445.92144,394.471 446.86256,392.5891 C 448.92816,388.4579 452.95952,387.2523 457.71248,386.3016 C 458.29152,386.1859 460.49376,385.3126 461.1376,385.1517 C 461.47056,385.0611 461.77312,384.9949 462.06256,384.9392 C 459.52256,382.3974 461.1376,374.5918 461.1376,371.4392 C 461.1376,368.4315 456.84496,365.2755 454.86256,362.3016 C 453.02448,359.545 450.34976,356.6514 448,354.3016 C 444.79072,351.0923 445.24048,349.037 441.1376,346.3016 C 436.55744,343.2482 434.12544,345.5646 429.71248,341.1517 C 427.10128,338.5403 424.87888,339.472 422.86256,335.4392 C 421.11488,331.9438 419.28272,330.5474 416,329.7267 C 411.83616,328.6858 409.82624,333.3917 407.42496,328.5891 C 406.22912,326.1974 407.42496,319.6614 407.42496,317.1517 C 407.42496,310.7066 406.96304,310.2314 412.57504,306.8642 C 414.972,305.4259 415.44448,304.5237 416,302.3016 C 416.33712,301.9958 416.68,301.7019 417.02496,301.4141 C 416.96848,301.4179 416.91616,301.4283 416.86256,301.4392 C 416.6328,301.3483 407.11088,293.7006 406.28752,293.1517 C 402.81344,290.8357 401.77872,287.5053 399.42501,285.1517 C 395.99888,281.7256 394.58026,280.1605 389.7125,277.7267 C 387.87101,276.8059 384.57499,269.2888 384.57501,267.4392 C 384.31736,266.6866 380.8527,262.6342 383.42501,264.3016 C 381.71072,262.4054 375.53109,259.6656 373.7125,258.3016 C 372.2159,257.1792 372.24085,257.1979 371.5625,256.6891 z"
  },
  "LS": {
    "d": "M 493.1376,550.8642 C 485.25008,550.8642 488.19728,553.4411 484,556.5891 C 479.99152,559.5955 473.70896,557.8642 469.1376,560.5891 C 468.05984,561.2315 469.98448,569.7267 467.42496,569.7267 C 461.15136,569.7267 460.57504,569.6112 460.57504,573.7267 C 460.57504,576.5226 465.74096,583.3824 465.71248,583.4392 C 465.49904,583.8664 456.99232,592.0667 455.42496,592.5891 C 450.9472,594.0818 449.94304,595.3251 452,599.4392 C 453.13232,601.7037 446.22928,611.2683 447.42496,611.4392 C 447.47536,612.0694 447.47776,612.6267 447.45008,613.1392 C 448.38096,613.6789 450.09024,614.8248 450.28752,614.8642 C 458.01792,616.4102 459.17904,617.9726 455.42496,621.7267 C 453.14224,624.0094 450.28752,625.8454 450.28752,629.7267 C 450.28752,633.1741 450.8624,636.1992 450.86256,639.4392 C 450.8624,644.0147 455.356,650.0131 456,652.5891 C 456.2624,652.7147 456.52512,652.8384 456.78752,652.9642 C 456.79248,652.9666 456.79504,652.9742 456.8,652.9766 C 467.19664,654.2882 460.47552,647.4392 460.57504,647.4392 C 464.62192,647.4392 466.0408,645.2227 468.57504,644.5891 C 473.51584,643.3538 471.98064,646.8614 474.86256,648.0142 C 477.70768,649.1522 480.25216,653.1517 484,653.1517 C 485.63856,653.1517 485.22384,649.1517 486.86256,649.1517 C 488.48544,649.1517 496,649.6963 496,648.0142 C 496,644.897 495.4328,641.8653 498.28752,641.1517 C 501.85024,640.261 502.1064,638.3016 506.28752,638.3016 C 511.15792,638.3016 511.23616,640.2194 512.57504,634.8642 C 513.68896,630.4082 515.00832,629.7267 520,629.7267 C 521.62256,629.7267 523.792,629.4808 525.87504,629.4766 C 529.34672,629.4698 532.57504,630.1344 532.57504,633.7267 C 532.57504,636.3797 527.05952,641.1517 529.71248,641.1517 C 531.42672,641.1517 533.14816,641.1517 534.86256,641.1517 C 540.63408,641.1517 542.28752,645.8925 542.28752,650.3016 C 542.60816,650.3336 542.93184,650.371 543.25008,650.4142 C 545.66704,648.7758 549.99776,645.219 553.1376,642.8642 C 557.5248,639.5736 558.8624,644.1522 558.86256,636.5891 C 558.86256,635.3794 559.95104,633.8424 560.7376,632.9642 C 560.70624,632.8894 560.59536,632.636 560.57504,632.5891 C 561.02528,630.7883 560.8904,620.0824 559.42496,617.1517 C 557.28976,612.881 552.18912,610.6672 550.28752,606.8642 C 548.20256,602.6942 542.58208,604.2283 539.42496,603.4392 C 534.25344,602.1462 538.28752,599.232 538.28752,595.4392 C 538.28752,591.2752 539.54208,589.4923 541.1376,586.3016 C 542.7336,583.1096 540.27392,577.687 538.86256,574.8642 C 535.48064,568.1006 545.18016,575.4818 535.42496,565.7267 C 535.2768,565.5784 535.14032,565.4688 535.01248,565.3766 C 534.5648,565.3186 534.12608,565.2483 533.71248,565.1517 C 532.83088,565.3722 532.78192,565.3874 531.42496,565.7267 C 528.41904,566.4782 522.76832,565.5205 518.86256,566.3016 C 517.60112,566.5539 507.10288,569.753 506.86256,569.1517 C 506.30992,567.7704 504.3608,567.1699 504,565.7267 C 503.42272,563.4176 504.18736,558.7099 503.42496,557.7267 C 498.15552,550.931 501.46944,550.8642 493.1376,550.8642 z M 561.6,632.2642 C 561.69616,632.2608 561.82304,632.2638 561.98752,632.2766 C 561.83136,632.2651 561.6912,632.2603 561.6,632.2642 z"
  },
  "MH": {
    "d": "M 585.05008,392.0517 C 583.27968,392.9157 575.75952,396.1347 573.71248,398.8642 C 571.94928,401.215 562.92624,397.8453 561.71248,397.1517 C 557.69872,394.8581 555.90368,389.5491 554.28752,396.0141 C 553.08144,400.8384 557.33936,400.3874 554.28752,403.4392 C 551.82224,405.9043 552.19488,410.4965 553.1376,411.4392 C 555.60544,413.907 553.96128,415.7654 552.57504,417.1517 C 551.53648,418.1902 542.12528,417.4797 541.1376,417.7267 C 537.2528,418.6979 536.5808,417.8629 533.71248,420.0142 C 533.26864,420.347 529.20304,415.4922 528.57504,414.8642 C 525.65584,411.9451 519.34048,416.0986 517.71248,417.7267 C 514.76432,420.6749 505.44144,415.2995 502.86256,416.5891 C 499.57232,418.2342 497.38576,416.6677 496,419.4392 C 494.61424,422.2106 499.80224,420.7251 501.1376,421.7267 C 502.4728,422.7282 510.28752,428.5277 510.28752,429.1517 C 510.28752,434.2205 510.55552,433.4322 513.71248,436.5891 C 515.36656,438.2432 519.25776,440.3942 522.28752,441.1517 C 524.83424,441.7883 531.6568,444.1232 533.71248,446.8642 C 535.12464,448.7472 537.92704,450.1434 538.86256,452.0142 C 539.87856,454.0461 542.28752,455.9827 542.28752,451.4392 C 542.28752,451.211 542.96176,440.3424 544,441.7267 C 545.79872,444.125 549.71248,448.147 549.71248,452.0142 C 549.71248,452.8638 549.1256,460.8582 549.71248,461.1517 C 552.09792,462.3443 553.45168,464.5891 548.57504,464.5891 C 545.03264,464.5891 542.27312,463.9816 543.42496,468.5891 C 544.52256,472.9789 542.61888,479.409 543.42496,483.4392 C 544.94128,491.0208 536.21856,483.727 534.86256,489.1517 C 533.456,494.7773 527.88592,492.593 526.28752,496.5891 C 525.3384,498.9619 515.99712,500.7333 518.23216,501.4392 C 518.9176,502.6962 521.0584,503.2094 522.43152,503.1739 C 524.70896,505.7914 529.29456,508.6181 533.1376,509.1517 C 533.5488,508.7403 543.50512,505.5202 549.1376,502.3016 C 555.61136,498.6024 557.77408,498.3139 564.57504,500.0142 C 569.7224,501.301 572.7792,501.5758 577.71248,500.5891 C 578.66496,500.3987 579.60384,500.0142 580.57504,500.0142 C 585.3448,500.0141 591.87952,505.1517 592.57504,505.1517 C 599.70768,505.1517 604.84016,500.731 610.86256,503.4392 C 614.51184,505.0802 613.66016,504.7096 613.1,504.7267 C 612.53984,504.7437 620.42976,508.831 620.95008,509.0392 C 622.00992,509.4632 623.35312,509.715 624.81248,509.8642 C 624.74208,509.5339 624.66304,509.1973 624.57504,508.8642 C 627.70512,507.5848 628.8232,503.0213 629.1376,502.8642 C 632.53152,501.1672 634.07872,498.4978 637.1376,495.4392 C 640.12352,492.4531 638.28736,489.0517 638.28752,485.1517 C 638.28752,482.8762 633.5136,478.2869 632,477.1517 C 631.33024,476.6494 624.13088,471.3738 628.57504,469.1517 C 630.3728,468.2528 633.07328,463.6789 633.71248,463.4392 C 639.5416,461.2533 639.54016,462.6149 645.1376,464.0142 C 648.52272,464.8603 649.71248,465.1464 649.71248,460.5891 C 649.71248,457.9102 655.25632,450.153 656,450.3016 C 656.15408,450.192 656.30832,450.096 656.46256,449.9891 C 653.61072,445.6563 655.94096,440.5302 653.1376,437.7267 C 650.08528,434.6744 649.64512,433.0579 649.58752,428.9642 C 648.072,429.2976 648.56608,429.4355 649.1376,430.8642 C 647.97408,429.9917 637.64336,430.7712 636,430.3016 C 632.6424,429.3424 631.45712,426.3003 626.86256,425.1517 C 624.37632,424.5301 623.4296,421.1602 621.1376,420.0142 C 618.37536,418.6331 610.81104,420.0141 608,420.0142 C 605.33424,420.0142 603.42496,410.3989 603.42496,408.5891 C 603.42496,404.3597 601.28192,402.4334 598.86256,400.0142 C 595.04304,396.1947 589.48224,393.048 585.05008,392.0517 z"
  },
  "MN": {
    "d": "M 541.8,271.8016 C 538.42736,271.8254 537.82448,275.3272 535.42496,277.7267 C 532.67312,280.4786 533.796,281.5595 531.42496,286.3016 C 530.79328,287.5651 525.88176,289.132 523.22496,289.8891 C 523.28736,290.2125 523.35104,290.5288 523.42496,290.8642 C 521.62224,291.3149 520.0672,290.5827 519.42496,293.1517 C 518.52496,296.7522 520,299.808 520,302.3016 C 520,304.9379 523.22848,310.1318 522.86256,310.8642 C 520.912,314.7651 512.23392,317.9165 511.42496,321.1517 C 510.2792,325.7352 507.43392,326.1531 506.86256,330.5891 C 509.73808,332.5984 508,334.1973 508,337.1517 C 508,338.9662 504.2192,345.6555 504.57504,345.7267 C 507.75616,346.3629 515.06544,350.2923 518.86256,348.0141 C 524.52208,344.6184 528.95568,345.7267 535.42496,345.7267 C 541.6592,345.7267 539.27232,346.2286 540.57504,351.4392 C 541.21824,354.012 543.97184,354.8603 546.28752,355.4392 C 548.71616,356.0464 551.82416,359.6747 553.1376,362.3016 C 555.21216,366.4509 556.10016,364.1019 558.86256,366.8642 C 560.06176,368.0635 566.15456,373.9338 566.28752,374.8642 C 567.08192,380.4248 567.02512,379.0018 571.42496,382.3016 C 573.79792,384.0813 582.7056,391.7989 583.42496,391.4392 C 584.62416,391.2478 585.83872,391.1538 587.05008,391.0891 C 589.34176,390.1637 591.86928,389.2232 593.1376,388.5891 C 595.06848,387.6237 598.8624,385.751 598.86256,382.3016 C 598.8624,378.4262 600.76784,375.0552 603.42496,373.7267 C 607.81072,371.5338 604.52416,364.6918 604.6,362.4016 C 604.40784,362.373 604.21152,362.3437 604,362.3016 C 603.6088,363.8664 596.01472,355.5102 595.42496,353.1517 C 594.6432,350.0248 595.42496,345.5544 595.42496,342.3016 C 595.42496,340.0837 594.8624,336.9075 594.86256,334.3016 C 594.8624,330.4462 594.69136,327.268 592.57504,325.1517 C 589.38432,321.961 586.8768,324.7067 583.42496,326.8642 C 578.99808,329.631 575.92784,323.6658 575.42496,321.1517 C 574.9376,318.7144 571.90544,314.6754 570.86256,312.5891 C 569.38944,309.643 566.28752,310.2346 566.28752,305.1517 C 566.28752,300.3894 563.96176,294.4691 564.86256,289.1517 C 564.8616,289.1477 564.8632,289.1432 564.86256,289.1392 C 563.55776,287.2322 557.93584,282.2106 556,281.7267 C 553.75456,281.1653 555.70992,275.151 555.42496,273.7267 C 555.10704,272.137 545.23488,272.4666 543.42496,272.0141 C 542.81664,271.8621 542.28176,271.7982 541.8,271.8016 z"
  },
  "MO": {
    "d": "M 170.4375,288.2517 C 169.89659,288.2829 169.26549,288.6237 168.4875,289.4016 C 167.71966,290.1694 165.92587,289.9731 165.6625,291.0267 C 165.30264,292.4661 164.77078,294.8986 166.07501,295.8766 C 168.71424,297.8562 168.89352,300.1042 170.1125,303.1517 C 170.30866,303.6421 173.60635,309.6141 170.5125,309.6141 C 166.91139,309.6141 164.9619,306.7766 162.4375,306.7766 C 159.38805,306.7766 158.75712,307.3357 157.9875,310.4141 C 157.80704,311.136 156.37842,318.9016 154.75,318.9016 C 153.53085,318.9016 147.11654,318.8435 148.7,315.6766 C 149.76528,313.5461 148.7,311.6509 148.7,309.6141 C 148.7,308.5714 149.2491,302.2795 147.8875,301.9392 C 142.7145,300.6459 141.82501,301.0898 141.82501,295.8766 C 141.82501,291.9925 137.94944,290.7664 136.97501,294.6642 C 136.53461,296.4258 132.81376,299.3635 130.9125,300.3141 C 127.69621,301.9222 131.22754,307.3032 130.5125,307.5891 C 128.79387,308.2766 123.75147,307.8171 124.85,310.0141 C 125.8379,311.9899 132.08832,313.0637 130.1125,314.0517 C 129.23243,314.4917 125.56664,314.56 124.45,315.6766 C 122.68536,317.4413 123.2375,320.6422 123.2375,323.7517 C 123.2375,325.0712 126.70981,331.8536 125.6625,332.6392 C 123.98269,333.899 113.98782,338.3395 117.9875,342.3392 C 118.85482,343.2064 124.72933,344.8973 126.47501,343.1517 C 128.55981,341.0669 130.1125,341.1846 130.1125,337.4891 C 130.1125,335.0648 130.1125,332.6386 130.1125,330.2141 C 130.1125,328.2053 132.21606,324.9253 134.15,324.1517 C 139.1276,322.1606 136.69488,322.0597 137.7875,317.6891 C 138.60965,314.4006 139.02878,314.5218 140.6125,317.6891 C 141.94699,320.3581 147.74035,323.7102 147.8875,324.1517 C 150.01152,330.5237 144.25,327.6018 144.25,331.4267 C 144.25,334.4666 149.81008,335.6565 148.2875,338.7016 C 146.90763,341.4614 142.23075,343.1507 144.25,347.1891 C 145.86278,350.4147 149.70998,351.2808 151.92501,347.5891 C 152.85747,346.035 153.88258,339.9478 156.37501,338.7016 C 158.95358,337.4123 162.4375,336.7216 162.4375,340.7267 C 162.4375,344.4947 159.2,348.6752 159.2,350.8267 C 159.2,355.1317 151.92501,353.4894 151.92501,357.6891 C 151.92501,361.8597 155.67914,362.0197 157.5875,364.5642 C 159.19048,366.7014 158.52717,369.281 159.6,371.4267 C 161.02717,374.281 161.79392,376.627 163.2375,379.5141 C 163.50686,380.053 163.78062,380.5878 164.05,381.1267 C 161.06227,387.1021 161.15282,378.1544 156.77501,378.7016 C 151.71318,379.3344 151.52501,381.1296 151.52501,385.9766 C 151.52501,388.8902 149.9125,392.1517 149.9125,394.4642 C 149.9125,399.2443 149.37768,399.7141 154.75,399.7142 C 157.2541,399.7141 162.06501,399.6867 163.65,398.1016 C 166.09122,395.6605 172.06946,394.1197 172.5375,393.6517 C 175.93992,390.2493 175.87571,390.6085 179.4,393.2517 C 182.46578,395.551 185.81474,398.1016 188.2875,398.1016 C 192.16072,398.1016 190.49587,394.1152 193.95,393.2517 C 198.29037,392.1666 195.25738,395.7635 195.5625,397.2891 C 195.98923,399.4229 199.34678,401.6525 197.9875,403.3517 C 196.35382,405.3938 191.52499,405.1866 191.52501,407.8016 C 191.52501,411.0936 191.43322,412.2194 194.7625,413.0517 C 198.99358,414.1094 199.63224,417.9016 194.7625,417.9016 C 190.05224,417.9016 184.62666,417.3485 180.2125,419.1142 C 177.79589,420.0808 170.85302,424.5013 170.1125,421.5392 C 169.30856,418.3234 167.06878,418.672 164.8625,420.3267 C 163.50085,421.3478 160.88656,421.7397 159.2,422.7517 C 156.17859,424.5645 152.42602,419.8256 151.52501,420.7267 C 149.11432,423.1373 151.32501,424.7216 151.32501,428.0016 C 151.32501,428.9806 149.67811,435.9136 148.7,436.0766 C 143.63061,436.9216 147.84565,439.9342 148.7,443.3517 C 149.2889,445.7072 145.584,447.8338 147.8875,448.6016 C 148.69562,448.871 147.87358,450.8202 148.7,451.0267 C 151.44333,451.7125 152.14741,453.2741 154.35,455.4766 C 154.91765,456.0443 155.28877,456.6218 155.4875,457.1766 C 155.83973,457.3381 156.20242,457.5168 156.57501,457.7267 C 157.73214,458.3053 160.82776,459.3501 161.1375,460.5891 C 162.55477,466.2582 168.30354,460.4534 167.42501,460.0142 C 159.82493,456.2141 176.3335,457.3246 177.1375,457.7267 C 179.57834,458.947 183.29483,460.5891 186.2875,460.5891 C 190.47054,460.5891 194.64994,459.8141 197.1375,462.3016 C 198.23522,463.3994 202.74598,473.2557 205.1375,470.8642 C 206.73898,469.2627 211.02326,468.1918 214.8625,469.1517 C 218.22589,469.9925 223.88774,469.8362 228,470.8642 C 232.73109,472.0469 235.07248,470.2266 236,474.8642 C 236.50558,477.3922 243.3575,486.855 246.8625,487.4392 C 249.69432,487.911 259.30166,489.1074 260.57501,484.0142 C 261.88955,478.7558 269.1375,482.9386 269.1375,477.1517 C 269.1375,472.8499 273.1375,470.3787 273.1375,466.8642 C 273.1375,461.936 273.16746,460.8573 276.57501,458.3016 C 280.72285,455.1907 278.45659,452.0141 284,452.0142 C 289.69085,452.0142 297.61101,443.1435 302.2625,442.9891 C 302.26846,442.7603 302.28254,442.5302 302.2875,442.3016 C 301.53546,439.2934 307.9669,438.4797 308.57501,435.4392 C 309.73718,429.6283 316.90184,432.4067 318.2875,426.8642 C 319.07982,423.6949 318.15466,419.761 317.1375,417.7267 C 314.22379,411.8992 304.76146,425.5434 308,412.5891 C 309.02318,408.4963 306.57136,405.7339 308.57501,401.7267 C 310.04006,398.7965 313.92168,399.0208 315.42501,396.0141 C 316.24691,394.3704 335.70613,397.0954 323.42501,389.7267 C 321.34878,388.481 319.33616,384.1963 318.8625,382.3016 C 317.4428,376.6229 319.3091,374.6408 322.2875,373.1517 C 323.66104,372.465 327.6584,374.4971 328.8625,373.7267 C 328.8264,372.459 328.57501,365.2538 328.57501,362.8642 C 328.57499,361.001 321.13597,364.6203 320.57501,366.8642 C 320.07192,368.8765 311.02304,372.5891 309.1375,372.5891 C 303.72813,372.5891 305.85763,376.1154 301.7125,377.1517 C 300.61562,377.4259 296.51829,372.5718 294.2875,372.0141 C 291.60064,371.3424 292.3193,366.3016 286.8625,366.3016 C 281.47944,366.3016 279.70022,364.0141 273.7125,364.0141 C 267.34922,364.0141 273.63835,357.7421 276,357.1517 C 280.40008,356.0517 284.00837,354.3101 282.8625,349.7267 C 281.23675,343.2237 281.1257,343.8306 289.7125,340.0141 C 291.30082,339.3082 281.2532,333.5586 280.57501,333.1517 C 277.466,331.2862 269.7075,331.6333 265.7125,330.3016 C 259.98837,328.3936 263.68013,339.6432 254.8625,332.5891 C 254.38371,332.2061 254.8625,327.4968 254.8625,326.8642 C 255.3847,326.4774 256.26384,326.2747 256.7625,325.8766 C 256.68966,325.8646 256.62672,325.8283 256.57501,325.7766 C 256.30562,325.5072 256.14458,324.8718 255.77501,324.9642 C 250.86358,326.192 256.41379,321.4461 253.75,320.1141 C 251.50814,318.9933 250.51251,319.8491 250.5125,316.4766 C 250.5125,313.2757 250.35064,308.7549 249.7125,305.5642 C 248.4035,299.0192 245.44256,305.9272 242.8375,304.3642 C 240.7632,303.1195 238.64766,300.1298 237.9875,297.4891 C 236.8916,293.1056 237.51094,296.0189 232.7375,295.0642 C 231.39062,294.7947 230.05485,294.4774 228.7,294.2517 C 225.68528,293.7491 216.99432,290.12 214.15,291.8267 C 209.2192,294.7851 208.14886,291.8267 203.65,291.8267 C 200.81574,291.8267 197.73288,291.7251 195.1625,292.2392 C 194.48906,292.3738 193.80376,292.4726 193.1375,292.6392 C 188.80456,293.7224 191.21237,294.2517 187.07501,294.2517 C 184.60446,294.2517 175.58008,295.4226 174.15,293.0392 C 172.84606,290.8659 172.06022,288.1579 170.4375,288.2517 z M 114.4375,355.8517 C 114.0011,355.8669 113.56171,356.0525 113.1375,356.4766 C 112.21392,357.4002 112.32499,358.3366 112.32501,359.9141 C 112.32501,361.4531 113.16794,362.0734 113.5375,363.5517 C 113.92963,365.1202 112.61912,367.031 111.32501,368.0016 C 110.1547,368.8794 107.52542,369.0016 105.6625,369.0016 C 104.58442,369.0016 102.8375,368.2262 102.8375,369.4141 C 102.8375,371.6152 102.17741,371.2986 100.6125,372.4392 C 100.6125,373.6616 101.5259,375.027 102.42501,375.4766 C 104.80901,376.6686 104.82011,378.1925 107.07501,376.6891 C 107.36272,376.4973 110.81664,374.4402 110.9125,374.4642 C 113.13682,375.0202 114.28686,376.0766 116.77501,376.0766 C 117.74163,376.0766 118.28227,374.6466 118.3875,374.6642 C 123.65957,375.5429 119.0663,375.2422 121.62501,377.2891 C 123.98142,379.1742 123.90376,377.9016 126.47501,377.9016 C 127.18416,377.9016 130.62494,377.7763 130.7125,378.3016 C 131.0316,380.2162 130.5125,381.8682 130.5125,383.9642 C 130.5125,385.4104 131.36504,387.9216 132.32501,388.4016 C 133.44003,388.9592 136.63754,386.7454 136.97501,387.5891 C 137.52302,388.9592 136.97501,390.5008 136.97501,392.0392 C 136.97501,393.9387 136.72091,395.6093 138.1875,396.4891 C 140.13507,397.6578 139.65072,398.6136 141.22501,397.4891 C 141.6964,397.1525 142.22786,396.8987 142.6375,396.4891 C 143.70138,395.4253 142.36963,392.707 143.2375,391.8392 C 144.8059,390.2707 144.24714,390.2189 144.65,387.8016 C 144.85606,386.5653 145.06251,385.0618 145.0625,383.5517 C 145.0625,381.6661 145.06251,379.7874 145.0625,377.9016 C 145.0625,376.3389 144.60699,374.8459 145.0625,373.2517 C 145.72722,370.9251 144.28762,367.1014 145.0625,365.1642 C 146.23768,362.2262 143.45736,364.7888 141.22501,363.9517 C 141.03706,363.8811 136.24789,363.1224 136.1625,362.9517 C 135.832,362.2907 134.71621,356.1552 132.9375,357.4891 C 131.43584,358.6154 127.29296,361.3261 125.8625,361.9392 C 124.56558,362.495 121.88344,364.8226 120.4125,363.3517 C 119.59624,362.5354 120.19256,360.9067 119,359.7141 C 118.21042,358.9246 116.32854,355.7856 114.4375,355.8517 z M 153.9625,460.3766 C 153.86693,460.4242 153.76603,460.4706 153.6625,460.5142 C 153.76584,460.4704 153.86715,460.4243 153.9625,460.3766 z"
  },
  "OY": {
    "d": "M 511.42496,506.8642 C 510.91488,508.9046 507.79504,510.724 506.86256,512.5891 C 506.02512,514.2638 500.16016,516.8272 498.86256,517.1517 C 495.04752,518.1054 494.8768,524.5891 489.1376,524.5891 C 484.27744,524.5891 477.24048,524.2598 473.1376,523.4392 C 468.48608,522.509 468.57504,519.2762 468.57504,515.4392 C 468.57504,509.3542 466.06512,510.6418 462.28752,506.8642 C 457.31792,501.8946 455.42496,505.1062 455.42496,510.8642 C 455.42496,513.4549 449.76592,512.9258 449.1376,515.4392 C 448.74208,517.021 437.24464,515.8802 436.57504,516.0142 C 433.87904,516.5533 428.46512,517.4698 425.1376,518.3016 C 424.21504,518.5323 421.33008,520.0141 417.22496,520.0142 C 412.56624,522.0154 410.46832,524.2112 406.28752,526.3016 C 406.12048,526.3851 399.47067,530.2749 398.5,532.8642 C 398.49453,532.9082 398.49352,532.944 398.4875,532.9891 C 398.54971,533.3563 398.64086,533.7955 398.7375,534.2642 C 398.99846,534.5114 399.40768,534.7162 400,534.8642 C 399.70614,535.276 399.43474,535.709 399.1625,536.1392 C 399.80686,538.7082 400.74896,541.4858 401.71248,541.7267 C 405.82112,542.7538 408.57504,542.1482 408.57504,546.8642 C 408.57504,551.1826 408.19568,552.5706 405.1376,554.8642 C 404.26528,555.5184 400.22896,561.8926 397.27501,563.8142 C 397.4507,563.8082 397.62282,563.804 397.8,563.8016 C 399.40347,563.781 400.97376,563.935 401.1376,564.5891 C 401.60368,566.4541 403.48944,572.6538 405.1376,574.3016 C 406.49056,575.6547 408.26864,579.305 411.42496,577.7267 C 414.96976,575.9542 418.28752,577.0315 418.28752,581.7267 C 418.28752,588.2286 414.32288,586.1226 413.1376,590.8642 C 412.73568,592.4715 413.54992,598.0642 412.57504,600.0142 C 410.63296,603.8982 408.48688,605.4795 407.42496,609.7267 C 406.52784,613.3157 403.38656,613.2406 402.28752,615.4392 C 401.20224,617.6093 403.38064,622.3458 401.71248,624.0142 C 399.74774,625.9787 401.32832,626.48 404,629.1517 C 406.1544,631.3061 407.50416,633.7693 410.28752,635.4392 C 412.25424,636.6192 412.5688,640.5891 414.86256,640.5891 C 421.82896,640.5891 416.57504,635.9813 416.57504,632.5891 C 416.57504,622.7766 421.53712,631.2939 425.71248,625.7267 C 427.40832,623.4656 432.57504,621.495 432.57504,618.3016 C 432.57504,615.5366 434.72848,607.8802 438.28752,611.4392 C 440.64272,613.7942 443.6224,612.5018 446.86256,612.8642 C 446.91072,612.84 447.13424,612.956 447.45008,613.1392 C 447.47776,612.6267 447.47536,612.0693 447.42496,611.4392 C 446.22928,611.2683 453.13232,601.7037 452,599.4392 C 449.94304,595.3251 450.9472,594.0818 455.42496,592.5891 C 456.99232,592.0667 465.49904,583.8664 465.71248,583.4392 C 465.74096,583.3824 460.57504,576.5226 460.57504,573.7267 C 460.57504,569.6112 461.15136,569.7267 467.42496,569.7267 C 469.98448,569.7267 468.05984,561.2315 469.1376,560.5891 C 473.70896,557.8642 479.99152,559.5955 484,556.5891 C 488.19728,553.4411 485.24992,550.8642 493.1376,550.8642 C 501.46944,550.8642 498.15552,550.931 503.42496,557.7267 C 504.18736,558.7099 503.42272,563.4176 504,565.7267 C 504.3608,567.1699 506.30992,567.7704 506.86256,569.1517 C 507.10288,569.753 517.60096,566.5539 518.86256,566.3016 C 522.76832,565.5205 528.41904,566.4782 531.42496,565.7267 C 532.78192,565.3874 532.83088,565.3722 533.71248,565.1517 C 534.12224,565.2474 534.55664,565.3189 535,565.3766 C 534.47536,565.0018 534.08544,565.0379 533.47504,565.1142 C 530.0224,562.5186 531.71584,562.303 521.71248,558.3016 C 517.8184,556.744 529.21424,555.4392 530.28752,555.4392 C 533.8056,555.4392 536.94288,555.2614 538.86256,554.3016 C 545.17536,551.1451 540.33648,547.7755 538.28752,545.7267 C 536.43088,543.8699 544.57504,539.5454 544.57504,536.0142 C 544.57504,533.6395 542.28752,533.8592 542.28752,528.0142 C 542.28752,522.5834 540.59392,520.9938 537.71248,517.1517 C 535.94256,514.7917 534.57648,511.5403 533.35008,509.0267 C 528.42864,508.4461 524.80736,505.2765 521.4864,503.5666 C 519.9808,502.7914 519.46528,501.1557 517.99008,501.3578 C 516.2112,501.6013 513.4584,503.9899 511.42496,506.8642 z M 518.08832,501.193 C 518.44112,501.2368 518.50112,501.1194 518.08832,501.193 z"
  },
  "RN": {
    "d": "M 389.95,339.7766 C 388.31624,339.7664 386.6025,340.9742 386.2875,342.8642 C 385.59181,342.6917 384.90678,342.4939 384.22501,342.2766 C 383.88134,343.6259 383.31083,344.7491 382.8625,347.4392 C 382.16374,351.6317 374.2875,355.4053 374.2875,357.1517 C 374.2875,358.2531 374.19013,359.0758 374.02501,359.7016 L 376.92501,360.9016 C 380.77302,362.5008 381.11251,362.8547 381.1125,365.3267 C 381.1125,366.808 380.75006,368.9634 380.3125,370.1141 C 379.87493,371.265 379.04693,372.1627 378.47501,372.1016 C 374.7181,371.7003 373.76918,371.1718 373.7625,369.5016 C 373.75867,368.5234 373.52056,365.7958 373.2375,363.4392 L 372.9875,361.3141 C 371.4773,362.2318 368.99309,360.8779 367.42501,364.0141 C 363.31397,372.2362 365.59754,366.8642 360,366.8642 C 352.3372,366.8642 355.08053,368.2098 356,373.7267 C 356.08725,374.2501 356.18645,374.92 356.32501,375.6392 L 357.4125,375.8766 L 356.65,377.0517 C 357.16557,378.877 358.09435,380.6752 360,381.1517 C 360.7619,381.3421 361.52558,381.5362 362.2875,381.7267 C 367.5891,383.052 364.67054,386.0165 368,388.0141 C 369.04494,388.6411 376.60064,391.976 373.7125,394.8642 C 372.18902,396.3877 364.12371,403.909 362.8625,398.8642 C 361.87474,394.9131 356.95645,394.1275 356,390.3016 C 354.57406,384.5979 348.29878,390.0184 344,387.4392 C 340.17773,385.1458 341.84421,381.8584 339.42501,379.4392 C 337.69405,377.7082 331.58382,375.1648 331.07501,375.5016 C 331.19123,375.673 331.30877,375.8429 331.42501,376.0141 C 331.07102,375.731 330.98077,375.564 331.07501,375.5016 C 330.71722,374.9744 330.37027,374.4414 330.0125,373.9141 C 329.68706,373.4346 329.28061,373.0163 328.82501,372.6392 C 328.83339,372.9027 328.85858,373.5891 328.8625,373.7267 C 327.6584,374.4971 323.66104,372.465 322.2875,373.1517 C 319.3091,374.6408 317.4428,376.6229 318.8625,382.3016 C 319.33616,384.1963 321.34878,388.481 323.42501,389.7267 C 335.70613,397.0954 316.24691,394.3704 315.42501,396.0141 C 313.92168,399.0208 310.04006,398.7965 308.57501,401.7267 C 306.57136,405.7339 309.02318,408.4963 308,412.5891 C 304.76146,425.5432 314.22379,411.8992 317.1375,417.7267 C 318.15466,419.761 319.07982,423.6949 318.2875,426.8642 C 316.90184,432.4067 309.73718,429.6282 308.57501,435.4392 C 307.9669,438.4795 301.53546,439.2934 302.2875,442.3016 C 302.28264,442.5261 302.26864,442.752 302.2625,442.9766 C 302.67882,442.9618 303.06485,443.0147 303.42501,443.1517 C 303.12139,443.4374 307.78776,445.5299 308.57501,445.7267 C 309.34592,445.9194 318.9451,447.6462 319.42501,445.7267 C 320.21578,442.5635 317.34734,435.553 320.57501,436.0142 C 321.90834,436.2046 323.26834,436.2624 324.57501,436.5891 C 328.1232,437.4762 332.7697,431.5968 335.2875,431.3267 C 335.35261,431.3197 335.4125,431.3131 335.47501,431.3142 C 335.66253,431.3171 335.84163,431.36 336,431.4392 C 337.94248,432.4104 337.87042,436.1632 340,436.5891 C 346.38598,437.8662 347.07637,437.3781 352,442.3016 C 354.05154,444.3531 360.54912,448.6408 358.8625,452.0142 C 357.71648,454.3062 352.63494,454.6389 353.1375,457.1517 C 354.3877,463.4027 357.0019,459.9227 362.8625,463.4392 C 363.96424,464.1002 372,469.565 372,471.4392 C 372,472.5819 372,473.7213 372,474.8642 C 372,479.6261 372,484.3898 372,489.1517 C 372,493.237 377.02094,497.4098 374.8625,501.7267 C 372.22478,507.0021 378.2875,506.6805 378.2875,509.7267 C 378.2875,512.0421 376.5701,520.0168 377.1375,521.1517 C 378.34482,523.5662 382.84858,525.7085 383.42501,528.0142 C 390.93645,535.8325 399.52738,524.5936 398.5,532.8642 C 399.47067,530.2749 406.12032,526.3851 406.28752,526.3016 C 410.46816,524.2112 412.56624,522.0152 417.22496,520.0142 C 417.24208,520.0141 417.25792,520.0142 417.27504,520.0142 C 417.05744,519.8189 416.82224,519.6298 416.57504,519.4392 C 420.1568,517.6483 414.28752,506.8686 414.28752,502.8642 C 414.28752,499.2171 413.2328,494.1979 413.1376,490.8642 C 412.63328,491.0254 412.77088,490.9254 413.25008,490.6392 C 412.82064,490.3818 412.43344,489.9747 412,489.7267 C 411.97712,489.6118 411.95216,489.4995 411.92496,489.3891 C 411.08064,488.6869 410.38192,487.7901 410.18752,487.0642 C 410.09376,486.7141 410.01664,486.3379 409.95008,485.9392 C 407.53056,483.4813 410.49808,478.696 410.49808,474.5885 C 410.49808,471.1968 405.60464,473.0446 405.7,469.4766 C 405.124,468.7629 404.3608,468.0888 403.6376,467.7016 C 401.76848,466.7013 401.22832,466.1243 401.8376,465.2766 C 401.20784,464.6346 403.50032,460.288 403.35984,459.7261 C 402.484,456.2226 398.90229,455.9941 402.28752,454.3016 C 402.5712,454.1598 402.88608,453.9586 403.21248,453.7267 C 403.16096,451.2354 403.61024,450.2901 405.07504,448.0766 C 406.56224,445.8293 407.948,444.7528 408.92496,444.6766 C 409.53472,444.6291 409.98464,444.976 410.2,445.6766 C 410.5344,445.0488 410.77008,444.4766 410.86256,444.0142 C 411.6776,439.9386 412,437.0494 412,432.5891 C 412,430.5458 414.8624,430.1152 414.86256,426.8642 C 414.8624,424.8126 420.07744,426.5792 420.57504,424.5891 C 421.63696,420.3414 417.52848,418.1667 415.42496,416.5891 C 412.26608,414.2198 416.47936,413.1848 418.86256,412.5891 C 418.87168,412.1187 418.86704,411.6378 418.86256,411.1517 C 418.8632,411.1475 418.86176,411.1432 418.86256,411.1392 C 418.85504,410.3336 418.8296,409.4907 418.8,408.6517 C 418.26256,406.2269 416.4376,403.877 414.28752,401.7267 C 411.95696,399.3962 412.46928,396.3656 410.86256,393.1517 C 409.72448,390.876 403.8816,388.8277 401.71248,388.0141 C 391.8031,384.2982 397.82832,385.3851 398.2875,380.5891 C 398.62518,377.0622 394.19304,377.3493 396,374.3016 C 399.18205,368.9347 401.76,371.6645 400,362.8642 C 399.1917,358.8226 398.2875,358.2938 398.2875,352.5891 C 398.2875,347.8966 393.1375,347.6408 393.1375,344.0141 C 393.1375,341.015 391.58376,339.7869 389.95,339.7766 z"
  },
  "SO": {
    "d": "M 348.22501,256.6141 C 347.54298,256.6046 347.0875,257.0867 347.0875,258.2891 C 347.0875,261.5803 347.56293,265.0336 344.2625,265.9766 C 338.18762,267.7123 343.54938,271.377 340.62501,272.8392 C 339.51173,273.3958 334.02136,274.0893 333.35,275.2642 C 330.6604,279.971 329.62766,278.5442 324.0625,281.3267 C 322.10982,282.303 320.06285,284.6398 321.6375,287.7891 C 322.39098,289.2962 324.28048,293.0554 326.07501,294.2517 C 330.9983,297.5339 331.4048,293.0781 336.5875,290.2141 C 338.47861,289.1691 338.90598,297.4531 340.62501,298.7016 C 343.8065,301.0123 346.6027,305.5885 343.45,306.3766 C 340.45238,307.1261 336.82557,304.3952 333.75,305.1642 C 331.0133,305.8483 328.86952,307.1632 332.1375,309.6141 C 333.22157,310.4272 339.4125,314.5698 339.4125,315.6766 C 339.4125,318.099 334.26278,323.957 331.7375,320.9267 C 331.20962,320.2931 327.82021,317.4093 326.4875,316.0766 C 325.91059,315.4997 321.6375,313.7227 321.6375,312.8392 C 321.6375,311.4046 322.18842,306.0141 320.0125,306.3766 C 315.47549,307.1328 313.76702,305.9766 309.9125,305.9766 C 307.16542,305.9766 304.03518,309.2374 301.8375,307.5891 C 299.02797,305.4821 299.7977,302.1429 294.1625,303.5517 C 289.13618,304.8082 290.32805,300.3142 285.2625,300.3141 C 282.38459,300.3141 278.51926,304.7939 277.5875,303.5517 C 277.42619,303.3366 275.94347,297.9064 274.3625,298.3016 C 273.3732,298.549 268.06058,301.593 267.4875,302.7392 C 265.95669,305.8008 267.0875,309.4168 267.0875,312.8392 C 267.0875,317.268 265.51893,320.1062 262.2375,320.9267 C 261.98493,320.9898 257.98461,326.0779 256.7625,325.8766 C 256.26384,326.2747 255.3847,326.4774 254.8625,326.8642 C 254.8625,327.4968 254.38371,332.2061 254.8625,332.5891 C 263.68013,339.6432 259.98837,328.3936 265.7125,330.3016 C 269.7075,331.6333 277.466,331.2862 280.57501,333.1517 C 281.2532,333.5586 291.30082,339.3082 289.7125,340.0141 C 281.1257,343.8306 281.23675,343.2237 282.8625,349.7267 C 284.00837,354.3101 280.40008,356.0517 276,357.1517 C 273.63835,357.7421 267.34922,364.0141 273.7125,364.0141 C 279.70022,364.0141 281.47944,366.3016 286.8625,366.3016 C 292.3193,366.3016 291.60064,371.3424 294.2875,372.0141 C 296.51829,372.5718 300.61562,377.4259 301.7125,377.1517 C 305.85763,376.1154 303.72813,372.5891 309.1375,372.5891 C 311.02304,372.5891 320.07192,368.8765 320.57501,366.8642 C 321.13597,364.6203 328.57499,361.001 328.57501,362.8642 C 328.57501,364.9946 328.75606,370.4733 328.82501,372.6392 C 329.28061,373.0163 329.68706,373.4346 330.0125,373.9141 C 330.37027,374.4414 330.71722,374.9744 331.07501,375.5016 C 331.58382,375.1648 337.69405,377.7082 339.42501,379.4392 C 341.84421,381.8584 340.17773,385.1458 344,387.4392 C 348.29878,390.0184 354.57406,384.5979 356,390.3016 C 356.95645,394.1275 361.87474,394.9131 362.8625,398.8642 C 364.12371,403.909 372.18902,396.3877 373.7125,394.8642 C 376.60064,391.976 369.04494,388.6411 368,388.0141 C 364.67054,386.0165 367.5891,383.052 362.2875,381.7267 C 361.52558,381.5362 360.7619,381.3421 360,381.1517 C 356.81254,380.3547 356.35512,375.8574 356,373.7267 C 355.08053,368.2098 352.3372,366.8642 360,366.8642 C 365.59754,366.8642 363.31397,372.2362 367.42501,364.0141 C 369.80203,359.2602 374.2875,364.8299 374.2875,357.1517 C 374.2875,355.4053 382.16374,351.6317 382.8625,347.4392 C 383.33984,344.575 383.95424,343.4902 384.2875,342.0141 C 383.82362,338.1059 382.61757,334.3016 377.1375,334.3016 C 373.728,334.3016 370.38061,330.9573 368.57501,329.1517 C 367.18955,327.7662 368,321.3848 368,318.8642 C 368,314.6626 365.99926,313.1736 365.1375,309.7267 C 364.38274,306.7075 365.042,301.7741 364.57501,299.4392 C 363.70981,295.1133 357.36371,293.513 362.2875,288.5891 C 363.30523,287.5714 364.57501,277.9813 364.57501,276.5891 C 364.57499,274.423 356.82595,271.7026 355.42501,270.3016 C 353.9012,268.7778 359.47733,267.8173 360,265.7267 C 360.64051,263.1646 360.12459,262.5602 359.7375,261.9517 C 357.63064,263.2514 354.36248,266.9026 354.3625,263.5517 C 354.3625,261.0718 350.27109,256.6429 348.22501,256.6141 z M 331.07501,375.5016 C 330.98077,375.564 331.07102,375.731 331.42501,376.0141 C 331.30877,375.8429 331.19123,375.673 331.07501,375.5016 z"
  },
  "T": {
    "d": "M 397.8,563.8016 C 397.61859,563.804 397.44258,563.808 397.2625,563.8142 C 396.56912,564.2635 395.94408,564.4773 395.42501,564.3016 C 394.28214,562.8019 388.00331,567.729 386.8625,568.0142 C 384.70741,568.5528 383.42501,572.2802 383.42501,574.8642 C 383.42501,577.3821 392.51234,582.1264 389.18958,582.1264 C 386.57278,582.1264 383.3969,590.0499 377.6509,592.3523 C 374.79531,593.4965 375.3712,598.3 374.8009,601.1517 C 374.42822,603.015 376.97075,612.7251 375.1085,613.8538 C 376.22045,616.9654 371.85699,621.4875 371.85699,627.0299 C 371.85699,631.644 368.88674,619.7146 364.57501,622.3016 C 361.39102,624.212 358.38869,625.4384 358.38869,628.5891 C 358.3887,634.5222 352.01979,634.3802 352.01979,639.0395 C 352.01981,641.7379 350.048,645.643 348.57501,648.5891 C 347.17011,651.3989 344.06619,659.948 346.2875,657.7267 C 346.24202,657.9016 346.19547,658.0766 346.15,658.2517 C 346.21331,658.323 346.26085,658.4331 346.2875,658.5891 C 346.44155,660.0624 346.6776,660.987 346.8625,661.7267 C 347.7196,665.155 346.4131,669.9779 348,673.1517 C 352.03366,681.219 352.41378,673.827 358.8625,675.4392 C 361.74899,676.1608 363.75323,670.9125 365.7125,673.1517 C 367.04584,674.6755 368.80699,672.4906 369.7125,674.3016 C 371.71965,678.316 390.43062,674.5416 389.7125,675.4392 C 387.22104,678.5534 377.45859,685.6173 376.57501,689.1517 C 375.67502,692.7515 380.57501,692.333 380.57501,694.3016 C 380.57499,697.3133 376.92008,699.9586 377.7125,702.8642 C 381.33805,716.1578 380.57424,707.44 374.8625,713.1517 C 373.18603,714.8282 359.5064,718.576 358.8625,721.1517 C 358.46829,722.7285 354.17797,728.5038 356.57501,730.3016 C 359.20549,732.2746 366.2875,728.7259 366.2875,732.0142 C 366.2875,738.2869 365.25605,738.8642 372,738.8642 C 380.3673,738.8642 373.22086,742.9475 376.57501,746.3016 C 378.0681,747.7947 383.23117,754.3877 385.1375,754.8642 C 392.34965,756.6672 388,757.8197 388,764.0142 C 387.98979,764.8058 387.9852,765.5976 387.97501,766.3891 C 387.5607,765.9283 387.10078,765.5923 387.1375,765.1517 C 366.53294,763.8627 358.96099,763.5968 387.15,765.4642 C 387.05475,766.607 390.29466,767.0826 387.4375,770.7016 C 387.4375,774.5853 386.3,774.9557 386.3,778.6142 C 386.3,784.4106 393.25514,785.7794 394.5625,785.7267 C 394.4741,785.6397 394.38795,785.552 394.3,785.4642 C 394.89219,785.7078 394.85586,786.0195 395.5375,786.6642 C 395.59883,786.5517 395.67189,786.4406 395.72501,786.3267 C 395.43928,782.2091 406.84448,786.0571 409.15008,783.7517 C 412.63072,780.271 406.80736,778.6003 416.01248,780.9016 C 418.48976,781.521 423.9424,783.4354 426.87504,784.9016 C 430.03824,786.4832 434.5984,782.8278 439.4376,784.9016 C 445.47248,787.488 446.3,782.6952 446.3,778.6142 C 446.3,773.233 437.272,775.9054 442.87504,768.9016 C 444.27824,767.1475 441.556,761.3754 441.15008,759.7517 C 440.59872,757.5466 449.80704,756.9744 451.4376,755.7517 C 454.08208,753.7682 456.03952,753.4642 461.72496,753.4642 C 470.50592,753.4642 466.21664,749.9021 476.01248,753.4642 C 480.43264,755.0715 481.69952,752.1797 484.58752,752.9016 C 487.99104,753.7525 493.1504,749.916 496.02496,749.7517 C 496.11776,749.7464 496.21216,749.7491 496.3,749.7517 C 496.67968,748.1381 496.33936,739.9701 496,736.5891 C 495.33488,733.2637 490.39808,732.6997 488,730.3016 C 485.19824,727.4998 483.42496,725.4435 483.42496,721.1517 C 483.42496,717.7808 487.22928,715.7814 486.28752,712.0142 C 484.98,706.7838 477.33856,710.3582 482.86256,701.1517 C 483.30064,700.4213 483.61904,699.6261 484,698.8642 C 486.19552,694.473 481.73296,692.6117 479.42496,689.7267 C 476.93216,686.6106 480.56592,684.5806 476,683.4392 C 475.21872,683.2437 473.47104,673.8061 472.57504,672.0142 C 471.1856,669.2354 466.05136,668.6707 463.42496,668.0142 C 460.05648,667.172 457.91856,663.7134 457.1376,660.5891 C 456.30944,657.277 455.97488,655.3726 456,652.8642 C 456.28192,652.9074 456.53984,652.9438 456.8,652.9766 C 456.53248,652.8486 456.26752,652.7171 456,652.5891 C 455.356,650.0131 450.8624,644.0147 450.86256,639.4392 C 450.8624,636.1992 450.28752,633.1741 450.28752,629.7267 C 450.28752,625.8454 453.14224,624.0094 455.42496,621.7267 C 459.17904,617.9726 458.01792,616.4102 450.28752,614.8642 C 450.02336,614.8114 447.05296,612.769 446.86256,612.8642 C 443.6224,612.5019 440.64272,613.7942 438.28752,611.4392 C 434.72864,607.8803 432.57504,615.5366 432.57504,618.3016 C 432.57504,621.495 427.40832,623.4656 425.71248,625.7267 C 421.53712,631.2939 416.57504,622.7766 416.57504,632.5891 C 416.57504,635.9813 421.82896,640.5891 414.86256,640.5891 C 412.5688,640.5891 412.25424,636.6192 410.28752,635.4392 C 407.50416,633.7693 406.1544,631.3061 404,629.1517 C 401.32832,626.48 399.74778,625.9787 401.71248,624.0142 C 403.38064,622.3458 401.2024,617.6093 402.28752,615.4392 C 403.38656,613.2406 406.52784,613.3157 407.42496,609.7267 C 408.48688,605.4795 410.63296,603.8982 412.57504,600.0142 C 413.54992,598.0642 412.73568,592.4715 413.1376,590.8642 C 414.32288,586.1226 418.28752,588.2286 418.28752,581.7267 C 418.28752,577.0315 414.96976,575.9542 411.42496,577.7267 C 408.26864,579.305 406.49056,575.6547 405.1376,574.3016 C 403.48944,572.6538 401.60368,566.4541 401.1376,564.5891 C 400.97376,563.935 399.40347,563.781 397.8,563.8016 z M 375.63989,617.2232 C 374.56432,617.8168 375.12024,618.1541 375.63989,617.2232 z"
  },
  "WD": {
    "d": "M 496.01968,749.7546 C 493.14512,749.9189 487.98576,753.7555 484.58208,752.9046 C 481.69424,752.1826 480.4272,755.0744 476.00704,753.467 C 466.21136,749.905 470.50064,753.467 461.71968,753.467 C 456.03408,753.467 454.0768,753.7712 451.43216,755.7546 C 449.80176,756.9774 440.59344,757.5494 441.14464,759.7546 C 441.55056,761.3782 444.27296,767.1504 442.8696,768.9046 C 437.26656,775.9083 446.29472,773.2358 446.29472,778.6171 C 446.29456,782.6982 445.4672,787.491 439.43216,784.9046 C 434.59328,782.8307 430.0328,786.4862 426.8696,784.9046 C 423.93712,783.4382 418.48448,781.5238 416.0072,780.9046 C 406.80224,778.6034 412.62528,780.2739 409.14464,783.7546 C 406.8392,786.0602 395.43392,782.212 395.71965,786.3296 C 394.1968,789.5981 389.14464,792.2067 389.14464,795.7546 C 389.14464,802.0373 392.18861,802.2235 396.00712,806.0421 C 398.14973,808.1846 401.98464,813.3398 405.14464,814.0421 C 416.23376,816.5064 407.66736,816.5648 413.71968,822.6171 C 415.50544,824.4029 416.65712,827.9608 417.71968,830.6171 C 418.82464,833.3795 432.60624,837.3205 429.71968,838.0421 C 429.89328,838.0576 430.02352,838.0754 430.18208,838.0922 C 430.27632,836.7094 430.58176,835.2189 430.9696,833.667 C 432.21232,828.6962 435.7096,829.9822 436.48208,834.6171 C 436.92496,837.2742 435.63744,842.485 438.29472,842.0421 C 446.51904,840.6714 438.52512,842.8477 442.29472,846.6171 C 442.85008,847.1726 449.7832,853.8002 450.29472,851.7546 C 451.44848,847.139 453.51776,849.8832 454.8696,847.1797 C 456.99248,842.9338 457.11056,842.275 459.43216,839.1797 C 462.17664,835.5203 469.76592,833.3746 471.43216,830.0421 C 473.73808,825.4301 471.2824,826.8802 469.71968,823.7546 C 468.60896,821.5333 468.2032,817.4672 465.71968,817.467 C 460.75904,817.467 462.10176,812.3296 464.58208,812.3296 C 467.05488,812.3296 480.00704,813.7848 480.00704,811.1797 C 480.00704,800.2325 487.7624,807.0206 494.29472,803.7546 C 494.67552,803.5642 495.01456,803.2632 495.43216,803.1797 C 503.23584,801.6189 510.8696,804.5238 510.8696,803.1797 C 510.8696,797.7403 516.26752,800.5355 518.8696,802.6171 C 525.06624,807.5744 522.67344,806.1861 527.43216,802.6171 C 528.956,801.4742 530.37376,800.1597 532.00704,799.1797 C 536.46912,796.5024 538.2616,796.7058 536.58208,800.9046 C 532.78048,810.4086 532.00672,806.6171 541.14464,806.6171 C 546.07424,806.6171 547.44336,802.1893 552.58208,800.9046 C 554.49392,800.4266 558.2872,796.0898 556.94464,793.4046 C 556.24816,792.0117 557.14032,784.6045 556.00704,783.7546 C 555.24528,783.1832 554.4816,782.6136 553.71968,782.0421 C 548.02384,777.7702 544.6336,780.9339 542.29472,779.1797 C 539.8112,777.317 533.63632,775.9918 532.34464,774.0797 C 532.23184,774.0682 532.11984,774.0536 532.00704,774.0421 C 530.904,772.5714 525.27296,777.5288 525.14464,778.0421 C 524.30608,781.3966 515.93264,773.28 515.43216,772.9046 C 512.62528,770.7994 511.65328,766.8891 510.8696,763.7546 C 509.69392,759.0518 503.46336,756.9078 500.00704,755.1797 C 499.28736,754.8198 496.45728,750.948 496.29472,749.7546 C 496.20688,749.752 496.11232,749.7493 496.01968,749.7546 z"
  },
  "WH": {
    "d": "M 495.92496,420.7142 C 495.09536,421.2118 494.38592,421.8416 493.85008,422.6517 C 493.424,423.2955 493.00096,423.9451 492.57504,424.5891 C 492.57504,426.113 492.57504,427.6278 492.57504,429.1517 C 492.57504,432.6536 482.8624,436.6536 482.86256,433.1517 C 482.8624,431.0003 483.6696,422.852 480,427.4392 C 476.70672,431.5558 478.00672,435.9968 475.42496,439.4392 C 471.89552,444.1451 473.87344,445.0835 466.86256,448.5891 C 462.64688,450.697 460.69856,449.9862 463.42496,455.4392 C 465.38224,459.3538 463.21232,460.8019 460.57504,463.4392 C 456.41904,467.595 460.72384,469.1971 461.71248,473.1517 C 462.66064,476.9443 461.09712,478.3016 456.57504,478.3016 C 450.3512,478.3016 445.16784,476.0141 439.42496,476.0142 C 434.91552,476.0141 433.3832,473.481 429.71248,477.1517 C 428.64016,478.224 426.90512,478.9971 425.16256,479.7766 C 425.13136,481.0432 424.5664,482.82 423.88752,483.7891 C 422.73824,485.4301 422.73824,485.6016 423.88752,485.6016 C 425.35744,485.6016 425.51344,486.6922 424.3376,488.8891 C 423.63984,490.1926 423.92096,490.6616 426.16256,491.8517 L 428.8376,493.2642 L 424.5,493.9267 C 422.1136,494.2864 419.4744,494.9413 418.6376,495.3891 C 416.19696,496.695 415.37504,496.1587 415.37504,493.2392 C 415.37504,492.1443 414.7616,491.2086 413.56256,490.4517 C 412.87312,490.8565 412.548,491.0528 413.1376,490.8642 C 413.23296,494.1981 414.28752,499.2171 414.28752,502.8642 C 414.28752,506.8688 420.1568,517.6483 416.57504,519.4392 C 416.82224,519.6298 417.05744,519.8189 417.27504,520.0142 C 421.35296,520.0018 424.21888,518.5314 425.1376,518.3016 C 428.46512,517.4698 433.87904,516.5533 436.57504,516.0142 C 437.24464,515.8802 448.74208,517.021 449.1376,515.4392 C 449.76592,512.9258 455.42496,513.4549 455.42496,510.8642 C 455.42496,505.1062 457.31792,501.8946 462.28752,506.8642 C 466.06512,510.6418 468.57504,509.3542 468.57504,515.4392 C 468.57504,519.2762 468.48608,522.509 473.1376,523.4392 C 477.24048,524.2598 484.27744,524.5891 489.1376,524.5891 C 494.8768,524.5891 495.04752,518.1054 498.86256,517.1517 C 500.16016,516.8272 506.02512,514.2638 506.86256,512.5891 C 507.79504,510.724 510.91488,508.9046 511.42496,506.8642 C 513.4584,503.9898 516.20864,501.5952 517.98752,501.3517 C 518.00512,501.3493 518.02016,501.3536 518.0376,501.3517 C 516.69808,500.5958 525.37408,498.8725 526.28752,496.5891 C 527.88592,492.593 533.456,494.7773 534.86256,489.1517 C 536.21856,483.727 544.94128,491.0208 543.42496,483.4392 C 542.61888,479.409 544.52256,472.9789 543.42496,468.5891 C 542.27312,463.9816 545.03264,464.5891 548.57504,464.5891 C 553.45168,464.5891 552.09776,462.3443 549.71248,461.1517 C 549.1256,460.8582 549.71248,452.8638 549.71248,452.0142 C 549.71248,448.147 545.79872,444.125 544,441.7267 C 542.96176,440.3424 542.28752,451.2109 542.28752,451.4392 C 542.28752,455.9827 539.87856,454.0461 538.86256,452.0142 C 537.92704,450.1434 535.12464,448.747 533.71248,446.8642 C 531.6568,444.1232 524.83408,441.7883 522.28752,441.1517 C 519.25776,440.3942 515.36656,438.2432 513.71248,436.5891 C 510.55552,433.4322 510.28752,434.2205 510.28752,429.1517 C 510.28752,428.5277 502.4728,422.7282 501.1376,421.7267 C 500.09424,420.9443 496.69952,421.6763 495.92496,420.7142 z M 498.11248,443.4642 C 499.74624,443.4451 500.73152,444.0722 503.16256,446.0642 C 505.31328,447.8266 506.73744,449.6782 506.7376,450.7016 C 506.7376,451.6387 507.65328,453.6061 508.77504,455.0766 C 509.89664,456.5472 510.81248,457.9598 510.81248,458.2142 C 510.81248,459.6901 503.73088,456.3314 499.92496,453.0517 C 499.09104,452.3331 497.24704,451.7517 495.8376,451.7517 C 493.37008,451.7517 493.27248,451.6011 493.0376,447.9766 L 492.78752,444.2142 L 496.18752,443.6766 C 496.95568,443.5538 497.56784,443.4706 498.11248,443.4642 z M 493.52496,460.7891 C 493.85376,460.7662 494.2312,460.8622 494.71248,461.0392 C 495.71856,461.409 497.80864,463.4621 499.35008,465.6016 C 502.03376,469.3269 502.07856,469.5422 500.61248,470.6142 C 498.28288,472.3178 497.17392,472.0072 493.55008,468.6267 L 490.22496,465.5142 L 491.55008,462.9392 C 492.32032,461.4494 492.80176,460.8394 493.52496,460.7891 z"
  },
  "WW": {
    "d": "M 621.08752,547.0016 C 620.89984,547.3392 620.72832,547.6803 620.57504,548.0142 C 623.32096,553.5061 613.70592,549.7778 612.57504,554.3016 C 611.72384,557.7061 613.71248,560.1195 613.71248,562.8642 C 613.71248,568.1888 609.18672,566.7906 606.86256,571.4392 C 605.84032,573.4834 601.31872,578.8251 598.86256,579.4392 C 595.01984,580.3998 592.06288,582.2264 589.1376,585.1517 C 586.69424,587.595 581.71248,591.2466 581.71248,594.8642 C 581.71248,599.2066 581.09248,600.0592 578.28752,602.8642 C 574.55408,606.5976 578.0728,606.6494 580.57504,609.1517 C 582.86576,611.4424 583.40144,619.4211 586.86256,621.1517 C 590.49184,621.1517 592.75648,619.5299 596,621.1517 C 599.54768,622.9256 601.89824,620.1874 604.57504,622.8642 C 606.85936,625.1486 607.75696,628.8475 612,626.3016 C 612.95248,625.7302 613.86912,625.0859 614.86256,624.5891 C 620.49264,621.7739 617.1376,628.2706 617.1376,631.4392 C 617.1376,632.5091 618.61184,642.8642 617.1376,642.8642 C 612.58448,642.8642 608.48,643.7534 605.1376,644.5891 C 603.0392,645.1138 599.42496,647.94 599.42496,651.4392 C 599.42496,657.3578 602.01152,654.5882 604.57504,657.1517 C 606.86864,659.4453 604.18304,670.2981 607.71248,669.7267 C 609.59488,672.3485 608.82032,673.1517 613.1376,673.1517 C 615.09856,673.1517 616.3264,670.3016 618.28752,670.3016 C 622.89392,670.3016 623.24528,667.0202 629.71248,665.7267 C 632.4168,665.1858 634.28752,661.1878 634.28752,658.8642 C 634.28752,656.6925 639.64416,655.4226 638.28752,653.7267 C 634.7904,649.3554 634.51392,644.5194 643.42496,646.3016 C 648.27632,647.2718 650.02128,648.9507 655.42496,650.3016 C 657.85152,650.9083 665.2232,651.0232 666.28752,653.1517 C 667.20704,654.9907 670.52672,660.5302 670.75008,660.9517 C 670.98432,660.9419 671.368,660.9544 671.81248,660.9766 C 672.54848,659.7445 673.1376,658.4125 673.1376,656.5891 C 673.13744,652.3134 676.57504,649.5734 676.57504,645.7267 C 676.57504,641.9896 677.6672,637.4568 681.1376,636.5891 C 683.84656,635.9118 687.42496,633.3174 687.42496,629.1517 C 687.42496,625.9958 687.4344,622.8421 688,620.0142 C 689.1464,614.2821 687.42496,609.5235 687.42496,604.0142 C 687.42496,603.0618 687.42496,602.104 687.42496,601.1517 C 687.42496,594.7069 686.42496,594.5438 686.42496,588.5891 C 686.42496,584.8234 686.04992,581.2717 686.05008,577.5267 C 686.05008,571.9878 683.66848,571.1075 680.57504,568.0142 C 677.75632,565.1955 678.41344,560.715 676,558.3016 C 675.16384,557.4654 674.73808,556.5971 674.52496,555.7016 C 674.5248,555.701 674.51264,555.7024 674.51248,555.7016 C 674.0504,555.7538 673.59552,555.9224 673.1376,556.0142 C 670.45312,554.0006 666.00704,549.7971 663.42496,549.1517 C 659.01808,548.0499 658.28752,552.9581 658.28752,556.5891 C 658.28752,559.1056 651.2368,551.8134 650.86256,551.4392 C 645.43984,546.0165 644.57504,554.1674 644.57504,557.7267 C 644.57504,558.3968 636.82352,551.1251 636,550.3016 C 632.85968,547.1613 629.07136,547.4392 624,547.4392 C 623.42864,547.4392 622.85712,547.4374 622,547.1517 C 621.69392,547.1318 621.39216,547.0741 621.08752,547.0016 z M 670.75008,660.9517 C 670.3704,660.9674 670.3248,661.0227 670.86256,661.1517 C 670.86192,661.149 670.7568,660.9646 670.75008,660.9517 z"
  },
  "WX": {
    "d": "M 639.9,645.9267 C 634.6808,646.0221 635.3368,650.0384 638.28752,653.7267 C 639.64416,655.4226 634.28752,656.6925 634.28752,658.8642 C 634.28736,661.1878 632.4168,665.1858 629.71248,665.7267 C 623.24528,667.0202 622.89392,670.3016 618.28752,670.3016 C 616.3264,670.3016 615.09856,673.1517 613.1376,673.1517 C 608.82032,673.1517 609.59488,672.3485 607.71248,669.7267 C 607.5624,669.7509 607.42848,669.7546 607.3,669.7392 C 606.9752,669.9298 606.63472,670.1162 606.28752,670.3016 C 600.20944,674.6432 597.45184,675.1786 601.1376,678.8642 C 603.92912,681.6558 602.49488,684.5891 597.71248,684.5891 C 593.24512,684.5891 582.8624,684.1178 582.86256,691.4392 C 582.8624,695.5285 581.88256,700.6693 582.86256,704.5891 C 584.96784,713.0109 574.66016,708.2112 573.1376,714.3016 C 572.18512,718.1112 559.51264,723.525 562.57504,726.3016 C 560.6032,728.5592 560.51408,727.3782 562.86256,729.7267 C 565.34016,732.2043 567.08832,735.5326 562.86256,736.5891 C 555.75424,738.3662 561.11344,740.2462 558.28752,744.0142 C 555.53664,747.6819 553.46992,750.147 552.57504,753.7267 C 552.30208,754.2488 552.10688,754.5712 551.95008,754.8267 C 552.46032,754.4504 553.0488,754.0859 553.71248,753.7267 C 553.71248,754.4886 553.71248,755.2522 553.71248,756.0142 C 553.71248,760.2099 553.1376,764.0168 553.1376,766.8642 C 553.13744,767.6261 557.1376,768.3898 557.1376,769.1517 C 557.1376,771.1867 556.98896,777.816 558.28752,779.4392 C 561.29536,783.1989 566.28752,783.5586 566.28752,788.5891 C 566.28752,792.9846 569.17136,793.0643 562.38752,797.1267 C 557.54032,800.0293 564.71104,804.579 569.1376,800.5891 C 573.13744,796.9835 569.79824,796.4146 576,794.8642 C 579.17168,794.0712 577.38768,788.9774 576.57504,785.7267 C 575.33104,780.7507 579.06704,783.171 580,779.4392 C 580.84624,776.0541 583.86688,775.3061 586.28752,777.7267 C 586.9624,778.4014 590.60192,785.1483 592,784.5891 C 604.7624,779.4842 598.86736,784.7341 605.1376,786.3016 C 608.54112,787.1525 609.668,793.8624 611.42496,794.3016 C 614.7624,795.136 620.18368,789.1078 623.32496,789.6891 C 627.15904,790.3986 626.40336,784.5891 628.51248,784.5891 C 631.068,784.5891 630.71312,788.8222 633.1376,788.0142 C 636.10704,787.0243 640.81888,786.5454 643.42496,789.1517 C 645.97024,791.697 649.1376,794.3862 649.1376,788.5891 C 649.1376,784.4046 652,782.933 652,780.5891 C 652,775.0549 651.99248,774.2979 647.42496,772.0142 C 641.0688,768.836 648.02176,768.036 645.71248,765.7267 C 642.96544,762.9795 634.28752,767.3242 634.28752,763.4392 C 634.28752,757.177 631.5176,758.3016 625.71248,758.3016 C 621.44672,758.3016 621.51456,752.5891 623.42496,752.5891 C 624.37744,752.5891 625.33504,752.5891 626.28752,752.5891 C 630.65376,752.5891 634.34064,753.1517 638.86256,753.1517 C 641.5736,753.1517 643.79808,747.6973 644.57504,744.5891 C 645.7,740.0891 649.84288,741.2302 650.86256,737.1517 C 652.0912,732.2366 655.06544,729.2562 657.71248,725.7267 C 659.71728,723.0536 660.40544,718.4318 662.86256,716.5891 C 666.52512,713.8422 665.0704,713.4571 666.28752,708.5891 C 666.83136,706.4139 667.47232,701.8264 666.28752,698.8642 C 664.57824,694.591 663.42496,693.28 663.42496,688.0142 C 663.42496,683.5258 662.16112,681.2781 665.1376,678.3016 C 665.89952,677.5397 666.6632,676.776 667.42496,676.0142 C 670.952,672.487 668.2824,670.5773 669.1376,666.3016 C 669.57888,664.0952 670.82704,662.6266 671.81248,660.9766 C 671.368,660.9544 670.98432,660.9419 670.75008,660.9517 C 670.7568,660.9646 670.86192,661.149 670.86256,661.1517 C 670.3248,661.0227 670.3704,660.9674 670.75008,660.9517 C 670.52672,660.5302 667.20704,654.9907 666.28752,653.1517 C 665.2232,651.0232 657.85152,650.9083 655.42496,650.3016 C 650.02128,648.9507 648.27632,647.2718 643.42496,646.3016 C 642.03264,646.0232 640.86656,645.909 639.9,645.9267 z M 676.42496,647.1267 C 676.33712,647.5477 676.20944,647.9602 676.06256,648.3642 C 676.20976,647.959 676.33712,647.5488 676.42496,647.1267 z M 676.06256,648.3642 C 675.98912,648.5662 675.90912,648.7648 675.82496,648.9642 C 675.90944,648.7643 675.9888,648.5666 676.06256,648.3642 z M 675.27504,650.1517 C 674.928,650.855 674.55952,651.5626 674.22496,652.2891 C 674.56048,651.5614 674.9272,650.856 675.27504,650.1517 z M 674.22496,652.2891 C 674.12464,652.5072 674.0296,652.7288 673.9376,652.9517 C 674.02976,652.7283 674.12432,652.5077 674.22496,652.2891 z M 673.9376,652.9517 C 673.85904,653.1418 673.78272,653.332 673.71248,653.5267 C 673.78288,653.3318 673.85888,653.1421 673.9376,652.9517 z M 673.28752,655.0517 C 673.256,655.2168 673.23456,655.3821 673.21248,655.5517 C 673.2344,655.3834 673.25616,655.2155 673.28752,655.0517 z M 672.88752,658.5392 C 672.84928,658.6837 672.80816,658.8256 672.76256,658.9642 C 672.80816,658.8253 672.84912,658.684 672.88752,658.5392 z M 672.7376,659.0392 C 672.68112,659.2048 672.61552,659.3683 672.55008,659.5267 C 672.616,659.3674 672.6808,659.2058 672.7376,659.0392 z"
  },
  "AM": {
    "d": "M 693.1376,223.0642 C 685.98848,219.2014 695.37248,208.4542 698.0376,203.3766 C 704.05808,200.2157 711.66016,200.3406 714.28752,192.5891 C 718.9032,184.9762 716.36032,173.9986 715.60464,165.3845 C 712.27808,161.1747 713.42784,173.0851 710.55952,174.9131 C 705.2192,182.5614 705.5608,167.2544 704.57504,164.0141 C 703.71264,156.1266 693.73328,155.3261 691.87504,147.8642 C 687.80544,142.837 675.36464,140.8114 678.67504,132.3642 C 679.89584,127.5531 681.3096,114.752 673.12496,119.3766 C 670.50368,114.4606 670.64368,105.8037 671.76256,100.7766 C 675.87792,98.6555 673.392,91.7363 668.7376,93.4766 C 667.00544,84.569 658.25584,83.8296 650.72208,85.1446 C 644.41488,85.7837 639.2856,84.3338 635.16256,80.2515 C 625.7776,83.7066 617.99264,74.8928 608.98752,78.0515 C 604.50112,80.3432 601.048,82.2253 600,87.439 C 596.9328,90.7278 588.2448,89.2824 594.94048,93.939 C 599.99056,100.0546 597.6936,108.0731 597.83056,115.365 C 597.96624,123.1358 593.02864,135.4534 601.55232,139.7122 C 599.4072,144.0429 599.82752,148.564 604.61664,151.8456 C 606.61488,159.6274 607.73632,167.6709 611.99264,174.8718 C 614.28976,180.1597 608.85792,192.5968 615.98752,193.3141 C 618.57904,196.4174 617.54496,204.1326 624.6096,201.825 C 631.58688,202.5274 642.18224,195.28 646.51248,203.1766 C 649.58864,212.103 636.46032,216.1467 637.71248,224.0141 C 645.01216,228.0826 637.2648,238.785 635.92752,245.185 C 631.07648,249.1822 642.6688,245.4398 640.4376,252.0016 C 646.35312,251.7944 653.2064,251.1968 658.56912,256.0851 C 666.08912,257.5598 671.93344,248.492 675.93024,243.0373 C 676.88064,234.3485 685.3624,235.7198 690.67856,238.6474 C 694.268,234.4115 692.80432,228.2093 693.1376,223.0642 z"
  },
  "AH": {
    "d": "M 636.96256,247.1267 C 636.15472,247.1285 635.23536,247.295 634.28752,247.4392 C 634.27088,247.4418 634.24704,247.4208 634.22496,247.4016 C 633.3176,248.4355 632.3496,249.3771 631.42496,250.3016 C 628.21904,253.5077 631.57872,257.7275 626.86256,251.4392 C 624.41936,248.1816 620.2896,245.6933 619.42496,249.1517 C 619.25616,249.8272 610.39536,247.3312 608,249.7267 C 607.0288,250.6979 605.71792,251.2523 604.57504,252.0141 C 602.10576,253.6603 599.8824,251.4549 598.46256,249.6891 C 598.20928,249.8877 597.95472,250.0866 597.71248,250.3016 C 592.92128,252.6973 590.28736,252.3056 590.28752,257.7267 C 590.28752,259.949 591.37568,265.776 589.71248,267.4392 C 587.2704,269.8813 580.85232,272.2962 576.57504,273.1517 C 570.188,274.4291 570.28752,274.6336 570.28752,281.1517 C 570.28752,286.2138 564.66048,288.245 564.86256,289.1517 C 563.96176,294.4691 566.28752,300.3894 566.28752,305.1517 C 566.28752,310.2346 569.38944,309.643 570.86256,312.5891 C 571.90544,314.6754 574.9376,318.7144 575.42496,321.1517 C 575.92784,323.6658 578.99808,329.631 583.42496,326.8642 C 586.8768,324.7067 589.38432,321.961 592.57504,325.1517 C 594.69136,327.268 594.8624,330.4462 594.86256,334.3016 C 594.8624,336.9075 595.42496,340.0837 595.42496,342.3016 C 595.42496,345.5544 594.6432,350.0248 595.42496,353.1517 C 596.01472,355.5102 603.6088,363.8664 604,362.3016 C 604.21152,362.3437 604.40784,362.373 604.6,362.4016 C 604.61072,362.0794 604.68784,361.8427 604.86256,361.7267 C 606.08864,357.9648 610.7376,358.1766 614.86256,358.8642 C 617.36512,359.2813 623.67856,359.6003 624.57504,356.0141 C 625.20208,353.5058 631.42496,350.4842 631.42496,350.3016 C 631.42496,348.0981 638.8456,347.9229 639.47504,346.3016 C 639.44016,346.125 639.42496,345.9314 639.42496,345.7267 C 639.42496,343.0717 640.07184,342.3334 641.2,342.4642 C 638.74832,339.9978 638.43488,338.6088 637.1376,336.0141 C 635.98672,333.7126 635.11616,331.9038 634.28752,328.5891 C 633.32048,324.721 632.57504,323.9442 632.57504,319.4392 C 632.57504,316.355 633.1376,313.8582 633.1376,310.3016 C 633.1376,306.941 631.70032,301.0386 632,300.5891 C 635.59392,295.1982 638.09408,291.2582 633.1376,286.3016 C 631.34416,284.5083 624.61328,279.6048 624,277.1517 C 621.65216,267.7602 631.42496,274.5694 631.42496,269.7267 C 631.42496,264.6947 635.30816,263.5685 638.28752,260.5891 C 640.78576,257.9035 641.28736,253.7838 644.46256,251.7141 C 643.2944,250.613 640.948,253.1243 640,251.4392 C 640,247.9096 638.73968,247.1227 636.96256,247.1267 z"
  },
  "DN": {
    "d": "M 733.15008,205.5517 C 732.64736,205.5746 732.08336,205.675 731.32496,205.8267 C 726.86704,206.7182 725.46016,209.6597 722.62496,210.2267 C 718.3032,211.091 714.9016,213.1517 709.71248,213.1517 C 704.34144,213.1517 704.6528,215.9363 702.28752,218.3016 C 699.59088,220.9982 698.748,224.1139 693.1376,223.1016 C 693.1376,225.4989 693.1376,227.9045 693.1376,230.3016 C 693.13744,231.7598 692.4464,242.1731 688,237.7267 C 686.73392,236.4605 678.86976,234.2354 677.71248,238.8642 C 676.85904,242.2784 673.63328,246.9434 671.42496,249.1517 C 669.63648,250.9403 662.36144,258.267 659.42496,256.5891 C 654.7456,253.9152 651.97648,250.9243 647.42496,252.0141 C 644.10112,252.8101 644.516,252.1352 644.46256,251.7141 C 644.31008,251.8155 644.15632,251.9152 644,252.0141 C 641.78592,253.1782 640.56048,258.316 638.28752,260.5891 C 635.30816,263.5685 631.42496,264.6947 631.42496,269.7267 C 631.42496,274.5694 621.65216,267.7602 624,277.1517 C 624.61328,279.6048 631.34416,284.5083 633.1376,286.3016 C 638.09408,291.2582 635.59392,295.1982 632,300.5891 C 631.70032,301.0386 633.1376,306.941 633.1376,310.3016 C 633.1376,313.8582 632.57504,316.355 632.57504,319.4392 C 632.57504,323.9442 633.32048,324.721 634.28752,328.5891 C 635.11616,331.9038 635.98672,333.7126 637.1376,336.0141 C 638.43488,338.6088 638.74832,339.9978 641.2,342.4642 C 642.40928,342.6043 644.17168,343.7427 646.28752,344.5891 C 648.19232,345.351 650.0952,346.1022 652,346.8642 C 656.2744,348.5739 663.45296,350.8845 666.86256,352.5891 C 672.4264,355.3712 672.388,356.3142 679.06256,356.3141 C 679.44336,356.3141 679.6304,354.3941 680,354.3016 C 683.49072,353.429 686.40848,353.4846 688.57504,349.1517 C 689.98176,346.3381 693.6744,342.0674 695.42496,339.4392 C 698.89632,334.2277 699.36352,331.408 700.1,327.4392 C 700.34576,326.1149 698.47264,322.679 699.42496,321.7267 C 702.75568,318.396 704.5688,317.1642 703.42496,312.5891 C 702.91424,310.5459 702.7416,302.3016 706.28752,302.3016 C 710.392,302.3016 711.15024,302.6149 712,306.8642 C 712.79232,310.8258 712.24112,313.0312 716.57504,310.8642 C 719.75776,309.2728 723.54608,308.9094 725.1376,305.7267 C 727.20048,301.6006 737.14096,305.1309 736.67504,300.8517 C 736.11648,295.7211 746.84928,297.4877 737.27504,292.5141 C 735.42608,291.5538 736.49632,289.0765 733.71248,288.0141 C 722.79136,283.8464 728.46256,285.6493 728.46256,282.2267 C 728.4624,277.8563 730.63584,274.5637 729.71248,270.3016 C 729.7376,270.201 730.8624,267.0266 730.86256,264.5891 C 730.8624,262.0029 727.8848,256.4752 728,256.0141 C 728.54848,253.8206 729.45008,250.2094 729.45008,248.5891 C 729.45008,246.4933 728.044,241.1957 726.86256,240.0141 C 726.2248,239.3765 719.16272,231.5787 720,231.4392 C 722.97072,230.944 725.02576,227.5141 728.0376,227.5141 C 734.03984,227.5141 731.96432,219.1243 735.42496,230.3016 C 736.3904,233.4197 737.71248,235.7522 737.71248,240.0141 C 737.71248,244.8832 741.1376,246.6829 741.1376,250.8642 C 741.1376,254.317 742.28752,256.2814 742.28752,260.0141 C 742.28752,264.2966 737.71248,266.8638 737.71248,268.0141 C 737.71248,271.5658 738.02672,273.2462 738.86256,276.5891 C 739.12128,277.6245 739.65728,284.4115 741.1376,285.1517 C 744.69168,286.9286 747.41456,287.181 748,282.8642 C 748.18048,281.5333 750.8624,277.072 750.86256,274.3016 C 750.86256,269.9509 752.09536,270.0986 753.1376,268.0141 C 754.21328,265.8627 754.16112,262.8197 754.86256,260.0141 C 755.26032,258.423 758.7728,250.8256 755.42496,249.1517 C 751.48032,247.1794 753.53472,244.5397 751.42496,241.7267 C 751.04592,241.2213 749.11024,234.1282 748.57504,233.7267 C 746.03408,231.821 745.47168,227.7608 742.86256,225.1517 C 741.032,223.3211 740,222.1317 740,218.3016 C 740,217.0686 740.01344,208.3083 739.42496,208.0141 C 735.59456,206.0989 734.6576,205.483 733.15008,205.5517 z M 644.1376,349.1891 C 644.324,349.6914 644.62896,350.0837 645.1376,350.3016 C 646.08512,350.7078 647.2008,351.201 648.36256,351.7141 C 648.08032,351.448 647.80016,351.1768 647.52496,350.9016 C 646.64352,350.0202 645.39248,349.567 644.1376,349.1891 z"
  },
  "FH": {
    "d": "M 450.28752,226.3016 C 450.13392,226.3123 449.97856,226.316 449.82496,226.3267 C 449.872,226.4062 449.92944,226.4869 449.98752,226.5642 C 449.56944,226.5837 439.68016,231.3117 439.42496,231.4392 C 436.88656,232.7083 441.97184,238.2306 437.1376,239.4392 C 433.85744,240.2592 434.82336,242.4379 432.85008,243.4642 C 433.1992,243.4744 433.55264,243.4971 433.92496,243.5392 C 436.53984,243.8339 437.4,243.6552 437.4,242.8016 C 437.4,242.5453 437.5328,242.4051 437.82496,242.3891 C 438.46784,242.3541 439.87568,242.9152 442.32496,244.1517 L 447.26256,246.6392 L 445.6,248.9642 C 444.07344,251.1082 444.05232,251.3773 445.28752,252.4016 C 447.24304,254.0234 448.82496,258.2958 448.82496,261.9642 C 448.82496,264.6906 449.1152,265.2443 450.8376,265.6766 C 451.99232,265.9666 454.27648,268.0904 456.15008,270.6267 C 458.79728,274.2102 459.42496,275.7496 459.42496,278.6141 C 459.42496,280.5666 458.91536,282.868 458.28752,283.7267 C 457.22512,285.1795 456.96128,284.9062 454.47504,279.8642 C 452.92608,276.7232 451.02416,274.091 449.95008,273.6016 C 448.93072,273.1373 446.69408,271.5155 444.98752,269.9891 C 443.28096,268.4627 440.23152,266.2019 438.21248,264.9642 C 436.19344,263.7264 433.94928,261.9627 433.22496,261.0517 C 432.10368,259.641 430.69888,259.3374 423.72496,259.0016 L 415.5376,258.6141 L 416.35008,256.2517 C 416.80176,254.9557 416.9488,253.0053 416.67504,251.9141 C 416.21632,250.0872 416.74352,249.66 423.31248,246.5392 C 425.97488,245.2742 427.80832,244.4693 429.28752,244.0016 C 425.47136,243.9072 423.3864,242.5573 420.57504,241.1517 C 417.26448,239.4963 414.04,241.9925 411.42496,242.8642 C 407.96112,244.0187 408.57504,248.0306 408.57504,251.4392 C 408.57504,256.6422 402.64064,255.295 401.1376,258.3016 C 399.30251,261.9715 392.8645,260.2374 389.7125,262.8642 C 388.4419,263.923 386.43664,264.263 383.42501,264.3016 C 380.8527,262.6342 384.31736,266.6866 384.57501,267.4392 C 384.57499,269.2888 387.87101,276.8059 389.7125,277.7267 C 394.58026,280.1605 395.99888,281.7256 399.42501,285.1517 C 401.77872,287.5053 402.8136,290.8357 406.28752,293.1517 C 407.11104,293.7006 416.6328,301.3483 416.86256,301.4392 C 417.8488,301.2395 419.39104,302.2931 419.42496,302.3016 C 424.5768,303.5896 422.8048,304.5314 425.71248,307.4392 C 427.92288,309.6496 429.70464,312.5688 432,314.8642 C 434.4536,317.3178 435.66656,321.1517 438.86256,321.1517 C 443.24672,321.1517 443.76128,320.092 448,321.1517 C 451.87536,322.1205 454.28752,321.8432 454.28752,326.3016 C 454.28752,330.6574 454.5608,332.0141 459.42496,332.0141 C 464.54,332.0141 467.40832,333.7163 472,334.8642 C 473.49776,335.2386 476.64848,346.2157 481.71248,341.1517 C 482.18768,340.6766 486.27344,333.1202 487.42496,337.7267 C 488.84512,343.4069 494.02992,339.6411 497.1376,338.8642 C 497.28272,338.8278 506.74912,329.0176 506.28752,330.8642 C 506.40384,330.8075 506.62128,330.6731 506.87504,330.5141 C 507.46976,326.1517 510.28592,325.7078 511.42496,321.1517 C 512.23392,317.9165 520.912,314.7651 522.86256,310.8642 C 523.22848,310.1318 520,304.9379 520,302.3016 C 520,299.808 518.52496,296.7522 519.42496,293.1517 C 519.60688,291.8474 526.44688,288.8925 521.71248,290.3016 C 520.37152,290.637 514.5056,289.4715 510.86256,288.0141 C 507.2192,286.5568 504.02384,280.1318 501.1376,277.7267 C 498.63968,275.6451 497.10192,272.5589 493.71248,270.8642 C 490.1824,269.099 493.16208,266.483 487.42496,267.4392 C 483.15168,268.1514 480.70112,268.3013 477.1376,269.7267 C 472.32416,271.652 473.04752,271.033 469.71248,266.8642 C 469.52896,266.6349 463.69072,270.6525 462.28752,270.3016 C 458.88016,269.4498 462.10736,262.8238 460,260.0141 C 457.39136,256.536 466.28752,252.9368 466.28752,248.5891 C 466.28752,247.6368 466.28752,246.679 466.28752,245.7267 C 466.28752,241.0126 473.40176,239.7866 462.86256,237.1517 C 459.36944,236.2784 456.58208,233.1714 453.71248,230.3016 C 452.8416,229.4309 451.25136,226.6229 450.28752,226.3016 z M 471.21248,302.2141 L 474.68752,304.7141 C 477.41008,306.6694 478.05856,307.5851 477.71248,308.9642 C 477.37936,310.2915 477.78608,310.9584 479.36256,311.6766 C 481.15808,312.4949 481.45008,313.141 481.45008,316.3267 C 481.45008,319.5237 481.90592,320.5286 484.75008,323.6141 C 487.43696,326.5291 487.9448,327.5786 487.51248,329.3016 C 487.2128,330.4952 486.40576,331.4328 485.65008,331.4392 C 484.9136,331.4453 483.5016,331.6614 482.51248,331.9267 C 481.02896,332.3245 480.6184,331.9978 480.21248,330.0766 C 478.83648,323.5654 473.60256,316.1552 466.4376,310.5891 L 463.25008,308.1141 L 467.22496,305.1642 L 471.21248,302.2141 z"
  },
  "DY": {
    "d": "M 583.02496,89.9642 C 580.7968,89.9613 578.816,90.1594 578.28752,90.8642 C 577.14736,92.3842 573.90352,100.2061 573.1376,100.5891 C 568.17168,103.0722 560.31744,97.1566 553.47504,96.5141 C 545.9848,95.8109 545.60224,98.9658 548.67504,106.7392 C 549.41536,108.612 542.28752,113.0381 542.28752,114.3016 C 542.28752,115.4672 542.96704,123.7005 541.71248,124.0141 C 538.79152,124.7445 531.10192,125.3424 528.9376,125.6517 C 523.76832,126.3901 523.6792,122.061 517.17504,124.1141 C 515.49856,124.6434 511.98768,122.4734 510.01248,121.0891 C 509.8992,121.1096 509.77792,121.1323 509.71248,121.1517 C 509.77152,125.7251 504.76544,124.5891 500,124.5891 C 499.7176,124.5891 494.94224,128.5891 493.1376,128.5891 C 485.79168,128.5891 488.5312,130.4654 485.71248,136.0141 C 484.36704,138.6627 484.98256,146.3016 488.57504,146.3016 C 491.45744,146.3016 487.1344,153.575 489.71248,154.8642 C 489.94848,154.9821 488.61696,155.9632 488.28752,156.8642 C 488.1456,157.0984 487.9944,157.3197 487.85008,157.5517 C 488.5408,157.6042 489.1784,157.6621 489.71248,157.7267 C 492.45136,158.7573 499.76368,155.857 503.42496,156.5891 C 504.93088,156.8904 504.22272,160.2166 505.71248,160.5891 C 510.04912,161.6733 514.8624,160.3098 514.86256,165.1517 C 514.8624,172.0328 520.77568,172.4019 524.57504,174.3016 C 528.14768,176.088 528.70912,175.9694 533.71248,174.3016 C 535.12384,173.8312 535.6824,176.5365 536.57504,177.7267 C 537.25504,178.6334 549.38144,177.7267 552,177.7267 C 554.21776,177.7267 554.28752,177.5666 554.28752,182.3016 C 554.28752,184.0933 555.06656,183.748 554.28752,186.8642 C 553.15104,191.4099 546.53872,196.0141 553.1376,196.0141 C 555.96144,196.0141 562.05648,197.3357 563.42496,197.7267 C 565.25168,198.2485 561.2304,202.3016 567.42496,202.3016 C 579.07456,202.3016 572.13168,202.0498 574.28752,207.4392 C 576.33728,212.5637 573.01792,212.1939 578.28752,214.3016 C 578.67664,214.4573 580.4608,218.1334 582.28752,218.8642 C 586.45472,220.531 584.88624,220.4274 590.28752,217.7267 C 593.11488,216.313 596.9344,214.6845 600,213.1517 C 600.76192,212.7707 601.5256,212.395 602.28752,212.0141 C 603.49216,211.4118 606.65312,210.8642 608,210.8642 C 608.84096,211.0926 607.1288,209.079 606.86256,208.5891 C 605.51792,205.9002 605.1376,203.363 605.1376,199.4392 C 605.1376,196.269 610.38512,195.8746 613.1376,194.3016 C 613.49136,194.1091 613.8024,193.9491 614.1,193.8141 C 613.62976,192.5448 612.8552,191.9851 612.57504,190.8642 C 611.8688,188.0397 612.57504,179.3192 612.57504,178.3016 C 612.57504,173.7997 609.00576,168.8787 607.42496,165.1517 C 605.5952,160.837 607.21248,156.739 605.1376,152.5891 C 604.32752,150.9693 598.35408,146.2088 600,144.0141 C 605.59344,136.5563 597.1376,142.0707 597.1376,134.3016 C 597.1376,130.4563 596.21344,125.4226 597.1376,121.7267 C 597.91584,118.6136 597.60864,114.8334 598.28752,111.4392 C 599.00592,107.8467 596.52048,105.8355 598.28752,102.3016 C 599.45456,99.9677 593.46416,90.707 592,91.4392 C 592.02656,91.0379 592.09968,90.647 592.15008,90.2515 C 591.55456,90.2864 590.93408,90.3016 590.28752,90.3016 C 589.164,90.3016 585.88992,89.9677 583.02496,89.9642 z"
  },
  "TE": {
    "d": "M 501.9,156.4642 C 498.01024,156.5147 492.10912,158.6283 489.71248,157.7267 C 489.1784,157.6621 488.5408,157.6042 487.85008,157.5517 C 486.46496,159.776 485.00096,161.8632 484,162.8642 C 480.92432,165.9398 480,166.884 480,171.4392 C 480,177.9187 474.58016,174.8187 473.1376,180.5891 C 472.42848,183.425 472.57504,186.568 472.57504,189.7267 C 472.57504,190.7109 471.29056,201.3474 468.57504,197.7267 C 467.9552,196.9003 461.1376,191.0349 461.1376,196.0141 C 461.1376,203.393 448.17584,200.7768 447.42496,200.5891 C 445.17472,200.0266 438.57616,199.4392 434.28752,199.4392 C 425.7024,199.4392 434.392,205.4336 429.71248,207.4392 C 423.32416,210.177 425.1376,209.2253 425.1376,213.1517 C 425.1376,217.2302 423.37616,222.8642 428.57504,222.8642 C 433.87152,222.8642 434.39936,227.4702 436.57504,228.0141 C 437.52256,228.251 438.22832,228.3122 438.76256,228.2517 C 438.95696,228.075 439.184,227.916 439.46256,227.7766 C 439.64512,227.6853 439.824,227.5915 440.01248,227.5141 C 440.9096,225.7878 438.35232,221.7267 440.57504,221.7267 C 443.05856,221.7267 444.64112,216.616 446.86256,217.7267 C 452.01328,220.3021 448.36848,223.8603 449.82496,226.3267 C 449.97856,226.316 450.13392,226.3123 450.28752,226.3016 C 451.25136,226.6229 452.8416,229.4309 453.71248,230.3016 C 456.58224,233.1714 459.36944,236.2784 462.86256,237.1517 C 473.40176,239.7866 466.28752,241.0126 466.28752,245.7267 C 466.28752,246.679 466.28752,247.6368 466.28752,248.5891 C 466.28752,252.9368 457.39136,256.536 460,260.0141 C 462.10736,262.8238 458.88016,269.4498 462.28752,270.3016 C 463.69072,270.6525 469.52896,266.6349 469.71248,266.8642 C 473.04752,271.033 472.32416,271.652 477.1376,269.7267 C 480.70112,268.3013 483.15168,268.1514 487.42496,267.4392 C 493.16208,266.483 490.1824,269.099 493.71248,270.8642 C 497.10192,272.5589 498.63968,275.6451 501.1376,277.7267 C 504.02384,280.1318 507.2192,286.5568 510.86256,288.0141 C 514.50576,289.4715 520.37152,290.637 521.71248,290.3016 C 523.05344,289.9664 530.6336,287.8845 531.42496,286.3016 C 533.796,281.5595 532.67312,280.4786 535.42496,277.7267 C 538.16736,274.9843 538.5584,270.7974 543.42496,272.0141 C 545.23488,272.4666 555.10704,272.137 555.42496,273.7267 C 555.70992,275.151 553.75456,281.1653 556,281.7267 C 557.93584,282.2106 563.55776,287.2322 564.86256,289.1392 C 564.71296,288.2266 570.28752,286.1912 570.28752,281.1517 C 570.28752,274.6336 570.188,274.4291 576.57504,273.1517 C 580.85232,272.2962 587.2704,269.8813 589.71248,267.4392 C 591.37568,265.776 590.28752,259.949 590.28752,257.7267 C 590.28736,252.3056 592.92128,252.6973 597.71248,250.3016 C 597.95472,250.0866 598.20928,249.8877 598.46256,249.6891 C 597.8664,248.9478 597.4048,248.2814 597.1376,248.0141 C 594.70944,245.5861 597.71248,241.1605 597.71248,237.7267 C 597.71248,233.4114 598.46304,229.363 599.42496,227.4392 C 599.68096,226.9274 603.33856,232.4314 607.42496,226.3016 C 609.29728,223.4933 608.77808,219.608 610.28752,216.5891 C 611.20032,214.7634 609.7768,212.8282 608.4,210.9392 C 608.2624,210.9019 608.1272,210.8731 608,210.8642 C 606.65312,210.8642 603.49216,211.4118 602.28752,212.0141 C 601.5256,212.395 600.76192,212.7707 600,213.1517 C 596.9344,214.6845 593.11488,216.313 590.28752,217.7267 C 584.88624,220.4274 586.45472,220.531 582.28752,218.8642 C 580.4608,218.1334 578.67664,214.4573 578.28752,214.3016 C 573.01792,212.1939 576.33728,212.5637 574.28752,207.4392 C 572.13168,202.0498 579.07456,202.3016 567.42496,202.3016 C 561.2304,202.3016 565.25168,198.2485 563.42496,197.7267 C 562.05648,197.3357 555.96144,196.0141 553.1376,196.0141 C 546.53872,196.0141 553.15104,191.4099 554.28752,186.8642 C 555.06656,183.748 554.28736,184.0933 554.28752,182.3016 C 554.28752,177.5666 554.21776,177.7267 552,177.7267 C 549.38144,177.7267 537.25504,178.6334 536.57504,177.7267 C 535.6824,176.5365 535.12384,173.8312 533.71248,174.3016 C 528.70912,175.9694 528.14768,176.088 524.57504,174.3016 C 520.77568,172.4019 514.8624,172.0328 514.86256,165.1517 C 514.8624,160.3098 510.04896,161.6733 505.71248,160.5891 C 504.22272,160.2166 504.93088,156.8904 503.42496,156.5891 C 502.96736,156.4976 502.45568,156.457 501.9,156.4642 z"
  }
  

};
// Create the tooltip
svgMap.prototype.createTooltip = function () {
  if (this.tooltip) {
    return false;
  }
  this.tooltip = this.createElement('div', 'svgMap-tooltip', document.getElementsByTagName('body')[0]);
  this.tooltipContent = this.createElement('div', 'svgMap-tooltip-content-wrapper', this.tooltip);
  this.tooltipPointer = this.createElement('div', 'svgMap-tooltip-pointer', this.tooltip);
};

// Set the tooltips content
svgMap.prototype.setTooltipContent = function (content) {
  if (!this.tooltip) {
    return;
  }
  this.tooltipContent.innerHTML = '';
  this.tooltipContent.append(content);
};

// Show the tooltip
svgMap.prototype.showTooltip = function (e) {
  this.tooltip.classList.add('svgMap-active');
  this.moveTooltip(e);
};

// Hide the tooltip
svgMap.prototype.hideTooltip = function () {
  this.tooltip.classList.remove('svgMap-active');
};

// Move the tooltip
svgMap.prototype.moveTooltip = function (e) {
  var x = e.pageX;
  var y = e.pageY;
  var offsetToWindow = 6;
  var offsetToPointer = 12;
  var offsetToPointerFlipped = 32;

  var wWidth = window.innerWidth;
  var tWidth = this.tooltip.offsetWidth;
  var tHeight = this.tooltip.offsetHeight;

  // Adjust pointer when reaching window sides
  var left = x - tWidth / 2;
  if (left <= offsetToWindow) {
    x = offsetToWindow + (tWidth / 2);
    this.tooltipPointer.style.marginLeft = (left - offsetToWindow) + 'px';
  } else if (left + tWidth >= wWidth - offsetToWindow) {
    x = wWidth - offsetToWindow - (tWidth / 2);
    this.tooltipPointer.style.marginLeft = ((wWidth - offsetToWindow - e.pageX - (tWidth / 2)) * -1) + 'px';
  } else {
    this.tooltipPointer.style.marginLeft = '0px';
  }

  // Flip tooltip when reaching top window edge
  var top = y - offsetToPointer - tHeight;
  if (top <= offsetToWindow) {
    this.tooltip.classList.add('svgMap-tooltip-flipped');
    y += offsetToPointerFlipped;
  } else {
    this.tooltip.classList.remove('svgMap-tooltip-flipped');
    y -= offsetToPointer;
  }

  this.tooltip.style.left = x + 'px';
  this.tooltip.style.top = y + 'px';
};
// Log error to console
svgMap.prototype.error = function (error) {
  (console.error || console.log)('svgMap error: ' + (error || 'Unknown error'));
};

// Helper to create an element with a class name
svgMap.prototype.createElement = function (type, className, appendTo, innerhtml) {
  var element = document.createElement(type);
  if (className) {
    className = className.split(' ');
    className.forEach(function (item) {
      element.classList.add(item);
    });
  }
  innerhtml && (element.innerHTML = innerhtml);
  appendTo && appendTo.appendChild(element);
  return element;
};

// Print numbers with commas
svgMap.prototype.numberWithCommas = function (nr, separator) {
  return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, (separator || ','));
};

// Get a color between two other colors
svgMap.prototype.getColor = function (color1, color2, ratio) {
  color1 = color1.slice(-6);
  color2 = color2.slice(-6);
  var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
  var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
  var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
  return '#' + this.getHex(r) + this.getHex(g) + this.getHex(b);
};

// Get a hex value
svgMap.prototype.getHex = function (value) {
  value = value.toString(16);
  return ('0' + value).slice(-2);
};

// Get the name of a county by its ID
svgMap.prototype.getCountryName = function (countyID) {
  return this.options.countyNames && this.options.countyNames[countyID] ? this.options.countyNames[countyID] : this.counties[countyID];
};
// UMD module definition
(function (window, document) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('svgMap', function () {
      return svgMap;
    });

  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = svgMap;
    window.svgMap = svgMap;
  }
})(window, document)
//# sourceMappingURL=svgMap.js.map
