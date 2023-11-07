// Function to store reservation data in Firebase
function handleFormSubmit(event) {
    event.preventDefault();

    const vendorName = document.getElementById('vendorName').value;

    // Store the reservation data in Firebase
    db.collection('reservations').add({
        user: firebase.auth().currentUser.uid,
        vendorName: vendorName,
        reservationTime: firebase.firestore.FieldValue.serverTimestamp(),
        

    })
        .then(() => {
            console.log('Reservation added to Firebase');
        })
        .catch(error => {
            console.error('Error adding reservation:', error);
        });
}

// Attach event listener to the form
document.getElementById('reservationForm').addEventListener('submit', handleFormSubmit);
