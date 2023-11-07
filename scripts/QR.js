let params = new URL(window.location.href); //get URL of search bar
let ID = params.searchParams.get('id'); //get value for key "id"
console.log(ID);



var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: ID,
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

