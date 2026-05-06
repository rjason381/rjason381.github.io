(function () {
  var projects = [
    {
      title: "Hospital Antonio Lorena Nivel III-1 - Cusco",
      category: "Salud / Gestion BIM",
      filters: ["salud", "gestion-bim", "edificacion"],
      images: [
        { src: "PORTAFOLIO/HOSPITAL ANTONIO LORENA  - CUSCO.png", label: "Modelo BIM hospitalario" }
      ],
      summary: "Coordinacion BIM para proyecto hospitalario de alta complejidad.",
      description: "Liderazgo y soporte BIM para compatibilizacion de especialidades, gestion CDE bajo ISO 19650 y revision tecnica de componentes principales del proyecto.",
      highlights: [
        "Coordinacion de informacion y entregables BIM.",
        "Gestion CDE bajo estandar ISO 19650.",
        "Soporte para revision multidisciplinaria y sesiones ICE."
      ],
      tags: ["BIM", "Hospitales", "ISO 19650"]
    },
    {
      title: "Hospital Sergio E. Bernales",
      category: "Salud / Control de proyecto",
      filters: ["salud", "gestion-bim", "software"],
      images: [
        { src: "PORTAFOLIO/HOSPITAL SEGIO BERNALES.png", label: "Modelo BIM hospitalario" },
        { src: "PORTAFOLIO/MIP ADHOC BERNALES.png", label: "Modulo MIDP para seguimiento de entregables" }
      ],
      summary: "Control de avance de diseno, auditoria de modelos y seguimiento de entregables.",
      description: "Caso de salud donde el modelo y las herramientas de seguimiento ayudan a revisar espacios, sistemas, entregables y avance tecnico del equipo BIM.",
      highlights: [
        "Control y seguimiento de avance de diseno.",
        "Auditoria de modelos y revision de informacion.",
        "Estrategias de control con herramientas internas."
      ],
      tags: ["Control", "Gestion BIM", "Auditoria"]
    },
    {
      title: "Via Expresa Santa Rosa",
      category: "Infraestructura vial",
      filters: ["infraestructura", "gestion-bim"],
      images: [
        { src: "PORTAFOLIO/VIA EXPRESA SANTA ROSAA.png", label: "Vista tecnica del corredor vial" },
        { src: "PORTAFOLIO/proyecto VIA EXPRESA SANTA ROSA.png", label: "Panel de gestion del proyecto" }
      ],
      summary: "PEB, coordinacion visual y seguimiento tecnico para infraestructura vial.",
      description: "Elaboracion de Plan de Ejecucion BIM y soporte de gestion para comunicar alcance, componentes, zonas de trabajo e interferencias en fase de construccion.",
      highlights: [
        "Elaboracion de PEB para el proyecto.",
        "Supervision de reubicacion de interferencias.",
        "Informacion tecnica consolidada para seguimiento."
      ],
      tags: ["BIM", "Infraestructura", "PEB"]
    },
    {
      title: "Automatizacion y tableros",
      category: "Software BIM & Costos",
      filters: ["software", "gestion-bim"],
      images: [
        { src: "PORTAFOLIO/CONTROLCAPEX.png", label: "Dashboard de control CAPEX" },
        { src: "PORTAFOLIO/MIDP ADHOC.png", label: "Configuracion de datos MIDP V2" },
        { src: "PORTAFOLIO/gestion BIM PROYECTO EIMI.png", label: "Gestion BIM del proyecto" }
      ],
      summary: "Aplicativos in-house, tableros CAPEX y control multiproyectos.",
      description: "Desarrollo de herramientas para ordenar datos de modelos, controlar entregables y presentar indicadores de avance, inversion y gestion BIM.",
      highlights: [
        "Tableros para seguimiento financiero y tecnico.",
        "Configuracion de fuentes de datos y tablas de control.",
        "Base para seguimiento de PMO y equipos de proyecto."
      ],
      tags: ["Python", "Power BI", "Datos"]
    },
    {
      title: "Add-ins Revit para costos y metrados",
      category: "Software BIM",
      filters: ["software"],
      images: [
        { src: "PORTAFOLIO/ADDIN DE SINCRONIZACION DEL MODELO CON COSTOS Y METRADOS.png", label: "Sincronizacion de modelo, costos y metrados" },
        { src: "PORTAFOLIO/ADDIN DE ITEMIZADO Y FCOSTOS REVIT.png", label: "Itemizado y costos desde Revit" },
        { src: "PORTAFOLIO/ITEMIZADO Y PRESUPUESTO.png", label: "Itemizado y presupuesto" }
      ],
      summary: "Automatizaciones para vincular informacion del modelo con metrados, partidas y costos.",
      description: "Desarrollo de herramientas para acelerar el armado de itemizados, sincronizar datos del modelo y reducir trabajo manual en flujos de presupuesto.",
      highlights: [
        "Conexion entre parametros del modelo y estructura de costos.",
        "Asociacion de elementos con partidas y costos.",
        "Reduccion de tareas repetitivas en metrados."
      ],
      tags: ["Revit", "C#", "Costos"]
    },
    {
      title: "Country Club Villa",
      category: "Edificacion",
      filters: ["edificacion"],
      images: [
        { src: "PORTAFOLIO/PROYECTO COUNTRY CLUB VILLA.png", label: "Modelo arquitectonico del proyecto" }
      ],
      summary: "Modelo arquitectonico y tecnico con vistas preparadas para presentacion profesional.",
      description: "Trabajo de edificacion con enfoque en representacion, revision y comunicacion de elementos del proyecto desde el modelo digital.",
      highlights: [
        "Vistas del modelo para explicar alcance arquitectonico.",
        "Soporte visual para revision con clientes o equipo tecnico.",
        "Ordenamiento grafico para portafolio y entregables."
      ],
      tags: ["Edificacion", "Modelo", "Presentacion"]
    }
  ];

  var header = document.querySelector("[data-header]");
  var grid = document.getElementById("projectsGrid");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-button"));
  var modal = document.getElementById("projectModal");
  var modalImage = document.getElementById("modalImage");
  var modalTitle = document.getElementById("modalTitle");
  var modalCategory = document.getElementById("modalCategory");
  var modalDescription = document.getElementById("modalDescription");
  var modalHighlights = document.getElementById("modalHighlights");
  var modalTags = document.getElementById("modalTags");
  var modalThumbs = document.getElementById("modalThumbs");
  var lastFocusedElement = null;

  if (!grid || !modal || !modalImage || !modalTitle || !modalCategory || !modalDescription || !modalHighlights || !modalTags || !modalThumbs) {
    return;
  }

  function setHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  function createTag(label) {
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = label;
    return tag;
  }

  function setModalImage(project, selectedIndex) {
    var selectedImage = project.images[selectedIndex];

    modalImage.src = selectedImage.src;
    modalImage.alt = selectedImage.label + " - " + project.title;

    Array.prototype.slice.call(modalThumbs.querySelectorAll(".modal-thumb")).forEach(function (button, index) {
      var isActive = index === selectedIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function openProject(project) {
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;
    modalHighlights.innerHTML = "";
    modalTags.innerHTML = "";
    modalThumbs.innerHTML = "";

    project.highlights.forEach(function (highlight) {
      var item = document.createElement("li");
      item.textContent = highlight;
      modalHighlights.appendChild(item);
    });

    project.tags.forEach(function (tag) {
      modalTags.appendChild(createTag(tag));
    });

    project.images.forEach(function (imageData, index) {
      var thumb = document.createElement("button");
      var image = document.createElement("img");

      thumb.className = "modal-thumb";
      thumb.type = "button";
      thumb.setAttribute("aria-label", imageData.label);
      thumb.setAttribute("aria-pressed", "false");
      image.src = imageData.src;
      image.alt = "";
      image.loading = "lazy";

      thumb.appendChild(image);
      thumb.addEventListener("click", function () {
        setModalImage(project, index);
      });
      modalThumbs.appendChild(thumb);
    });

    setModalImage(project, 0);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector("[data-close-modal]").focus();
  }

  function closeProject() {
    if (modal.hidden) {
      return;
    }

    modal.hidden = true;
    modalImage.src = "";
    modalImage.alt = "";
    modalThumbs.innerHTML = "";
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function createProjectCard(project) {
    var article = document.createElement("article");
    var media = document.createElement("div");
    var image = document.createElement("img");
    var content = document.createElement("div");
    var category = document.createElement("span");
    var title = document.createElement("h3");
    var summary = document.createElement("p");
    var tagRow = document.createElement("div");
    var button = document.createElement("button");

    article.className = "project-card";

    media.className = "project-media";
    image.src = project.images[0].src;
    image.alt = "Captura de " + project.title;
    image.loading = "lazy";
    media.appendChild(image);

    if (project.images.length > 1) {
      var count = document.createElement("span");
      count.className = "image-count";
      count.textContent = project.images.length + " capturas";
      media.appendChild(count);
    }

    content.className = "project-content";
    category.className = "project-category";
    category.textContent = project.category;
    title.textContent = project.title;
    summary.textContent = project.summary;

    tagRow.className = "tag-row";
    project.tags.slice(0, 3).forEach(function (tag) {
      tagRow.appendChild(createTag(tag));
    });

    button.className = "button project-open";
    button.type = "button";
    button.textContent = "Ver proyecto detallado";
    button.addEventListener("click", function () {
      openProject(project);
    });

    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(summary);
    content.appendChild(tagRow);
    content.appendChild(button);

    article.appendChild(media);
    article.appendChild(content);

    return article;
  }

  function renderProjects(filter) {
    var filteredProjects = projects.filter(function (project) {
      return filter === "all" || project.filters.indexOf(filter) !== -1;
    });

    grid.innerHTML = "";
    filteredProjects.forEach(function (project) {
      grid.appendChild(createProjectCard(project));
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter") || "all";

      filterButtons.forEach(function (item) {
        var isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      renderProjects(filter);
    });
  });

  modal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-modal")) {
      closeProject();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeProject();
    }
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
  renderProjects("all");
})();
