/**
 * @fileoverview
 * Renders the MapBox map on main.html
 */

let params = new URL(window.location.href); //get URL of search bar
let vendorCoordinatesString = params.searchParams.get("vendorCoord"); //get value for key "id"
let vendorCoordinates;

if (vendorCoordinatesString) {
  vendorCoordinates = vendorCoordinatesString
    .split(",")
    .map((coord) => parseFloat(coord));
}

/**
 * Get a string representing the day of the week using a JavaScript Day index
 * @param {int} dayIndex
 */
function dayIndexToStr(dayIndex) {
  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return weekday[dayIndex];
}

/**
 * Renders MapBox Map
 */
function showMap() {
  //-----------------------------------------
  // Define and initialize basic mapbox data
  //-----------------------------------------
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";
  const map = new mapboxgl.Map({
    container: "map", // Container ID
    style: "mapbox://styles/mapbox/streets-v11", // Styling URL
    center: [-123.11526553178035, 49.283591043313926], // Starting position
    zoom: 15, // Starting zoom
  });

  // Add user controls to map
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    }),
  );

  //------------------------------------
  // Listen for when map finishes loading
  // then Add map features
  //------------------------------------
  map.on("load", () => {
    let vendorPopup;
    // Defines map pin icon for events
    map.loadImage(
      "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
      (error, image) => {
        if (error) {
          throw error;
        }

        // Add the image to the map style.
        map.addImage("eventpin", image); // Pin Icon

        // READING information from "hikes" collection in Firestore
        db.collection("vendors")
          .get()
          .then((allVendors) => {
            const features = []; // Defines an empty array for information to be added to

            allVendors.forEach((doc) => {
              let {lat, lng} = doc.data();
              coordinates = [lng, lat];

              // Coordinates
              let vendorID = doc.id;
              let vendor_name = doc.data().name; // Event Name
              let vendor_code = doc.data().code;
              let available_umbrellas = doc.data().umbrellaCount;
              let vendor_imgSrc = "./images/vendors/" + vendor_code + ".png";
              let {address} = doc.data(); // Text Preview
              let hours = doc.data().hours_of_operation;
              let dayOfTodayIndex = new Date().getDay();
              let dayOfTodayStr = dayIndexToStr(dayOfTodayIndex);

              // Store in session storage
              if (!sessionStorage.getItem(`vendor-${doc.id}`)) {
                sessionStorage.setItem(
                  `vendor-${doc.id}`,
                  JSON.stringify({
                    ...doc.data(),
                    coordinates: coordinates,
                    distance: 0,
                  }),
                );
              }
              hoursHTML = `Today's Hours: ${hours[dayOfTodayStr]}`;

              // img = doc.data().posterurl; // Image
              // url = doc.data().link; // URL
              let description = `<div class="vendor-features" id="vendor-${doc.id}" data-lat="${lat}" data-lng="${lng}">
                                    <img src="${vendor_imgSrc}"></img>
                                    <div class="vendor-features-body">
                                      <h5>${vendor_name}</h5>
                                      <p id="address">${address}</p>
                                      <p id="hours">${hoursHTML}</p>
                                      <p>Available Umbrellas: ${available_umbrellas}</p>
                                      <a href="./vendor.html?id=${doc.id}" title="Opens in a new window">Details</a>
                                    </div>
                                  </div>`;

              // Pushes information into the features array
              // in our application, we have a string description of the hike
              features.push({
                type: "Feature",
                properties: {
                  description: description,
                },
                geometry: {
                  type: "Point",
                  coordinates: coordinates,
                },
              });
              // If there is a vendor id in URL parameter, render feature
              if (
                JSON.stringify(vendorCoordinates) == JSON.stringify(coordinates)
              ) {
                vendorPopup = new mapboxgl.Popup()
                  .setLngLat(coordinates)
                  .setHTML(description)
                  .addTo(map);
              }
            });

            // Adds features as a source of data for the map
            map.addSource("places", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: features,
              },
            });

            // Creates a layer above the map displaying the pins
            // by using the sources that was just added
            map.addLayer({
              id: "places",
              type: "symbol",
              // source: 'places',
              source: "places",
              layout: {
                "icon-image": "eventpin", // Pin Icon
                "icon-size": 0.1, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });

            //-----------------------------------------------------------------------
            // Add Click event listener, and handler function that creates a popup
            // that displays info from "hikes" collection in Firestore
            //-----------------------------------------------------------------------
            map.on("click", "places", (e) => {
              // Extract coordinates array.
              // Extract description of that place
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;

              // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

            //-----------------------------------------------------------------------
            // Add mousenter event listener, and handler function to
            // Change the cursor to a pointer when the mouse is over the places layer.
            //-----------------------------------------------------------------------
            map.on("mouseenter", "places", () => {
              map.getCanvas().style.cursor = "pointer";
            });

            // Defaults cursor when not hovering over the places layer
            map.on("mouseleave", "places", () => {
              map.getCanvas().style.cursor = "";
            });
          });
      },
    );

    // Add the image to the map style.
    map.loadImage(
      "https://cdn-icons-png.flaticon.com/512/61/61168.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style with width and height values
        map.addImage("userpin", image, { width: 10, height: 10 });

        // Adds user's current location as a source to the map
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          sessionStorage.setItem("currentPosition", userLocation);
          assignDistancesToVendorsInStorage(userLocation);

          // call function to calculate and render distance
          console.log(userLocation);
          if (userLocation) {
            map.addSource("userLocation", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: userLocation,
                    },
                    properties: {
                      description: "Your location",
                    },
                  },
                ],
              },
            });

            // Creates a layer above the map displaying the user's location
            map.addLayer({
              id: "userLocation",
              type: "symbol",
              source: "userLocation",
              layout: {
                "icon-image": "userpin", // Pin Icon
                "icon-size": 0.05, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });

            // Map On Click function that creates a popup displaying the user's location
            map.on("click", "userLocation", (e) => {
              // Copy coordinates array.
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the userLocation layer.
            map.on("mouseenter", "userLocation", () => {
              map.getCanvas().style.cursor = "pointer";
            });

            // Defaults
            // Defaults cursor when not hovering over the userLocation layer
            map.on("mouseleave", "userLocation", () => {
              map.getCanvas().style.cursor = "";
            });
          }
        });
      },
    );
    // Zoom to vendor specified in URL parameter
    map.on("idle", () => {
      if (vendorCoordinates) {
        map.flyTo({ coordinates: vendorCoordinates });
      }
    });

    removeLoaderDisplayContent();
  });
}

// Call the function to display the map with the user's location and event pins
showMap();
