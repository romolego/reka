const STORAGE_KEY = "reka-research-canvas-v2";

const SECTION_LABELS = {
  empathy: {
    who: "С кем строим эмпатию",
    needToDo: "Что им нужно сделать",
    sees: "Что они видят",
    says: "Что они говорят",
    does: "Что они делают",
    hears: "Что они слышат",
    thinksFeels: "Что они думают и чувствуют",
    pains: "Боли",
    conclusions: "Выводы",
  },
  vpd: {
    jobs: "Jobs (работы клиента)",
    pains: "Pains (боли)",
    gains: "Gains (выгоды)",
    productsServices: "Продукты и сервисы",
    painRelievers: "Pain Relievers",
    gainCreators: "Gain Creators",
  },
  bmc: {
    keyPartners: "Ключевые партнёры",
    keyActivities: "Ключевые активности",
    keyResources: "Ключевые ресурсы",
    valuePropositions: "Ценностные предложения",
    customerRelationships: "Отношения с клиентами",
    channels: "Каналы",
    customerSegments: "Сегменты клиентов",
    costStructure: "Структура издержек",
    revenueStreams: "Потоки доходов",
  },
};

const ZONE_CONFIG = {
  empathy: [
    { id: "who", label: "С кем строим эмпатию", x: 0.04, y: 0.05, w: 0.28, h: 0.18 },
    { id: "needToDo", label: "Что им нужно сделать", x: 0.36, y: 0.05, w: 0.28, h: 0.18 },
    { id: "sees", label: "Что они видят", x: 0.68, y: 0.28, w: 0.28, h: 0.2 },
    { id: "says", label: "Что они говорят", x: 0.68, y: 0.52, w: 0.28, h: 0.2 },
    { id: "does", label: "Что они делают", x: 0.36, y: 0.75, w: 0.28, h: 0.2 },
    { id: "hears", label: "Что они слышат", x: 0.04, y: 0.32, w: 0.28, h: 0.22 },
    { id: "thinksFeels", label: "Думают и чувствуют", x: 0.36, y: 0.32, w: 0.28, h: 0.2 },
    { id: "pains", label: "Боли", x: 0.36, y: 0.54, w: 0.13, h: 0.16 },
    { id: "conclusions", label: "Выводы", x: 0.51, y: 0.54, w: 0.13, h: 0.16 },
  ],
  vpd: [
    { id: "productsServices", label: "Продукты и сервисы", x: 0.05, y: 0.4, w: 0.22, h: 0.22 },
    { id: "gainCreators", label: "Gain Creators", x: 0.27, y: 0.2, w: 0.2, h: 0.22 },
    { id: "painRelievers", label: "Pain Relievers", x: 0.27, y: 0.58, w: 0.2, h: 0.22 },
    { id: "jobs", label: "Jobs", x: 0.72, y: 0.32, w: 0.2, h: 0.24 },
    { id: "pains", label: "Pains", x: 0.6, y: 0.6, w: 0.2, h: 0.2 },
    { id: "gains", label: "Gains", x: 0.6, y: 0.22, w: 0.2, h: 0.2 },
  ],
  bmc: [
    { id: "keyPartners", label: "Ключевые партнёры", x: 0.02, y: 0.12, w: 0.18, h: 0.6 },
    { id: "keyActivities", label: "Ключевые активности", x: 0.2, y: 0.12, w: 0.18, h: 0.3 },
    { id: "keyResources", label: "Ключевые ресурсы", x: 0.2, y: 0.42, w: 0.18, h: 0.3 },
    { id: "valuePropositions", label: "Ценностные предложения", x: 0.38, y: 0.12, w: 0.2, h: 0.6 },
    { id: "customerRelationships", label: "Отношения с клиентами", x: 0.58, y: 0.12, w: 0.18, h: 0.3 },
    { id: "channels", label: "Каналы", x: 0.58, y: 0.42, w: 0.18, h: 0.3 },
    { id: "customerSegments", label: "Сегменты клиентов", x: 0.76, y: 0.12, w: 0.22, h: 0.6 },
    { id: "costStructure", label: "Структура издержек", x: 0.02, y: 0.74, w: 0.48, h: 0.22 },
    { id: "revenueStreams", label: "Потоки доходов", x: 0.5, y: 0.74, w: 0.48, h: 0.22 },
  ],
};

const CANVAS_ASSETS = {
  empathy: "assets/empathy.svg",
  vpd: "assets/vpd.svg",
  bmc: "assets/bmc.svg",
};

const DEFAULT_COLORS = ["#fff8b5", "#d1fae5", "#dbeafe", "#fde2e2", "#fef3c7"];

const ui = {
  tab: "hypotheses",
  viewModes: {
    empathy: "table",
    vpd: "table",
    bmc: "table",
  },
  search: "",
  filterStatus: "",
  filterRisk: "",
  activeHypothesisId: null,
  activeStickyId: null,
  selectedSection: null,
};

let state = loadState();

const elements = {
  projectSelect: document.getElementById("projectSelect"),
  segmentSelect: document.getElementById("segmentSelect"),
  btnProjectNew: document.getElementById("btnProjectNew"),
  btnProjectDup: document.getElementById("btnProjectDup"),
  btnProjectDel: document.getElementById("btnProjectDel"),
  btnSegmentNew: document.getElementById("btnSegmentNew"),
  btnSegmentDel: document.getElementById("btnSegmentDel"),
  btnExportJSON: document.getElementById("btnExportJSON"),
  btnImportJSON: document.getElementById("btnImportJSON"),
  btnExportCSV: document.getElementById("btnExportCSV"),
  btnResetAll: document.getElementById("btnResetAll"),
  tabs: document.getElementById("tabs"),
  searchInput: document.getElementById("searchInput"),
  filterStatus: document.getElementById("filterStatus"),
  filterRisk: document.getElementById("filterRisk"),
  leftList: document.getElementById("leftList"),
  rightTitle: document.getElementById("rightTitle"),
  rightBody: document.getElementById("rightBody"),
  btnAddHypothesis: document.getElementById("btnAddHypothesis"),
  btnCopyPrompt: document.getElementById("btnCopyPrompt"),
  btnSave: document.getElementById("btnSave"),
  storageBadge: document.getElementById("storageBadge"),
  kpiBox: document.getElementById("kpiBox"),
  modal: document.getElementById("modal"),
  modalTitle: document.getElementById("modalTitle"),
  modalTextarea: document.getElementById("modalTextarea"),
  modalClose: document.getElementById("modalClose"),
  modalCopy: document.getElementById("modalCopy"),
  modalApply: document.getElementById("modalApply"),
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return normalizeState(parsed);
  }
  return createDefaultState();
}

function createDefaultState() {
  const projectId = uid();
  const segmentId = uid();
  return {
    version: 2,
    projects: [
      {
        id: projectId,
        name: "Новый проект",
        prompts: createPrompt(),
        createdAt: now(),
      },
    ],
    segments: [
      {
        id: segmentId,
        projectId,
        name: "Основной сегмент",
        prompts: createPrompt(),
        createdAt: now(),
      },
    ],
    hypotheses: [],
    stickies: [],
    canvasPrompts: {},
    zones: structuredClone(ZONE_CONFIG),
  };
}

function normalizeState(raw) {
  const normalized = {
    version: raw.version || 2,
    projects: Array.isArray(raw.projects) ? raw.projects : [],
    segments: Array.isArray(raw.segments) ? raw.segments : [],
    hypotheses: Array.isArray(raw.hypotheses) ? raw.hypotheses : [],
    stickies: Array.isArray(raw.stickies) ? raw.stickies : [],
    canvasPrompts: raw.canvasPrompts || {},
    zones: raw.zones || structuredClone(ZONE_CONFIG),
  };

  normalized.projects = normalized.projects.map((project) => ({
    ...project,
    prompts: ensurePrompt(project.prompts),
  }));
  normalized.segments = normalized.segments.map((segment) => ({
    ...segment,
    prompts: ensurePrompt(segment.prompts),
  }));
  normalized.hypotheses = normalized.hypotheses.map((hypothesis) => ({
    ...hypothesis,
    prompts: ensurePrompt(hypothesis.prompts),
  }));

  return normalized;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  elements.storageBadge.textContent = `Хранилище: localStorage • ${new Date().toLocaleTimeString()}`;
}

function createPrompt() {
  return {
    systemPrompt: "",
    userPrompt: "",
    variables: "",
    tags: "",
    version: "",
    notes: "",
  };
}

function ensurePrompt(prompt) {
  return { ...createPrompt(), ...(prompt || {}) };
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function now() {
  return new Date().toISOString();
}

function getCurrentProject() {
  return state.projects.find((project) => project.id === elements.projectSelect.value) || state.projects[0];
}

function getCurrentSegment() {
  return state.segments.find((segment) => segment.id === elements.segmentSelect.value) || state.segments[0];
}

function getCanvasKey(canvasType) {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) {
    return null;
  }
  return `${project.id}:${segment.id}:${canvasType}`;
}

function getCanvasPrompt(canvasType) {
  const key = getCanvasKey(canvasType);
  if (!key) return createPrompt();
  if (!state.canvasPrompts[key]) {
    state.canvasPrompts[key] = createPrompt();
  }
  return state.canvasPrompts[key];
}

function updateCanvasPrompt(canvasType, patch) {
  const key = getCanvasKey(canvasType);
  if (!key) return;
  state.canvasPrompts[key] = {
    ...createPrompt(),
    ...(state.canvasPrompts[key] || {}),
    ...patch,
  };
  saveState();
}

function renderApp() {
  renderSelectors();
  renderTabs();
  renderLeftPanel();
  renderRightPanel();
  updateKpi();
}

function renderSelectors() {
  elements.projectSelect.innerHTML = state.projects
    .map((project) => `<option value="${project.id}">${project.name}</option>`)
    .join("");

  const currentProject = getCurrentProject();
  const segments = state.segments.filter((segment) => segment.projectId === currentProject.id);
  elements.segmentSelect.innerHTML = segments
    .map((segment) => `<option value="${segment.id}">${segment.name}</option>`)
    .join("");

  if (!elements.segmentSelect.value && segments[0]) {
    elements.segmentSelect.value = segments[0].id;
  }
}

function renderTabs() {
  [...elements.tabs.querySelectorAll(".tab")].forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === ui.tab);
  });
}

function renderLeftPanel() {
  elements.searchInput.value = ui.search;
  elements.filterStatus.value = ui.filterStatus;
  elements.filterRisk.value = ui.filterRisk;

  if (ui.tab === "hypotheses") {
    renderHypothesesList();
    elements.btnAddHypothesis.style.display = "inline-flex";
    return;
  }

  elements.btnAddHypothesis.style.display = "none";
  if (["empathy", "vpd", "bmc"].includes(ui.tab)) {
    renderStickyList();
    return;
  }

  if (ui.tab === "prompts") {
    elements.leftList.innerHTML = `<div class="small">Промпты хранятся на уровнях проекта, сегмента, канваса и гипотезы.</div>`;
    return;
  }

  elements.leftList.innerHTML = `<div class="small">Проверки собираются автоматически (статус гипотез, связанные элементы, заполненность секций).</div>`;
}

function renderHypothesesList() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const query = ui.search.toLowerCase();

  const hypotheses = state.hypotheses.filter((hypothesis) => {
    if (hypothesis.projectId !== project.id || hypothesis.segmentId !== segment.id) return false;
    if (ui.filterStatus && hypothesis.status !== ui.filterStatus) return false;
    if (ui.filterRisk && hypothesis.risk !== ui.filterRisk) return false;
    if (!query) return true;
    const haystack = `${hypothesis.title} ${hypothesis.statement} ${hypothesis.tags}`.toLowerCase();
    return haystack.includes(query);
  });

  if (!hypotheses.length) {
    elements.leftList.innerHTML = `<div class="small">Гипотез пока нет. Нажмите «Добавить гипотезу».</div>`;
    return;
  }

  elements.leftList.innerHTML = hypotheses
    .map((hypothesis) => {
      const active = hypothesis.id === ui.activeHypothesisId;
      return `
        <div class="item ${active ? "active" : ""}" data-id="${hypothesis.id}">
          <div class="row">
            <strong>${hypothesis.title || "Без названия"}</strong>
            <span class="badge">${labelStatus(hypothesis.status)}</span>
          </div>
          <div class="small">${escapeHtml(hypothesis.statement || "—")}</div>
          <div class="taglist">
            ${hypothesis.risk ? `<span class="tag">${labelRisk(hypothesis.risk)}</span>` : ""}
            ${hypothesis.tags ? hypothesis.tags.split(",").map((tag) => `<span class="tag">${tag.trim()}</span>`).join("") : ""}
          </div>
        </div>
      `;
    })
    .join("");

  elements.leftList.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      ui.activeHypothesisId = item.dataset.id;
      renderRightPanel();
      renderHypothesesList();
    });
  });
}

function renderStickyList() {
  const canvasType = ui.tab;
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const query = ui.search.toLowerCase();

  const stickies = state.stickies.filter((sticky) =>
    sticky.canvasType === canvasType && sticky.projectId === project.id && sticky.segmentId === segment.id
  );

  const filtered = stickies.filter((sticky) => {
    if (!query) return true;
    return sticky.text.toLowerCase().includes(query);
  });

  if (!filtered.length) {
    elements.leftList.innerHTML = `<div class="small">Стикеров пока нет. Добавьте их через табличный или графический режим.</div>`;
    return;
  }

  elements.leftList.innerHTML = filtered
    .map((sticky) => {
      const sectionLabel = SECTION_LABELS[canvasType][sticky.sectionId] || sticky.sectionId;
      const active = sticky.id === ui.activeStickyId;
      return `
        <div class="item ${active ? "active" : ""}" data-id="${sticky.id}">
          <div class="row">
            <strong>${sectionLabel}</strong>
            <span class="badge">${sticky.hypothesisId ? "с гипотезой" : "без связи"}</span>
          </div>
          <div class="small">${escapeHtml(sticky.text || "—")}</div>
        </div>
      `;
    })
    .join("");

  elements.leftList.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      ui.activeStickyId = item.dataset.id;
      renderRightPanel();
      renderStickyList();
    });
  });
}

function renderRightPanel() {
  if (ui.tab === "hypotheses") {
    elements.rightTitle.textContent = "Гипотеза";
    renderHypothesisEditor();
    return;
  }
  if (["empathy", "vpd", "bmc"].includes(ui.tab)) {
    elements.rightTitle.textContent = labelCanvas(ui.tab);
    renderCanvasEditor(ui.tab);
    return;
  }
  if (ui.tab === "prompts") {
    elements.rightTitle.textContent = "Промпты";
    renderPrompts();
    return;
  }
  elements.rightTitle.textContent = "Проверки";
  renderQa();
}

function updateKpi() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) return;
  const hypotheses = state.hypotheses.filter((hypo) => hypo.projectId === project.id && hypo.segmentId === segment.id);
  const stickies = state.stickies.filter((sticky) => sticky.projectId === project.id && sticky.segmentId === segment.id);
  elements.kpiBox.innerHTML = `
    <div class="box"><b>${hypotheses.length}</b>гипотез</div>
    <div class="box"><b>${stickies.length}</b>стикеров</div>
  `;
}

function renderHypothesisEditor() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) {
    elements.rightBody.innerHTML = `<div class="small">Создайте проект и сегмент.</div>`;
    return;
  }

  let hypothesis = state.hypotheses.find((item) => item.id === ui.activeHypothesisId);
  if (!hypothesis) {
    elements.rightBody.innerHTML = `
      <div class="section-card">
        <h3>Гипотеза</h3>
        <p class="small">Выберите гипотезу слева или создайте новую.</p>
        <div class="toolbar">
          <button class="btn primary" id="createHypothesis">Создать гипотезу</button>
        </div>
      </div>
    `;
    elements.rightBody.querySelector("#createHypothesis").addEventListener("click", () => {
      ui.activeHypothesisId = createHypothesis(project.id, segment.id);
      renderApp();
    });
    return;
  }

  const linked = state.stickies.filter((sticky) => sticky.hypothesisId === hypothesis.id);

  elements.rightBody.innerHTML = `
    <div class="section-grid">
      <div class="section-card">
        <h3>Основные данные</h3>
        <div class="field">
          <label>Название</label>
          <input class="input small" id="hypTitle" value="${escapeAttr(hypothesis.title)}" />
        </div>
        <div class="field">
          <label>Формулировка / statement</label>
          <textarea class="textarea" id="hypStatement">${escapeHtml(hypothesis.statement)}</textarea>
        </div>
        <div class="field">
          <label>Статус</label>
          <select class="select small" id="hypStatus">
            ${statusOptions(hypothesis.status)}
          </select>
        </div>
        <div class="field">
          <label>Риск</label>
          <select class="select small" id="hypRisk">
            ${riskOptions(hypothesis.risk)}
          </select>
        </div>
        <div class="field">
          <label>Теги</label>
          <input class="input small" id="hypTags" value="${escapeAttr(hypothesis.tags || "")}" placeholder="например, b2b, onboarding" />
        </div>
        <div class="field">
          <label>Заметки</label>
          <textarea class="textarea" id="hypNotes">${escapeHtml(hypothesis.notes || "")}</textarea>
        </div>
        <div class="toolbar">
          <button class="btn danger" id="hypDelete">Удалить гипотезу</button>
        </div>
      </div>

      <div class="section-card">
        <h3>Связанные элементы</h3>
        <div class="list">
          ${linked.length ? linked.map((sticky) => {
            const sectionLabel = SECTION_LABELS[sticky.canvasType]?.[sticky.sectionId] || sticky.sectionId;
            return `
              <div class="item" data-sticky="${sticky.id}" data-canvas="${sticky.canvasType}">
                <div class="row">
                  <strong>${labelCanvas(sticky.canvasType)}</strong>
                  <span class="badge">${sectionLabel}</span>
                </div>
                <div class="small">${escapeHtml(sticky.text)}</div>
              </div>
            `;
          }).join("") : `<div class="small">Пока нет связанных элементов. Привяжите стикеры к гипотезе.</div>`}
        </div>
      </div>

      <div class="section-card">
        <h3>Промпт гипотезы</h3>
        ${renderPromptFields(hypothesis.prompts, "hypPrompt")}
      </div>
    </div>
  `;

  elements.rightBody.querySelector("#hypTitle").addEventListener("input", (event) => {
    hypothesis.title = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
    renderHypothesesList();
  });
  elements.rightBody.querySelector("#hypStatement").addEventListener("input", (event) => {
    hypothesis.statement = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
    renderHypothesesList();
  });
  elements.rightBody.querySelector("#hypStatus").addEventListener("change", (event) => {
    hypothesis.status = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
    renderHypothesesList();
  });
  elements.rightBody.querySelector("#hypRisk").addEventListener("change", (event) => {
    hypothesis.risk = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
    renderHypothesesList();
  });
  elements.rightBody.querySelector("#hypTags").addEventListener("input", (event) => {
    hypothesis.tags = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
  });
  elements.rightBody.querySelector("#hypNotes").addEventListener("input", (event) => {
    hypothesis.notes = event.target.value;
    hypothesis.updatedAt = now();
    saveState();
  });
  elements.rightBody.querySelector("#hypDelete").addEventListener("click", () => {
    const confirmed = confirm("Удалить гипотезу и отвязать стикеры?");
    if (!confirmed) return;
    state.hypotheses = state.hypotheses.filter((item) => item.id !== hypothesis.id);
    state.stickies = state.stickies.map((sticky) =>
      sticky.hypothesisId === hypothesis.id ? { ...sticky, hypothesisId: null } : sticky
    );
    ui.activeHypothesisId = null;
    saveState();
    renderApp();
  });

  elements.rightBody.querySelectorAll("[data-sticky]").forEach((item) => {
    item.addEventListener("click", () => {
      ui.tab = item.dataset.canvas;
      ui.activeStickyId = item.dataset.sticky;
      renderApp();
    });
  });

  bindPromptFields("hypPrompt", (patch) => {
    hypothesis.prompts = { ...hypothesis.prompts, ...patch };
    hypothesis.updatedAt = now();
    saveState();
  });
}

function renderCanvasEditor(canvasType) {
  const mode = ui.viewModes[canvasType];
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) {
    elements.rightBody.innerHTML = `<div class="small">Создайте проект и сегмент.</div>`;
    return;
  }

  elements.rightBody.innerHTML = `
    <div class="toolbar">
      <div class="mode-toggle" data-canvas="${canvasType}">
        <button data-mode="table" class="${mode === "table" ? "active" : ""}">Таблица</button>
        <button data-mode="graph" class="${mode === "graph" ? "active" : ""}">Графика</button>
      </div>
      <button class="btn" id="addStickyBtn">Добавить стикер</button>
    </div>
    <div id="canvasContent"></div>
  `;

  elements.rightBody.querySelectorAll(".mode-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      ui.viewModes[canvasType] = button.dataset.mode;
      renderCanvasEditor(canvasType);
    });
  });

  elements.rightBody.querySelector("#addStickyBtn").addEventListener("click", () => {
    addSticky(canvasType, ui.selectedSection || sectionIds(canvasType)[0]);
    renderCanvasEditor(canvasType);
    renderStickyList();
  });

  const container = elements.rightBody.querySelector("#canvasContent");
  if (mode === "table") {
    renderCanvasTable(canvasType, container);
  } else {
    renderCanvasGraph(canvasType, container);
  }
}

function renderCanvasTable(canvasType, container) {
  const sections = sectionIds(canvasType);
  const project = getCurrentProject();
  const segment = getCurrentSegment();

  container.innerHTML = `
    <div class="section-grid">
      ${sections
        .map((sectionId) => {
          const label = SECTION_LABELS[canvasType][sectionId] || sectionId;
          const stickies = state.stickies.filter((sticky) =>
            sticky.canvasType === canvasType &&
            sticky.sectionId === sectionId &&
            sticky.projectId === project.id &&
            sticky.segmentId === segment.id
          );
          return `
            <div class="section-card" data-section="${sectionId}">
              <h3>${label}</h3>
              <div class="section-items">
                ${stickies
                  .map((sticky) => renderStickyRow(sticky, canvasType))
                  .join("")}
              </div>
              <div class="toolbar">
                <button class="btn" data-action="add" data-section="${sectionId}">Добавить элемент</button>
              </div>
              <div class="field">
                <label>Быстрый ввод (каждая строка — новый элемент)</label>
                <textarea class="textarea" data-action="bulk" placeholder="Введите несколько строк..."></textarea>
                <button class="btn" data-action="bulk-add" data-section="${sectionId}">Добавить строки</button>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  container.querySelectorAll("[data-action='add']").forEach((button) => {
    button.addEventListener("click", () => {
      addSticky(canvasType, button.dataset.section);
      renderCanvasTable(canvasType, container);
      renderStickyList();
    });
  });

  container.querySelectorAll("[data-action='bulk-add']").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".section-card");
      const textarea = card.querySelector("textarea[data-action='bulk']");
      const lines = textarea.value.split(/\n+/).map((line) => line.trim()).filter(Boolean);
      lines.forEach((line) => addSticky(canvasType, button.dataset.section, line));
      textarea.value = "";
      renderCanvasTable(canvasType, container);
      renderStickyList();
    });
  });

  container.querySelectorAll("[data-sticky]").forEach((row) => {
    const sticky = state.stickies.find((item) => item.id === row.dataset.sticky);
    if (!sticky) return;

    row.querySelector("textarea").addEventListener("input", (event) => {
      sticky.text = event.target.value;
      sticky.updatedAt = now();
      saveState();
      renderStickyList();
    });

    row.querySelector("select").addEventListener("change", (event) => {
      sticky.hypothesisId = event.target.value || null;
      sticky.updatedAt = now();
      saveState();
    });

    row.querySelector("button[data-action='delete']").addEventListener("click", () => {
      state.stickies = state.stickies.filter((item) => item.id !== sticky.id);
      saveState();
      renderCanvasTable(canvasType, container);
      renderStickyList();
    });
  });
}

function renderStickyRow(sticky, canvasType) {
  return `
    <div class="section-item" data-sticky="${sticky.id}">
      <textarea>${escapeHtml(sticky.text || "")}</textarea>
      <div class="row">
        <select class="select small">
          <option value="">Без гипотезы</option>
          ${hypothesisOptions(sticky.hypothesisId)}
        </select>
        <button class="btn danger" data-action="delete">Удалить</button>
      </div>
    </div>
  `;
}

function renderCanvasGraph(canvasType, container) {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const stickies = state.stickies.filter((sticky) =>
    sticky.canvasType === canvasType && sticky.projectId === project.id && sticky.segmentId === segment.id
  );
  const query = ui.search.toLowerCase();
  const sections = sectionIds(canvasType);

  if (!ui.selectedSection) {
    ui.selectedSection = sections[0];
  }

  container.innerHTML = `
    <div class="graph-layout">
      <div class="graph-side">
        <div class="properties">
          <h4>Быстрые действия</h4>
          <div class="field">
            <label>Добавить в секцию</label>
            <select class="select small" id="graphSectionSelect">
              ${sections.map((sectionId) => `<option value="${sectionId}" ${sectionId === ui.selectedSection ? "selected" : ""}>${SECTION_LABELS[canvasType][sectionId]}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label>Поиск по тексту</label>
            <input class="input small" id="graphSearch" value="${escapeAttr(ui.search)}" placeholder="например, onboarding" />
          </div>
          <div class="toolbar">
            <button class="btn" id="graphAdd">Новый стикер</button>
          </div>
        </div>

        ${sections
          .map((sectionId) => {
            const label = SECTION_LABELS[canvasType][sectionId];
            const sectionStickies = stickies.filter((sticky) => sticky.sectionId === sectionId);
            const filtered = sectionStickies.filter((sticky) => !query || sticky.text.toLowerCase().includes(query));
            return `
              <div class="graph-section" data-section="${sectionId}">
                <h4>${label} (${sectionStickies.length})</h4>
                <ul>
                  ${filtered
                    .map((sticky) => {
                      const active = sticky.id === ui.activeStickyId;
                      return `<li data-sticky="${sticky.id}" class="${active ? "active" : ""}">${escapeHtml(sticky.text || "(без текста)")}</li>`;
                    })
                    .join("") || `<li class="small">Пусто</li>`}
                </ul>
              </div>
            `;
          })
          .join("")}

        ${renderStickyProperties(canvasType, stickies)}
      </div>

      <div class="graph-canvas">
        <div class="canvas-frame" id="canvasFrame">
          <img class="canvas-bg" src="${CANVAS_ASSETS[canvasType]}" alt="${labelCanvas(canvasType)}" />
          ${renderZoneLabels(canvasType)}
          ${stickies
            .map((sticky) => renderStickyCard(sticky, canvasType, query))
            .join("")}
        </div>
      </div>
    </div>
  `;

  container.querySelector("#graphSectionSelect").addEventListener("change", (event) => {
    ui.selectedSection = event.target.value;
  });

  container.querySelector("#graphSearch").addEventListener("input", (event) => {
    ui.search = event.target.value;
    renderCanvasGraph(canvasType, container);
    renderStickyList();
  });

  container.querySelector("#graphAdd").addEventListener("click", () => {
    addSticky(canvasType, ui.selectedSection || sections[0]);
    renderCanvasGraph(canvasType, container);
    renderStickyList();
  });

  container.querySelectorAll("[data-sticky]").forEach((item) => {
    item.addEventListener("click", () => {
      ui.activeStickyId = item.dataset.sticky;
      renderCanvasGraph(canvasType, container);
      renderStickyList();
    });
  });

  const frame = container.querySelector("#canvasFrame");
  attachDragHandlers(frame, canvasType);

  const propertiesRoot = container.querySelector("#stickyProperties");
  if (propertiesRoot) {
    bindStickyProperties(propertiesRoot, canvasType);
  }
}

function renderStickyProperties(canvasType, stickies) {
  const sticky = stickies.find((item) => item.id === ui.activeStickyId);
  if (!sticky) {
    return `
      <div class="properties" id="stickyProperties">
        <h4>Свойства стикера</h4>
        <div class="small">Выберите стикер, чтобы редактировать текст, секцию, цвет и гипотезу.</div>
      </div>
    `;
  }

  return `
    <div class="properties" id="stickyProperties" data-sticky="${sticky.id}">
      <h4>Свойства стикера</h4>
      <div class="field">
        <label>Текст</label>
        <textarea class="textarea" id="stickyText">${escapeHtml(sticky.text || "")}</textarea>
      </div>
      <div class="field">
        <label>Секция</label>
        <select class="select small" id="stickySection">
          ${sectionIds(canvasType)
            .map((sectionId) => `<option value="${sectionId}" ${sectionId === sticky.sectionId ? "selected" : ""}>${SECTION_LABELS[canvasType][sectionId]}</option>`)
            .join("")}
        </select>
      </div>
      <div class="field">
        <label>Гипотеза</label>
        <select class="select small" id="stickyHypothesis">
          <option value="">Без гипотезы</option>
          ${hypothesisOptions(sticky.hypothesisId)}
        </select>
        <button class="btn" id="stickyCreateHypothesis">Создать гипотезу</button>
      </div>
      <div class="field">
        <label>Цвет</label>
        <select class="select small" id="stickyColor">
          ${DEFAULT_COLORS.map((color) => `<option value="${color}" ${color === sticky.color ? "selected" : ""}>${color}</option>`).join("")}
        </select>
      </div>
      <div class="toolbar">
        <button class="btn danger" id="stickyDelete">Удалить стикер</button>
      </div>
    </div>
  `;
}

function renderZoneLabels(canvasType) {
  return ZONE_CONFIG[canvasType]
    .map((zone) => {
      const left = zone.x * 100;
      const top = zone.y * 100;
      return `<div class="zone-label" style="left:${left}%;top:${top}%;">${zone.label}</div>`;
    })
    .join("");
}

function renderStickyCard(sticky, canvasType, query) {
  const { x, y, w, h } = sticky.size;
  const left = sticky.position.x * 100;
  const top = sticky.position.y * 100;
  const width = w * 100;
  const height = h * 100;
  const active = sticky.id === ui.activeStickyId;
  const match = query && sticky.text.toLowerCase().includes(query);

  return `
    <div class="sticky ${active ? "active" : ""} ${match ? "match" : ""}" data-sticky="${sticky.id}"
      style="left:${left}%;top:${top}%;width:${width}%;height:${height}%;background:${sticky.color};">
      <div class="meta">${SECTION_LABELS[canvasType][sticky.sectionId] || sticky.sectionId}</div>
      <textarea readonly>${escapeHtml(sticky.text || "")}</textarea>
      <div class="sticky-actions">
        ${sticky.hypothesisId ? `<span class="badge">с гипотезой</span>` : ""}
      </div>
    </div>
  `;
}

function bindStickyProperties(root, canvasType) {
  const stickyId = root.dataset.sticky;
  const sticky = state.stickies.find((item) => item.id === stickyId);
  if (!sticky) return;

  root.querySelector("#stickyText").addEventListener("input", (event) => {
    sticky.text = event.target.value;
    sticky.updatedAt = now();
    saveState();
    renderStickyList();
  });

  root.querySelector("#stickySection").addEventListener("change", (event) => {
    sticky.sectionId = event.target.value;
    sticky.updatedAt = now();
    saveState();
    renderStickyList();
  });

  root.querySelector("#stickyHypothesis").addEventListener("change", (event) => {
    sticky.hypothesisId = event.target.value || null;
    sticky.updatedAt = now();
    saveState();
  });

  root.querySelector("#stickyColor").addEventListener("change", (event) => {
    sticky.color = event.target.value;
    sticky.updatedAt = now();
    saveState();
  });

  root.querySelector("#stickyDelete").addEventListener("click", () => {
    state.stickies = state.stickies.filter((item) => item.id !== sticky.id);
    ui.activeStickyId = null;
    saveState();
    renderApp();
  });

  root.querySelector("#stickyCreateHypothesis").addEventListener("click", () => {
    const project = getCurrentProject();
    const segment = getCurrentSegment();
    if (!project || !segment) return;
    const hypothesisId = createHypothesis(project.id, segment.id, {
      title: sticky.text.slice(0, 80) || "Новая гипотеза",
      statement: sticky.text,
    });
    sticky.hypothesisId = hypothesisId;
    saveState();
    ui.activeHypothesisId = hypothesisId;
    renderApp();
  });
}

function attachDragHandlers(frame, canvasType) {
  const stickies = frame.querySelectorAll(".sticky");
  stickies.forEach((stickyElement) => {
    stickyElement.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const stickyId = stickyElement.dataset.sticky;
      const sticky = state.stickies.find((item) => item.id === stickyId);
      if (!sticky) return;
      ui.activeStickyId = stickyId;
      renderStickyList();

      const frameRect = frame.getBoundingClientRect();
      const stickyRect = stickyElement.getBoundingClientRect();
      const offsetX = event.clientX - stickyRect.left;
      const offsetY = event.clientY - stickyRect.top;

      const onMove = (moveEvent) => {
        const x = (moveEvent.clientX - frameRect.left - offsetX) / frameRect.width;
        const y = (moveEvent.clientY - frameRect.top - offsetY) / frameRect.height;
        stickyElement.style.left = `${clamp(x, 0, 1 - sticky.size.w) * 100}%`;
        stickyElement.style.top = `${clamp(y, 0, 1 - sticky.size.h) * 100}%`;
      };

      const onUp = (upEvent) => {
        const x = (upEvent.clientX - frameRect.left - offsetX) / frameRect.width;
        const y = (upEvent.clientY - frameRect.top - offsetY) / frameRect.height;
        const clampedX = clamp(x, 0, 1 - sticky.size.w);
        const clampedY = clamp(y, 0, 1 - sticky.size.h);
        sticky.position = { x: clampedX, y: clampedY };
        const center = {
          x: clampedX + sticky.size.w / 2,
          y: clampedY + sticky.size.h / 2,
        };
        const zone = findZone(canvasType, center);
        if (zone) {
          sticky.sectionId = zone.id;
        }
        sticky.updatedAt = now();
        saveState();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        renderCanvasEditor(canvasType);
        renderStickyList();
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  });
}

function findZone(canvasType, point) {
  return ZONE_CONFIG[canvasType].find((zone) => {
    return point.x >= zone.x && point.x <= zone.x + zone.w && point.y >= zone.y && point.y <= zone.y + zone.h;
  });
}

function addSticky(canvasType, sectionId, text = "") {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) return;

  const zone = ZONE_CONFIG[canvasType].find((item) => item.id === sectionId);
  const position = zone
    ? { x: zone.x + 0.02, y: zone.y + 0.02 }
    : { x: 0.1, y: 0.1 };

  const sticky = {
    id: uid(),
    canvasType,
    projectId: project.id,
    segmentId: segment.id,
    sectionId,
    text,
    position,
    size: { w: 0.16, h: 0.12 },
    color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
    createdAt: now(),
    updatedAt: now(),
    hypothesisId: null,
  };
  state.stickies.push(sticky);
  ui.activeStickyId = sticky.id;
  saveState();
}

function createHypothesis(projectId, segmentId, defaults = {}) {
  const hypothesis = {
    id: uid(),
    projectId,
    segmentId,
    title: defaults.title || "",
    statement: defaults.statement || "",
    status: "new",
    risk: "",
    tags: "",
    notes: "",
    prompts: createPrompt(),
    createdAt: now(),
    updatedAt: now(),
  };
  state.hypotheses.push(hypothesis);
  saveState();
  return hypothesis.id;
}

function renderPrompts() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();

  if (!project || !segment) {
    elements.rightBody.innerHTML = `<div class="small">Создайте проект и сегмент.</div>`;
    return;
  }

  const canvasTypes = ["empathy", "vpd", "bmc"];

  elements.rightBody.innerHTML = `
    <div class="section-grid">
      <div class="section-card">
        <h3>Проект</h3>
        ${renderPromptFields(project.prompts, "projectPrompt")}
      </div>
      <div class="section-card">
        <h3>Сегмент</h3>
        ${renderPromptFields(segment.prompts, "segmentPrompt")}
      </div>
      ${canvasTypes
        .map((canvasType) => {
          const prompt = getCanvasPrompt(canvasType);
          return `
            <div class="section-card">
              <h3>${labelCanvas(canvasType)}</h3>
              ${renderPromptFields(prompt, `canvasPrompt-${canvasType}`)}
            </div>
          `;
        })
        .join("")}
      <div class="section-card">
        <h3>Гипотеза</h3>
        ${ui.activeHypothesisId ? renderPromptFields(getHypothesis(ui.activeHypothesisId).prompts, "promptHypothesis") : `<div class="small">Выберите гипотезу, чтобы редактировать её промпты.</div>`}
      </div>
    </div>
  `;

  bindPromptFields("projectPrompt", (patch) => {
    project.prompts = { ...project.prompts, ...patch };
    saveState();
  });
  bindPromptFields("segmentPrompt", (patch) => {
    segment.prompts = { ...segment.prompts, ...patch };
    saveState();
  });

  canvasTypes.forEach((canvasType) => {
    bindPromptFields(`canvasPrompt-${canvasType}`, (patch) => {
      updateCanvasPrompt(canvasType, patch);
    });
  });

  if (ui.activeHypothesisId) {
    bindPromptFields("promptHypothesis", (patch) => {
      const hypothesis = getHypothesis(ui.activeHypothesisId);
      hypothesis.prompts = { ...hypothesis.prompts, ...patch };
      saveState();
    });
  }
}

function renderQa() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  if (!project || !segment) {
    elements.rightBody.innerHTML = `<div class="small">Создайте проект и сегмент.</div>`;
    return;
  }

  const hypothesisCount = state.hypotheses.filter((item) => item.projectId === project.id && item.segmentId === segment.id).length;
  const stickyCount = state.stickies.filter((item) => item.projectId === project.id && item.segmentId === segment.id).length;

  elements.rightBody.innerHTML = `
    <div class="section-grid">
      <div class="section-card">
        <h3>Краткая сводка</h3>
        <p class="small">Гипотез: ${hypothesisCount}</p>
        <p class="small">Стикеров: ${stickyCount}</p>
        <p class="small">Связанных элементов: ${state.stickies.filter((item) => item.hypothesisId).length}</p>
      </div>
      <div class="section-card">
        <h3>Подсказки</h3>
        <ul class="small">
          <li>Заполняйте секции канваса через таблицу или графику — данные синхронизируются.</li>
          <li>Связывайте стикеры с гипотезами, чтобы построить единый реестр.</li>
          <li>Используйте режим графики для перетаскивания и автоопределения секций.</li>
        </ul>
      </div>
    </div>
  `;
}

function renderPromptFields(prompt, prefix) {
  const value = ensurePrompt(prompt);
  return `
    <div class="prompt-block" data-prompt="${prefix}">
      <div class="field">
        <label>System prompt</label>
        <textarea class="textarea" data-field="systemPrompt">${escapeHtml(value.systemPrompt)}</textarea>
      </div>
      <div class="field">
        <label>User prompt</label>
        <textarea class="textarea" data-field="userPrompt">${escapeHtml(value.userPrompt)}</textarea>
      </div>
      <div class="field">
        <label>Variables</label>
        <textarea class="textarea" data-field="variables">${escapeHtml(value.variables)}</textarea>
      </div>
      <div class="field">
        <label>Tags</label>
        <input class="input small" data-field="tags" value="${escapeAttr(value.tags)}" />
      </div>
      <div class="field">
        <label>Version</label>
        <input class="input small" data-field="version" value="${escapeAttr(value.version)}" />
      </div>
      <div class="field">
        <label>Notes</label>
        <textarea class="textarea" data-field="notes">${escapeHtml(value.notes)}</textarea>
      </div>
    </div>
  `;
}

function bindPromptFields(prefix, onChange) {
  const root = elements.rightBody.querySelector(`[data-prompt='${prefix}']`);
  if (!root) return;
  root.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (event) => {
      const field = event.target.dataset.field;
      onChange({ [field]: event.target.value });
    });
  });
}

function renderStickyListForCanvas(canvasType) {
  ui.tab = canvasType;
  renderApp();
}

function hypothesisOptions(selectedId) {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const list = state.hypotheses.filter((item) => item.projectId === project.id && item.segmentId === segment.id);
  return list
    .map((item) => `<option value="${item.id}" ${item.id === selectedId ? "selected" : ""}>${escapeHtml(item.title || "Без названия")}</option>`)
    .join("");
}

function statusOptions(selected) {
  const options = [
    { value: "new", label: "не проверено" },
    { value: "testing", label: "в проверке" },
    { value: "confirmed", label: "подтверждено" },
    { value: "rejected", label: "опровергнуто" },
  ];
  return options
    .map((option) => `<option value="${option.value}" ${option.value === selected ? "selected" : ""}>${option.label}</option>`)
    .join("");
}

function riskOptions(selected) {
  const options = [
    { value: "", label: "не выбран" },
    { value: "desirability", label: "желательность" },
    { value: "feasibility", label: "исполнимость" },
    { value: "viability", label: "жизнеспособность" },
  ];
  return options
    .map((option) => `<option value="${option.value}" ${option.value === selected ? "selected" : ""}>${option.label}</option>`)
    .join("");
}

function labelStatus(status) {
  return {
    new: "не проверено",
    testing: "в проверке",
    confirmed: "подтверждено",
    rejected: "опровергнуто",
  }[status] || "—";
}

function labelRisk(risk) {
  return {
    desirability: "желательность",
    feasibility: "исполнимость",
    viability: "жизнеспособность",
  }[risk] || risk || "—";
}

function labelCanvas(canvasType) {
  return {
    empathy: "Empathy Map",
    vpd: "Value Proposition Design",
    bmc: "Business Model Canvas",
  }[canvasType] || canvasType;
}

function sectionIds(canvasType) {
  return Object.keys(SECTION_LABELS[canvasType]);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function getHypothesis(id) {
  return state.hypotheses.find((item) => item.id === id);
}

function exportJson() {
  const payload = JSON.stringify(state, null, 2);
  openModal("Экспорт JSON", payload, false);
}

function exportCsv() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const hypotheses = state.hypotheses.filter((item) => item.projectId === project.id && item.segmentId === segment.id);
  const headers = ["id", "title", "statement", "status", "risk", "tags", "notes"];
  const rows = hypotheses.map((hypo) =>
    headers
      .map((key) => `"${(hypo[key] || "").toString().replace(/"/g, "\"\"")}"`)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  openModal("Экспорт CSV", csv, false);
}

function importJson() {
  openModal("Импорт JSON", "", true);
}

function openModal(title, content, editable) {
  elements.modalTitle.textContent = title;
  elements.modalTextarea.value = content;
  elements.modalTextarea.readOnly = !editable;
  elements.modal.classList.add("open");
  elements.modalApply.style.display = editable ? "inline-flex" : "none";
}

function closeModal() {
  elements.modal.classList.remove("open");
}

function applyImport() {
  const raw = elements.modalTextarea.value;
  if (!raw.trim()) return;
  const parsed = JSON.parse(raw);
  state = normalizeState(parsed);
  saveState();
  closeModal();
  renderApp();
}

function buildPromptText() {
  const project = getCurrentProject();
  const segment = getCurrentSegment();
  const blocks = [];

  if (project) {
    blocks.push(formatPromptBlock(`Проект: ${project.name}`, project.prompts));
  }
  if (segment) {
    blocks.push(formatPromptBlock(`Сегмент: ${segment.name}`, segment.prompts));
  }

  if (["empathy", "vpd", "bmc"].includes(ui.tab)) {
    blocks.push(formatPromptBlock(`Канвас: ${labelCanvas(ui.tab)}`, getCanvasPrompt(ui.tab)));
    const sticky = state.stickies.find((item) => item.id === ui.activeStickyId);
    if (sticky) {
      blocks.push(`Контекст стикера: ${sticky.text}`);
    }
  }

  const hypothesis = ui.activeHypothesisId ? getHypothesis(ui.activeHypothesisId) : null;
  if (hypothesis) {
    blocks.push(formatPromptBlock(`Гипотеза: ${hypothesis.title || "Без названия"}`, hypothesis.prompts));
    if (hypothesis.statement) {
      blocks.push(`Формулировка: ${hypothesis.statement}`);
    }
  }

  return blocks.filter(Boolean).join("\n\n");
}

function formatPromptBlock(title, prompt) {
  const data = ensurePrompt(prompt);
  const lines = [title];
  if (data.systemPrompt) lines.push(`System: ${data.systemPrompt}`);
  if (data.userPrompt) lines.push(`User: ${data.userPrompt}`);
  if (data.variables) lines.push(`Variables: ${data.variables}`);
  if (data.tags) lines.push(`Tags: ${data.tags}`);
  if (data.version) lines.push(`Version: ${data.version}`);
  if (data.notes) lines.push(`Notes: ${data.notes}`);
  return lines.join("\n");
}

function initEventListeners() {
  elements.projectSelect.addEventListener("change", () => {
    const segments = state.segments.filter((segment) => segment.projectId === elements.projectSelect.value);
    if (segments[0]) {
      elements.segmentSelect.value = segments[0].id;
    }
    renderApp();
  });

  elements.segmentSelect.addEventListener("change", () => {
    renderApp();
  });

  elements.btnProjectNew.addEventListener("click", () => {
    const name = prompt("Название проекта", "Новый проект");
    if (!name) return;
    const project = { id: uid(), name, prompts: createPrompt(), createdAt: now() };
    state.projects.push(project);
    const segment = { id: uid(), projectId: project.id, name: "Основной сегмент", prompts: createPrompt(), createdAt: now() };
    state.segments.push(segment);
    saveState();
    elements.projectSelect.value = project.id;
    elements.segmentSelect.value = segment.id;
    renderApp();
  });

  elements.btnProjectDup.addEventListener("click", () => {
    const current = getCurrentProject();
    if (!current) return;
    const clone = { ...current, id: uid(), name: `${current.name} (копия)` };
    state.projects.push(clone);
    const currentSegments = state.segments.filter((segment) => segment.projectId === current.id);
    currentSegments.forEach((segment) => {
      state.segments.push({ ...segment, id: uid(), projectId: clone.id });
    });
    saveState();
    elements.projectSelect.value = clone.id;
    renderApp();
  });

  elements.btnProjectDel.addEventListener("click", () => {
    const current = getCurrentProject();
    if (!current) return;
    if (!confirm("Удалить проект и все данные внутри?")) return;
    state.projects = state.projects.filter((project) => project.id !== current.id);
    state.segments = state.segments.filter((segment) => segment.projectId !== current.id);
    state.hypotheses = state.hypotheses.filter((hypo) => hypo.projectId !== current.id);
    state.stickies = state.stickies.filter((sticky) => sticky.projectId !== current.id);
    saveState();
    renderApp();
  });

  elements.btnSegmentNew.addEventListener("click", () => {
    const project = getCurrentProject();
    if (!project) return;
    const name = prompt("Название сегмента", "Новый сегмент");
    if (!name) return;
    const segment = { id: uid(), projectId: project.id, name, prompts: createPrompt(), createdAt: now() };
    state.segments.push(segment);
    saveState();
    elements.segmentSelect.value = segment.id;
    renderApp();
  });

  elements.btnSegmentDel.addEventListener("click", () => {
    const segment = getCurrentSegment();
    if (!segment) return;
    if (!confirm("Удалить сегмент и все данные внутри?")) return;
    state.segments = state.segments.filter((item) => item.id !== segment.id);
    state.hypotheses = state.hypotheses.filter((hypo) => hypo.segmentId !== segment.id);
    state.stickies = state.stickies.filter((sticky) => sticky.segmentId !== segment.id);
    saveState();
    renderApp();
  });

  elements.btnAddHypothesis.addEventListener("click", () => {
    ui.activeHypothesisId = null;
    renderHypothesisEditor();
    renderHypothesesList();
  });

  elements.tabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;
    ui.tab = tab.dataset.tab;
    renderApp();
  });

  elements.searchInput.addEventListener("input", (event) => {
    ui.search = event.target.value;
    renderLeftPanel();
    if (["empathy", "vpd", "bmc"].includes(ui.tab)) {
      renderCanvasEditor(ui.tab);
    }
  });

  elements.filterStatus.addEventListener("change", (event) => {
    ui.filterStatus = event.target.value;
    renderHypothesesList();
  });

  elements.filterRisk.addEventListener("change", (event) => {
    ui.filterRisk = event.target.value;
    renderHypothesesList();
  });

  elements.btnCopyPrompt.addEventListener("click", async () => {
    const text = buildPromptText();
    if (!text) return;
    await navigator.clipboard.writeText(text);
    alert("Промпт скопирован в буфер обмена");
  });

  elements.btnSave.addEventListener("click", () => {
    saveState();
    alert("Данные сохранены");
  });

  elements.btnExportJSON.addEventListener("click", exportJson);
  elements.btnExportCSV.addEventListener("click", exportCsv);
  elements.btnImportJSON.addEventListener("click", importJson);

  elements.btnResetAll.addEventListener("click", () => {
    if (!confirm("Сбросить все данные?")) return;
    state = createDefaultState();
    saveState();
    renderApp();
  });

  elements.modalClose.addEventListener("click", closeModal);
  elements.modalCopy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(elements.modalTextarea.value);
  });
  elements.modalApply.addEventListener("click", () => {
    applyImport();
  });

  window.addEventListener("resize", () => {
    if (["empathy", "vpd", "bmc"].includes(ui.tab) && ui.viewModes[ui.tab] === "graph") {
      renderCanvasEditor(ui.tab);
    }
  });
}

initEventListeners();
renderApp();
