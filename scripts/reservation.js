// Function to store reservation data in Firebase
let params = new URL(window.location.href); //get URL of search bar
let vendorID = params.searchParams.get('id'); //get value for key "id"

function makeReservationInfo() {
  return {
    userId: firebase.auth().currentUser.uid,
    vendorId: vendorID,
    reservationTime: firebase.firestore.FieldValue.serverTimestamp(),
    isPickedUp: false,
  };
}

async function createReservationDoc() {
  const reservationInfo = makeReservationInfo();
  const reservationDoc = await db
    .collection('Reservations')
    .add(reservationInfo);
  return reservationDoc;
}

function registerReservationIDToUser(reservationID) {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      // currentUserUID = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
      db.collection('users').doc(user.uid).update({
        currentReservation: reservationID,
      });
    } else {
      console.log('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

async function handleReservationFormSubmit(event) {
  event.preventDefault();
  try {
    let { id: reservationID } = await createReservationDoc();
    registerReservationIDToUser(reservationID);
    console.log('Reservation added to Firebase');
    window.location.href = `../confirmation.html?id=${reservationID}`;
  } catch (err) {
    console.error('Error adding reservation:', error);
  }
}

// Attach event listener to the form
document
  .getElementById('reservationForm')
  .addEventListener('submit', handleReservationFormSubmit);
