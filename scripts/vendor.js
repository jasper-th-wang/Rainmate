function displayVendorInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('id'); //get value for key "id"
  console.log(ID);

  db.collection('vendors')
    .doc(ID)
    .get()
    .then((doc) => {
      thisVendor = doc.data();
      vendorCode = thisVendor.code;
      vendorName = thisVendor.name;
      // vendorCode = thisVendor.code;
      vendorAddress = thisVendor.address;
      vendorContact = thisVendor.contact;
      // vendorHours = thisVendor.hours_of_operation;
      vendorHours = thisVendor.hours_of_operation;
      hoursSorted = [
        `Monday: ${vendorHours.monday}`,
        `Tuesday: ${vendorHours.tuesday}`,
        `Wednesday: ${vendorHours.wednesday}`,
        `Thursday: ${vendorHours.thursday}`,
        `Friday: ${vendorHours.friday}`,
        `Saturday: ${vendorHours.saturday}`,
        `Sunday: ${vendorHours.sunday}`,
      ];
      vendorHoursHTML = '';
      for (const dayHours of hoursSorted) {
        dayOfWeek = `<p>${dayHours}</p>`;
        vendorHoursHTML += dayOfWeek;
      }

      // only populate title, and image
      document.getElementById('vendor-name').innerHTML = vendorName;
      document
        .getElementById('vendor-hours')
        .insertAdjacentHTML('beforeend', vendorHoursHTML);

      if (
        !JSON.parse(sessionStorage.getItem('currentUser')).currentReservation
      ) {
        document.getElementById('reserveBtn').style.display = 'block';
        document.getElementById(
          'reserveBtn'
        ).href = `./reservation.html?id=${doc.id}`;
      } else {
        document.getElementById('noReserveBtn').style.display = 'block';
      }

      let imgEvent = document.querySelector('#vendor-img');
      imgEvent.src = './images/vendors/' + vendorCode + '.png';
    });
}

displayVendorInfo();
