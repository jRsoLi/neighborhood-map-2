viewModel.markers = ko.computed(function() {
  var search = this.query().toLowerCase();
  return ko.utils.arrayFilter(sights.markers(), function(marker) {
    for (var i = 0; i < sights.markers().length; i++) {
      if (sights.markers()[i].title.toLowerCase().indexOf(search) >= 0) {
        return sights.markers()[i].setVisible(true);
      } else {
        return sights.markers()[i].setVisible(false);
      }






      viewModel = {
        query: ko.observable(''),
      };

      viewModel.markers = ko.computed(function() {
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

      };



      var viewModel = function() {
        var self = this;
        this.query = ko.observable(''),

        this.markers = ko.computed(function() {

          var search = this.query.toLowerCase();
          var oMarkers = sights.markers;

          if (!search) {
            return oMarkers;
          }

          return oMarkers.filter(function(marker) {
            return marker.title.toLowerCase().indexOf(search) === 0;
          });

      }, viewModel);

      };
      ko.applyBindings(new viewModel());




          search: function(value) {
              viewModel.sights.removeAll();

              if (value == '') return;

              for (var sight in sights) {
                if (sights[sight].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                  viewModel.sights.push(sights[sight]);
                }
              }
            }


              viewModel.query.subscribe(viewModel.search);



              /*
                var viewModel = {
                  query: ko.observable(''),

                };

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
              */
