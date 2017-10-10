var sights = [
    {
    title: "Speicherstadt",
    lat: 53.544705,
    lng: 9.9749689,
    },
    {
    title: "Elbphilharmonie",
    lat: 53.5413306,
    lng: 9.9841274,
    },
    {
    title: "Fischmarkt",
    lat: 53.5451634,
    lng: 9.9532352,
    },
    {
    title: "Planten un Blomen",
    lat: 53.5495481,
    lng: 9.9797395,
    },
    {
    title: "Aussen-Alster",
    lat: 53.5674892,
    lng: 10.0056724,

    },
  ];

var map;

function initMap() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(53.551086, 9.993682)
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  setMarkers()

};

function setMarkers() {
  sights.markers = ko.observableArray([]);
  infoWindow = new google.maps.InfoWindow();

  //define marker information
  var Marker = function(sight) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(sight.lat, sight.lng),
      title: sight.title,
      animation: google.maps.Animation.DROP,
      map: map
    });
    return marker;
  }

  //create all Markers and push into Array and create on click events for each marker
  for (var i = 0; i < sights.length; i++) {
    //marker = ko.observable(new Marker(sights[i]));
    var marker = new Marker(sights[i]);
    sights.markers.push(marker);

    //on click events
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow)
    });
  }


  //when marker is clicked get and show title and other information, when marker is closed discard information
  function populateInfoWindow(marker, infowindow) {
    //check that window is not already open
    if (infowindow.marker != marker) {
      infowindow.marker = marker;

      var description = "description";
      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title +
                  '&format=json&callback=wikiCallback';

      $.ajax({
        url:wikiUrl,
        dataType: "jsonp",
        async: false,
        // jsonp: "callback",
        success: function( response ) {
          console.log(response)
          description = response[2][0];
          console.log(description)
          infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>'
                                +'<p>' + description + '</p>' + '</div>');
              }
      });
      //console.log(description);

    //  infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>'
    //                        +'<p>' + "asdf2" + '</p>' + '</div>');
      infowindow.open(map, marker);

      //clear content when marker is closed
      infowindow.addListener('closeClick', function() {
        infowindow.marker = null;
      });
    }
  }


//viewmodel
$(function() {
    var viewModel = {
        query: ko.observable('')
    };

    //list search filter
    viewModel.sights = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(sights, function(sight) {
            return sight.title.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);

    //make markers visible or not
    viewModel.filteredMarkers = ko.computed(function() {
      var search = this.query().toLowerCase();
      return ko.utils.arrayFilter(sights.markers(), function(marker) {
        if (marker.title.toLowerCase().indexOf(search) >= 0) {
            return marker.setVisible(true);
          } else {
            return marker.setVisible(false);
          }
      });
    }, viewModel);

    ko.applyBindings(viewModel);
});


};
