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
      vendorName = doc.data().name;
      vendorHours = doc.data().hours_of_operation;

      // only populate title, and image
      document.getElementById('vendorName').innerHTML = vendorName;
      let imgEvent = document.querySelector('.vendor-img');
      imgEvent.src = '../images/vendors/' + vendorCode + '.png';
    });
}
displayHikeInfo();
