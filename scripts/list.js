
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let Template = document.getElementById("vendorCardTemplate"); // Retrieve the HTML element with the ID "vendorCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "vendors"
        .then(allVendors => {
            allVendors.forEach(doc => { //iterate thru each doc
                var vendorName = doc.data().name;       // get value of the "name" key
                var vendorCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var vendorDistance = doc.data().code; //gets the length field
                var docID = doc.id; //gets the unique ID of the document

                let newCard = Template.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.

                //update title and text and image
                newCard.querySelector('.card-title').innerHTML = vendorName;
                newCard.querySelector('.card-image').src = `./images/vendors/${vendorCode}.png`; //Example: NV01.jpg
                newCard.querySelector('.card-distance').innerHTML = vendorDistance + "km";

                document.addEventListener("click", function (event) {
                    target = event.target.closest(".card");

                    if (target) {
                        window.location.href = `./vendor.html?id=${docID}`;
                    }
                })


                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newCard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("vendors");  //input param is the name of the collection
