// Apply flex order to vendor card by reading info from sessionStorage

function sortVendorCardByDistance() {
  let vendorCards = document.querySelectorAll('.card');
  vendorCards.forEach((vendorCard) => {
    vendorCard.style.order = vendorCard.dataset.distance;
  });
  console.log(vendorCards);
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let Template = document.getElementById('vendorCardTemplate'); // Retrieve the HTML element with the ID "vendorCardTemplate" and store it in the cardTemplate variable.

  db.collection(collection)
    .get() //the collection called "vendors"
    .then((allVendors) => {
      // console.log(allVendors.data());
      allVendors.forEach((doc) => {
        //iterate thru each doc
        var docID = doc.id; //gets the unique ID of the document
        var vendorName = doc.data().name; // get value of the "name" key
        var vendorCode = doc.data().code; //get unique ID to each hike to be used for fetching right image
        var vendorDistance = sessionStorage.getItem(`vendor-${docID}`)
          ? JSON.parse(sessionStorage.getItem(`vendor-${docID}`)).distance *
            1000
          : 0; //gets the length field

        let newCard = Template.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.

        //update title and text and image
        // newCard.id = `vendor-${docID}`;
        newCard.querySelector('.card').id = `vendor-${docID}`;
        newCard.querySelector('.card').dataset.distance = (
          vendorDistance.toFixed(2) * 100
        ).toFixed(0);
        newCard.querySelector(
          `#vendor-${docID}`
        ).href = `./vendor.html?id=${docID}`;
        newCard.querySelector('.card-title').innerHTML = vendorName;
        newCard.querySelector(
          '.card-image'
        ).src = `./images/vendors/${vendorCode}.png`; //Example: NV01.jpg
        newCard.querySelector(
          '.card-distance'
        ).innerHTML = `Distance: ${vendorDistance.toFixed(2)} m`;

        //attach to gallery, Example: "hikes-go-here"
        document.getElementById(collection + '-go-here').appendChild(newCard);

        lat = doc.data().lat;
        lng = doc.data().lng;
        coordinates = [lng, lat];

        //i++;   //Optional: iterate variable to serve as unique ID
        if (!sessionStorage.getItem(`vendor-${doc.id}`)) {
          sessionStorage.setItem(
            `vendor-${doc.id}`,
            JSON.stringify({
              ...doc.data(),
              coordinates: coordinates,
              distance: 0,
            })
          );
        }
      });
    })
    .then(() => {
      sortVendorCardByDistance();
    })
    .then(() => {
      // if (sessionStorage.getItem('currentPosition')) {
      //   console.log('coordinates');
      // } else {
      console.log('no coordinates');
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        assignDistancesToVendorsInStorage(userLocation);
        sessionStorage.setItem('currentPosition', userLocation);
        // find keys of all session storage items

        // filter out the keys that has "vendor-" prefix

        // loop through all vendors, and append distance to the corresponding element
        for (let i = 0; i < sessionStorage.length; i++) {
          const itemKey = sessionStorage.key(i);
          if (itemKey.includes('vendor-')) {
            // console.log('LOG THE DISTANCE');
            const itemData = JSON.parse(sessionStorage.getItem(itemKey));
            const vendorDistance = itemData.distance * 1000;
            console.log(vendorDistance);
            document.querySelector(`#${itemKey}`).dataset.distance = (
              vendorDistance.toFixed(2) * 100
            ).toFixed(0);
            document
              .querySelector(`#${itemKey}`)
              .querySelector(
                '.card-distance'
              ).innerHTML = `Distance: ${vendorDistance.toFixed(2)} m`;
          }
        }
        sortVendorCardByDistance();
      });
      // }
    });
}

displayCardsDynamically('vendors'); //input param is the name of the collection
