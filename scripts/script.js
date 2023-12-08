/**
 * @fileoverview
 * Utility functions shared by multiple other JavaScript files
 */

/**
 * Logs out the current user.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully signed out.
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

/**
 * Displays a loading screen with an optional message.
 * @param {string} [message=""] - The message to display on the loading screen.
 * @returns {void}
 */
function displayLoadingScreen(message = "") {
  let loaderContainer = document.querySelector(".loader-container");
  let messageElement = `<h2 id="loading-msg">${message}</h2>`;
  document.querySelector(".content-container").style.opacity = "0";
  loaderContainer.insertAdjacentHTML("beforebegin", messageElement);
  loaderContainer.style.display = "flex";
}

/**
 * Removes the loader and restores the opacity of the content container.
 * @returns {void}
 */
function removeLoader() {
  document.querySelector(".loader-container").style.display = "none";
  document.querySelector(".content-container").style.opacity = "100";
}

/**
 * Converts the given value from degrees to radians.
 * @param {number} Value - The value in degrees to convert to radians.
 * @returns {number} - The value converted to radians.
 */
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

/**
 * Calculates the distance between two sets of coordinates using the Haversine formula.
 * @param {number[]} userCoordinates - The coordinates of the user in the format [longitude, latitude].
 * @param {number[]} vendorCoordinates - The coordinates of the vendor in the format [longitude, latitude].
 * @returns {number} - The distance between the user and the vendor in kilometers.
 */
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

/**
 * Assigns distances to vendors in the session storage based on the user's coordinates.
 * @param {number[]} userCoordinates - The coordinates of the user in the format [longitude, latitude].
 * @returns {void}
 */
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
