/**
 * @fileoverview
 * - Retrieve data from firebase and handle rendering Vendor Cards into a list to user on list.html
 */
const distanceSlider = document.getElementById("myRange");
const showResultsBtn = document.getElementById("show-results-btn");

/**
 * Sort Vendor Cards by distance by reading data-distance attribute, and apply number to flex order
 */
function sortVendorCardByDistance() {
  let vendorCards = document.querySelectorAll(".card");
  vendorCards.forEach((vendorCard) => {
    vendorCard.style.order = vendorCard.dataset.distance;
  });
}

/**
 * Update user location, and calculate vendor distance after page load.
 * It is implemented in case user interrupted location update in main.html
 */
function updateDistanceAfterInitialization() {
  displayLoadingScreen();

  let currentUserCoord;
  try {
    currentUserCoord = JSON.parse(sessionStorage.getItem("currentPosition"));
    updateDistanceHelper(currentUserCoord);
    sortVendorCardByDistance();
    removeLoader();
  } catch (e) {
    console.log("User location not found, please refresh and try again.");
    console.log(e);
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      updateDistanceHelper(userLocation);
      sortVendorCardByDistance();
    });
  }
}

/**
 * Helper function for updateDistanceAfterInitialization(), it will store current location to session storage,
 * and add distance information to each vendor card.
 * @param {any} userLocation - array of coordinates
 */
function updateDistanceHelper(userLocation) {
  assignDistancesToVendorsInStorage(userLocation);
  sessionStorage.setItem("currentPosition", JSON.stringify(userLocation));

  // loop through all vendors, and append distance to the corresponding element
  for (let i = 0; i < sessionStorage.length; i++) {
    const itemKey = sessionStorage.key(i);
    // if vendor exists,
    if (itemKey.includes("vendor-")) {
      try {
        const vendorCard = document.querySelector(`#${itemKey}`);
        const itemData = JSON.parse(sessionStorage.getItem(itemKey));
        const vendorDistance = itemData.distance * 1000;
        vendorCard.dataset.distance = (vendorDistance.toFixed(2) * 100).toFixed(
          0,
        );
        vendorCard.querySelector(".card-distance").innerHTML =
          vendorDistance > 1000
            ? `Distance: ${(vendorDistance / 1000).toFixed(2)} km`
            : `Distance: ${vendorDistance.toFixed(2)} m`;
      } catch (e) {
        console.log(e);
      }
    }
  }
}

/**
 * Renders a Vendor Card dynamically by using Vendor Card Template
 * @param vendor - firestore doc object representing a vendor
 */
function renderVendorCard(vendor) {
  let Template = document.getElementById("vendorCardTemplate");

  //iterate thru each doc
  let docID = vendor.id; //gets the unique vendorID of the document
  let vendorThumbnail = vendor.data().thumbnail;
  let vendorName = vendor.data().name; // get value of the "name" key
  let vendorAddress = vendor.data().address; // get value of the "address" key
  let vendorCode = vendor.data().code; //get unique vendorID to each hike to be used for fetching right image
  let vendorDistance = sessionStorage.getItem(`vendor-${docID}`)
    ? JSON.parse(sessionStorage.getItem(`vendor-${docID}`)).distance * 1000
    : 0; //gets the length field
  let vendorUmbrellaCount = vendor.data().umbrellaCount;

  let newCard = Template.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.

  //update title and text and image
  newCard.querySelector(".card").id = `vendor-${docID}`;
  newCard.querySelector(".card").dataset.distance = (
    vendorDistance.toFixed(2) * 100
  ).toFixed(0);
  newCard.querySelector(`#vendor-${docID}`).href = `./vendor.html?id=${docID}`;
  newCard.querySelector(".card-title").innerHTML = vendorName;
  newCard.querySelector(".card-address").innerHTML = vendorAddress;
  newCard.querySelector(".card-image").src =
    vendorThumbnail || `./images/vendors/${vendorCode}.png`; //Example: NV01.jpg
  newCard.querySelector(".card-distance").innerHTML =
    vendorDistance > 1000
      ? `Distance ${(vendorDistance / 1000).toFixed(2)} km`
      : `Distance: ${vendorDistance.toFixed(2)} m`;

  newCard.querySelector(".card-umbrellas").innerHTML =
    `Available Umbrellas: ${vendorUmbrellaCount}`;

  //attach to vendorCard
  document.getElementById("vendors-go-here").appendChild(newCard);
}

/**
 * Get latitude and longitude information from vendor firestore doc and store in Local Storage
 * @param vendor - firestore doc object representing a vendor
 */
function setVendorCoordinatesToLocalStorage(vendor) {
  let { lat, lng } = vendor.data();
  let coordinates = [lng, lat];

  // iterate variable to serve as unique vendorID
  if (!sessionStorage.getItem(`vendor-${vendor.id}`)) {
    sessionStorage.setItem(
      `vendor-${vendor.id}`,
      JSON.stringify({
        ...vendor.data(),
        coordinates: coordinates,
        distance: 0,
      }),
    );
  }
}

/**
 *  Initialize all vendor cards, and assign coordinates on page load
 */
function initializeVendorCards(allVendors) {
  allVendors.forEach((vendor) => {
    setVendorCoordinatesToLocalStorage(vendor);
    renderVendorCard(vendor);
  });
  updateDistanceAfterInitialization();
}

/**
 * Using geofire library to retrieve matched vendors based on user's coordinates and radius, and render the
 * matched vendor cards.
 * @param {any} searchRadius - array of coordinates
 */
async function handleGeohashQeuryInRadius(searchRadius) {
  displayLoadingScreen();
  document.getElementById("vendors-go-here").innerHTML = "";
  let currentUserCoord;
  try {
    currentUserCoord = JSON.parse(sessionStorage.getItem("currentPosition"));
    currentUserCoord.reverse();
  } catch (e) {
    console.log("User location not found, please refresh and try again.");
    console.log(e);
    // location.reload();
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      sessionStorage.setItem("currentPosition", JSON.stringify(userLocation));
      handleGeohashQeuryInRadius(searchRadius);
    });
  }
  let matched_vendors = await getVendorsInRadius(
    currentUserCoord,
    searchRadius,
  );
  initializeVendorCards(matched_vendors);
}

async function listMain() {
  handleMapListToggle();
  const allVendors = await db.collection("vendors").get();
  handleGeohashQeuryInRadius(2);
  showResultsBtn.addEventListener("click", (e) => {
    handleGeohashQeuryInRadius(parseInt(distanceSlider.value));
  });
}

listMain();
