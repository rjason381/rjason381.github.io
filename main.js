(function () {
  var fadeElements = Array.prototype.slice.call(document.querySelectorAll(".fade-in"));

  if (!fadeElements.length) {
    return;
  }

  function revealElement(element) {
    element.classList.add("visible");
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    fadeElements.forEach(function (element) {
      observer.observe(element);
    });

    return;
  }

  function checkVisibility() {
    var triggerBottom = window.innerHeight * 0.9;

    fadeElements.forEach(function (element) {
      if (element.getBoundingClientRect().top < triggerBottom) {
        revealElement(element);
      }
    });
  }

  window.addEventListener("scroll", checkVisibility, { passive: true });
  checkVisibility();
})();
