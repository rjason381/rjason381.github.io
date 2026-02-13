(function () {
  var menuButton = document.querySelector('.menu-toggle');
  var navLinks = document.getElementById('topNav');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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

        var innerPanel = event.target.closest('.page-panel');
        if (innerPanel) {
          var canScrollDown = innerPanel.scrollTop + innerPanel.clientHeight < innerPanel.scrollHeight - 1;
          var canScrollUp = innerPanel.scrollTop > 0;

          if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) {
            return;
          }
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

  var panelTrack = document.getElementById('panelTrack');
  var prevPage = document.getElementById('prevPage');
  var nextPage = document.getElementById('nextPage');
  var panelLinks = Array.prototype.slice.call(document.querySelectorAll('[data-panel-link]'));

  if (panelTrack && prevPage && nextPage) {
    var panels = Array.prototype.slice.call(panelTrack.querySelectorAll('.page-panel'));
    var currentIndex = 0;

    function panelWidth() {
      return panelTrack.clientWidth || 1;
    }

    function clampIndex(index) {
      return Math.max(0, Math.min(index, panels.length - 1));
    }

    function nearestPanelIndex() {
      return clampIndex(Math.round(panelTrack.scrollLeft / panelWidth()));
    }

    function goToPanel(index, smooth) {
      currentIndex = clampIndex(index);

      panelTrack.scrollTo({
        left: panelWidth() * currentIndex,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    function updateNavState() {
      var activePanel = panels[currentIndex] && panels[currentIndex].getAttribute('data-panel');

      panelLinks.forEach(function (link) {
        var linkTarget = link.getAttribute('data-panel-link');

        if (linkTarget && activePanel && linkTarget === activePanel) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    function updateControls() {
      currentIndex = nearestPanelIndex();
      prevPage.disabled = currentIndex <= 0;
      nextPage.disabled = currentIndex >= panels.length - 1;
      updateNavState();
    }

    panelLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var target = link.getAttribute('data-panel-link');

        if (!target) {
          return;
        }

        var targetIndex = panels.findIndex(function (panel) {
          return panel.getAttribute('data-panel') === target;
        });

        if (targetIndex < 0) {
          return;
        }

        event.preventDefault();
        goToPanel(targetIndex, true);

        if (navLinks && menuButton) {
          navLinks.classList.remove('open');
          menuButton.setAttribute('aria-expanded', 'false');
        }
      });
    });

    prevPage.addEventListener('click', function () {
      goToPanel(currentIndex - 1, true);
    });

    nextPage.addEventListener('click', function () {
      goToPanel(currentIndex + 1, true);
    });

    panelTrack.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateControls);
    });

    window.addEventListener('resize', function () {
      goToPanel(currentIndex, false);
      updateControls();
    });

    document.addEventListener('keydown', function (event) {
      var tagName = document.activeElement && document.activeElement.tagName
        ? document.activeElement.tagName.toLowerCase()
        : '';

      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToPanel(currentIndex + 1, true);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPanel(currentIndex - 1, true);
      }
    });

    updateControls();
  }
})();
