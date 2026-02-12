(function () {
  var menuButton = document.querySelector('.menu-toggle');
  var navLinks = document.getElementById('topNav');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function bindHorizontalTrack(track) {
    if (!track) {
      return;
    }

    track.addEventListener(
      'wheel',
      function (event) {
        if (window.innerWidth < 920) {
          return;
        }

        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }

        event.preventDefault();
        track.scrollBy({
          left: event.deltaY,
          behavior: 'smooth'
        });
      },
      { passive: false }
    );
  }

  document.querySelectorAll('[data-horizontal]').forEach(function (track) {
    bindHorizontalTrack(track);
  });

  var homeTrack = document.getElementById('homeTrack');
  var prevButton = document.getElementById('prevPanel');
  var nextButton = document.getElementById('nextPanel');

  if (homeTrack && prevButton && nextButton) {
    var gap = 14;

    function panelStep() {
      var firstPanel = homeTrack.querySelector('.home-panel');
      if (!firstPanel) {
        return homeTrack.clientWidth;
      }

      return firstPanel.clientWidth + gap;
    }

    function updateControls() {
      var maxScroll = homeTrack.scrollWidth - homeTrack.clientWidth - 2;
      prevButton.disabled = homeTrack.scrollLeft <= 2;
      nextButton.disabled = homeTrack.scrollLeft >= maxScroll;
    }

    prevButton.addEventListener('click', function () {
      homeTrack.scrollBy({
        left: -panelStep(),
        behavior: 'smooth'
      });
    });

    nextButton.addEventListener('click', function () {
      homeTrack.scrollBy({
        left: panelStep(),
        behavior: 'smooth'
      });
    });

    homeTrack.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateControls);
    });

    window.addEventListener('resize', updateControls);
    updateControls();
  }
})();
