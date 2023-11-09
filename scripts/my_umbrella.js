// function getUserInformation() {
//   return firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log(user.uid); // Let's know who the logged-in user is by logging their UID
//       currentUser = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
//       currentUser.get().then((userDoc) => {
//         return {
//           fullName: userDoc.data().name,
//           currentReservation: userDoc.data().current_reservation,
//         };
//       });
//     } else {
//       return null;
//     }
//   });
// }

function addPickUpTimeToReservation(reservationID) {
  const reservation = db.collection('reservations').doc(reservationID);
  reservation.update({
    pickup: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return reservation.vendor_id;
}
function decrementVendorUmbrellaCount(vendorID) {
  const vendor = db.collection('vendors').doc(vendorID);
  // let vendorUmbrellaCount;
  vendor
    .get()
    .then((doc) => {
      return doc.available_umbrellas;
    })
    .then((count) => {
      vendor.update({
        available_umbrellas: count - 1,
      });
    });
}
function pickUpBtnHandler(reservationID, vendorID) {
  addPickUpTimeToReservation(reservationID);
  decrementVendorUmbrellaCount(vendorID);
}
function myUmbrellaPageController() {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      currentUser = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
      currentUser.get().then((userDoc) => {
        // Get the user name
        let userName = userDoc.data().name;
        let currentReservationID = userDoc.data().current_reservation || null;
        console.log(userName);
        //$("#name-goes-here").text(userName); // jQuery
        document.getElementById('user_name').innerText = userName;

        // addPickUpTimeToReservation(currentReservationID);
      });
    } else {
      console.log('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

myUmbrellaPageController();
