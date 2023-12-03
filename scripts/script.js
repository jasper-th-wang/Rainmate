/**
 * @fileoverview
 * Utility functions shared by multiple other JavaScript files
 */
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("logging out user");
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayLoadingScreen() {
  moviesContainer.style.opacity = 0;
  loaderContainer.style.display = "grid";
}

function removeLoaderDisplayContent() {
  // TODO: Delete
  console.log("works???");
  document.querySelector(".loader-container").remove();
}
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
function calculateDistance(userCoordinates, vendorCoordinates) {
  var [lng1, lat1] = userCoordinates;
  var [lng2, lat2] = vendorCoordinates;

  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lng2 - lng1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function assignDistancesToVendorsInStorage(userCoordinates) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const itemKey = sessionStorage.key(i);
    if (itemKey.includes("vendor-")) {
      console.log(itemKey);
      const itemData = JSON.parse(sessionStorage.getItem(itemKey));
      console.log(itemData);
      console.log(itemData.coordinates);
      console.log(calculateDistance(userCoordinates, itemData.coordinates));
      itemData.distance = calculateDistance(
        userCoordinates,
        itemData.coordinates,
      );
      sessionStorage.setItem(itemKey, JSON.stringify(itemData));
    }
  }
}

function handleMapListToggle() {
  document.addEventListener("DOMContentLoaded", function () {
    var mapButton = document.getElementById("mapButton");
    var listButton = document.getElementById("listButton");

    mapButton.addEventListener("click", function () {
      window.location.href = "main.html";
    });

    listButton.addEventListener("click", function () {
      window.location.href = "list.html";
    });
  });
}
