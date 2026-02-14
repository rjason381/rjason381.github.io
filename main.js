(function () {
  var totalPhotos = 15;
  var finalPhotoFile = "photo-16.jpg";
  var playerMaxHp = 5;
  var bossUnlockScore = 36;
  var canvasWidth = 560;
  var canvasHeight = 300;
  var winLoveMessage = "Te amo mi vida, gracias  por todo mi amor, es un pequeño presente, lo que se hacer, espero te guste, nuestro primer 14 con nuestro hijo, ya que el anterior aun estabamos sin Elric jajaja";
  var unlocked = false;
  var viewedCount = 0;
  var viewedPhotos = {};
  var finalRevealed = false;
  var finalRevealPending = false;
  var heartRainTimer = null;
  var missionState = "idle";
  var missionLevel = 1;
  var missionScore = 0;
  var player = null;
  var enemies = [];
  var bullets = [];
  var enemyBullets = [];
  var particles = [];
  var boss = null;
  var inputState = { up: false, down: false, left: false, right: false, fire: false };
  var gameLoopId = null;
  var lastFrameTime = 0;
  var worldScroll = 0;
  var spawnTimer = 0;
  var playerShotTimer = 0;
  var bossShotTimer = 0;
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
  var levelValue = document.getElementById("levelValue");
  var hpValue = document.getElementById("hpValue");
  var scoreValue = document.getElementById("scoreValue");
  var gameStatus = document.getElementById("gameStatus");
  var contraCanvas = document.getElementById("contraCanvas");
  var startGameButton = document.getElementById("startGameButton");
  var touchControls = document.getElementById("touchControls");
  var bossLife = document.getElementById("bossLife");
  var bossLifeBar = document.getElementById("bossLifeBar");
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
  var gameContext = null;

  if (
    !collage ||
    !enterButton ||
    !viewedCounter ||
    !levelValue ||
    !hpValue ||
    !scoreValue ||
    !gameStatus ||
    !contraCanvas ||
    !startGameButton ||
    !touchControls ||
    !bossLife ||
    !bossLifeBar ||
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

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setGameStatus(message) {
    gameStatus.textContent = message;
  }

  function clearInputState() {
    inputState.up = false;
    inputState.down = false;
    inputState.left = false;
    inputState.right = false;
    inputState.fire = false;

    var buttons = touchControls.querySelectorAll(".touch-btn.active");
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].classList.remove("active");
    }
  }

  function updateGameStats() {
    levelValue.textContent = String(missionLevel);
    hpValue.textContent = String(player ? Math.max(player.hp, 0) : playerMaxHp);
    scoreValue.textContent = String(missionScore);

    if (boss && missionState === "running") {
      bossLife.hidden = false;
      bossLifeBar.style.width = ((Math.max(0, boss.hp) / boss.maxHp) * 100).toFixed(2) + "%";
      return;
    }

    bossLife.hidden = true;
    bossLifeBar.style.width = "0%";
  }

  function stopMissionLoop() {
    if (gameLoopId) {
      window.cancelAnimationFrame(gameLoopId);
      gameLoopId = null;
    }
  }

  function createParticleBurst(x, y, color, count, spread, speedBase) {
    for (var i = 0; i < count; i += 1) {
      var angle = Math.random() * Math.PI * 2;
      var speed = speedBase * (0.45 + Math.random() * 0.8);
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.2 + Math.random() * 0.38,
        age: 0,
        size: 2 + Math.random() * spread,
        color: color
      });
    }
  }

  function resetMissionRuntime() {
    missionLevel = 1;
    missionScore = 0;
    player = {
      x: 46,
      y: canvasHeight / 2 - 16,
      w: 28,
      h: 28,
      hp: playerMaxHp,
      speed: 230,
      invulnerableUntil: 0
    };
    enemies = [];
    bullets = [];
    enemyBullets = [];
    particles = [];
    boss = null;
    spawnTimer = 0.72;
    playerShotTimer = 0;
    bossShotTimer = 1.2;
    worldScroll = 0;
    lastFrameTime = 0;
    updateGameStats();
  }

  function spawnEnemyBullet(x, y, vx, vy, size, color) {
    enemyBullets.push({
      x: x,
      y: y,
      w: size,
      h: size,
      vx: vx,
      vy: vy,
      color: color
    });
  }

  function spawnEnemy() {
    if (boss) {
      return;
    }

    var eliteChance = missionScore > 18 ? 0.42 : 0.2;
    var isElite = Math.random() < eliteChance;
    var size = isElite ? 30 : 24;
    enemies.push({
      x: canvasWidth + 18 + Math.random() * 50,
      y: 34 + Math.random() * (canvasHeight - 68),
      w: size,
      h: size,
      hp: isElite ? 3 : 2,
      speed: (isElite ? 145 : 118) + Math.random() * 40,
      points: isElite ? 3 : 2,
      drift: 30 + Math.random() * 28,
      phase: Math.random() * Math.PI * 2,
      shotCooldown: 0.65 + Math.random() * 1.1,
      elite: isElite
    });
  }

  function spawnBoss() {
    enemies = [];
    boss = {
      x: canvasWidth - 132,
      y: canvasHeight / 2 - 52,
      w: 92,
      h: 92,
      hp: 84,
      maxHp: 84,
      direction: 1,
      sway: 0
    };
    missionLevel = 2;
    bossShotTimer = 0.9;
    setGameStatus("Jefe detectado. Esquiva y dispara sin parar.");
    createParticleBurst(boss.x + boss.w / 2, boss.y + boss.h / 2, "rgba(255, 148, 180, 0.9)", 22, 2.4, 120);
    updateGameStats();
  }

  function shootPlayer() {
    bullets.push({
      x: player.x + player.w - 2,
      y: player.y + player.h / 2 - 2,
      w: 12,
      h: 4,
      speed: 470
    });
    createParticleBurst(player.x + player.w, player.y + player.h / 2, "rgba(255, 245, 250, 0.92)", 3, 1.1, 80);
  }

  function intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function failMission(reason) {
    missionState = "lost";
    clearInputState();
    stopMissionLoop();
    setGameStatus(reason + " Presiona Reiniciar mision.");
    startGameButton.textContent = "Reiniciar mision";
    updateGameStats();
  }

  function damagePlayer(amount) {
    if (!player || missionState !== "running") {
      return;
    }

    var now = window.performance.now();
    if (now < player.invulnerableUntil) {
      return;
    }

    player.hp -= amount;
    player.invulnerableUntil = now + 780;
    createParticleBurst(player.x + player.w / 2, player.y + player.h / 2, "rgba(255, 214, 228, 0.9)", 10, 1.6, 120);
    updateGameStats();

    if (player.hp > 0) {
      return;
    }

    failMission("Mision fallida: te derribaron.");
  }

  function unlockAccept() {
    if (unlocked) {
      return;
    }

    unlocked = true;
    missionState = "won";
    clearInputState();
    stopMissionLoop();
    boss = null;
    updateGameStats();
    enterButton.disabled = false;
    unlockMessage.hidden = false;
    unlockMessage.textContent = "Desbloqueado. Presiona Aceptar.";
    loveMessage.hidden = false;
    loveMessage.textContent = winLoveMessage;
    setGameStatus("Mision completada. Ruta libre para abrir el collage.");
    startGameButton.textContent = "Completado";
    startGameButton.disabled = true;
  }

  function winMission() {
    missionScore += 25;
    createParticleBurst(canvasWidth - 108, canvasHeight / 2, "rgba(255, 130, 167, 0.92)", 42, 3.1, 180);
    updateGameStats();
    unlockAccept();
  }

  function updateParticles(delta) {
    for (var i = particles.length - 1; i >= 0; i -= 1) {
      var particle = particles[i];
      particle.age += delta;

      if (particle.age >= particle.life) {
        particles.splice(i, 1);
        continue;
      }

      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.vy += 220 * delta;
    }
  }

  function updateMission(delta) {
    if (missionState !== "running" || !player) {
      return;
    }

    worldScroll = (worldScroll + delta * 120) % canvasWidth;

    var axisX = (inputState.right ? 1 : 0) - (inputState.left ? 1 : 0);
    var axisY = (inputState.down ? 1 : 0) - (inputState.up ? 1 : 0);
    if (axisX || axisY) {
      var magnitude = Math.sqrt(axisX * axisX + axisY * axisY) || 1;
      player.x += (axisX / magnitude) * player.speed * delta;
      player.y += (axisY / magnitude) * player.speed * delta;
      player.x = clamp(player.x, 12, canvasWidth * 0.52 - player.w);
      player.y = clamp(player.y, 14, canvasHeight - player.h - 14);
    }

    playerShotTimer -= delta;
    if (inputState.fire && playerShotTimer <= 0) {
      shootPlayer();
      playerShotTimer = boss ? 0.12 : 0.145;
    }

    if (!boss) {
      spawnTimer -= delta;
      if (spawnTimer <= 0) {
        spawnEnemy();
        spawnTimer = 0.62 + Math.random() * 0.55 - Math.min(missionScore / 130, 0.25);
      }

      if (missionScore >= bossUnlockScore) {
        spawnBoss();
      }
    } else {
      boss.sway += delta * 2.4;
      boss.x = canvasWidth - 132 + Math.sin(boss.sway * 0.75) * 10;
      boss.y += boss.direction * 78 * delta;
      if (boss.y <= 14) {
        boss.y = 14;
        boss.direction = 1;
      }
      if (boss.y + boss.h >= canvasHeight - 14) {
        boss.y = canvasHeight - boss.h - 14;
        boss.direction = -1;
      }

      bossShotTimer -= delta;
      if (bossShotTimer <= 0) {
        var centerX = boss.x + 8;
        var centerY = boss.y + boss.h / 2;
        spawnEnemyBullet(centerX, centerY - 16, -240, -48, 7, "#ff9cb8");
        spawnEnemyBullet(centerX, centerY, -270, 0, 8, "#ff6f98");
        spawnEnemyBullet(centerX, centerY + 16, -240, 48, 7, "#ff9cb8");
        bossShotTimer = 0.7;
      }
    }

    for (var bi = bullets.length - 1; bi >= 0; bi -= 1) {
      var bullet = bullets[bi];
      bullet.x += bullet.speed * delta;

      if (bullet.x > canvasWidth + 30) {
        bullets.splice(bi, 1);
        continue;
      }

      var consumed = false;
      for (var ei = enemies.length - 1; ei >= 0; ei -= 1) {
        var enemy = enemies[ei];
        if (!intersects(bullet, enemy)) {
          continue;
        }

        enemy.hp -= 1;
        consumed = true;
        createParticleBurst(bullet.x, bullet.y + 2, "rgba(255, 186, 209, 0.85)", 5, 1.5, 70);

        if (enemy.hp <= 0) {
          missionScore += enemy.points;
          createParticleBurst(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "rgba(255, 124, 162, 0.95)", 14, 2.2, 120);
          enemies.splice(ei, 1);
          updateGameStats();
        }

        break;
      }

      if (!consumed && boss && intersects(bullet, boss)) {
        consumed = true;
        boss.hp -= 1;
        createParticleBurst(bullet.x, bullet.y, "rgba(255, 174, 200, 0.84)", 4, 1.2, 60);
        updateGameStats();

        if (boss.hp <= 0) {
          winMission();
        }
      }

      if (consumed) {
        bullets.splice(bi, 1);
      }
    }

    for (var i = enemies.length - 1; i >= 0; i -= 1) {
      var foe = enemies[i];
      foe.phase += delta * 3.1;
      foe.x -= foe.speed * delta;
      foe.y += Math.sin(foe.phase) * foe.drift * delta;
      foe.y = clamp(foe.y, 16, canvasHeight - foe.h - 16);
      foe.shotCooldown -= delta;

      if (foe.shotCooldown <= 0 && foe.x > player.x + 24) {
        var bulletSpeed = foe.elite ? -230 : -200;
        spawnEnemyBullet(foe.x, foe.y + foe.h / 2 - 3, bulletSpeed, foe.elite ? (Math.random() - 0.5) * 80 : 0, foe.elite ? 7 : 6, foe.elite ? "#ff95b8" : "#ffb7cf");
        foe.shotCooldown = foe.elite ? 0.68 + Math.random() * 0.68 : 0.92 + Math.random() * 0.9;
      }

      if (foe.x + foe.w < 0) {
        enemies.splice(i, 1);
        damagePlayer(1);
        continue;
      }

      if (intersects(foe, player)) {
        enemies.splice(i, 1);
        damagePlayer(1);
        createParticleBurst(foe.x + foe.w / 2, foe.y + foe.h / 2, "rgba(255, 168, 199, 0.94)", 10, 1.9, 100);
      }
    }

    for (var eb = enemyBullets.length - 1; eb >= 0; eb -= 1) {
      var enemyBullet = enemyBullets[eb];
      enemyBullet.x += enemyBullet.vx * delta;
      enemyBullet.y += enemyBullet.vy * delta;

      if (
        enemyBullet.x < -30 ||
        enemyBullet.x > canvasWidth + 30 ||
        enemyBullet.y < -30 ||
        enemyBullet.y > canvasHeight + 30
      ) {
        enemyBullets.splice(eb, 1);
        continue;
      }

      if (intersects(enemyBullet, player)) {
        enemyBullets.splice(eb, 1);
        damagePlayer(1);
      }
    }

    if (boss && intersects(boss, player)) {
      damagePlayer(2);
    }

    updateParticles(delta);
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    var safeRadius = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + safeRadius, y);
    ctx.lineTo(x + width - safeRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
    ctx.lineTo(x + width, y + height - safeRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
    ctx.lineTo(x + safeRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
    ctx.lineTo(x, y + safeRadius);
    ctx.quadraticCurveTo(x, y, x + safeRadius, y);
    ctx.closePath();
  }

  function drawBackground() {
    var skyGradient = gameContext.createLinearGradient(0, 0, 0, canvasHeight);
    skyGradient.addColorStop(0, "#2d1234");
    skyGradient.addColorStop(0.5, "#4e1f59");
    skyGradient.addColorStop(1, "#1f0f26");
    gameContext.fillStyle = skyGradient;
    gameContext.fillRect(0, 0, canvasWidth, canvasHeight);

    gameContext.globalAlpha = 0.3;
    gameContext.fillStyle = "#ffd8e7";
    for (var i = 0; i < 25; i += 1) {
      var sx = ((i * 79 + worldScroll * 0.42) % (canvasWidth + 10)) - 10;
      var sy = (i * 23) % (canvasHeight * 0.62);
      gameContext.fillRect(sx, sy, 2, 2);
    }
    gameContext.globalAlpha = 1;

    gameContext.fillStyle = "rgba(255, 172, 203, 0.2)";
    for (var h = 0; h < 3; h += 1) {
      var hillY = canvasHeight - 58 + h * 9;
      var hillOffset = (worldScroll * (0.2 + h * 0.15)) % 170;
      for (var x = -180; x < canvasWidth + 180; x += 170) {
        drawRoundedRect(gameContext, x - hillOffset, hillY, 170, 42, 24);
        gameContext.fill();
      }
    }

    gameContext.fillStyle = "rgba(255, 225, 237, 0.22)";
    for (var scan = 0; scan < canvasHeight; scan += 4) {
      gameContext.fillRect(0, scan, canvasWidth, 1);
    }
  }

  function drawPlayer() {
    if (!player) {
      return;
    }

    if (player.invulnerableUntil > window.performance.now() && Math.floor(window.performance.now() / 70) % 2 === 0) {
      return;
    }

    gameContext.fillStyle = "#ffe9f2";
    drawRoundedRect(gameContext, player.x, player.y, player.w, player.h, 6);
    gameContext.fill();

    gameContext.fillStyle = "#ff6996";
    gameContext.fillRect(player.x + player.w - 6, player.y + 10, 10, 8);

    gameContext.fillStyle = "#90284a";
    gameContext.fillRect(player.x + 5, player.y + 6, 8, 6);
    gameContext.fillRect(player.x + 4, player.y + player.h - 8, 6, 4);
    gameContext.fillRect(player.x + 14, player.y + player.h - 8, 6, 4);
  }

  function drawEnemies() {
    for (var i = 0; i < enemies.length; i += 1) {
      var enemy = enemies[i];
      gameContext.fillStyle = enemy.elite ? "#ff7ca8" : "#ff96ba";
      drawRoundedRect(gameContext, enemy.x, enemy.y, enemy.w, enemy.h, 7);
      gameContext.fill();

      gameContext.fillStyle = "#7b1e3f";
      gameContext.fillRect(enemy.x + 3, enemy.y + 7, 8, 5);
      gameContext.fillRect(enemy.x + enemy.w - 7, enemy.y + 10, 7, 4);
    }
  }

  function drawBoss() {
    if (!boss) {
      return;
    }

    var pulse = 0.92 + Math.sin(window.performance.now() * 0.01) * 0.08;
    gameContext.fillStyle = "rgba(255, 82, 124, " + pulse.toFixed(3) + ")";
    drawRoundedRect(gameContext, boss.x, boss.y, boss.w, boss.h, 14);
    gameContext.fill();

    gameContext.fillStyle = "#ffe9f2";
    gameContext.fillRect(boss.x + 15, boss.y + 20, 18, 12);
    gameContext.fillRect(boss.x + 15, boss.y + boss.h - 32, 18, 12);

    gameContext.fillStyle = "#7b1d3f";
    gameContext.fillRect(boss.x - 6, boss.y + 24, 10, 10);
    gameContext.fillRect(boss.x - 8, boss.y + boss.h - 34, 12, 12);
  }

  function drawProjectiles() {
    for (var i = 0; i < bullets.length; i += 1) {
      var bullet = bullets[i];
      gameContext.fillStyle = "#fff6fa";
      drawRoundedRect(gameContext, bullet.x, bullet.y, bullet.w, bullet.h, 2);
      gameContext.fill();
    }

    for (var j = 0; j < enemyBullets.length; j += 1) {
      var enemyBullet = enemyBullets[j];
      gameContext.fillStyle = enemyBullet.color;
      gameContext.beginPath();
      gameContext.arc(enemyBullet.x, enemyBullet.y, enemyBullet.w / 2, 0, Math.PI * 2);
      gameContext.fill();
    }
  }

  function drawParticles() {
    for (var i = 0; i < particles.length; i += 1) {
      var particle = particles[i];
      var lifeRatio = 1 - particle.age / particle.life;
      if (lifeRatio <= 0) {
        continue;
      }

      gameContext.globalAlpha = lifeRatio;
      gameContext.fillStyle = particle.color;
      gameContext.beginPath();
      gameContext.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
      gameContext.fill();
    }
    gameContext.globalAlpha = 1;
  }

  function renderMission() {
    if (!gameContext) {
      return;
    }

    gameContext.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    drawPlayer();
    drawEnemies();
    drawBoss();
    drawProjectiles();
    drawParticles();

    if (missionState === "idle") {
      gameContext.fillStyle = "rgba(255, 230, 241, 0.85)";
      gameContext.font = "700 17px Nunito";
      gameContext.textAlign = "center";
      gameContext.fillText("Inicia la mision para comenzar", canvasWidth / 2, canvasHeight / 2);
    }

    if (missionState === "lost") {
      gameContext.fillStyle = "rgba(255, 230, 241, 0.9)";
      gameContext.font = "700 17px Nunito";
      gameContext.textAlign = "center";
      gameContext.fillText("Mision fallida", canvasWidth / 2, canvasHeight / 2 - 8);
      gameContext.font = "600 13px Nunito";
      gameContext.fillText("Pulsa Reiniciar mision", canvasWidth / 2, canvasHeight / 2 + 16);
    }

    if (missionState === "won") {
      gameContext.fillStyle = "rgba(255, 230, 241, 0.92)";
      gameContext.font = "700 17px Nunito";
      gameContext.textAlign = "center";
      gameContext.fillText("Objetivo cumplido", canvasWidth / 2, canvasHeight / 2);
    }
  }

  function missionLoop(timestamp) {
    if (missionState !== "running") {
      renderMission();
      return;
    }

    if (!lastFrameTime) {
      lastFrameTime = timestamp;
    }

    var delta = Math.min(0.034, (timestamp - lastFrameTime) / 1000);
    lastFrameTime = timestamp;

    updateMission(delta);
    renderMission();

    if (missionState === "running") {
      gameLoopId = window.requestAnimationFrame(missionLoop);
    }
  }

  function startMission() {
    if (unlocked) {
      return;
    }

    triggerAutoMusic();
    stopMissionLoop();
    resetMissionRuntime();
    clearInputState();
    missionState = "running";
    enterButton.disabled = true;
    unlockMessage.hidden = true;
    loveMessage.hidden = true;
    loveMessage.textContent = "";
    startGameButton.textContent = "Reiniciar mision";
    startGameButton.disabled = false;
    setGameStatus("Muevete con WASD/flechas y dispara con Espacio.");
    updateGameStats();
    gameLoopId = window.requestAnimationFrame(missionLoop);
  }

  function getControlFromKey(keyValue) {
    var lower = keyValue.toLowerCase();

    if (lower === "w" || keyValue === "ArrowUp") {
      return "up";
    }
    if (lower === "s" || keyValue === "ArrowDown") {
      return "down";
    }
    if (lower === "a" || keyValue === "ArrowLeft") {
      return "left";
    }
    if (lower === "d" || keyValue === "ArrowRight") {
      return "right";
    }
    if (keyValue === " " || lower === "j") {
      return "fire";
    }

    return "";
  }

  function setControlState(control, isPressed) {
    if (!control) {
      return;
    }

    inputState[control] = isPressed;
  }

  function bindControlEvents() {
    document.addEventListener("keydown", function (event) {
      var control = getControlFromKey(event.key);
      if (!control) {
        return;
      }

      if (missionState === "running") {
        event.preventDefault();
      }

      setControlState(control, true);
      triggerAutoMusic();
    });

    document.addEventListener("keyup", function (event) {
      var control = getControlFromKey(event.key);
      if (!control) {
        return;
      }

      setControlState(control, false);
    });

    window.addEventListener("blur", clearInputState);

    var touchButtons = touchControls.querySelectorAll("[data-control]");
    for (var i = 0; i < touchButtons.length; i += 1) {
      (function bindTouchButton(button) {
        var control = button.getAttribute("data-control");

        function releaseControl() {
          setControlState(control, false);
          button.classList.remove("active");
        }

        button.addEventListener("pointerdown", function (event) {
          event.preventDefault();
          triggerAutoMusic();
          setControlState(control, true);
          button.classList.add("active");
        });

        button.addEventListener("pointerup", releaseControl);
        button.addEventListener("pointercancel", releaseControl);
        button.addEventListener("pointerleave", releaseControl);
      })(touchButtons[i]);
    }
  }

  function initializeMissionCanvas() {
    contraCanvas.width = canvasWidth;
    contraCanvas.height = canvasHeight;
    gameContext = contraCanvas.getContext("2d");
    resetMissionRuntime();
    renderMission();
    setGameStatus("Inicia la mision y derrota al jefe final.");
  }

  startGameButton.addEventListener("click", startMission);

  bindControlEvents();
  initializeMissionCanvas();
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
