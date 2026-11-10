
function enterWorld() {
    document.getElementById("main-content").scrollIntoView({ behavior: "smooth" });
}

// ORTE AUF DER KARTE

const places = {
    auenland: {
        icon: "🌿",
        title: "Das Auenland",
        text: "Die grüne Heimat der Hobbits. Hier beginnt Frodos grosse Reise."
    },
    bruchtal: {
        icon: "🏛️",
        title: "Bruchtal",
        text: "Ein verborgenes Tal der Elben. Hier wird die Gemeinschaft des Ringes gegründet."
    },
    moria: {
        icon: "⛰️",
        title: "Moria",
        text: "Ein gewaltiges unterirdisches Zwergenreich. Einst voller Leben, später ein gefährlicher Ort."
    },
    rohan: {
        icon: "🐎",
        title: "Rohan",
        text: "Das Land der Pferdeherren. Seine Bewohner sind für ihre Reitkunst bekannt."
    },
    gondor: {
        icon: "🏰",
        title: "Gondor",
        text: "Ein mächtiges Königreich der Menschen. Minas Tirith ist seine berühmte Hauptstadt."
    },
    mordor: {
        icon: "🌋",
        title: "Mordor",
        text: "Das dunkle Land Saurons. Im Schicksalsberg kann der Eine Ring zerstört werden."
    }
};

function showPlace(place) {
    const data = places[place];
    document.getElementById("place-info").innerHTML = `
        <span class="place-icon">${data.icon}</span>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
    `;
}

// RING-MODUS

function toggleRingMode() {
    document.body.classList.toggle("ring-mode");

    if (document.body.classList.contains("ring-mode")) {
        showPopup("⚫", "Der Ring erwacht", "Die Farben verändern sich. Die Schatten werden länger. Du hast den Ring-Modus aktiviert.");
    } else {
        showPopup("🌿", "Das Licht kehrt zurück", "Mittelerde ist wieder in seinem ursprünglichen Licht.");
    }
}

function ringSecret() {
    showPopup("✨", "Ein verborgenes Zeichen", "Du hast den Ring direkt berührt. Nicht jeder entdeckt dieses kleine Geheimnis!");
}

// PERSÖNLICHKEITSTEST

const personalityQuestions = [
    {
        question: "1. Was wäre dein perfekter Tag?",
        answers: [
            ["🌻 Ein gemütlicher Tag im Grünen", "hobbit"],
            ["🌲 Ein Spaziergang durch einen Zauberwald", "elf"],
            ["💎 Etwas erschaffen und entdecken", "dwarf"],
            ["⚔️ Ein spannendes Abenteuer erleben", "human"]
        ]
    },
    {
        question: "2. Was ist deine grösste Stärke?",
        answers: [
            ["❤️ Ich bin loyal und zuverlässig", "hobbit"],
            ["✨ Ich bin kreativ und aufmerksam", "elf"],
            ["💪 Ich gebe nicht so schnell auf", "dwarf"],
            ["🦁 Ich bin mutig und entschlossen", "human"]
        ]
    },
    {
        question: "3. Wo würdest du am liebsten wohnen?",
        answers: [
            ["🏡 In einem gemütlichen Hügelhaus", "hobbit"],
            ["🌳 In einem geheimnisvollen Wald", "elf"],
            ["⛰️ In einer grossen Berghalle", "dwarf"],
            ["🏰 In einer alten Königsstadt", "human"]
        ]
    }
];

let personalityStep = 0;
let personalityScores = { hobbit: 0, elf: 0, dwarf: 0, human: 0 };

function renderPersonality() {
    const q = personalityQuestions[personalityStep];
    document.getElementById("question-title").textContent = q.question;
    document.getElementById("test-progress").textContent =
        `FRAGE ${personalityStep + 1} VON 3`;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach(([label, type]) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.onclick = () => answerPersonality(type);
        answers.appendChild(button);
    });
}

function answerPersonality(type) {
    personalityScores[type]++;
    personalityStep++;

    if (personalityStep < personalityQuestions.length) {
        renderPersonality();
        return;
    }

    const winner = Object.keys(personalityScores).sort(
        (a, b) => personalityScores[b] - personalityScores[a]
    )[0];

    const results = {
        hobbit: ["🧑‍🌾", "Du bist ein Hobbit!", "Du bist herzlich, loyal und weisst, wie wichtig Freundschaft und ein gemütliches Zuhause sind."],
        elf: ["🧝", "Du bist ein Elb!", "Du bist kreativ, aufmerksam und liebst die Schönheit der Natur und geheimnisvolle Orte."],
        dwarf: ["⛏️", "Du bist ein Zwerg!", "Du bist ausdauernd, praktisch und gibst nicht so schnell auf. Auf dich ist Verlass!"],
        human: ["⚔️", "Du bist ein Mensch!", "Du bist mutig, entschlossen und bereit, neue Wege zu gehen."]
    };

    const result = results[winner];
    document.getElementById("personality-test").innerHTML = `
        <div style="font-size:55px">${result[0]}</div>
        <h3>${result[1]}</h3>
        <p>${result[2]}</p>
        <button class="next-button" onclick="resetPersonality()">NOCHMAL TESTEN</button>
    `;
}

function resetPersonality() {
    personalityStep = 0;
    personalityScores = { hobbit: 0, elf: 0, dwarf: 0, human: 0 };
    document.getElementById("personality-test").innerHTML = `
        <h3 id="question-title"></h3>
        <div class="answers" id="answers"></div>
        <p class="test-progress" id="test-progress"></p>
    `;
    renderPersonality();
}

// MITTELERDE-QUIZ

const quizQuestions = [
    {
        question: "Wie heisst die Heimat der Hobbits?",
        answers: ["Mordor", "Das Auenland", "Rohan"],
        correct: 1,
        explanation: "Richtig! Das Auenland ist die Heimat der Hobbits."
    },
    {
        question: "Wer schmiedete den Einen Ring?",
        answers: ["Gandalf", "Elrond", "Sauron"],
        correct: 2,
        explanation: "Genau! Sauron schmiedete den Einen Ring."
    },
    {
        question: "Wie heisst die Stadt von Rohan?",
        answers: ["Edoras", "Minas Tirith", "Bruchtal"],
        correct: 0,
        explanation: "Richtig! Edoras ist die Hauptstadt von Rohan."
    },
    {
        question: "Welches Volk lebt in Moria?",
        answers: ["Elben", "Zwerge", "Hobbits"],
        correct: 1,
        explanation: "Richtig! Moria war ein grosses Zwergenreich."
    },
    {
        question: "Wo muss der Eine Ring zerstört werden?",
        answers: ["Im Auenland", "In Bruchtal", "Im Schicksalsberg"],
        correct: 2,
        explanation: "Genau! Der Ring muss im Schicksalsberg in Mordor zerstört werden."
    }
];

let quizIndex = 0;
let quizPoints = 0;
let quizAnswered = false;

function renderQuiz() {
    const q = quizQuestions[quizIndex];
    document.getElementById("quiz-number").textContent =
        `FRAGE 0${quizIndex + 1} / 05`;
    document.getElementById("quiz-question").textContent = q.question;
    document.getElementById("quiz-feedback").textContent = "";
    document.getElementById("next-question").hidden = true;
    document.getElementById("quiz-score").textContent = `Punkte: ${quizPoints}`;
    quizAnswered = false;

    const container = document.getElementById("quiz-answers");
    container.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkQuiz(index);
        container.appendChild(button);
    });
}

function checkQuiz(answer) {
    if (quizAnswered) return;
    quizAnswered = true;

    const q = quizQuestions[quizIndex];
    const buttons = document.querySelectorAll("#quiz-answers button");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === q.correct) {
            button.style.borderColor = "#d8b56d";
            button.style.background = "#3d5036";
        }
    });

    if (answer === q.correct) {
        quizPoints++;
        document.getElementById("quiz-feedback").textContent = "✦ " + q.explanation;
    } else {
        document.getElementById("quiz-feedback").textContent =
            "Noch nicht ganz! " + q.explanation;
    }

    document.getElementById("quiz-score").textContent = `Punkte: ${quizPoints}`;
    document.getElementById("next-question").hidden = false;
}

function nextQuestion() {
    quizIndex++;

    if (quizIndex >= quizQuestions.length) {
        document.getElementById("quiz-card");
        document.querySelector(".quiz-card").innerHTML = `
            <div style="font-size:45px">🏆</div>
            <h3>Deine Reise ist geschafft!</h3>
            <p>Du hast ${quizPoints} von 5 Punkten erreicht.</p>
            <p>${quizPoints === 5 ? "Unglaublich! Du kennst Mittelerde bestens." : "Gut gemacht! Vielleicht entdeckst du beim nächsten Mal noch mehr."}</p>
            <button class="next-button" onclick="restartQuiz()">NOCHMAL SPIELEN</button>
        `;
        return;
    }

    renderQuiz();
}

function restartQuiz() {
    quizIndex = 0;
    quizPoints = 0;
    document.querySelector(".quiz-card").innerHTML = `
        <div class="quiz-number" id="quiz-number"></div>
        <h3 id="quiz-question"></h3>
        <div id="quiz-answers" class="answers"></div>
        <p id="quiz-feedback"></p>
        <button class="next-button" id="next-question" onclick="nextQuestion()" hidden>WEITER ➜</button>
        <p class="quiz-score" id="quiz-score"></p>
    `;
    renderQuiz();
}

// GEHEIME TÜR

function openDoor() {
    const word = document.getElementById("secret-word").value.trim().toLowerCase();
    const feedback = document.getElementById("door-feedback");

    if (word === "mellon") {
        feedback.textContent = "✦ Die Tür öffnet sich! Willkommen in der geheimen Halle!";
        showPopup("🚪", "Die Tür ist offen!", "Du hast das richtige Wort gefunden: Mellon. Es bedeutet auf Sindarin 'Freund'.");
    } else {
        feedback.textContent = "Die Tür bleibt verschlossen. Versuche es noch einmal ...";
    }
}

// POPUP

function showPopup(symbol, title, text) {
    document.getElementById("popup-symbol").textContent = symbol;
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-text").textContent = text;
    document.getElementById("popup").classList.add("show");
}

function closePopup() {
    document.getElementById("popup").classList.remove("show");
}

document.getElementById("popup").addEventListener("click", function(event) {
    if (event.target === this) closePopup();
});

// GEHEIMNISSE

function footerSecret() {
    showPopup("🧙", "Der Wanderer", "Ein alter Wanderer war hier. Er hat eine Nachricht hinterlassen: Halte immer Ausschau nach dem Unerwarteten.");
}

let secretClicks = 0;
document.querySelector(".hero-symbol").addEventListener("click", () => {
    secretClicks++;
    if (secretClicks === 5) {
        showPopup("⭐", "Fünf Sterne!", "Du hast das geheime Zeichen fünfmal berührt. Du bist eine aufmerksame Entdeckerin!");
        secretClicks = 0;
    }
});

// START

renderPersonality();
renderQuiz();
