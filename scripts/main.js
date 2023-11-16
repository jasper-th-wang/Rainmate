document.addEventListener('DOMContentLoaded', function () {
  var mapButton = document.getElementById('mapButton');
  var listButton = document.getElementById('listButton');

  // Set initial active button based on current page
  if (window.location.href.indexOf('List.html') > -1) {
    listButton.classList.add('active');
  } else {
    mapButton.classList.add('active');
  }

  mapButton.addEventListener('click', function () {
    window.location.href = 'Main.html';
  });

  listButton.addEventListener('click', function () {
    window.location.href = 'List.html';
  });
});
