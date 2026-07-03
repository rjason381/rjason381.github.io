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

(function () {
  var galleries = Array.prototype.slice.call(document.querySelectorAll("[data-gallery]"));

  if (!galleries.length) {
    return;
  }

  function createSlideFromThumb(thumb) {
    return {
      src: thumb.getAttribute("data-src"),
      alt: thumb.getAttribute("data-alt") || ""
    };
  }

  galleries.forEach(function (gallery) {
    var image = gallery.querySelector("[data-gallery-image]");
    var counter = gallery.querySelector("[data-gallery-counter]");
    var previousButton = gallery.querySelector("[data-gallery-prev]");
    var nextButton = gallery.querySelector("[data-gallery-next]");
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-thumb]"));
    var slides = thumbs.map(createSlideFromThumb).filter(function (slide) {
      return Boolean(slide.src);
    });
    var activeIndex = 0;

    if (!image || slides.length < 2) {
      return;
    }

    function updateGallery(nextIndex) {
      activeIndex = (nextIndex + slides.length) % slides.length;
      image.src = slides[activeIndex].src;
      image.alt = slides[activeIndex].alt;

      if (counter) {
        counter.textContent = activeIndex + 1 + " / " + slides.length;
      }

      thumbs.forEach(function (thumb, index) {
        var isActive = index === activeIndex;
        thumb.classList.toggle("is-active", isActive);

        if (isActive) {
          thumb.setAttribute("aria-current", "true");
          return;
        }

        thumb.removeAttribute("aria-current");
      });
    }

    if (previousButton) {
      previousButton.addEventListener("click", function () {
        updateGallery(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        updateGallery(activeIndex + 1);
      });
    }

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        updateGallery(index);
      });
    });

    updateGallery(0);
  });
})();
