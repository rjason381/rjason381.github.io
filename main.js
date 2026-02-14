(function () {
  var totalPhotos = 15;
  var finalPhotoFile = "photo-16.jpg";
  var totalRounds = 3;
  var roundSequenceLengths = [3, 4, 5];
  var roundTimeLimits = [12, 11, 10];
  var boardSlotCount = 9;
  var lives = 3;
  var currentRound = 1;
  var playerStep = 0;
  var activeSequence = [];
  var unlocked = false;
  var gameStarted = false;
  var showingSequence = false;
  var timeLeft = 0;
  var viewedCount = 0;
  var viewedPhotos = {};
  var finalRevealed = false;
  var finalRevealPending = false;
  var heartRainTimer = null;
  var roundTimer = null;
  var sequenceRunId = 0;
  var gamePads = [];
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
  var roundValue = document.getElementById("roundValue");
  var livesValue = document.getElementById("livesValue");
  var timerValue = document.getElementById("timerValue");
  var gameStatus = document.getElementById("gameStatus");
  var gameGrid = document.getElementById("gameGrid");
  var startGameButton = document.getElementById("startGameButton");
  var musicButton = document.getElementById("musicButton");
  var scPlayer = document.getElementById("scPlayer");
  var unlockMessage = document.getElementById("unlockMessage");
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
    !roundValue ||
    !livesValue ||
    !timerValue ||
    !gameStatus ||
    !gameGrid ||
    !startGameButton ||
    !musicButton ||
    !scPlayer ||
    !unlockMessage ||
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

  function wait(milliseconds) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function updateGameStats() {
    roundValue.textContent = String(currentRound);
    livesValue.textContent = String(lives);
  }

  function setGameStatus(message) {
    gameStatus.textContent = message;
  }

  function setBoardEnabled(enabled) {
    for (var i = 0; i < gamePads.length; i += 1) {
      gamePads[i].disabled = !enabled;
    }

    if (enabled) {
      gameGrid.removeAttribute("aria-disabled");
      return;
    }

    gameGrid.setAttribute("aria-disabled", "true");
  }

  function clearRoundTimer() {
    if (!roundTimer) {
      return;
    }

    window.clearInterval(roundTimer);
    roundTimer = null;
  }

  function startRoundTimer() {
    clearRoundTimer();
    timeLeft = roundTimeLimits[currentRound - 1] || 10;
    timerValue.textContent = String(timeLeft);

    roundTimer = window.setInterval(function () {
      timeLeft -= 1;
      timerValue.textContent = String(Math.max(timeLeft, 0));

      if (timeLeft > 0) {
        return;
      }

      clearRoundTimer();
      loseLife("Se acabo el tiempo.");
    }, 1000);
  }

  function generateRoundSequence(length) {
    var sequence = [];
    var previous = -1;

    for (var i = 0; i < length; i += 1) {
      var next = Math.floor(Math.random() * boardSlotCount);

      if (next === previous) {
        next = (next + 1 + Math.floor(Math.random() * (boardSlotCount - 1))) % boardSlotCount;
      }

      sequence.push(next);
      previous = next;
    }

    return sequence;
  }

  function flashPad(index, className, duration) {
    return new Promise(function (resolve) {
      var pad = gamePads[index];

      if (!pad) {
        resolve();
        return;
      }

      pad.classList.add(className);

      window.setTimeout(function () {
        pad.classList.remove(className);
        resolve();
      }, duration);
    });
  }

  async function playRoundSequence(runId) {
    if (!gameStarted || unlocked || runId !== sequenceRunId) {
      return;
    }

    showingSequence = true;
    setBoardEnabled(false);
    clearRoundTimer();
    timerValue.textContent = "--";
    setGameStatus("Memoriza la secuencia de la ronda " + currentRound + ".");
    await wait(320);

    for (var i = 0; i < activeSequence.length; i += 1) {
      if (!gameStarted || unlocked || runId !== sequenceRunId) {
        return;
      }

      await flashPad(activeSequence[i], "show", 380);
      await wait(130);
    }

    if (!gameStarted || unlocked || runId !== sequenceRunId) {
      return;
    }

    showingSequence = false;
    playerStep = 0;
    setBoardEnabled(true);
    setGameStatus("Tu turno. Repite la secuencia.");
    startRoundTimer();
  }

  function loseLife(reason) {
    clearRoundTimer();
    lives -= 1;
    updateGameStats();

    if (lives <= 0) {
      gameStarted = false;
      showingSequence = false;
      sequenceRunId += 1;
      setBoardEnabled(false);
      timerValue.textContent = "--";
      setGameStatus(reason + " Te quedaste sin vidas. Pulsa Reiniciar reto.");
      startGameButton.textContent = "Reiniciar reto";
      return;
    }

    showingSequence = false;
    playerStep = 0;
    setBoardEnabled(false);
    setGameStatus(reason + " Pierdes una vida. Mira la secuencia otra vez.");

    var retryToken = sequenceRunId;
    window.setTimeout(function () {
      if (!gameStarted || unlocked || retryToken !== sequenceRunId) {
        return;
      }

      playRoundSequence(retryToken);
    }, 760);
  }

  function unlockAccept() {
    if (unlocked) {
      return;
    }

    unlocked = true;
    gameStarted = false;
    showingSequence = false;
    sequenceRunId += 1;
    clearRoundTimer();
    setBoardEnabled(false);
    timerValue.textContent = "--";
    enterButton.disabled = false;
    unlockMessage.hidden = false;
    unlockMessage.textContent = "Desbloqueado. Presiona Aceptar.";
    setGameStatus("Reto completado. Ya puedes abrir el collage.");
    startGameButton.textContent = "Completado";
    startGameButton.disabled = true;
  }

  function beginRound() {
    if (!gameStarted || unlocked) {
      return;
    }

    var currentLength = roundSequenceLengths[currentRound - 1] || 5;
    activeSequence = generateRoundSequence(currentLength);
    playerStep = 0;
    updateGameStats();
    playRoundSequence(sequenceRunId);
  }

  function handlePlayerInput(index) {
    if (!gameStarted || unlocked || showingSequence) {
      return;
    }

    triggerAutoMusic();

    if (index !== activeSequence[playerStep]) {
      flashPad(index, "wrong", 250);
      loseLife("No era esa casilla.");
      return;
    }

    flashPad(index, "correct", 220);
    playerStep += 1;

    if (playerStep < activeSequence.length) {
      return;
    }

    clearRoundTimer();
    setBoardEnabled(false);

    if (currentRound >= totalRounds) {
      unlockAccept();
      return;
    }

    setGameStatus("Ronda " + currentRound + " superada. Preparando la siguiente...");
    currentRound += 1;
    updateGameStats();

    var advanceToken = sequenceRunId;
    window.setTimeout(function () {
      if (!gameStarted || unlocked || advanceToken !== sequenceRunId) {
        return;
      }

      beginRound();
    }, 860);
  }

  function createGameBoard() {
    gameGrid.innerHTML = "";
    gamePads = [];

    for (var i = 0; i < boardSlotCount; i += 1) {
      var pad = document.createElement("button");
      pad.className = "game-pad";
      pad.type = "button";
      pad.disabled = true;
      pad.setAttribute("data-pad-index", String(i));
      pad.setAttribute("aria-label", "Casilla " + (i + 1));
      pad.textContent = String.fromCharCode(10084);

      (function bindPad(currentPad, currentIndex) {
        currentPad.addEventListener("click", function () {
          handlePlayerInput(currentIndex);
        });
      })(pad, i);

      gameGrid.appendChild(pad);
      gamePads.push(pad);
    }

    setBoardEnabled(false);
  }

  startGameButton.addEventListener("click", function () {
    if (unlocked) {
      return;
    }

    triggerAutoMusic();
    sequenceRunId += 1;
    gameStarted = true;
    showingSequence = false;
    currentRound = 1;
    lives = 3;
    playerStep = 0;
    activeSequence = [];
    timerValue.textContent = "--";
    startGameButton.textContent = "Reiniciar reto";
    updateGameStats();
    setBoardEnabled(false);
    setGameStatus("Preparando ronda 1...");

    var startToken = sequenceRunId;
    window.setTimeout(function () {
      if (!gameStarted || unlocked || startToken !== sequenceRunId) {
        return;
      }

      beginRound();
    }, 420);
  });

  createGameBoard();
  updateGameStats();
  updateViewedCounter();
  setGameStatus("Memoriza la secuencia y repitela sin fallar.");

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
