// function updateReservationDoc(reservationDoc, updateType) {
//   if (updateType === 'pickUp') {
//     reservationDoc    return;
//   }
//   if (updateType === 'return') {

//     reservationDoc.update({
//       returnVendorId:
//       returnTime: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//     return;
//   }
// }

async function handleReturn(currentUser, currentReservationId) {
  console.log(currentReservationId);

  // get current reservation info (for 1. calculate remaining time and 2. pickup / return)
  const currentReservation = db
    .collection('Reservations')
    .doc(currentReservationId);

  // get vendor id for current reservation
  const currentReservationDoc = await currentReservation.get();
  const { vendorId } = currentReservationDoc.data();
  // register return to current reservation
  currentReservation.update({
    returnVendorId: vendorId,
    returnTime: firebase.firestore.FieldValue.serverTimestamp(),
    isReturned: true,
  });
  // increment umbrella count to vendor
  db.collection('vendors')
    .doc(vendorId)
    .update({
      umbrellaCount: firebase.firestore.FieldValue.increment(1),
    });

  // De-register current reservation from user
  currentUser.update({
    currentReservation: false,
  });
}
async function handlePickUp(currentReservationId) {
  console.log(currentReservationId);

  // get current reservation info (for 1. calculate remaining time and 2. pickup / return)
  const currentReservation = db
    .collection('Reservations')
    .doc(currentReservationId);
  // register pickup (isPickedUp) to current reservation
  currentReservation.update({
    isPickedUp: true,
    pickedUpTime: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // get vendor id for current reservation
  const currentReservationDoc = await currentReservation.get();
  const { vendorId } = currentReservationDoc.data();
  // decrement umbrella count to vendor
  db.collection('vendors')
    .doc(vendorId)
    .update({
      umbrellaCount: firebase.firestore.FieldValue.increment(-1),
    });
}

async function myUmbrellaMain() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID

      // get user's info and display name
      const currentUser = db.collection('users').doc(user.uid);
      const currentUserDoc = await currentUser.get();
      const { name: userFullName, currentReservation: currentReservationId } =
        currentUserDoc.data();
      document.getElementById('userFullName').innerText = userFullName;
      // Attach event listener to the form
      document
        .getElementById('pickUpTestBtn')
        .addEventListener('click', (e) => {
          handlePickUp(currentReservationId);
        });
      document
        .getElementById('returnTestBtn')
        .addEventListener('click', (e) => {
          handleReturn(currentUser, currentReservationId);
        });
    } else {
      throw new Error('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

myUmbrellaMain();
