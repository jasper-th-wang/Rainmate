// Function to store reservation data in Firebase
let params = new URL(window.location.href); //get URL of search bar
let vendorID = params.searchParams.get('id'); //get value for key "id"
console.log(vendorID);

function registerReservationIDToUser(reservationID) {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      // currentUserUID = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
      return db.collection('users').doc(user.uid).update({
        current_reservation: reservationID,
      });
    } else {
      console.log('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  let reservationID;

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
      reservationID = reservation.id;
      console.log('Reservation added to Firebase');
      return registerReservationIDToUser(reservationID);
    })
    .then((user) => {
      console.log(user);
      window.location.href = `../confirmation.html?id=${reservationID}`;
    })
    .catch((error) => {
      console.error('Error adding reservation:', error);
    });
}

// Attach event listener to the form
document
  .getElementById('reservationForm')
  .addEventListener('submit', handleFormSubmit);
