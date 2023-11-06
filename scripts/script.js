function sayHello() {}
//sayHello();
//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
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

function writeVendors() {
  //define a variable for the collection you want to create in Firestore to populate data
  var VendorsRef = db.collection("vendors");

  VendorsRef.add({
      code: "kokoro",
      name: "Kokoro Tokyo mazesoba", 
      address: "551 Seymour St, Vancouver, BC V6B3H6" ,
      hours_of_operation : "11:30am - 9:30pm",
      contact : "(604) 559-8872",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });

  VendorsRef.add({
    code: "a&w",
    name: "A&W", 
    address: "603 Dunsmuir St, Vancouver, BC V6B 1Y7" ,
    hours_of_operation : "Open 24/7",
    contact : "(604) 648-0333",
    last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});

VendorsRef.add({
  code: "shoppers",
  name: "Shoppers Drug Mart", 
  address: "586 Granville St, Vancouver, BC V6C 1X5" ,
  hours_of_operation : "Differs by days - Need to fix",
  contact : "(604) 683-4063",
  last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});

VendorsRef.add({
  code: "timhortons",
  name: "Tim Hortons", 
  address: "607 Dunsmuir St, Vancouver, BC V6B 1Y7" ,
  hours_of_operation : "Differs by days - Need to fix",
  contact : "(604) 559-8872",
  last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
});

}