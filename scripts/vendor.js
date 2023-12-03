/**
 * @fileoverview
 * Renders vendor information on vendor.html
 */
function displayVendorInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("id"); //get value for key "id"
  console.log(ID);

  db.collection("vendors")
    .doc(ID)
    .get()
    .then((doc) => {
      let thisVendor = doc.data();
      let available_umbrellas = thisVendor.umbrellaCount;
      let vendorThumbnail = thisVendor.thumbnail;
      let vendorCode = thisVendor.code;
      let vendorName = thisVendor.name;
      let vendorAddress = thisVendor.address;
      let vendorHours = thisVendor.hours_of_operation;
      let hoursSorted = [
        `Monday: ${vendorHours.monday}`,
        `Tuesday: ${vendorHours.tuesday}`,
        `Wednesday: ${vendorHours.wednesday}`,
        `Thursday: ${vendorHours.thursday}`,
        `Friday: ${vendorHours.friday}`,
        `Saturday: ${vendorHours.saturday}`,
        `Sunday: ${vendorHours.sunday}`,
      ];
      let vendorHoursHTML = "";
      for (const dayHours of hoursSorted) {
        dayOfWeek = `<p>${dayHours}</p>`;
        vendorHoursHTML += dayOfWeek;
      }

      // only populate title, and image
      document.getElementById("vendor-available-umbrellas").innerHTML =
        `Available Umbrellas: ${available_umbrellas}`;
      document.getElementById("vendor-name").innerHTML = vendorName;
      document.getElementById("vendor-address").innerHTML = vendorAddress;
      document
        .getElementById("vendor-hours")
        .insertAdjacentHTML("beforeend", vendorHoursHTML);

      // disable button if there is no current reservation
      let { currentReservation } = JSON.parse(
        sessionStorage.getItem("currentUser"),
      );
      if (!currentReservation) {
        document.getElementById("reserveBtn").style.display = "block";
        document.getElementById("reserveBtn").href =
          `./reservation.html?id=${doc.id}`;
      } else {
        // document.getElementById("noReserveBtn").style.display = "block";
        renderReturnUI(currentReservation);
      }
      // if there is current reservation
      // check if it is picked up, if yes -> render Return button (with modal) / else -> render noReserveBtn

      let imgEvent = document.querySelector("#vendor-img");
      imgEvent.src =
        vendorThumbnail || "./images/vendors/" + vendorCode + ".png";
    })
    .then(() => {
      removeLoader();
    });
}

function renderReturnUI(currentReservationId) {
  const currentReservation = db
    .collection("Reservations")
    .doc(currentReservationId);

  currentReservation.onSnapshot((doc) => {
    const { isPickedUp } = doc.data();

    if (!isPickedUp) {
      document.getElementById("noReserveBtn").style.display = "block";
    } else {
      const returnBtn = document.getElementById("returnBtn");
      returnBtn.style.display = "block";
      returnBtn.href = `my_umbrella.html?return=true`;
    }
  });
}

displayVendorInfo();
