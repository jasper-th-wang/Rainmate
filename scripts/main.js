document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById('pageToggle');

    // Check if on List.html and set toggle state
    if (window.location.href.indexOf('List.html') > -1) {
      toggle.checked = true;
    } else {
      toggle.checked = false;
    }

    toggle.addEventListener('change', function() {
      if(this.checked) {
        // Only redirect if not already on List.html
        if (window.location.href.indexOf('List.html') === -1) {
          window.location.href = 'List.html';
        }
      } else {
        // Only redirect if not already on Main.html
        if (window.location.href.indexOf('Main.html') === -1) {
          window.location.href = 'Main.html';
        }
      }
    });
});
