const pickUpBtn = document.getElementById('pickUpTestBtn');
const returnBtn = document.getElementById('returnTestBtn');
const VendorCardTemplate = document.getElementById('my-umbrella-card');

async function renderVendorCard(vendorID, isPickedUp) {
  // Get vendor information
  let vendorDoc = await db.collection('vendors').doc(vendorID).get();
  let vendorData = vendorDoc.data();
  // Render Vendor Card
  const vendorCard = VendorCardTemplate.content.cloneNode(true);
  vendorCard.querySelector('#card-title').innerHTML = isPickedUp
    ? 'Pending Return'
    : 'Pending Pick Up';
  vendorCard.querySelector('#card-vendor-name').innerHTML = vendorData.name;
  vendorCard.querySelector('#card-vendor-link').innerHTML =
    'Click Here for More Details';
  vendorCard.querySelector(
    '#card-vendor-img'
  ).src = `./images/vendors/${vendorData.code}.png`;

  document.querySelector('.content-container').appendChild(vendorCard);

  renderModal();
}

async function handleReturn(currentUser, currentReservation) {
  console.log(currentReservation);

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
  console.log(currentReservation);

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
        document.getElementById('no-reservation-message').style.display =
          'none';
        // get current reservation info (for 1. calculate remaining time and 2. pickup / return)
        const currentReservation = db
          .collection('Reservations')
          .doc(currentReservationId);

        currentReservation.onSnapshot((doc) => {
          // console.log(doc.data());
          sessionStorage.setItem(
            'currentReservation',
            JSON.stringify({
              ...doc.data(),
              id: doc.id,
            })
          );
          const {
            isPickedUp,
            isReturned,
            pickedUpTime,
            reservationTime,
            vendorId,
          } = doc.data();
          // Display pickup and reserve button
          if (!isPickedUp) {
            // get reservationTime for timer
            console.log(reservationTime);
            initTimer(reservationTime, false);
            renderVendorCard(vendorId, false);
            pickUpBtn.style.display = 'block';
            pickUpBtn.addEventListener('click', (e) => {
              handlePickUp(currentReservation);
            });
            return;
          } else {
            console.log(pickedUpTime);
            initTimer(pickedUpTime, true);
            pickUpBtn.style.display = 'none';
            returnBtn.style.display = 'block';
            returnBtn.addEventListener('click', (e) => {
              handleReturn(currentUser, currentReservation);
            });
          }

          if (isReturned) {
            pickUpBtn.style.display = 'none';
            returnBtn.style.display = 'none';
          }
        });
      } else {
        // no reservation
        document.getElementById('no-reservation-message').style.display =
          'block';
      }
    } else {
      throw new Error('No user is logged in.'); // Log a message when no user is logged in
    }
  });
}

myUmbrellaMain();
// initTimer();

function renderModal() {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById('myBtn');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
