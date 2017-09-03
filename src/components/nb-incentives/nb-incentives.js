Polymer({
  is: 'nb-incentives',

  properties: {
    /**
     * A  test property to show off the docs.
     **/
    latitude: {
      type: String,
      reflectToAttribute: true,
      notify: true
    },
    longitude: {
      type: String,
      reflectToAttribute: true,
      notify: true,
      observer: '_handleLatLong'
    },
    google_maps_api_key: {
      type: String,
      value: 'AIzaSyC36Dibv-Xy2F5Uuvz3DuWQQuNVsiIvlTE',
    },
    address: {
      type: String,
      value: '29 Russwin Road, New Britain CT, 06053',
      observer: '_addressChanged'
    },
    elec: {
      type: Array,
      reflectToAttribute: true,
      notify: true,
      //observer: '_handleAjaxEventfunction'
    },
    zips: {
      type: Array,
      value: ['06050', '06051', '06052', '06053']
    },
    energy: {
      type: Array,
      reflectToAttribute: true,
      notify: true,
      //observer: '_handleAjaxEventfunction'
    },
    electricityAPI: {
      type: Object,
      computed: 'computeFullName(data)',
      value: {
        baseUrl: "https://developer.nrel.gov/api/pvwatts/v5.json",
        key: "B3eeEuXR7zVF7Hw8zkUmwp6tv7MEBrlunhW6ny49"
      }
    },
    surface_area:{
      type:Number,
      reflectToAttribute: true,
      value:0

    },
	  size_standard:{
      type:Number,
      reflectToAttribute: true,
      value:0
    },
    size_premimum: {
      type: String,
      reflectToAttribute: true,
      value: '',
    },
    tilt: {
      type: String,
      reflectToAttribute: true,
      value: '',
    },
    azimuth: {
      type: String,
      reflectToAttribute: true,
      value: '',
    },
    natureArea:{
      type:Object
    },
  },

  _handleLatLong: function(el) {
    //this.$.energy.params.lat = this.latitude;
    //this.$.energy.params.lon = this.longitude;
    if (this.latitude && this.longitude) {
      //this.$.energy.generateRequest();
      //this.prepAJAXAndSend();
      this._calculateValue();
    }
    console.log(el);
  },

  _addressChanged: function(addr, old) {
    console.log(addr);
  },

  prepAJAXAndSend: function() {
    this.electricityAPI.url = this.electricityAPI.baseUrl + "?api_key=" + this.electricityAPI.key + "&lat=" + this.latitude + "&lon=" + this.longitude + "&timeframe=monthly&system_capacity=" + this.size_premimum + "&module_type=1&losses=14&array_type=1&tilt=" + this.tilt + "&azimuth=" + this.azimuth + "&callback=?";
    this.$.energy.url = this.electricityAPI.url;
    this.$.energy.generateRequest();

  },


  _handleAjaxEventfunction: function(el) {
    var id = event.currentTarget.id;
    //this.$[id].params.lat = this.latitude;
    //this.$[id].params.lon = this.longitude;
    this.notifyPath(id);
    console.log('ajax',this.$[id]);
  },


  _handleAjaxError: function(el, response) {
    console.log('error',el);
  },


  iconForItem: function(item) {
    return item ? (item.integer < 50 ? 'star-border' : 'star') : '';
  },
  getClassForItem: function(item, selected) {
    return selected ? 'item expanded' : 'item';
  },
  /**
   * Called when the element has been created, but before property values
   * are set and local DOM is initialized. Use for one-time set-up
   * before property values are set.
   **/
  created: function() {

  },

  /**
   * Called after property values are set and local DOM
   * is initialized. Use for one-time configuration of your
   * component after local DOM is initialized.
   **/
  ready: function() {
    // var mapsAPI = document.querySelector('google-maps-api');
    // mapsAPI.addEventListener('api-load', function(e) {
    //     this.initialize()
    // });
    console.log(this);

  },

  _mapsLoaded: function() {
    console.log(this);
    this.initialize();
  },

  initialize: function() {
    var geocoder = new google.maps.Geocoder();
    address = this.$.address;

    if (address) {
      address = address.value;
      var mapOptions = {
        zoom: 40,
        disableDefaultUI: true,
        zoomControl: true,
        panControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 0,
      };
      geocoder.geocode({
        'address': address,
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          x = results[0].geometry.location;
        }
      });

      var map = new google.maps.Map(this.$.mapDiv, mapOptions);
      var mapOptions45 = {
        zoom: 20,
        minZoom: 18,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 45,
      };

      geocoder.geocode({
        'address': address,
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map45.setCenter(results[0].geometry.location);
          x = results[0].geometry.location;
        }
      });

      var map45 = new google.maps.Map(this.$.mapDiv45, mapOptions45);
      var mapOptionsImage = {
        zoom: 20,
        disableDefaultUI: true,
        zoomControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 45,
      };

      geocoder.geocode({
        'address': address,
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          mapImage.setCenter(results[0].geometry.location);
          x = results[0].geometry.location;
        }
      });

      var mapImage = new google.maps.Map(this.$.mapDivImage, mapOptionsImage);
      this.addButtons(map);
      this.drawEditablePolygon(map);
    }


  },
  addButtons: function(map) {
    this.$.btnTerrain.addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    });
    this.$.btnRoadmap.addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    });
    this.$.btnSatellite.addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    });
    this.$.btnHybrid.addEventListener('click', function() {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    });
    this.$.btnCompass.addEventListener('click', function() {
      this.$.draggable.toggle();
    });
    this.$.btnInspector.addEventListener('click', function() {
      this.$.mapDiv45.toggle();
    });
  },


  drawEditablePolygon: function(map) {
    var self = this;
    geocoder = new google.maps.Geocoder();
    address = this.$.address.value;
    geocoder.geocode({
      'address': address,
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        lat_adjacent = Number(results[0].geometry.location.lat()) + 0.0001;
        lon_adjacent = Number(results[0].geometry.location.lng()) + 0.0001;
        console.log('LAT: ' + lat + ' | ADJACENT LAT: ' + lat_adjacent + ' LON: ' + lon + ' | ADJACENT LON: ' + lon_adjacent);
        self.natureCoords = [
          new google.maps.LatLng(lat, lon_adjacent),
          new google.maps.LatLng(lat, lon),
          new google.maps.LatLng(lat_adjacent, lon),
          new google.maps.LatLng(lat_adjacent, lon_adjacent),
        ];
        self.natureArea = new google.maps.Polygon({
          path: natureCoords,
          strokeColor: '#FFFFFF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#00FF00',
          fillOpacity: 0.6,
          editable: true,
          draggable: true,
        });
        self.natureArea.setMap(map);

      }
    });
  },
  _onAjaxResponse: function(el, re) {
    console.log(re);
  },
  _calculateValue: function() {

    this.surface_area = Number(google.maps.geometry.spherical.computeArea(this.natureArea.getPath()));
    this.size_premimum = Number(this.surface_area * 0.15);
    this.size_standard = Number(this.surface_area * 0.10);
    document.getElementById('results').innerHTML = "<br><br>RESULTS:<br><br>";
    document.getElementById('results').innerHTML += "Surface Area = " + this.surface_area.toFixed(0) + " sq meter <br/>";
    document.getElementById('results').innerHTML += "System size by using premium solar panels (SunPower) = " + this.size_premimum.toFixed(2) + " kW <br/>";
    document.getElementById('results').innerHTML += "System size by using standard solar panels = " + this.size_standard.toFixed(2) + " kW <br/>";
    this.tilt = parseInt(document.getElementById('tilt').value);
    this.azimuth = parseInt(document.getElementById('azimuth').value);
    //var requestUrl = "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=" + this.nrel_api_key + "&lat=" + lat + "&lon=" + lon + "&timeframe=monthly&system_capacity=" + size_premimum + "&module_type=1&losses=14&array_type=1&tilt=" + tilt + "&azimuth=" + azimuth + "&callback=?";
    this.prepAJAXAndSend();
    // $.getJSON(requestUrl, {}, function(data) {
    //   console.log(data.outputs);
    //   var energyGenerated = data.outputs.ac_annual;
    //   var ppa = document.getElementById('ppa').value;
    //   var lease = energyGenerated * 0.15 * ppa;
    //   document.getElementById('results3').innerHTML = "<br /> Estimated Electricity Production = " + energyGenerated.toFixed(2) + " kWh per year <br/>";
    //   document.getElementById('results3').innerHTML += "<h3>Year 1 PPA Revenue $" + lease.toFixed(2) + ".</h3>";
    // });

    // requestUtilityCompanies = "https://developer.nrel.gov/api/census_rate/v3.json?api_key=" + this.nrel_api_key + "&region=block&id=101&lat=" + lat + "&lon=" + lon;
    //
    // $.getJSON(requestUtilityCompanies, {}, function(data) {
    //   document.getElementById('results2').innerHTML = "<br />Local Electric Utility Company: <br/>";
    //
    //   var i = 0;
    //   utility = '';
    //   while (data.outputs.utility_info[i]) {
    //     console.log(data.outputs.utility_info[i].utility_name);
    //     document.getElementById('results2').innerHTML += data.outputs.utility_info[i].utility_name + "<br />";
    //     utility += data.outputs.utility_info[i].utility_name;
    //     i++;
    //   }
    //
    // });

  },

  /**
   * Life cycle function that gets called when the element is
   * first attached to the DOM
   **/
  attached: function() {

  },

  /**
   * Called after the element is detached from the document.
   * Can be called multiple times during the lifetime of an element.
   * Uses include removing event listeners added in
   **/
  detached: function() {

  },


  /**
   * Called when one of the element's attributes is changed.
   * Use to handle attribute changes that don't correspond
   * to declared properties.
   **/
  attributeChanged: function() {

  },

  /**
   * A public function  that doesnt do anything
   *
   * Just demonstating how to document methods
   *
   * @param {object} takes a baz object
   * @return {null}
   **/
  foo: function(baz) {
    return this._bar();
  },

  /**
   * A private that doesnt do anything
   * Just demonstating how to document private methods
   *
   * @return {null}
   **/
  _bar: function() {
    return true;
  },

  /**
   * ### Events
   **/

  /**
   * Fired when nb-incentives does something
   *
   * @event nb-incentives-action
   **/

});
