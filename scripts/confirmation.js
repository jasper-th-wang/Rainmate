/**
 * @fileoverview
 * - Handle rendering QR code to user on confirmation.html
 */

/**
 * Renders QR code based on search parameters
 */
function renderQRCodeFromParams() {
  document.addEventListener("DOMContentLoaded", (event) => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id"); // "id" is the query string parameter
    if (id) {
      // Call your function to generate the QR code here, passing the reservation ID
      generateQRCode(id);
    } else {
      // Handle the case where there is no ID in the URL
      console.log("No reservation ID found.");
    }
    removeLoader();
  });
}

renderQRCodeFromParams();
