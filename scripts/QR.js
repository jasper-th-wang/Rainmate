function renderReservationQRCode() {
  const reservationData = JSON.parse(
    sessionStorage.getItem("currentReservation"),
  );
  const reservationID = reservationData.id;
  if (reservationID) {
    // Call your function to generate the QR code here, passing the reservation vendorID
    generateQRCode(reservationID);
  } else {
    // Handle the case where there is no vendorID in the URL
    console.log("No reservation vendorID found.");
  }
  console.log(reservationID);
}

function generateQRCode(reservationId) {
  // Your code to generate the QR code using qrcode.js
  let qrcode = new QRCode(document.getElementById("qrcode"), {
    text: reservationId,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
