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
const pickupBtn = document.getElementById('pickupTestBtn');

function addPickUpTimeToReservation(reservation) {
  console.log(reservation);
  reservation.update({
    pickup: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function decrementVendorUmbrellaCount(vendor) {
  return vendor
    .get()
    .then((doc) => {
      console.log('vendor ID is ' + doc.id);
      return doc.available_umbrellas;
    })
    .then((count) => {
      vendor.update({
        available_umbrellas: count - 1,
      });
    });
}
function pickUpBtnHandler(reservationDoc) {
  // addPickUpTimeToReservation(reservationDoc);

  reservationDoc.update({
    pickup: firebase.firestore.FieldValue.serverTimestamp(),
  });

  reservationDoc
    .get()
    .then((item) => {
      console.log(item.vendor_id);
      let reservedFromVendor = db.collection('vendors').doc(item.vendor_id);
      return reservedFromVendor.get();
    })
    .then((vendor) => {
      console.log(vendor.name);
    });
  console.log('successfully picked up umbrella??');
}
function myUmbrellaPageController() {
  let currentReservationID;
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      currentUser = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
      currentUser.get().then((userDoc) => {
        // Get the user name
        let userName = userDoc.data().name;
        currentReservationID = userDoc.data().current_reservation || null;
        console.log(currentReservationID, ' is the current reservation ID');
        const reservation = db
          .collection('Reservations')
          .doc(currentReservationID);
        // console.log(reservation);
        pickupBtn.addEventListener('click', () => {
          console.log(currentReservationID);
          pickUpBtnHandler(reservation);
        });
        console.log(userName);
        //$("#name-goes-here").text(userName); // jQuery
        document.getElementById('user_name').innerText = userName;
      });
    } else {
      console.log('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

myUmbrellaPageController();
