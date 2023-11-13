const pickUpBtn = document.getElementById('pickUpTestBtn');
const returnBtn = document.getElementById('returnTestBtn');

async function handleReturn(currentUser, currentReservation) {
  console.log(currentReservationId);

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
async function handlePickUp(currentReservation) {
  console.log(currentReservationId);

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

      if (currentReservationId) {
        // get current reservation info (for 1. calculate remaining time and 2. pickup / return)
        const currentReservation = db
          .collection('Reservations')
          .doc(currentReservationId);

        const currentReservationDoc = await currentReservation.get();
        const { isPickedUp } = currentReservationDoc.data();
        // Display pickup and reserve button
        if (!isPickedUp) {
          pickUpBtn.style.display = 'block';
          pickUpBtn.addEventListener('click', (e) => {
            handlePickUp(currentReservation);
          });
        }

        if (isPickedUp) {
          returnBtn.style.display = 'block';
          returnBtn.addEventListener('click', (e) => {
            handleReturn(currentUser, currentReservation);
          });
        }
      }
    } else {
      throw new Error('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

myUmbrellaMain();
