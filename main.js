(function () {
  var totalPhotos = 15;
  var tiltValues = [-2, 1.8, -1.4, 2.2, -2.6, 1.1, -1.9, 2.4];
  var collage = document.getElementById("photoCollage");
  var enterButton = document.getElementById("enterButton");
  var welcome = document.getElementById("welcome");
  var gallery = document.getElementById("gallery");

  if (!collage || !enterButton || !welcome || !gallery) {
    return;
  }

  for (var i = 1; i <= totalPhotos; i += 1) {
    var card = document.createElement("figure");
    var img = document.createElement("img");
    var index = String(i).padStart(2, "0");

    card.className = "photo-card";
    card.style.setProperty("--tilt", tiltValues[(i - 1) % tiltValues.length] + "deg");
    card.style.animationDelay = ((i - 1) * 0.08).toFixed(2) + "s";

    img.src = "photos/photo-" + index + ".jpeg";
    img.alt = "Foto especial " + i;
    img.loading = "lazy";

    card.appendChild(img);
    collage.appendChild(card);
  }

  enterButton.addEventListener("click", function () {
    document.body.classList.add("show-gallery");
    welcome.setAttribute("aria-hidden", "true");
    gallery.setAttribute("aria-hidden", "false");
  });
})();
