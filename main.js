(function () {
  var totalPhotos = 15;
  var finalPhotoFile = "photo-16.jpg";
  var memorySourcePhotos = [];
  var memoryPreviewSeconds = 11;
  var winLoveMessage =
    "Te amo mi vida, gracias por todo mi amor, es un pequeno presente, lo que se hacer, espero te guste, nuestro primer 14 con nuestro hijo, ya que el anterior aun estabamos sin Elric jajaja";

  var unlocked = false;
  var pairsFound = 0;
  var movesCount = 0;
  var previewRemaining = 0;
  var gameRunning = false;
  var boardLocked = true;
  var previewActive = false;
  var memoryCards = [];
  var firstPickIndex = -1;
  var secondPickIndex = -1;
  var previewInterval = null;
  var hideMismatchTimer = null;

  var viewedCount = 0;
  var viewedPhotos = {};
  var finalRevealed = false;
  var finalRevealPending = false;
  var heartRainTimer = null;
  var tiltValues = [-2, 1.8, -1.4, 2.2, -2.6, 1.1, -1.9, 2.4];
  var photoDescriptions = {
    "photo-01.jpeg": "Nuestra salida a los jueguitosss, recuerdas? Estabas poco malita, incluso en el carriwis, te sentias super mal, pero todo salio super bien :3",
    "photo-02.jpeg": "Ya con pancita :3",
    "photo-03.jpeg": "En Cafe Paris, con nauseas y todo pero hermosaaa siempree",
    "photo-04.jpeg": "El diaaaaa oficialll!!!!",
    "photo-05.jpeg": "Enfermo, pero con mi amorcito siempreee, Rusticaa",
    "photo-06.jpeg": "Entrega de mi titulo, gracias por estar en ese momento tan especial",
    "photo-07.jpeg": "Jueguitos denuevooo!!",
    "photo-08.jpeg": "Jueguitoss otra vezz",
    "photo-09.jpeg": "Y otraaa vezz",
    "photo-10.jpeg": "En camino al nidito de amorr :v",
    "photo-11.jpeg": "Escapadita al sauna para la relajacion",
    "photo-12.jpeg": "Saunita x2",
    "photo-13.jpeg": "Corazon Corazon Cara con ojos de corazon enamorado",
    "photo-14.jpeg": "Corazon Corazon Cara con ojos de corazon enamorado"
  };

  var collage = document.getElementById("photoCollage");
  var enterButton = document.getElementById("enterButton");
  var viewedCounter = document.getElementById("viewedCounter");
  var pairsValue = document.getElementById("pairsValue");
  var pairsTargetValue = document.getElementById("pairsTargetValue");
  var movesValue = document.getElementById("movesValue");
  var previewValue = document.getElementById("previewValue");
  var gameStatus = document.getElementById("gameStatus");
  var memoryBoard = document.getElementById("memoryBoard");
  var startGameButton = document.getElementById("startGameButton");
  var musicButton = document.getElementById("musicButton");
  var scPlayer = document.getElementById("scPlayer");
  var unlockMessage = document.getElementById("unlockMessage");
  var loveMessage = document.getElementById("loveMessage");
  var welcome = document.getElementById("welcome");
  var gallery = document.getElementById("gallery");
  var photoModal = document.getElementById("photoModal");
  var closePhotoModal = document.getElementById("closePhotoModal");
  var modalPhotoImage = document.getElementById("modalPhotoImage");
  var modalPhotoDescription = document.getElementById("modalPhotoDescription");
  var finalPhotoModal = document.getElementById("finalPhotoModal");
  var closeFinalModal = document.getElementById("closeFinalModal");
  var finalPhotoImage = document.getElementById("finalPhotoImage");
  var finalPhotoText = document.getElementById("finalPhotoText");
  var heartRain = document.getElementById("heartRain");

  var scWidget = null;
  var musicReady = false;
  var wantsMusic = true;
  var autoMusicTriggered = false;
  var userMusicChoice = false;

  if (
    !collage ||
    !enterButton ||
    !viewedCounter ||
    !pairsValue ||
    !pairsTargetValue ||
    !movesValue ||
    !previewValue ||
    !gameStatus ||
    !memoryBoard ||
    !startGameButton ||
    !musicButton ||
    !scPlayer ||
    !unlockMessage ||
    !loveMessage ||
    !welcome ||
    !gallery ||
    !photoModal ||
    !closePhotoModal ||
    !modalPhotoImage ||
    !modalPhotoDescription ||
    !finalPhotoModal ||
    !closeFinalModal ||
    !finalPhotoImage ||
    !finalPhotoText ||
    !heartRain
  ) {
    return;
  }

  for (var photoIndex = 1; photoIndex <= totalPhotos; photoIndex += 1) {
    memorySourcePhotos.push("photo-" + String(photoIndex).padStart(2, "0") + ".jpeg");
  }

  pairsTargetValue.textContent = String(memorySourcePhotos.length);

  function refreshBodyModalState() {
    var hasOpenModal = !photoModal.hidden || !finalPhotoModal.hidden;
    if (hasOpenModal) {
      document.body.classList.add("modal-open");
      return;
    }

    document.body.classList.remove("modal-open");
  }

  function updateViewedCounter() {
    viewedCounter.textContent = String(viewedCount);
  }

  function updateMusicButton() {
    musicButton.setAttribute("aria-pressed", wantsMusic ? "true" : "false");
    musicButton.textContent = wantsMusic ? "Pausar musica" : "Activar musica";
  }

  function syncMusicPlayback() {
    if (!scWidget || !musicReady) {
      return;
    }

    if (wantsMusic) {
      scWidget.play();
      return;
    }

    scWidget.pause();
  }

  function triggerAutoMusic() {
    if (autoMusicTriggered || userMusicChoice) {
      return;
    }

    autoMusicTriggered = true;
    wantsMusic = true;
    syncMusicPlayback();
  }

  if (window.SC && window.SC.Widget) {
    scWidget = window.SC.Widget(scPlayer);

    scWidget.bind(window.SC.Widget.Events.READY, function () {
      musicReady = true;
      syncMusicPlayback();
      updateMusicButton();
    });

    scWidget.bind(window.SC.Widget.Events.FINISH, function () {
      if (!wantsMusic) {
        return;
      }

      scWidget.seekTo(0);
      scWidget.play();
    });
  }

  musicButton.addEventListener("click", function () {
    userMusicChoice = true;
    wantsMusic = !wantsMusic;
    syncMusicPlayback();
  });
  updateMusicButton();

  function setupFirstGestureMusicKickstart() {
    function handleFirstGesture() {
      triggerAutoMusic();
      document.removeEventListener("pointerdown", handleFirstGesture);
      document.removeEventListener("keydown", handleFirstGesture);
      document.removeEventListener("touchstart", handleFirstGesture);
    }

    document.addEventListener("pointerdown", handleFirstGesture, { passive: true });
    document.addEventListener("keydown", handleFirstGesture);
    document.addEventListener("touchstart", handleFirstGesture, { passive: true });
  }

  setupFirstGestureMusicKickstart();

  function openPhotoModal(fileName, imageSrc, description) {
    modalPhotoImage.src = imageSrc;
    modalPhotoImage.alt = "Vista ampliada de " + fileName;
    modalPhotoDescription.textContent = description;
    photoModal.hidden = false;
    photoModal.setAttribute("aria-hidden", "false");
    refreshBodyModalState();
  }

  function closeOpenedPhotoModal() {
    if (photoModal.hidden) {
      return;
    }

    photoModal.hidden = true;
    photoModal.setAttribute("aria-hidden", "true");
    modalPhotoImage.src = "";
    modalPhotoImage.alt = "";
    refreshBodyModalState();

    if (finalRevealPending && !finalRevealed) {
      finalRevealPending = false;
      window.setTimeout(triggerFinalReveal, 180);
    }
  }

  function stopHeartRain() {
    if (heartRainTimer) {
      window.clearTimeout(heartRainTimer);
      heartRainTimer = null;
    }

    heartRain.innerHTML = "";
    heartRain.hidden = true;
  }

  function startHeartRain() {
    stopHeartRain();
    heartRain.hidden = false;

    for (var i = 0; i < 95; i += 1) {
      var drop = document.createElement("span");
      drop.className = "heart-drop";
      drop.textContent = String.fromCharCode(10084);
      drop.style.left = (Math.random() * 100).toFixed(2) + "%";
      drop.style.animationDelay = (Math.random() * 1.7).toFixed(2) + "s";
      drop.style.animationDuration = (3 + Math.random() * 2.6).toFixed(2) + "s";
      drop.style.fontSize = (0.8 + Math.random() * 1.4).toFixed(2) + "rem";
      heartRain.appendChild(drop);
    }

    heartRainTimer = window.setTimeout(stopHeartRain, 7600);
  }

  function openFinalPhotoModal() {
    finalPhotoImage.src = "photos/" + finalPhotoFile;
    finalPhotoImage.alt = "Foto sorpresa final";
    finalPhotoText.textContent = "Viste todas las fotos. Aqui tienes la nueva foto sorpresa.";
    finalPhotoModal.hidden = false;
    finalPhotoModal.setAttribute("aria-hidden", "false");
    startHeartRain();
    refreshBodyModalState();
  }

  function closeFinalPhotoModal() {
    if (finalPhotoModal.hidden) {
      return;
    }

    finalPhotoModal.hidden = true;
    finalPhotoModal.setAttribute("aria-hidden", "true");
    finalPhotoImage.src = "";
    finalPhotoImage.alt = "";
    stopHeartRain();
    refreshBodyModalState();
  }

  function triggerFinalReveal() {
    if (finalRevealed) {
      return;
    }

    finalRevealed = true;
    openFinalPhotoModal();
  }

  function markPhotoViewed(fileName, photoCard) {
    if (photoCard) {
      photoCard.classList.add("viewed");
    }

    if (viewedPhotos[fileName]) {
      return;
    }

    viewedPhotos[fileName] = true;
    viewedCount += 1;
    updateViewedCounter();

    if (viewedCount === totalPhotos) {
      finalRevealPending = true;
    }
  }

  closePhotoModal.addEventListener("click", closeOpenedPhotoModal);

  photoModal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-modal")) {
      closeOpenedPhotoModal();
    }
  });

  closeFinalModal.addEventListener("click", closeFinalPhotoModal);

  finalPhotoModal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-final")) {
      closeFinalPhotoModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (!finalPhotoModal.hidden) {
      closeFinalPhotoModal();
      return;
    }

    closeOpenedPhotoModal();
  });

  finalPhotoImage.addEventListener("error", function () {
    finalPhotoText.textContent = "No pude cargar la foto final. Verifica que exista photos/" + finalPhotoFile + ".";
  });

  function setGameStatus(message) {
    gameStatus.textContent = message;
  }

  function clearPreviewInterval() {
    if (!previewInterval) {
      return;
    }

    window.clearInterval(previewInterval);
    previewInterval = null;
  }

  function clearHideMismatchTimer() {
    if (!hideMismatchTimer) {
      return;
    }

    window.clearTimeout(hideMismatchTimer);
    hideMismatchTimer = null;
  }

  function updateGameStats() {
    pairsValue.textContent = String(pairsFound);
    movesValue.textContent = String(movesCount);
    previewValue.textContent = previewActive ? String(Math.max(previewRemaining, 0)) : "--";
  }

  function shuffleArray(items) {
    for (var i = items.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
  }

  function createMemoryDeck() {
    var deck = [];

    for (var i = 0; i < memorySourcePhotos.length; i += 1) {
      var fileName = memorySourcePhotos[i];
      deck.push({ pairKey: fileName, fileName: fileName, revealed: false, matched: false, button: null });
      deck.push({ pairKey: fileName, fileName: fileName, revealed: false, matched: false, button: null });
    }

    shuffleArray(deck);
    return deck;
  }

  function applyCardVisual(card) {
    if (!card || !card.button) {
      return;
    }

    card.button.classList.toggle("revealed", !!card.revealed);
    card.button.classList.toggle("matched", !!card.matched);
    card.button.disabled = card.matched || !gameRunning || boardLocked;
  }

  function refreshBoardInteractivity() {
    for (var i = 0; i < memoryCards.length; i += 1) {
      applyCardVisual(memoryCards[i]);
    }
  }

  function revealCard(index, shouldReveal) {
    var card = memoryCards[index];
    if (!card) {
      return;
    }

    card.revealed = shouldReveal;
    applyCardVisual(card);
  }

  function buildBoard() {
    memoryCards = createMemoryDeck();
    memoryBoard.innerHTML = "";

    for (var i = 0; i < memoryCards.length; i += 1) {
      var card = memoryCards[i];
      var button = document.createElement("button");
      var image = document.createElement("img");
      var cover = document.createElement("span");

      button.type = "button";
      button.className = "memory-card";
      button.setAttribute("aria-label", "Carta " + (i + 1));
      button.setAttribute("data-card-index", String(i));

      image.src = "photos/" + card.fileName;
      image.alt = "Carta de memoria";
      image.loading = "lazy";
      image.className = "memory-photo";

      cover.className = "memory-cover";
      cover.textContent = String.fromCharCode(10084);

      button.appendChild(image);
      button.appendChild(cover);

      (function bindCardClick(cardIndex) {
        button.addEventListener("click", function () {
          handleMemoryCardClick(cardIndex);
        });
      })(i);

      memoryBoard.appendChild(button);
      card.button = button;
      card.revealed = false;
      card.matched = false;
      applyCardVisual(card);
    }
  }

  function stopMemoryTimers() {
    clearPreviewInterval();
    clearHideMismatchTimer();
  }

  function beginMatchPhase() {
    previewActive = false;
    previewRemaining = 0;
    gameRunning = true;
    boardLocked = false;

    for (var i = 0; i < memoryCards.length; i += 1) {
      if (!memoryCards[i].matched) {
        memoryCards[i].revealed = false;
      }
    }

    setGameStatus("Ahora encuentra todas las parejas.");
    updateGameStats();
    refreshBoardInteractivity();
  }

  function startPreviewPhase() {
    previewActive = true;
    gameRunning = false;
    boardLocked = true;
    previewRemaining = memoryPreviewSeconds;

    for (var i = 0; i < memoryCards.length; i += 1) {
      memoryCards[i].revealed = true;
      applyCardVisual(memoryCards[i]);
    }

    setGameStatus("Memoriza las cartas. Se ocultaran en " + previewRemaining + "s.");
    updateGameStats();

    clearPreviewInterval();
    previewInterval = window.setInterval(function () {
      previewRemaining -= 1;

      if (previewRemaining <= 0) {
        clearPreviewInterval();
        beginMatchPhase();
        return;
      }

      setGameStatus("Memoriza las cartas. Se ocultaran en " + previewRemaining + "s.");
      updateGameStats();
    }, 1000);
  }

  function unlockAccept() {
    if (unlocked) {
      return;
    }

    unlocked = true;
    gameRunning = false;
    boardLocked = true;
    previewActive = false;
    stopMemoryTimers();
    updateGameStats();
    refreshBoardInteractivity();

    enterButton.disabled = false;
    unlockMessage.hidden = false;
    unlockMessage.textContent = "Desbloqueado. Presiona Aceptar.";
    loveMessage.hidden = false;
    loveMessage.textContent = winLoveMessage;
    setGameStatus("Completaste todas las parejas. Ya puedes entrar al collage.");
    startGameButton.textContent = "Completado";
    startGameButton.disabled = true;
  }

  function handleMemoryCardClick(index) {
    if (!gameRunning || boardLocked) {
      return;
    }

    var currentCard = memoryCards[index];
    if (!currentCard || currentCard.revealed || currentCard.matched) {
      return;
    }

    triggerAutoMusic();
    revealCard(index, true);

    if (firstPickIndex === -1) {
      firstPickIndex = index;
      setGameStatus("Selecciona la segunda carta.");
      return;
    }

    if (firstPickIndex === index) {
      return;
    }

    secondPickIndex = index;
    movesCount += 1;
    boardLocked = true;
    updateGameStats();
    refreshBoardInteractivity();

    var firstCard = memoryCards[firstPickIndex];
    var secondCard = memoryCards[secondPickIndex];

    if (firstCard.pairKey === secondCard.pairKey) {
      firstCard.matched = true;
      secondCard.matched = true;
      pairsFound += 1;
      updateGameStats();

      window.setTimeout(function () {
        firstPickIndex = -1;
        secondPickIndex = -1;

        if (pairsFound >= memorySourcePhotos.length) {
          unlockAccept();
          return;
        }

        boardLocked = false;
        setGameStatus("Bien. Sigue encontrando parejas.");
        refreshBoardInteractivity();
      }, 260);

      return;
    }

    setGameStatus("No coinciden. Intenta otra vez.");
    clearHideMismatchTimer();
    hideMismatchTimer = window.setTimeout(function () {
      revealCard(firstPickIndex, false);
      revealCard(secondPickIndex, false);
      firstPickIndex = -1;
      secondPickIndex = -1;
      boardLocked = false;
      setGameStatus("Busca la siguiente pareja.");
      refreshBoardInteractivity();
      hideMismatchTimer = null;
    }, 680);
  }

  function startMemoryGame() {
    if (unlocked) {
      return;
    }

    triggerAutoMusic();
    stopMemoryTimers();

    pairsFound = 0;
    movesCount = 0;
    previewRemaining = 0;
    firstPickIndex = -1;
    secondPickIndex = -1;
    previewActive = false;
    gameRunning = false;
    boardLocked = true;

    enterButton.disabled = true;
    unlockMessage.hidden = true;
    loveMessage.hidden = true;
    loveMessage.textContent = "";

    buildBoard();
    startGameButton.textContent = "Reiniciar reto";
    startGameButton.disabled = false;
    updateGameStats();
    startPreviewPhase();
  }

  startGameButton.addEventListener("click", startMemoryGame);

  updateGameStats();
  updateViewedCounter();

  for (var i = 1; i <= totalPhotos; i += 1) {
    var card = document.createElement("figure");
    var img = document.createElement("img");
    var index = String(i).padStart(2, "0");
    var fileName = "photo-" + index + ".jpeg";
    var description = photoDescriptions[fileName] || "Descripcion pendiente para esta foto.";

    card.className = "photo-card";
    card.setAttribute("data-photo-name", fileName);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.style.setProperty("--tilt", tiltValues[(i - 1) % tiltValues.length] + "deg");
    card.style.animationDelay = ((i - 1) * 0.08).toFixed(2) + "s";

    img.src = "photos/" + fileName;
    img.alt = "Foto especial " + i;
    img.loading = "lazy";

    card.appendChild(img);

    (function bindPhotoEvents(photoCard, currentName, currentDescription) {
      var imagePath = "photos/" + currentName;

      photoCard.addEventListener("click", function () {
        markPhotoViewed(currentName, photoCard);
        openPhotoModal(currentName, imagePath, currentDescription);
      });

      photoCard.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          markPhotoViewed(currentName, photoCard);
          openPhotoModal(currentName, imagePath, currentDescription);
        }
      });
    })(card, fileName, description);

    collage.appendChild(card);
  }

  enterButton.addEventListener("click", function () {
    triggerAutoMusic();

    if (enterButton.disabled) {
      return;
    }

    document.body.classList.add("show-gallery");
    welcome.setAttribute("aria-hidden", "true");
    gallery.setAttribute("aria-hidden", "false");
  });
})();
