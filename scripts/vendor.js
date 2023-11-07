function displayVendorInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('id'); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection('vendors')
    .doc(ID)
    .get()
    .then((doc) => {
      thisVendor = doc.data();
      vendorCode = thisVendor.code;
      vendorRating = thisVendor.rating;
      vendorName = thisVendor.name;
      // vendorHours = thisVendor.hours_of_operation;
      hours = thisVendor.hours_of_operation;
      hoursSorted = [
        `Monday: ${hours.monday}`,
        `Tuesday: ${hours.tuesday}`,
        `Wednesday: ${hours.wednesday}`,
        `Thursday: ${hours.thursday}`,
        `Friday: ${hours.friday}`,
        `Saturday: ${hours.saturday}`,
        `Sunday: ${hours.sunday}`,
      ];
      vendorHoursHTML = '';
      for (const dayHours of hoursSorted) {
        dayOfWeek = `<p>${dayHours}</p>`;
        vendorHoursHTML += dayOfWeek;
      }

      // only populate title, and image
      document
        .getElementById('vendorRating')
        .insertAdjacentHTML('beforeend', vendorRating);
      document.getElementById('vendorName').innerHTML = vendorName;
      document
        .getElementById('vendorHours')
        .insertAdjacentHTML('beforeend', vendorHoursHTML);
      document.getElementById(
        'reserveBtn'
      ).href = `/reservation.html?id=${doc.id}`;
      let imgEvent = document.querySelector('.vendor-img');
      imgEvent.src = './images/vendors/' + vendorCode + '.png';
    });
}

displayVendorInfo();
