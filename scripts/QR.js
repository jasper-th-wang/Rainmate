// let params = new URL(window.location.href); //get URL of search bar
// let ID = params.searchParams.get('id'); //get value for key "id"
// console.log(ID);

// var qrcode = new QRCode(document.getElementById("qrcode"), {
//     text: ID,
//     width: 128,
//     height: 128,
//     colorDark : "#000000",
//     colorLight : "#ffffff",
//     correctLevel : QRCode.CorrectLevel.H
// });

document.addEventListener('DOMContentLoaded', (event) => {
  let params = new URLSearchParams(document.location.search);
  let id = params.get('id'); // "id" is the query string parameter
  if (id) {
    // Call your function to generate the QR code here, passing the reservation ID
    generateQRCode(id);
  } else {
    // Handle the case where there is no ID in the URL
    console.log('No reservation ID found.');
  }
});

function renderReservationQRCode() {
  const reservationData = JSON.parse(
    sessionStorage.getItem('currentReservation')
  );
  const reservationID = reservationData.id;
  if (reservationID) {
    // Call your function to generate the QR code here, passing the reservation ID
    generateQRCode(reservationID);
  } else {
    // Handle the case where there is no ID in the URL
    console.log('No reservation ID found.');
  }
  console.log(reservationID);
}

renderReservationQRCode();

function generateQRCode(reservationId) {
  // Your code to generate the QR code using qrcode.js
  let qrcode = new QRCode(document.getElementById('qrcode'), {
    text: reservationId,
    width: 128,
    height: 128,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}
