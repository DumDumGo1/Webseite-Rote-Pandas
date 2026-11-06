// =====================================
// THE UNREAL FACTORY – JAVASCRIPT
// =====================================

const $ = (id) => document.getElementById(id);

let candies = [];
let candyTotal = 0;
let currentCandy = null;
let currentOrder = null;
let orderNumber = 1;

// Zutaten und ihre Emojis
const flavourEmojis = {
  "Erdbeer": "🍓",
  "Zitrone": "🍋",
  "Waldbeere": "🫐",
  "Melone": "🍉",
  "Sternenstaub": "🌟",
  "Cola-Wolke": "🥤"
};

const shapeEmojis = {
  "Stern": "⭐",
  "Herz": "💖",
  "Kugel": "🔮",
  "Regenbogen": "🌈",
  "Alien": "👽",
  "Dino": "🦖"
};

const toppingEmojis = {
  "Glitzer": "✨",
  "Sternchen": "⭐",
  "Knister-Konfetti": "🎉",
  "Zauberstaub": "🪄",
  "Mini-Marshmallows": "☁️"
};

const candyNames = [
  "Galaxie-Knaller",
  "Zucker-Wirbel",
  "Glitzer-Gigant",
  "Regenbogen-Rakete",
  "Knister-Komet",
  "Sternen-Kugel",
  "Wolken-Wunder",
  "Dino-Deluxe",
  "Alien-Konfekt",
  "Konfetti-Komet",
  "Zauber-Blitz",
  "Candy-Chaos"
];

const descriptions = [
  "Diese Erfindung ist so verrückt, dass sogar die Maschinen staunen.",
  "Ein echtes Meisterwerk aus der geheimen Candy-Forschungsabteilung.",
  "Niemand weiss genau, wie das funktioniert. Aber es sieht fantastisch aus!",
  "Die Fabrik hat dieses Ergebnis als absolut aussergewöhnlich eingestuft.",
  "Ein Experiment, das eigentlich gar nicht funktionieren sollte. Eigentlich."
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// =====================================
// SÜSSIGKEITEN ERFINDEN
// =====================================

function createCandy(useRandom = false) {
  const flavour = useRandom
    ? randomItem(Object.keys(flavourEmojis))
    : $("flavour").value;

  const shape = useRandom
    ? randomItem(Object.keys(shapeEmojis))
    : $("shape").value;

  const topping = useRandom
    ? randomItem(Object.keys(toppingEmojis))
    : $("topping").value;

  const name = randomItem(candyNames);

  const candy = {
    flavour,
    shape,
    topping,
    name,
    emoji: shapeEmojis[shape],
    description: randomItem(descriptions)
  };

  currentCandy = candy;
  candies.push(candy);
  candyTotal++;

  // Ergebnis anzeigen
  $("resultEmoji").textContent = candy.emoji;
  $("resultName").textContent = candy.name;
  $("resultDescription").textContent =
    `${candy.description} Geschmack: ${flavour}. Extra: ${topping}.`;

  $("resultTags").innerHTML = `
    <span>${flavourEmojis[flavour]} ${flavour}</span>
    <span>${shapeEmojis[shape]} ${shape}</span>
    <span>${toppingEmojis[topping]} ${topping}</span>
  `;

  // Maschine animieren
  $("machineCandy").textContent = candy.emoji;
  $("machineCaption").textContent = "EXPERIMENT ERFOLGREICH!";
  $("machineCandy").classList.remove("pop");

  void $("machineCandy").offsetWidth;
  $("machineCandy").classList.add("pop");

  // Zähler aktualisieren
  updateCounters();
  renderCollection();
  updateRecipes();

  if (useRandom) {
    showToast("🎲 Überraschung! Ein neues Candy wurde erfunden!");
  } else {
    showToast("✨ Deine neue Süssigkeit ist fertig!");
  }
}

$("createCandy").addEventListener("click", () => createCandy());
$("randomCandy").addEventListener("click", () => createCandy(true));

function updateCounters() {
  $("candyCount").textContent = candyTotal;
  $("heroMade").textContent = candyTotal;
}

function renderCollection() {
  $("collectionText").textContent =
    candies.length === 1
      ? "1 Erfindung in deiner Sammlung."
      : `${candies.length} Erfindungen in deiner Sammlung.`;

  $("collection").innerHTML = "";

  // Die letzten 8 Erfindungen anzeigen
  candies.slice(-8).reverse().forEach((candy) => {
    const item = document.createElement("div");
    item.className = "collection-item";

    item.innerHTML = `
      <div>${candy.emoji}</div>
      <strong>${candy.name}</strong>
      <small>${candy.flavour} · ${candy.shape}</small>
    `;

    $("collection").appendChild(item);
  });
}

// =====================================
// FABRIKAUFTRÄGE
// =====================================

const orders = [
  {
    title: "Die Sternenstaub-Bestellung",
    description: "Eine Weltraumforscherin braucht eine Süssigkeit für ihre nächste Mission.",
    flavour: "Sternenstaub",
    shape: "Stern",
    topping: "Glitzer",
    customer: "👩‍🚀"
  },
  {
    title: "Das Dino-Dessert",
    description: "Ein Dinosaurier-Museum sucht ein ganz besonderes Eröffnungs-Candy.",
    flavour: "Erdbeer",
    shape: "Dino",
    topping: "Knister-Konfetti",
    customer: "🦖"
  },
  {
    title: "Die Alien-Lieferung",
    description: "Besuch aus dem Weltall! Die Gäste wünschen sich etwas Ausserirdisches.",
    flavour: "Cola-Wolke",
    shape: "Alien",
    topping: "Zauberstaub",
    customer: "👽"
  },
  {
    title: "Der Regenbogen-Auftrag",
    description: "Eine Regenbogen-Fee braucht eine farbenfrohe Überraschung.",
    flavour: "Melone",
    shape: "Regenbogen",
    topping: "Sternchen",
    customer: "🧚"
  },
  {
    title: "Die Wolken-Bestellung",
    description: "Eine Wolkenstadt möchte ein besonders fluffiges Candy.",
    flavour: "Waldbeere",
    shape: "Herz",
    topping: "Mini-Marshmallows",
    customer: "☁️"
  },
  {
    title: "Die Zitronen-Mission",
    description: "Ein verrückter Wissenschaftler sucht eine blitzige Erfindung.",
    flavour: "Zitrone",
    shape: "Kugel",
    topping: "Knister-Konfetti",
    customer: "🧪"
  }
];

function loadOrder() {
  currentOrder = randomItem(orders);
  orderNumber++;

  $("orderNumber").textContent =
    String(orderNumber).padStart(3, "0");

  $("orderTitle").textContent =
    currentOrder.customer + " " + currentOrder.title;

  $("orderDescription").textContent = currentOrder.description;

  $("orderRequirements").innerHTML = `
    <span class="requirement">
      ${flavourEmojis[currentOrder.flavour]} ${currentOrder.flavour}
    </span>
    <span class="requirement">
      ${shapeEmojis[currentOrder.shape]} ${currentOrder.shape}
    </span>
    <span class="requirement">
      ${toppingEmojis[currentOrder.topping]} ${currentOrder.topping}
    </span>
  `;

  $("orderFeedback").textContent =
    "Stelle zuerst im Labor eine passende Süssigkeit her!";
}

$("newOrder").addEventListener("click", () => {
  loadOrder();
  showToast("📦 Ein neuer Auftrag ist eingetroffen!");
});

$("completeOrder").addEventListener("click", () => {
  if (!currentCandy) {
    $("orderFeedback").textContent =
      "Du musst zuerst eine Süssigkeit herstellen!";
    return;
  }

  const correct =
    currentCandy.flavour === currentOrder.flavour &&
    currentCandy.shape === currentOrder.shape &&
    currentCandy.topping === currentOrder.topping;

  if (correct) {
    $("orderFeedback").textContent =
      "🎉 PERFEKT! Der Kunde ist begeistert. Auftrag erfüllt!";
    showToast("🏆 Auftrag erfolgreich abgeschlossen!");
  } else {
    $("orderFeedback").textContent =
      "Noch nicht ganz! Vergleiche die drei Zutaten mit deiner letzten Erfindung.";
  }
});

loadOrder();

// =====================================
// REZEPTBUCH
// =====================================

const recipes = [
  {
    emoji: "🌟",
    name: "Sternenstaub-Bonbon",
    requirement: 1,
    description: "Das erste Geheimnis"
  },
  {
    emoji: "🦄",
    name: "Einhorn-Konfekt",
    requirement: 3,
    description: "Für Fantasie-Fans"
  },
  {
    emoji: "👾",
    name: "Glitch-Gummibär",
    requirement: 5,
    description: "Ein Fehler? Nein!"
  },
  {
    emoji: "🌈",
    name: "Regenbogen-Wirbel",
    requirement: 8,
    description: "Bunt und verrückt"
  },
  {
    emoji: "👑",
    name: "Das legendäre Ultra-Candy",
    requirement: 12,
    description: "Das Meisterrezept"
  }
];

function updateRecipes() {
  const unlocked = recipes.filter(
    recipe => candyTotal >= recipe.requirement
  ).length;

  $("recipeProgress").textContent = `${unlocked} / ${recipes.length}`;
  $("heroRecipes").textContent = unlocked;

  $("progressFill").style.width =
    `${(unlocked / recipes.length) * 100}%`;

  $("recipesGrid").innerHTML = "";

  recipes.forEach((recipe) => {
    const isUnlocked = candyTotal >= recipe.requirement;

    const card = document.createElement("div");
    card.className = `recipe-card ${isUnlocked ? "" : "locked"}`;

    card.innerHTML = isUnlocked
      ? `
        <div class="recipe-emoji">${recipe.emoji}</div>
        <strong>${recipe.name}</strong>
        <small>✓ FREIGESCHALTET</small>
      `
      : `
        <div class="recipe-emoji">🔒</div>
        <strong>Geheimes Rezept</strong>
        <small>Ab ${recipe.requirement} Erfindungen</small>
      `;

    $("recipesGrid").appendChild(card);
  });

  if (unlocked === 5) {
    $("recipeHint").textContent =
      "👑 FABRIK-LEGENDE! Du hast alle fünf geheimen Rezepte entdeckt!";
  } else {
    $("recipeHint").textContent =
      `💡 Noch ${recipes[unlocked].requirement - candyTotal} Erfindung(en) bis zum nächsten Geheimrezept!`;
  }
}

updateRecipes();

// =====================================
// GAME 1: REAKTIONSTEST
// =====================================

let reactionTimeout;
let reactionStartTime = 0;
let reactionState = "idle";

$("reactionStart").addEventListener("click", startReaction);

function startReaction() {
  clearTimeout(reactionTimeout);

  reactionState = "waiting";

  $("reactionBox").className = "reaction-box waiting";
  $("reactionBox").textContent = "WARTE AUF GRÜN ...";
  $("reactionFeedback").textContent = "Nicht zu früh klicken!";
  $("reactionStart").textContent = "LÄUFT ...";

  const waitTime = 1500 + Math.random() * 3500;

  reactionTimeout = setTimeout(() => {
    reactionState = "ready";
    reactionStartTime = performance.now();

    $("reactionBox").className = "reaction-box ready";
    $("reactionBox").textContent = "JETZT KLICKEN!";
  }, waitTime);
}

$("reactionBox").addEventListener("click", () => {
  if (reactionState === "waiting") {
    clearTimeout(reactionTimeout);
    reactionState = "idle";

    $("reactionBox").className = "reaction-box too-soon";
    $("reactionBox").textContent = "ZU FRÜH!";
    $("reactionFeedback").textContent =
      "Ups! Warte, bis das Feld grün wird.";
    $("reactionStart").textContent = "NOCHMAL";
    return;
  }

  if (reactionState === "ready") {
    const time = Math.round(performance.now() - reactionStartTime);
    reactionState = "idle";

    $("reactionBox").className = "reaction-box";
    $("reactionBox").textContent = `${time} ms`;

    let message = "Nicht schlecht!";

    if (time < 200) {
      message = "⚡ UNGLAUBLICH! Blitzschnell!";
    } else if (time < 300) {
      message = "🔥 Wow! Sehr schnell!";
    } else if (time < 450) {
      message = "👏 Gute Reaktion!";
    }

    $("reactionFeedback").textContent = message;
    $("reactionStart").textContent = "NOCHMAL SPIELEN";
  }
});

// =====================================
// GAME 2: ZAHLEN-MYSTERY
// =====================================

let secretNumber;
let guessesLeft;

function resetGuessGame() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  guessesLeft = 5;

  $("guessInput").value = "";
  $("guessFeedback").textContent = "Du hast 5 Versuche.";
}

function makeGuess() {
  const guess = Number($("guessInput").value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    $("guessFeedback").textContent =
      "Bitte gib eine ganze Zahl zwischen 1 und 20 ein.";
    return;
  }

  guessesLeft--;

  if (guess === secretNumber) {
    $("guessFeedback").textContent =
      `🎉 RICHTIG! Die Zahl war ${secretNumber}. Du hast gewonnen!`;
    return;
  }

  if (guessesLeft === 0) {
    $("guessFeedback").textContent =
      `Game over! Die gesuchte Zahl war ${secretNumber}.`;
    return;
  }

  if (guess < secretNumber) {
    $("guessFeedback").textContent =
      `📈 Zu klein! Noch ${guessesLeft} Versuch(e).`;
  } else {
    $("guessFeedback").textContent =
      `📉 Zu gross! Noch ${guessesLeft} Versuch(e).`;
  }

  $("guessInput").value = "";
  $("guessInput").focus();
}

$("guessButton").addEventListener("click", makeGuess);
$("guessReset").addEventListener("click", resetGuessGame);

$("guessInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    makeGuess();
  }
});

resetGuessGame();

// =====================================
// KLEINES GEHEIMES EASTER EGG
// =====================================

let logoClicks = 0;

document.querySelector(".logo").addEventListener("click", (event) => {
  logoClicks++;

  if (logoClicks === 5) {
    event.preventDefault();
    showToast("👀 Du hast das geheime Fabrik-Logo entdeckt!");
    document.body.classList.add("secret-mode");

    setTimeout(() => {
      document.body.classList.remove("secret-mode");
    }, 3000);

    logoClicks = 0;
  }
});

// Zufällige Mini-Überraschung bei Klicks auf freie Bereiche
const surprises = [
  "🍬 Candy-Alarm!",
  "✨ Eine Prise Glitzer für dich!",
  "🍭 Die Fabrik dreht durch!",
  "🧁 Geheime Zuckerkraft entdeckt!",
  "🌈 Heute ist ein guter Tag für Fantasie!",
  "👾 Ein Candy-Alien wurde gesichtet!"
];

let lastSurprise = 0;

document.addEventListener("click", (event) => {
  const clickedInteractive = event.target.closest(
    "button, a, select, input, .reaction-box"
  );

  if (clickedInteractive) return;

  const now = Date.now();

  if (now - lastSurprise < 4500) return;

  lastSurprise = now;

  if (Math.random() < 0.4) {
    showToast(randomItem(surprises));
  }
});