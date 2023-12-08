/**
 * @fileoverview
 * - Handle rendering QR code to user on confirmation.html
 */

/**
 * Renders the QR code based on the query string parameter "id" in the URL.
 * @returns {void}
 */
function renderQRCodeFromParams() {
  document.addEventListener("DOMContentLoaded", (event) => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id"); // "id" is the query string parameter
    if (id) {
      // Call your function to generate the QR code here, passing the reservation vendorID
      generateQRCode(id);
    } else {
      // Handle the case where there is no vendorID in the URL
      console.log("No reservation vendorID found.");
    }
    removeLoader();
  });
}

renderQRCodeFromParams();
