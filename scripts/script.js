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

function displayLoadingScreen(message = "") {
  let loaderContainer = document.querySelector(".loader-container");
  console.log("HI!");
  let messageElement = `<h2 id="loading-msg">${message}</h2>`;
  document.querySelector(".content-container").style.opacity = 0;
  loaderContainer.insertAdjacentHTML("beforebegin", messageElement);
  loaderContainer.style.display = "flex";
}

function removeLoader() {
  document.querySelector(".loader-container").style.display = "none";
}
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
function calculateDistance(userCoordinates, vendorCoordinates) {
  let [lng1, lat1] = userCoordinates;
  let [lng2, lat2] = vendorCoordinates;

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function assignDistancesToVendorsInStorage(userCoordinates) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const itemKey = sessionStorage.key(i);
    if (itemKey.includes("vendor-")) {
      const itemData = JSON.parse(sessionStorage.getItem(itemKey));
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
    const mapButton = document.getElementById("mapButton");
    const listButton = document.getElementById("listButton");

    mapButton.addEventListener("click", function () {
      window.location.href = "main.html";
    });

    listButton.addEventListener("click", function () {
      window.location.href = "list.html";
    });
  });
}
