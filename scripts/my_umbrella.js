
const pickUpBtn = document.getElementById('pickUpTestBtn');
const returnBtn = document.getElementById('returnTestBtn');
const pendingPickUpMessage =
  '<h1 class="header-message">Time Remaining for Pick Up:</h1>';
const pendingReturnMessage =
  '<h1 class="header-message">Time Remaining for Return:</h1>';
const VendorCardTemplate = document.getElementById('my-umbrella-card');

async function renderVendorCard(vendorID, isPickedUp) {
  // Get vendor information
  let vendorDoc = await db.collection('vendors').doc(vendorID).get();
  let vendorData = vendorDoc.data();
  // Render Vendor Card
  const vendorCard = VendorCardTemplate.content.cloneNode(true);
  document
    .querySelector('.hi-user-name')
    .insertAdjacentHTML(
      'afterend',
      isPickedUp ? pendingReturnMessage : pendingPickUpMessage
    );

  vendorCard.querySelector('#card-title').innerHTML = isPickedUp
    ? 'Pending Return'
    : 'Pending Pick Up';
  vendorCard.querySelector('#card-vendor-name').innerHTML = vendorData.name;
  vendorCard.querySelector('#card-vendor-address').innerHTML = vendorData.address;
  vendorCard.querySelector('#card-vendor-link').innerHTML =
    `Find store<div class="material-symbols-outlined">location_on</div>`;
  vendorCard.querySelector(
    '#card-vendor-link'
  ).href = `http://maps.google.com?q=${vendorData.lat}, ${vendorData.lng}`;
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
  const registerReturnToUser = currentReservation.update({
    returnVendorId: vendorId,
    returnTime: firebase.firestore.FieldValue.serverTimestamp(),
    isReturned: true,
  });
  // increment umbrella count to vendor
  const incrementUmbrellaCount = db
    .collection('vendors')
    .doc(vendorId)
    .update({
      umbrellaCount: firebase.firestore.FieldValue.increment(1),
    });

  // De-register current reservation from user
  const deregisterReservationToUser = currentUser.update({
    currentReservation: false,
  });

  // use Promise.allSettled, then do location.reload(); after all promises are resolved
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  await Promise.allSettled([
    registerReturnToUser,
    incrementUmbrellaCount,
    deregisterReservationToUser,
  ]);
  location.reload();
}

async function handlePickUp(currentReservation) {
  console.log(currentReservation);

  // register pickup (isPickedUp) to current reservation
  const registerPickUpToUser = currentReservation.update({
    isPickedUp: true,
    pickedUpTime: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // get vendor id for current reservation
  const currentReservationDoc = await currentReservation.get();
  const { vendorId } = currentReservationDoc.data();
  // decrement umbrella count to vendor
  const decrementUmbrellaCountToVendor = db
    .collection('vendors')
    .doc(vendorId)
    .update({
      umbrellaCount: firebase.firestore.FieldValue.increment(-1),
    });

  // use Promise.allSettled, then do location.reload(); after all promises are resolved
  await Promise.allSettled([
    registerPickUpToUser,
    decrementUmbrellaCountToVendor,
  ]);
  location.reload();
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
        // document.getElementById('no-reservation-message').style.display =
        //   'none';
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

        //   if (!isPickedUp) {
        //     qrButton.textContent = 'Pick Up';
        //     qrButton.addEventListener('click', async () => {
        //         await handlePickUp(currentReservation);
        //         qrButton.textContent = 'Return'; // Change to 'Return' after pickup
        //     });
        // } else {
        //     qrButton.textContent = 'Return';
        //     qrButton.addEventListener('click', () => {
        //         handleReturn(currentUser, currentReservation);
        //     });
        // }

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
            renderVendorCard(vendorId, true);
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
        // document.getElementById('no-reservation-message').style.display =
        // 'block';
        const noReservationCard =
          '<div class="my-umbrella-no-reservation" id="no-reservation-message"><h1>You Have No Reservation!</h1></div>';
        document
          .querySelector('.content-container')
          .insertAdjacentHTML('beforeend', noReservationCard);
      }
    } else {
      throw new Error('No user is logged in.'); // Log a message when no user is logged in
    }
    removeLoaderDisplayContent();
  });
}

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

myUmbrellaMain();
renderReservationQRCode();
