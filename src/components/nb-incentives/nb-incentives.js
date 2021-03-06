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
            reflectToAttribute: true,
            notify: true,
            value: '',
        },
        address: {
            type: String,
            value: '27 West Main Street New Britain, CT 06051',
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
        county: {
            type: String,
            value: 'Hartford'
        },
        energy: {
            type: Array,
            reflectToAttribute: true,
            notify: true,
            //observer: '_handleAjaxEventfunction'
        },
        nrel_api_key: {
            type: String,
            reflectToAttribute: true,
            notify: true,
            value: '',
        },
        energy: {
            type: Object,
            //computed: 'computeFullName(data)',
            reflectToAttribute: true,
            notify: true,
            value: {
                baseUrl: "https://developer.nrel.gov/api/pvwatts/v5.json",
                key: "B3eeEuXR7zVF7Hw8zkUmwp6tv7MEBrlunhW6ny49",
                gotResponse: false,
                apiResponse:{}
            }
        },
        companies: {
            type: Object,
            reflectToAttribute: true,
            notify: true,
            value: {
                baseUrl: "https://data.ct.gov/resource/jh52-2msw.json?city=New%20Britain&state=CT&active=1&$where=credentialtype%20in(%27HIC%27,%27HIS%27)",
                gotResponse: false,
                apiResponse:{}
            }
        },
        cost:{
            type: Object,
            reflectToAttribute: true,
            notify: true,
            value: {
                baseUrl:"https://developer.nrel.gov/api/solar/open_pv/installs/summaries",
                gotResponse: false,
                apiResponse:{}
            }
        },
        incentives:{
            type: Object,
            reflectToAttribute: true,
            notify: true,
            value: {
                baseUrl:"https://developer.nrel.gov/api/energy-incentives/v1.json",
                gotResponse: false,
                apiResponse:{}
            }
        },

        gotAPIResponse:{
            type:Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true
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
            value: '20',
        },
        azimuth: {
            type: String,
            reflectToAttribute: true,
            value: '100',
        },
        ppa:{
            type: String,
            reflectToAttribute: true,
            notify: true,
            value: '0.15'
        },
        natureArea:{
            type:Object
        },
        geoResponse:{
            type: Boolean,
            value:false
        },
        geoResponseError:{
            type: String,
            value: false,
            reflectToAttribute: true,
            notify:true
        },
        apiResponse:{
            type:Object,
            value:{
            }
        },
        mapInitialized:{
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true
        },
        readyToCalculate:{
            type: Boolean,
            value: false,
            reflectToAttribute: true,
            notify: true
        }
    },

    listeners: {
        //  'tap': 'initialize',
        //  'tap': '_calculateValue',
        'geo-error': '_geoError',
        'geo-response': '_geoResponse',
        'toggleSection': 'toggleSection'
    },

    /**
    * Called when the element has been created, but before property values
    * are set and local DOM is initialized. Use for one-time set-up
    * before property values are set.
    **/
    created: function() {
        //console.log('created');
    },
    _onCookieExpired: function(){
        console.log('_onExpired');
        this._startIntro();
    },
    _onLoadCookieEmpty: function(){
        console.log('_onLoadEmpty');
        this._startIntro();
    },

    _startIntro: function(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    intro: "Welcome to New Britain Energy Tools!<br />"+
                    "It looks like this is your first visit. Please click next for a tour."
                },
                {
                    element: this.$.step1,
                    intro: "This section will help you setup your inputs. These will help us help you."
                },
                {
                    element: this.$.step2,
                    intro: "This section will display your address and help measure your home.",
                    position: 'right'
                },
                {
                    element: this.$.step3,
                    intro: 'These items will help you to locate yourself and then show your pricing information.',
                    position: 'left'
                },
                {
                    element: this.$.step4,
                    intro: "Location is automatically detected, but if you declined or it didnt work, enter your address here.",
                    position: 'bottom'
                },
                {
                    element: this.$.step5,
                    intro: 'Once your location information has been set, and you have located and drawn your roof, this section will show the results.'
                },
                {
                    element: this.$.step6,
                    intro: 'These buttons help you control the application.',
                    position: 'left'
                },
                {
                    element: this.$.step7,
                    intro: "This step allows you to set advanced options.",
                    position: 'bottom'
                },
                {
                    element: this.$.step8,
                    intro: 'If everything goes well, this will show you your results!'
                }
            ]
        });

        intro.setOptions({
            hints: [
                {
                    element: this.$.step1,
                    hint: "This is a tooltip.",
                    hintPosition: 'top-middle'
                },
                {
                    element: this.$.step2,
                    hint: 'More features, more fun.',
                    position: 'left'
                },
                {
                    element: this.$.step3,
                    hint: "<b>Another</b> step.",
                    hintPosition: 'top-middle'
                }
            ]
        });
        //intro.addHints();
        //if(this.$.introCookie)
        intro.start();
        //introJs().start();
        //this.$.introCookie.load()
        this.$.introCookie.value = {introPlayed: true};
        this.$.introCookie.save();
    },
    attached: function(){

    },
    /**
    * Called after property values are set and local DOM
    * is initialized. Use for one-time configuration of your
    * component after local DOM is initialized.
    **/
    ready: function() {
        //this.showErrorToast('ready');
        console.log('ready');

    },

    _mapsLoaded: function() {
        console.log('maps loaded');
        this.initialize(this.initMap);
    },


    _handleLatLong: function(el) {
        if (this.latitude && this.longitude) {
            //if(!this.geoResponse){
            this.$.location.show();
            //}else{
            //this.$.location.hide();
            //}

            //this.map.setCenter({lat: this.latitude, lng: this.longitude});
            this.initialize(this.initMap);

            //this.$.energy.generateRequest();
            //this.prepAJAXAndSend();
            //this.initialize();
        }
        ////console.log(el);
        //console.log('_handleLatLong');
    },

    _addressChanged: function(addr, old) {

    },
    _geoError: function(event, error) {
        this.$.location.show();
        this.geoResponse = false;
        this.geoResponseError = error;
    },

    _geoResponse: function(event, response) {
        this.geoResponse = true;
    },

    prepAJAXAndSend: function() {
        this.surface_area = Number(google.maps.geometry.spherical.computeArea(this.natureArea.getPath()));
        this.size_premimum = Number(this.surface_area * 0.15);
        this.size_standard = Number(this.surface_area * 0.10);
        this.energy.apiResponse.surface_area = this.surface_area.toFixed(0);
        this.energy.apiResponse.size_premimum = this.size_premimum.toFixed(2);
        this.energy.apiResponse.size_standard =  this.size_standard.toFixed(2);
        this.energy.key = this.nrel_api_key;
        this.energy.url = this.energy.baseUrl + "?api_key=" + this.energy.key + "&lat=" + this.latitude + "&lon=" + this.longitude + "&timeframe=monthly&system_capacity=" + this.size_premimum + "&module_type=1&losses=14&array_type=1&tilt=" + this.tilt + "&azimuth=" + this.azimuth ;
        this.$.energy.url = this.energy.url;
        var size = 70;
        var minsize = size * 0.8;
        var maxsize = size * 1.2;
        this.$.cost.url = this.cost.baseUrl + "?api_key=" + this.nrel_api_key + "&county=" + this.county + "&minsize=" + minsize+"&maxsize=" + maxsize;
        this.$.incentives.url = this.incentives.baseUrl + "?api_key=" + this.nrel_api_key + "&address=" + this.address + "&incentive_types=solar_incentives";
        this.$.incentives.generateRequest();


        this.$.cost.generateRequest();

        this.$.energy.generateRequest();
        this.$.companies.generateRequest();

    },

    _handleAjaxLoading: function () {
        console.log('_handleAjaxLoading');
    },
    _handleEnergyAjaxEventfunction: function(event, response) {
        var id = event.currentTarget.id;
        var data = event.detail.response;

            var energyGenerated = data.outputs.ac_annual;
            var lease = energyGenerated * 0.15 * this.ppa;
            this.energy.apiResponse = {};
            this.energy.apiResponse.solrad_annual = data.outputs.solrad_annual;
            this.energy.apiResponse.ppa = this.ppa;
            this.energy.apiResponse.energyGenerated = energyGenerated.toFixed(2);
            this.energy.apiResponse.lease =lease.toFixed(2);
            this.energy.apiResponse.address =this.address;
            this.energy.apiResponse.surface_area = this.surface_area.toFixed(0);
            this.energy.apiResponse.size_premimum = this.size_premimum.toFixed(2);
            this.energy.apiResponse.size_standard =  this.size_standard.toFixed(2);
            this.energy.gotResponse = true;
            console.log(this.energy.apiResponse);

        //this.notifyPath("energy.apiResponse");
        this.set('energy.apiResponse', this.energy.apiResponse);
        this.$.response.show();
        this.$.location.hide();
        //this.$.loading.close();
        //console.log('ajax',this.$[id]);
    },
    _handleAjaxEventfunction: function(event, response) {
        var id = event.currentTarget.id;
        var data = event.detail.response;
        //this.$[id].params.lat = this.latitude;
        //this.$[id].params.lon = this.longitude;

        //console.log(response);

        //if(typeof data.outputs != 'undefined' && typeof data.inputs.incentive_types != 'undefined'){
        if(event.srcElement.id == 'energy'){


            var energyGenerated = data.outputs.ac_annual;
            var lease = energyGenerated * 0.15 * this.ppa;
            this.energy.apiResponse.solrad_annual = data.outputs.solrad_annual;
            this.energy.apiResponse.ppa = this.ppa;
            this.energy.apiResponse.energyGenerated = energyGenerated.toFixed(2);
            this.energy.apiResponse.lease =lease.toFixed(2);
            this.energy.apiResponse.address =this.address;
            this.energy.gotResponse = true;
            console.log(this.energy.apiResponse);
        }else if(event.srcElement.id == 'incentives'){
            //console.log(data);
            this.incentives.apiResponse = data.outputs;
            this.incentives.gotResponse = true;
        }else if(event.srcElement.id == 'cost'){
            //console.log(data);
            this.cost.apiResponse = data;
            this.cost.gotResponse = true;
        }else if(event.srcElement.id == 'companies'){
            //console.log(data);
            this.companies.apiResponse = data;
            this.companies.gotResponse = true;
        }
        this.notifyPath(id+".apiResponse");
        this.$.response.show();
        this.$.location.hide();
        //this.$.loading.close();
        //console.log('ajax',this.$[id]);
    },

    _handleAjaxError: function(el, response) {
        //console.log('error',el);
        var message = '';
        if(response.request.response.errors[0]){
            message = response.request.response.errors[0];
        }else{
            message = el.detail.error.message;
        }
        this.showErrorToast(message);
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
    _updateAddress: function () {

        console.log('_updateAddress');
        //this.mapInitialized = false;
        this.codeAddress();
    },

    drawEditablePolygon: function() {
        var self = this;
        self.geocoder = new google.maps.Geocoder();
        address = this.address;
        self.geocoder.geocode({
            'address': address,
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                self.map.setCenter(results[0].geometry.location);
                self.latitude = results[0].geometry.location.lat();
                self.longitude = results[0].geometry.location.lng();
                self.lat_adjacent = Number(results[0].geometry.location.lat()) + 0.0001;
                self.lon_adjacent = Number(results[0].geometry.location.lng()) + 0.0001;
                //console.log('LAT: ' + self.latitude + ' | ADJACENT LAT: ' + self.latitude + ' LON: ' + self.longitude + ' | ADJACENT LON: ' + self.lon_adjacent);
                self.natureCoords = [
                    new google.maps.LatLng(self.latitude, self.lon_adjacent),
                    new google.maps.LatLng(self.latitude, self.longitude),
                    new google.maps.LatLng(self.lat_adjacent, self.longitude),
                    new google.maps.LatLng(self.lat_adjacent, self.lon_adjacent),
                ];
                if(self.natureArea){
                    self.natureArea.setMap(null);
                }
                    self.natureArea = new google.maps.Polygon({
                        path: self.natureCoords,
                        strokeColor: '#FFFFFF',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#00FF00',
                        fillOpacity: 0.6,
                        editable: true,
                        draggable: true,
                    });
                    self.natureArea.setMap(self.map);
                //}
            }
        });
    },




    geocodeLatLng: function() {
        var self = this;
        //var input = document.getElementById('latlng').value;
        //var latlngStr = input.split(',', 2);
        var latlng = {lat: parseFloat(self.latitude), lng: parseFloat(self.longitude)};
        self.geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    //self.map.setZoom(11);
                    if(!self.address){
                        self.address = results[0].formatted_address;
                    }
                    // var marker = new google.maps.Marker({
                    //   position: latlng,
                    //   map: self.map
                    // });
                    self.infowindow.setContent(results[0].formatted_address);
                    //self.infowindow.open(self.map, marker);
                    self.map.setCenter(results[0].geometry.location);
                    self.drawEditablePolygon();
                } else {
                    //console.log('No results found');
                }
            } else {
                //console.log('Geocoder failed due to: ' + status);
            }
        });
    },

    codeAddress: function() {
        var self = this;
        self.geocoder.geocode( { 'address': self.address}, function(results, status) {
            if (status == 'OK') {
                self.map.setCenter(results[0].geometry.location);
                // var marker = new google.maps.Marker({
                //     map: self.map,
                //     position: results[0].geometry.location
                // });
                self.latitude = results[0].geometry.location.lat();
                self.longitude = results[0].geometry.location.lng();
                self.drawEditablePolygon();
            } else {
                //console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    },


    initialize: function() {
        //var geocoder = new google.maps.Geocoder();


        if(!this.mapInitialized && typeof google != 'undefined'){
            this.initMap();

        if(!this.latitude && !this.longitude){
            this.codeAddress();
            //console.log('codeAddress');
        }else{
            this.geocodeLatLng();
            //console.log('geocodeLatLng');
        }


        this.addButtons(this.map);
        this.drawEditablePolygon();
        this.mapInitialized = true;
}
    },

    initMap: function(callback) {
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
        if(this.latitude && this.longitude){
            mapOptions.center = {lat: this.latitude, lng: this.longitude};
        }else{
            mapOptions.center = {lat: 40.731, lng: -73.997};
        }
        this.map = new google.maps.Map(this.$.mapDiv, mapOptions);
        this.geocoder = new google.maps.Geocoder;
        this.infowindow = new google.maps.InfoWindow;
        this.mapInitialized = true;
        if(typeof callback == 'function'){
            callback();
        }
    },



    _onAjaxResponse: function(request) {
        //console.log(request.detail.response)
        this.energy.gotResponse = true;
        this.toggleCollapsibleSection('response');
    },
    _calculateValue: function() {
        //this.$.loading.open();

        //this.tilt = parseInt(this.$.tilt);
        //this.azimuth = parseInt(this.$.azimuth);
        //this.ppa = this.$.ppa;
        //var requestUrl = "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=" + this.nrel_api_key + "&lat=" + lat + "&lon=" + lon + "&timeframe=monthly&system_capacity=" + size_premimum + "&module_type=1&losses=14&array_type=1&tilt=" + tilt + "&azimuth=" + azimuth + "&callback=?";
        this.prepAJAXAndSend();
        // $.getJSON(requestUrl, {}, function(data) {
        //   //console.log(data.outputs);



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
        //     //console.log(data.outputs.utility_info[i].utility_name);
        //     document.getElementById('results2').innerHTML += data.outputs.utility_info[i].utility_name + "<br />";
        //     utility += data.outputs.utility_info[i].utility_name;
        //     i++;
        //   }
        //
        // });

    },

        showErrorToast: function(text, properties) {
            this.$.toasts.showErrorToast(text, properties);
        },
        iconForItem: function(item) {
            return item ? (item.integer < 50 ? 'star-border' : 'star') : '';
        },
        getClassForItem: function(item, selected) {
            return selected ? 'item expanded' : 'item';
        },
    toggleCollapsibleSection: function(section) {
        this.$[section].toggle();
    },
    toggleSection: function(event) {
        ////console.log(event.srcElement.section);

        if(typeof event.srcElement.dataset.section != 'undefined'){
            this.toggleCollapsibleSection(event.srcElement.dataset.section);
        }else{
            if(event.srcElement.parentElement.icon  == 'nb-icons:expand-less'){
            event.srcElement.parentElement.icon = 'nb-icons:expand-more';
        }else{
            event.srcElement.parentElement.icon = 'nb-icons:expand-less';
        }

            this.toggleCollapsibleSection(event.srcElement.parentElement.dataset.section);
        }

    }
});
