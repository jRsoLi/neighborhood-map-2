var Sight = function(title, lat, lng, id) {
    var self = this;
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.id = id;


    this.infowindow = new google.maps.InfoWindow();

    //set default and highlight colors for map markers
    var defaultIcon = makeMarkerIcon('225FC1');
    var highlightedIcon = makeMarkerIcon('FC0505');

    //define marker
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat, self.lng),
        map: map,
        title: self.title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon
    });

    // opens and populates info window for marker
    this.openInfowindow = function() {
        for (var i = 0; i < sightsModel.sights.length; i++) {
            sightsModel.sights[i].infowindow.close();
        }
        map.panTo(self.marker.getPosition())
        self.marker.setAnimation(google.maps.Animation.DROP);

        //get wikipedia description information
        var description = "description";
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + self.marker.title +
            '&format=json&callback=wikiCallback';

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            async: false,
            // jsonp: "callback",
            success: function(response) {

                description = response[2][0];
                self.infowindow.setContent('<div>' + '<h3>' + self.marker.title + '</h3>' +
                    '<p>' + description + '</p>' + '</div>');
            }
        });
        self.infowindow.open(map, self.marker);
    };

    //creates the marker with specific style
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }

    //highlight selected marker
    this.marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });

    //de-highlight selected marker
    this.marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });

    //listener to open info window on click
    this.addListener = google.maps.event.addListener(self.marker, 'click', (this.openInfowindow));
};

//all sights used
var sightsModel = {

    sights: [
        new Sight('Speicherstadt', 53.544705, 9.9749689, '1'),
        new Sight('Elbphilharmonie', 53.5413306, 9.9841274, '2'),
        new Sight('Fischmarkt', 53.5451634, 9.9532352, '3'),
        new Sight('Planten un Blomen', 53.5495481, 9.9797395, '4'),
        new Sight('Aussen-Alster', 53.5674892, 10.0056724, '5')
    ],
    query: ko.observable(''),
};


// Search function
sightsModel.search = ko.dependentObservable(function() {
    var self = this;
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(self.sights, function(sight) {
        return sight.title.toLowerCase().indexOf(search) >= 0;
    });
}, sightsModel);

ko.applyBindings(sightsModel);
