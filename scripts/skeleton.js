// function loadSkeleton() {
//   $('#navbar').load('./components/nav.html');
//   console.log('loaded');
// }

function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //if the pointer to "user" object is not null, then someone is logged in
      // User is signed in.
      // Do something for the user here.
      console.log($('#navbar').load('./components/nav_after_login.html'));
      // console.log($('#footerPlaceholder').load('./components/footer.html'));
      $('#footerNav')?.load('./components/footerNav.html');
    } else {
      // No user is signed in.
      console.log($('#navbar').load('./components/nav_before_login.html'));
      // console.log($('#footerPlaceholder').load('./components/footer.html'));
    }
  });
}

loadSkeleton();
