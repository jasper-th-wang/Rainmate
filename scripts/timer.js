//Set the date we're counting down to
function initTimer(firestoreTimeStamp, isPickedUp) {
  let startDate = firestoreTimeStamp.toDate();
  let dueDate = isPickedUp
    ? startDate.setDate(startDate.getDate() + 2)
    : startDate.setMinutes(startDate.getMinutes() + 20);
  console.log(dueDate);
  // var countDownDate = new Date('Nov 7, 2023 06:37:25').getTime();

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = dueDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById('timer').innerHTML =
      days + ': ' + hours + ': ' + minutes + ': ' + seconds + '';

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('timer').innerHTML = 'EXPIRED';
      // TODO
      // if !pickedUp -> deregister
      // if pickedUp && !returned ->
    }
  }, 1000);
}
// document.addEventListener('DOMContentLoaded', () => {
//   let countdown;
//   const timerDisplay = document.getElementById('timer');
//   const pickUpBtn = document.getElementById('pickUpTestBtn');
//   const returnTestBtn = document.getElementById('returnTestBtn');

//   function updateTimerDisplay(timeLeft) {
//       const minutes = Math.floor(timeLeft / 60);
//       const seconds = timeLeft % 60;
//       timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   }

//   function startCountdown(duration, onComplete) {
//       const endTime = new Date().getTime() + duration * 1000;
//       localStorage.setItem('countdownEndTime', endTime);
//       runCountdown(onComplete);
//   }

//   function runCountdown(onComplete) {
//       clearInterval(countdown);
//       countdown = setInterval(() => {
//           const now = new Date().getTime();
//           const endTime = parseInt(localStorage.getItem('countdownEndTime'), 10);
//           const timeLeft = Math.round((endTime - now) / 1000);

//           if (timeLeft >= 0) {
//               updateTimerDisplay(timeLeft);
//               alert('Pick up on time! Thank you, now you have 24 hrs for return.');
//           } else {
//               clearInterval(countdown);
//               onComplete();
//               localStorage.removeItem('countdownEndTime'); // Clear the end time
//           }
//       }, 1000);
//   }

//   function onCountdownComplete() {
//       alert('Time is up!');
//       // Additional actions on countdown complete
//   }

//   // Start or resume the countdown
//   const savedEndTime = localStorage.getItem('countdownEndTime');
//   if (savedEndTime) {
//       runCountdown(onCountdownComplete);
//   } else {
//       startCountdown(20 * 60, onCountdownComplete); // Start a new 20-minute countdown
//   }

//   pickUpBtn.addEventListener('click', () => {
//       startCountdown(24 * 60 * 60, onCountdownComplete); // Start a new 24-hour countdown
//   });

//   returnTestBtn.addEventListener('click', () => {
//       clearInterval(countdown);
//       localStorage.removeItem('countdownEndTime'); // Clear the saved end time
//       updateTimerDisplay(0);
//       alert('Countdown stopped and timer cleared.');
//       // Additional actions on stopping the countdown
//   });
// });

// const reservationRef = db.collection('Reservations');
// const currentUserRef = db.collection('users').doc(user.uid);

// const countdownDuration = 20;

// currentUserRef.get().then((doc) =>{
//   if (doc.exists && doc.data().currentReservation == true){
//     const reservedTime = reservationRef.doc()

//     const endTime = reservedTime + countdownDuration * 1000;

//     const countdownElement = document.getElementById('timer');
//     const countdownInterval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endTime - now;

//       let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       let seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       countdownElement.innerHTML = "${minutes}:${seconds}"

//       if (distance < 0) {
//         clearInterval(countdownInterval);
//         countdownElement.innerHTML = 'Expired';
//         // You might want to perform some action here when the countdown is finished
//       }
//     }, 1000);

//   } else {
//       startCountdown(20 * 60, onCountdownComplete); // Start a new 20-minute countdown
//   }

//   pickUpBtn.addEventListener('click', () => {
//       startCountdown(24 * 60 * 60, onCountdownComplete); // Start a new 24-hour countdown
//   });

//   returnTestBtn.addEventListener('click', () => {
//       clearInterval(countdown);
//       localStorage.removeItem('countdownEndTime'); // Clear the saved end time
//       updateTimerDisplay(0);
//       alert('Countdown stopped and timer cleared.');
//       // Additional actions on stopping the countdown
//   });
// });
