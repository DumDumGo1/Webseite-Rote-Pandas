// ==================================
// BUILD YOUR CITY – GAME LOGIC
// ==================================

let money = 1200;
let buildings = [];
let selectedBuilding = null;
let missionCompleted = false;

const buildingTypes = [
  { id: "house", name: "Wohnhaus", emoji: "🏠", price: 100, people: 8, nature: 0 },
  { id: "tower", name: "Wolkenkratzer", emoji: "🏙️", price: 250, people: 30, nature: 0 },
  { id: "shop", name: "Geschäft", emoji: "🏪", price: 150, people: 0, nature: 0 },
  { id: "school", name: "Schule", emoji: "🏫", price: 200, people: 0, nature: 0 },
  { id: "park", name: "Park", emoji: "🌳", price: 120, people: 0, nature: 10 },
  { id: "fountain", name: "Brunnen", emoji: "⛲", price: 180, people: 0, nature: 5 },
  { id: "cafe", name: "Café", emoji: "☕", price: 130, people: 0, nature: 0 },
  { id: "hospital", name: "Spital", emoji: "🏥", price: 300, people: 0, nature: 0 },
  { id: "stadium", name: "Stadion", emoji: "🏟️", price: 350, people: 0, nature: 0 },
  { id: "flower", name: "Blumenwiese", emoji: "🌷", price: 80, people: 0, nature: 15 },
  { id: "pool", name: "Schwimmbad", emoji: "🏊", price: 280, people: 0, nature: 0 },
  { id: "museum", name: "Museum", emoji: "🏛️", price: 320, people: 0, nature: 0 }
];

const $ = id => document.getElementById(id);

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==================================
// GEBÄUDEKARTEN ERSTELLEN
// ==================================

function renderBuildingOptions() {
  const grid = $("buildingGrid");
  grid.innerHTML = "";

  buildingTypes.forEach(type => {
    const card = document.createElement("button");
    card.className = "building-option";
    card.dataset.id = type.id;

    card.innerHTML = `
      <div class="building-emoji">${type.emoji}</div>
      <strong>${type.name}</strong>
      <small>${type.people > 0
        ? `${type.people} mögliche Bewohner`
        : type.nature > 0
          ? `+${type.nature} Naturpunkte`
          : "Ein neues Stadtgebäude"}
      </small>
      <span class="price">💰 ${type.price} Coins</span>
    `;

    card.addEventListener("click", () => selectBuilding(type));

    grid.appendChild(card);
  });
}

function selectBuilding(type) {
  if (money < type.price) {
    showToast("❌ Du hast nicht genügend Coins!");
    return;
  }

  selectedBuilding = type;

  document.querySelectorAll(".building-option").forEach(card => {
    card.classList.toggle("active", card.dataset.id === type.id);
  });

  $("selectedLabel").textContent =
    `${type.emoji} ${type.name} ausgewählt`;

  $("mapHint").textContent =
    `Klicke auf eine freie Stelle, um ${type.name} zu bauen!`;

  showToast(`${type.emoji} ${type.name} ausgewählt!`);
}

// ==================================
// GEBÄUDE AUF DER KARTE PLATZIEREN
// ==================================

$("cityMap").addEventListener("click", event => {
  if (!selectedBuilding) return;

  if (event.target.closest(".building")) return;

  const map = $("cityMap");
  const rect = map.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  // Nicht direkt am Rand bauen
  if (x < 6 || x > 94 || y < 6 || y > 94) {
    showToast("Baue etwas weiter innerhalb der Karte!");
    return;
  }

  if (money < selectedBuilding.price) {
    showToast("❌ Nicht genügend Coins!");
    return;
  }

  money -= selectedBuilding.price;

  const building = {
    ...selectedBuilding,
    x,
    y,
    id: Date.now() + Math.random()
  };

  buildings.push(building);
  drawBuildings();
  updateStats();

  showToast(`${building.emoji} ${building.name} wurde gebaut!`);
});

// ==================================
// GEBÄUDE ZEICHNEN
// ==================================

function drawBuildings() {
  document.querySelectorAll(".building").forEach(el => el.remove());

  const map = $("cityMap");

  buildings.forEach(building => {
    const element = document.createElement("button");

    element.className = "building";
    element.textContent = building.emoji;
    element.style.left = building.x + "%";
    element.style.top = building.y + "%";
    element.title = `${building.name} – Anklicken zum Abreissen`;

    element.addEventListener("click", event => {
      event.stopPropagation();

      const answer = confirm(
        `${building.name} abreissen?\nDu erhältst die Hälfte des Kaufpreises zurück.`
      );

      if (!answer) return;

      buildings = buildings.filter(item => item.id !== building.id);

      money += Math.floor(building.price / 2);

      drawBuildings();
      updateStats();

      showToast("🏗️ Gebäude abgerissen. Coins zurückerhalten!");
    });

    map.appendChild(element);
  });

  $("mapHint").style.display =
    buildings.length === 0 ? "block" : "none";
}

// ==================================
// STADTSTATISTIK
// ==================================

function updateStats() {
  const population = buildings.reduce(
    (sum, building) => sum + building.people, 0
  );

  const nature = buildings.reduce(
    (sum, building) => sum + building.nature, 0
  );

  const count = buildings.length;
  const level = Math.floor(count / 5) + 1;

  $("money").textContent = money.toLocaleString("de-CH");
  $("population").textContent = population;
  $("buildingCount").textContent = count;
  $("nature").textContent = nature;
  $("level").textContent = level;

  const progress = count % 5;
  const progressPercent = (progress / 5) * 100;

  $("progressBar").style.width = progressPercent + "%";
  $("progressText").textContent =
    `${progress} / 5 Gebäude bis zum nächsten Level`;

  if (count >= 5) {
    $("progressMessage").textContent =
      "🎉 Deine Stadt wächst! Baue weitere fünf Gebäude für das nächste Level.";
  } else {
    $("progressMessage").textContent =
      `Noch ${5 - count} Gebäude bis zum nächsten Stadtlevel!`;
  }
}

// ==================================
// AUSWAHL AUFHEBEN
// ==================================

$("cancelBuild").addEventListener("click", () => {
  selectedBuilding = null;

  document.querySelectorAll(".building-option").forEach(card => {
    card.classList.remove("active");
  });

  $("selectedLabel").textContent = "Wähle ein Gebäude aus";
  $("mapHint").textContent =
    "Wähle unten ein Gebäude und klicke auf eine freie Fläche!";

  showToast("Auswahl aufgehoben.");
});

// ==================================
// STADT ZURÜCKSETZEN
// ==================================

$("clearCity").addEventListener("click", () => {
  const answer = confirm(
    "Möchtest du wirklich alle Gebäude abreissen und neu beginnen?"
  );

  if (!answer) return;

  buildings = [];
  money = 1200;
  selectedBuilding = null;
  missionCompleted = false;

  document.querySelectorAll(".building-option").forEach(card => {
    card.classList.remove("active");
  });

  $("selectedLabel").textContent = "Wähle ein Gebäude aus";

  $("claimMission").textContent = "MISSION PRÜFEN";
  $("claimMission").disabled = false;

  drawBuildings();
  updateStats();

  showToast("🔄 Deine Stadt wurde zurückgesetzt!");
});

// ==================================
// STADT UMBENENNEN
// ==================================

$("renameCity").addEventListener("click", () => {
  const newName = prompt(
    "Wie soll deine Stadt heissen?",
    $("cityName").textContent
  );

  if (newName && newName.trim()) {
    $("cityName").textContent =
      newName.trim().toUpperCase().slice(0, 22);

    showToast(`🏙️ Willkommen in ${$("cityName").textContent}!`);
  }
});

// ==================================
// MISSION
// ==================================

$("claimMission").addEventListener("click", () => {
  if (missionCompleted) {
    showToast("Du hast diese Mission bereits geschafft!");
    return;
  }

  if (buildings.length >= 3) {
    missionCompleted = true;
    money += 150;

    $("claimMission").textContent = "✓ ERLEDIGT";
    $("claimMission").disabled = true;

    updateStats();

    showToast("🏆 Mission geschafft! Du erhältst 150 Coins!");
  } else {
    const missing = 3 - buildings.length;

    showToast(
      `Dir fehlen noch ${missing} Gebäude für diese Mission!`
    );
  }
});

// ==================================
// STADT FEIERN
// ==================================

$("celebrate").addEventListener("click", () => {
  if (buildings.length === 0) {
    showToast("Baue zuerst ein Gebäude. Dann wird gefeiert! 🎉");
    return;
  }

  showToast(
    `🎉 Hoch lebe ${$("cityName").textContent}! ${buildings.length} Gebäude und eine grossartige Zukunft!`
  );

  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement("div");

    sparkle.textContent = ["✨", "🎉", "⭐", "🎊"][
      Math.floor(Math.random() * 4)
    ];

    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = "-30px";
    sparkle.style.fontSize = "25px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "40";
    sparkle.style.transition = "transform 2s ease, opacity 2s ease";

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform =
        `translateY(${window.innerHeight + 60}px) rotate(360deg)`;
      sparkle.style.opacity = "0";
    });

    setTimeout(() => sparkle.remove(), 2200);
  }
});

// ==================================
// START
// ==================================

renderBuildingOptions();
updateStats();