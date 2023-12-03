/**
 * @fileoverview
 * Render timer for my_umbrella.html
 */
//Set the date we're counting down to
function initTimer(firestoreTimeStamp, isPickedUp) {
  let startDate = firestoreTimeStamp.toDate();
  let dueDate = isPickedUp
    ? startDate.setDate(startDate.getDate() + 2)
    : startDate.setMinutes(startDate.getMinutes() + 20);

  if (isPickedUp) {
    let returnTime = new Date(dueDate);
    document.getElementById("timer").innerHTML =
      "Return by: " + returnTime.toLocaleString();
  } else {
    // Handle the non-picked up case as before (if needed)
  }
}
function initTimer(firestoreTimeStamp, isPickedUp) {
  let startDate = firestoreTimeStamp.toDate();
  let dueDate = isPickedUp
    ? startDate.setDate(startDate.getDate() + 2)
    : startDate.setMinutes(startDate.getMinutes() + 20);

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = dueDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML =
      days + ": " + hours + ": " + minutes + ": " + seconds + "";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("card-title").innerHTML =
        "Pickup no longer available";
      document.getElementById("timer").innerHTML = "EXPIRED";
      document.getElementById("myBtn").hidden = true;
      document.getElementsByClassName("btn-secondary").disabled = true;
      document.getElementById("card-container").style.color = "grey";
      document.getElementById("card-vendor-img").style.filter =
        "grayscale(100%)";
    }
  }, 1000);
}
