// Function to store reservation data in Firebase
let params = new URL(window.location.href); //get URL of search bar
let vendorID = params.searchParams.get("id"); //get value for key "id"

/**
 * Creates a reservation information object.
 * @returns {Object} - The reservation information object.
 */
function makeReservationInfo() {
  return {
    userId: firebase.auth().currentUser.uid,
    vendorId: vendorID,
    reservationTime: firebase.firestore.FieldValue.serverTimestamp(),
    isPickedUp: false,
  };
}

/**
 * Creates a reservation document in the "Reservations" collection with the provided reservation information.
 * @returns {Promise<firebase.firestore.DocumentReference>} - A promise that resolves with the reference to the created reservation document.
 */
async function createReservationDoc() {
  const reservationInfo = makeReservationInfo();
  return await db.collection("Reservations").add(reservationInfo);
}

/**
 * Registers the reservation ID to the current user in the Firestore database.
 * @param {string} reservationID - The ID of the reservation to register.
 * @returns {void}
 */
function registerReservationIDToUser(reservationID) {
  // Check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // Let's know who the logged-in user is by logging their UID
      // currentUserUID = db.collection('users').doc(user.uid); // Go to the Firestore document of the user
      db.collection("users").doc(user.uid).update({
        currentReservation: reservationID,
      });
    } else {
      console.log("No user is logged in."); // Log a message when no user is logged in
    }
  });
}

/**
 * Handles the submission of the reservation form.
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
async function handleReservationFormSubmit(event) {
  event.preventDefault();
  try {
    let { id: reservationID } = await createReservationDoc();
    registerReservationIDToUser(reservationID);
    displayLoadingScreen("Confirming your reservation...");
    setTimeout(() => {
      window.location.href = `../confirmation.html?id=${reservationID}`;
    }, 1500);
  } catch (err) {
    console.error("Error adding reservation:", error);
  }
}

// Attach event listener to the form
document
  .getElementById("reservationForm")
  .addEventListener("submit", handleReservationFormSubmit);

// document.onload = removeLoader;
window.addEventListener("load", () => {
  removeLoader();
});
