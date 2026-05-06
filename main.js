(function () {
  var projects = [
    {
      title: "Via Expresa Santa Rosa",
      category: "Infraestructura vial",
      filters: ["infraestructura"],
      image: "PORTAFOLIO/VIA EXPRESA SANTA ROSAA.png",
      summary: "Visualizacion tecnica del corredor vial con lectura de componentes, contexto urbano y coordinacion del modelo.",
      description: "Proyecto de infraestructura presentado con enfoque BIM para comunicar alcance, interferencias y zonas de trabajo en una vista clara para revision tecnica.",
      highlights: [
        "Modelo y vistas orientadas a coordinacion de obra.",
        "Lectura visual de tramos, estructuras y entorno inmediato.",
        "Base grafica preparada para reportes ejecutivos."
      ],
      tags: ["BIM", "Infraestructura", "Coordinacion"]
    },
    {
      title: "Via Expresa Santa Rosa - gestion del proyecto",
      category: "Infraestructura vial",
      filters: ["infraestructura", "costos"],
      image: "PORTAFOLIO/proyecto VIA EXPRESA SANTA ROSA.png",
      summary: "Panel tecnico para consolidar informacion del proyecto vial y facilitar seguimiento de datos relevantes.",
      description: "Captura de gestion asociada al proyecto Via Expresa Santa Rosa, enfocada en ordenar informacion tecnica para control y toma de decisiones.",
      highlights: [
        "Organizacion de informacion por frentes y componentes.",
        "Presentacion visual para reuniones de seguimiento.",
        "Enfoque en trazabilidad y lectura rapida del avance."
      ],
      tags: ["Gestion", "Seguimiento", "Costos"]
    },
    {
      title: "Country Club Villa",
      category: "Edificacion",
      filters: ["edificacion"],
      image: "PORTAFOLIO/PROYECTO COUNTRY CLUB VILLA.png",
      summary: "Modelo arquitectonico y tecnico para proyecto residencial, con vistas preparadas para presentacion profesional.",
      description: "Trabajo de edificacion con enfoque en representacion, revision y comunicacion de elementos del proyecto desde el modelo digital.",
      highlights: [
        "Vistas del modelo para explicar alcance arquitectonico.",
        "Soporte visual para revision con clientes o equipo tecnico.",
        "Ordenamiento grafico para portafolio y entregables."
      ],
      tags: ["Edificacion", "Modelo", "Presentacion"]
    },
    {
      title: "Itemizado y presupuesto",
      category: "Costos y metrados",
      filters: ["costos"],
      image: "PORTAFOLIO/ITEMIZADO Y PRESUPUESTO.png",
      summary: "Estructura de partidas, metrados y presupuesto orientada a control tecnico y financiero del proyecto.",
      description: "Sistema de itemizado para conectar cantidades, partidas y valores de presupuesto con una lectura ordenada del alcance.",
      highlights: [
        "Clasificacion de partidas para analisis y seguimiento.",
        "Base para reportes de presupuesto y control de cambios.",
        "Formato pensado para revision tecnica y ejecutiva."
      ],
      tags: ["Presupuesto", "Metrados", "Partidas"]
    },
    {
      title: "Hospital Sergio Bernales",
      category: "Salud",
      filters: ["salud", "edificacion"],
      image: "PORTAFOLIO/HOSPITAL SEGIO BERNALES.png",
      summary: "Proyecto hospitalario con foco en coordinacion, visualizacion de especialidades y lectura de infraestructura compleja.",
      description: "Captura de proyecto de salud donde la informacion BIM ayuda a revisar espacios, sistemas y componentes de alta complejidad.",
      highlights: [
        "Modelo preparado para inspeccion de zonas criticas.",
        "Visualizacion de infraestructura hospitalaria compleja.",
        "Soporte para coordinacion multidisciplinaria."
      ],
      tags: ["Hospital", "BIM", "Coordinacion"]
    },
    {
      title: "Hospital Antonio Lorena - Cusco",
      category: "Salud",
      filters: ["salud", "edificacion"],
      image: "PORTAFOLIO/HOSPITAL ANTONIO LORENA  - CUSCO.png",
      summary: "Representacion tecnica de proyecto hospitalario con comunicacion visual para revision de alcance.",
      description: "Proyecto de salud en Cusco presentado mediante capturas de modelo para apoyar seguimiento, revision y explicacion tecnica.",
      highlights: [
        "Vistas tecnicas para comunicar el alcance del proyecto.",
        "Lectura ordenada de volumenes y componentes principales.",
        "Base visual para presentaciones de avance."
      ],
      tags: ["Salud", "Cusco", "Modelo BIM"]
    },
    {
      title: "Gestion BIM - Proyecto EIMI",
      category: "Gestion BIM",
      filters: ["edificacion", "costos"],
      image: "PORTAFOLIO/gestion BIM PROYECTO EIMI.png",
      summary: "Flujo de gestion BIM para integrar informacion del modelo con criterios de revision y control.",
      description: "Trabajo orientado a ordenar informacion BIM, documentar criterios y convertir el modelo en una fuente util para seguimiento tecnico.",
      highlights: [
        "Estructura de informacion para gestion del modelo.",
        "Apoyo a control de entregables y revision de datos.",
        "Comunicacion clara de elementos clave del proyecto."
      ],
      tags: ["Gestion BIM", "Datos", "Entregables"]
    },
    {
      title: "Control CAPEX",
      category: "Control financiero",
      filters: ["costos", "software"],
      image: "PORTAFOLIO/CONTROLCAPEX.png",
      summary: "Tablero para control de inversion, seguimiento de indicadores y presentacion ejecutiva de costos.",
      description: "Herramienta visual para monitorear informacion financiera del proyecto y facilitar lectura de CAPEX en diferentes niveles de detalle.",
      highlights: [
        "Dashboard para indicadores de inversion y control.",
        "Presentacion limpia para reuniones de seguimiento.",
        "Base para comparar escenarios, avances y desviaciones."
      ],
      tags: ["CAPEX", "Dashboard", "Costos"]
    },
    {
      title: "Add-in de sincronizacion de modelo, costos y metrados",
      category: "Software BIM",
      filters: ["software", "costos"],
      image: "PORTAFOLIO/ADDIN DE SINCRONIZACION DEL MODELO CON COSTOS Y METRADOS.png",
      summary: "Automatizacion para vincular informacion del modelo con metrados y costos, reduciendo trabajo manual.",
      description: "Desarrollo de add-in orientado a sincronizar datos del modelo BIM con estructuras de costos y cantidades para mejorar consistencia.",
      highlights: [
        "Conexion entre parametros del modelo y estructura de costos.",
        "Reduccion de tareas repetitivas en metrados.",
        "Flujo preparado para control y actualizacion de datos."
      ],
      tags: ["Revit", "Add-in", "Automatizacion"]
    },
    {
      title: "Add-in de itemizado y costos para Revit",
      category: "Software BIM",
      filters: ["software", "costos"],
      image: "PORTAFOLIO/ADDIN DE ITEMIZADO Y FCOSTOS REVIT.png",
      summary: "Herramienta para itemizar elementos y trabajar costos desde Revit con una interfaz directa.",
      description: "Add-in para acelerar el armado de itemizados y asociar informacion de costos dentro del entorno BIM.",
      highlights: [
        "Interfaz enfocada en itemizado desde el modelo.",
        "Asociacion de elementos con partidas y costos.",
        "Preparado para flujos de metrados y presupuesto."
      ],
      tags: ["Revit", "Itemizado", "Costos"]
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
  var lastFocusedElement = null;

  if (!grid || !modal || !modalImage || !modalTitle || !modalCategory || !modalDescription || !modalHighlights || !modalTags) {
    return;
  }

  function setHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function createTag(label) {
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = label;
    return tag;
  }

  function openProject(project) {
    lastFocusedElement = document.activeElement;
    modalImage.src = project.image;
    modalImage.alt = "Captura del proyecto " + project.title;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;
    modalHighlights.innerHTML = "";
    modalTags.innerHTML = "";

    project.highlights.forEach(function (highlight) {
      var item = document.createElement("li");
      item.textContent = highlight;
      modalHighlights.appendChild(item);
    });

    project.tags.forEach(function (tag) {
      modalTags.appendChild(createTag(tag));
    });

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
    article.style.animationDelay = index * 60 + "ms";

    media.className = "project-media";
    image.src = project.image;
    image.alt = "Captura de " + project.title;
    image.loading = "lazy";
    media.appendChild(image);

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
    button.textContent = "Ver detalle";
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
