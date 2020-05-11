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
