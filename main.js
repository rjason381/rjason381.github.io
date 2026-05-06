(function () {
  var projects = [
    {
      title: "Via Expresa Santa Rosa",
      category: "Infraestructura vial",
      filters: ["infraestructura", "costos"],
      images: [
        { src: "PORTAFOLIO/VIA EXPRESA SANTA ROSAA.png", label: "Vista tecnica del corredor vial" },
        { src: "PORTAFOLIO/proyecto VIA EXPRESA SANTA ROSA.png", label: "Panel de gestion del proyecto" }
      ],
      summary: "Coordinacion visual y seguimiento tecnico para un proyecto de infraestructura vial.",
      description: "Caso de infraestructura presentado con enfoque BIM para comunicar alcance, componentes, zonas de trabajo e informacion de gestion en una sola lectura.",
      highlights: [
        "Vistas orientadas a coordinacion y revision de obra.",
        "Informacion tecnica consolidada para seguimiento.",
        "Base visual para reportes ejecutivos y reuniones."
      ],
      tags: ["BIM", "Infraestructura", "Gestion"]
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
    },
    {
      title: "Hospital Sergio E. Bernales",
      category: "Salud",
      filters: ["salud", "edificacion", "software"],
      images: [
        { src: "PORTAFOLIO/HOSPITAL SEGIO BERNALES.png", label: "Modelo BIM hospitalario" },
        { src: "PORTAFOLIO/MIP ADHOC BERNALES.png", label: "Modulo MIDP para seguimiento de entregables" }
      ],
      summary: "Coordinacion hospitalaria y seguimiento de entregables para infraestructura de alta complejidad.",
      description: "Caso de salud donde el modelo y las herramientas de seguimiento ayudan a revisar espacios, sistemas, entregables y avance tecnico.",
      highlights: [
        "Modelo preparado para inspeccion de zonas criticas.",
        "Visualizacion de infraestructura hospitalaria compleja.",
        "Seguimiento de entregables mediante herramienta de gestion."
      ],
      tags: ["Hospital", "BIM", "MIDP"]
    },
    {
      title: "Hospital Antonio Lorena Nivel III-1 - Cusco",
      category: "Salud",
      filters: ["salud", "edificacion"],
      images: [
        { src: "PORTAFOLIO/HOSPITAL ANTONIO LORENA  - CUSCO.png", label: "Modelo BIM hospitalario" }
      ],
      summary: "Representacion tecnica de proyecto hospitalario para revision de alcance y componentes principales.",
      description: "Proyecto de salud en Cusco presentado mediante capturas de modelo para apoyar seguimiento, revision y explicacion tecnica.",
      highlights: [
        "Vistas tecnicas para comunicar el alcance del proyecto.",
        "Lectura ordenada de volumenes y componentes principales.",
        "Base visual para presentaciones de avance."
      ],
      tags: ["Salud", "Cusco", "Modelo BIM"]
    },
    {
      title: "Gestion BIM y MIDP V2",
      category: "Gestion de informacion",
      filters: ["edificacion", "costos", "software"],
      images: [
        { src: "PORTAFOLIO/gestion BIM PROYECTO EIMI.png", label: "Gestion BIM del proyecto" },
        { src: "PORTAFOLIO/MIDP ADHOC.png", label: "Configuracion de datos MIDP V2" }
      ],
      summary: "Flujo de gestion BIM para ordenar modelos, datos, entregables y trazabilidad de informacion.",
      description: "Trabajo orientado a convertir el modelo y sus datos en una fuente util para seguimiento tecnico, control de entregables y coordinacion colaborativa.",
      highlights: [
        "Estructura de informacion para gestion del modelo.",
        "Control de entregables y revision de datos.",
        "Configuracion de fuentes y tablas para seguimiento."
      ],
      tags: ["Gestion BIM", "MIDP", "Datos"]
    },
    {
      title: "Costos, itemizado y control CAPEX",
      category: "Costos y metrados",
      filters: ["costos", "software"],
      images: [
        { src: "PORTAFOLIO/ITEMIZADO Y PRESUPUESTO.png", label: "Itemizado y presupuesto" },
        { src: "PORTAFOLIO/CONTROLCAPEX.png", label: "Dashboard de control CAPEX" }
      ],
      summary: "Estructura de partidas y tablero de control para seguimiento tecnico y financiero.",
      description: "Caso orientado a conectar cantidades, partidas, presupuesto e indicadores de inversion para facilitar seguimiento y toma de decisiones.",
      highlights: [
        "Clasificacion de partidas para analisis y seguimiento.",
        "Dashboard para indicadores de inversion y control.",
        "Formato pensado para revision tecnica y ejecutiva."
      ],
      tags: ["Presupuesto", "CAPEX", "Metrados"]
    },
    {
      title: "Add-ins Revit para costos y metrados",
      category: "Software BIM",
      filters: ["software", "costos"],
      images: [
        { src: "PORTAFOLIO/ADDIN DE SINCRONIZACION DEL MODELO CON COSTOS Y METRADOS.png", label: "Sincronizacion de modelo, costos y metrados" },
        { src: "PORTAFOLIO/ADDIN DE ITEMIZADO Y FCOSTOS REVIT.png", label: "Itemizado y costos desde Revit" }
      ],
      summary: "Automatizaciones para vincular informacion del modelo con metrados, partidas y costos.",
      description: "Desarrollo de herramientas para acelerar el armado de itemizados, sincronizar datos del modelo y reducir trabajo manual en flujos de presupuesto.",
      highlights: [
        "Conexion entre parametros del modelo y estructura de costos.",
        "Asociacion de elementos con partidas y costos.",
        "Reduccion de tareas repetitivas en metrados."
      ],
      tags: ["Revit", "Add-in", "Automatizacion"]
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

    header.classList.toggle("is-scrolled", window.scrollY > 12);
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

  function createProjectCard(project, index) {
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
    article.style.animationDelay = index * 40 + "ms";

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
    button.textContent = "Ver proyecto";
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
    filteredProjects.forEach(function (project, index) {
      grid.appendChild(createProjectCard(project, index));
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
