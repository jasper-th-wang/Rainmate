function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('logging out user');
    })
    .catch((error) => {
      // An error happened.
    });
}

function displayLoadingScreen() {
  moviesContainer.style.opacity = 0;
  loaderContainer.style.display = 'grid';
}

function removeLoaderDisplayContent() {
  console.log('works???');
  document.querySelector('.loader-container').remove();
  // document.querySelector('body').style.visibility = 'visible';
}
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
function calculateDistance(userCoordinates, vendorCoordinates) {
  var [lng1, lat1] = userCoordinates;
  var [lng2, lat2] = vendorCoordinates;

  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lng2 - lng1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function assignDistancesToVendorsInStorage(userCoordinates) {
  // calculateDistance
  for (let i = 0; i < sessionStorage.length; i++) {
    const itemKey = sessionStorage.key(i);
    if (itemKey.includes('vendor-')) {
      console.log(itemKey);
      const itemData = JSON.parse(sessionStorage.getItem(itemKey));
      console.log(itemData);
      console.log(itemData.coordinates);
      console.log(calculateDistance(userCoordinates, itemData.coordinates));
      itemData.distance = calculateDistance(
        userCoordinates,
        itemData.coordinates
      );
      sessionStorage.setItem(itemKey, JSON.stringify(itemData));
    }
  }
}

// document.onload = () => {
//   document.querySelector('body').style.visibility = 'hidden';
//   // document.querySelector('.loader').style.display = 'block';
// };
// document.onreadystatechange = function () {
//   if (document.readyState !== 'complete') {
//     document.querySelector('body').style.visibility = 'hidden';
//     document.querySelector('.loader').style.display = 'block';
//   } else {
//     document.querySelector('.loader').style.display = 'none';
//     document.querySelector('body').style.visibility = 'visible';
//   }
// };
// Comment out unused, archived code
/**
function writeVendors() {
  //define a variable for the collection you want to create in Firestore to populate data
  var VendorsRef = db.collection('vendors');

  VendorsRef.add({
    code: 'kokoro',
    name: 'Kokoro Tokyo mazesoba',
    address: '551 Seymour St, Vancouver, BC V6B3H6',
    hours_of_operation: '11:30am - 9:30pm',
    contact: '(604) 559-8872',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  VendorsRef.add({
    code: 'a&w',
    name: 'A&W',
    address: '603 Dunsmuir St, Vancouver, BC V6B 1Y7',
    hours_of_operation: 'Open 24/7',
    contact: '(604) 648-0333',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  VendorsRef.add({
    code: 'shoppers',
    name: 'Shoppers Drug Mart',
    address: '586 Granville St, Vancouver, BC V6C 1X5',
    hours_of_operation: 'Differs by days - Need to fix',
    contact: '(604) 683-4063',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  VendorsRef.add({
    code: 'timhortons',
    name: 'Tim Hortons',
    address: '607 Dunsmuir St, Vancouver, BC V6B 1Y7',
    hours_of_operation: 'Differs by days - Need to fix',
    contact: '(604) 559-8872',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
}

function writeReservations() {
  //define a variable for the collection you want to create in Firestore to populate data
  var ReservationsRef = db.collection('Reservations');

  ReservationsRef.add({
    Reserved_time: '2023-11-05 12:25:40',
    user_id: '164wVPeepnP71Ov3N65zFRJ35PD3',
    vendor_id: '6DBRmLCnSSBggluZ5H5u',
    umbrella_id: '0dtH9y3v4yN3zlkBmuDt',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  ReservationsRef.add({
    Reserved_time: '2023-11-05 10:27:22',
    user_id: '1YYjt6KTVgce3iu1o4PUso0vjza53',
    vendor_id: 'Vfllt9nP7BWmc6RYdJhf',
    umbrella_id: 'dSd1CeJZ9e6EOF2ciCNz',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  ReservationsRef.add({
    Reserved_time: '2023-11-05 09:45:49',
    user_id: 'MrrhKUGVlLVPbroT7r13Sy3njuX2',
    vendor_id: 'ybruxGV5yQ4zrLuaWfOJ',
    umbrella_id: '0dtH9y3v4yN3zlkBmuDt',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  ReservationsRef.add({
    Reserved_time: '2023-11-06 07:25:20',
    user_id: '6z0GuPuB4DMxQF734GdWYCVqD0g2',
    vendor_id: '6DBRmLCnSSBggluZ5H5u',
    umbrella_id: 'iPe5SXxpapsAc9pkuw2h',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  ReservationsRef.add({
    Reserved_time: '2023-11-03 17:55:35',
    user_id: 'MrrhKUGVlLVPbroT7r13Sy3njuX2',
    vendor_id: 'nbj8MBuPq4gAVRzkDycD',
    umbrella_id: 'lo4s4P9tqE0hReNTYRpG',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
}

function writeBorrowings() {
  var BorrowingsRef = db.collection('Borrowings');

  BorrowingsRef.add({
    reservation_id: 'RsdGckt2XI7rlAx36Qac',
    pickup_time: 0,
    return_vendor_id: '',
    return_time: 0,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  BorrowingsRef.add({
    reservation_id: 'TSyETWJH9Clp5X8DZnPN',
    pickup_time: '2023-11-06 07:27:57',
    return_vendor_id: '',
    return_time: 0,
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  BorrowingsRef.add({
    reservation_id: 'WeM7rwfMXHAlmYRjJ3Li',
    pickup_time: '2023-11-05 12:35:21',
    return_vendor_id: 'ybruxGV5yQ4zrLuaWfOJ',
    return_time: '2023-11-06 07:15:21',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  BorrowingsRef.add({
    reservation_id: 'pxWzNiZL6aq6YLN86ZfV',
    pickup_time: '2023-11-05 10:00:22',
    return_vendor_id: 'nbj8MBuPq4gAVRzkDycD',
    return_time: '2023-11-05 17:00:47',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });

  BorrowingsRef.add({
    reservation_id: 'vTdfQPmQPEBJAdWcCw8o',
    pickup_time: '2023-11-06 10:45:25',
    return_vendor_id: 'Vfllt9nP7BWmc6RYdJhf',
    return_time: '2023-11-07 17:45:25',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
  });
}

function addVendorHours() {
  var VendorsRef = db.collection('vendors');
  VendorsRef.doc('ybruxGV5yQ4zrLuaWfOJ').set(
    {
      hours_of_operation: {
        monday: '5:00 AM - 10:00 PM',
        tuesday: '5:00 AM - 10:00 PM',
        wednesday: '5:00 AM - 10:00 PM',
        thursday: '5:00 AM - 10:00 PM',
        friday: '5:00 AM - 10:00 PM',
        saturday: '6:00 AM - 10:00 PM',
        sunday: '6:00 AM - 10:00 PM',
      },
    },
    { merge: true }
  );
}
*/
