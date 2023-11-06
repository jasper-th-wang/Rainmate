// Function to store reservation data in Firebase
let params = new URL(window.location.href); //get URL of search bar
let vendorID = params.searchParams.get('id'); //get value for key "id"
console.log(vendorID);

function handleFormSubmit(event) {
  event.preventDefault();

  // const vendorName = document.getElementById('vendorName').value;

  // Store the reservation data in Firebase
  db.collection('Reservations')
    .add({
      user_id: firebase.auth().currentUser.uid,
      vendor_id: vendorID,
      reservationTime: firebase.firestore.FieldValue.serverTimestamp(),
      pickup: false,
    })
    .then((reservation) => {
      // console.log(test.id);
      console.log('Reservation added to Firebase');
      window.location.href = `../confirmation.html?id=${reservation.id}`;
    })
    .catch((error) => {
      console.error('Error adding reservation:', error);
    });
}

// Attach event listener to the form
document
  .getElementById('reservationForm')
  .addEventListener('submit', handleFormSubmit);
