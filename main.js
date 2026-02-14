(function () {
  var totalPhotos = 15;
  var targetScore = 8;
  var score = 0;
  var unlocked = false;
  var tiltValues = [-2, 1.8, -1.4, 2.2, -2.6, 1.1, -1.9, 2.4];
  var collage = document.getElementById("photoCollage");
  var enterButton = document.getElementById("enterButton");
  var scoreValue = document.getElementById("scoreValue");
  var gameArea = document.getElementById("gameArea");
  var heartButton = document.getElementById("heartButton");
  var unlockMessage = document.getElementById("unlockMessage");
  var welcome = document.getElementById("welcome");
  var gallery = document.getElementById("gallery");

  if (
    !collage ||
    !enterButton ||
    !scoreValue ||
    !gameArea ||
    !heartButton ||
    !unlockMessage ||
    !welcome ||
    !gallery
  ) {
    return;
  }

  function moveHeart() {
    var maxX = Math.max(0, gameArea.clientWidth - heartButton.offsetWidth);
    var maxY = Math.max(0, gameArea.clientHeight - heartButton.offsetHeight);
    var x = Math.random() * maxX;
    var y = Math.random() * maxY;

    heartButton.style.left = x.toFixed(0) + "px";
    heartButton.style.top = y.toFixed(0) + "px";
  }

  function unlockAccept() {
    if (unlocked) {
      return;
    }

    unlocked = true;
    enterButton.disabled = false;
    unlockMessage.hidden = false;
    unlockMessage.textContent = "Desbloqueado. Presiona Aceptar.";
    heartButton.disabled = true;
  }

  heartButton.addEventListener("click", function () {
    if (unlocked) {
      return;
    }

    score += 1;
    scoreValue.textContent = String(Math.min(score, targetScore));
    heartButton.classList.remove("bump");
    void heartButton.offsetWidth;
    heartButton.classList.add("bump");

    if (score >= targetScore) {
      unlockAccept();
      return;
    }

    moveHeart();
  });

  window.addEventListener("resize", moveHeart);
  moveHeart();

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
    if (enterButton.disabled) {
      return;
    }

    document.body.classList.add("show-gallery");
    welcome.setAttribute("aria-hidden", "true");
    gallery.setAttribute("aria-hidden", "false");
  });
})();
