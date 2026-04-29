const targetWord = "SYSTEM";
const correctId = "0731";
const correctPass = "ORION";

function submitGuess() {
  const input = document.getElementById("guessInput");
  const error = document.getElementById("wordError");
  const guess = input.value.trim().toUpperCase();

  error.textContent = "";

  if (guess.length !== 6) {
    error.textContent = "WORD MUST BE 6 LETTERS";
    return;
  }

  addGuessRow(guess);

  if (guess === targetWord) {
    error.style.color = "#7dffd8";
    error.textContent = "KEYWORD ACCEPTED // REDIRECTING...";

    setTimeout(() => {
      document.getElementById("wordGate").classList.add("hidden");
      document.getElementById("loginBox").classList.remove("hidden");
    }, 900);
  }

  input.value = "";
}

function addGuessRow(guess) {
  const board = document.getElementById("wordBoard");

  for (let i = 0; i < 6; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = guess[i];

    if (guess[i] === targetWord[i]) {
      tile.classList.add("correct");
    } else if (targetWord.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("wrong");
    }

    board.appendChild(tile);
  }
}

document.getElementById("guessInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    submitGuess();
  }
});

function login() {
  const id = document.getElementById("id").value.trim();
  const pass = document.getElementById("pass").value.trim().toUpperCase();
  const error = document.getElementById("error");

  if (id === correctId && pass === correctPass) {
    error.textContent = "";

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    setViewer("> access granted\n> loading corrupted archive...");
  } else {
    error.textContent = "ACCESS DENIED // SYSTEM-7 ALERT";
  }
}

function openFile(file) {
  let text = "";

  if (file === 1) {
    text = `FILE: staff_registry.log

EMPLOYEE: Dr. Elias Voss
STATUS: MISSING
LAST LOCATION: LEVEL 1 ARCHIVE

NOTE:
Employee ID fragments were printed before shutdown.`;
  }

  if (file === 2) {
    text = `FILE: security_memo.txt

SYSTEM NOTICE:
Override codes removed from terminals.

Only encrypted vault file contains emergency access.

SYSTEM-7 LOG:
Unusual behavior detected before failure.`;
  }

  if (file === 3) {
    glitchReveal(`FILE: vault_override.enc

DECRYPTING...

██████████████ 100%

VAULT OVERRIDE CODE:
4927

MESSAGE:
Use this code on Level 1 exit keypad.`);
    return;
  }

  setViewer(text);
}

function setViewer(text) {
  document.getElementById("viewer").innerHTML =
    text.replace(/\n/g, "<br>");
}

function glitchReveal(finalText) {
  const viewer = document.getElementById("viewer");
  const chars = "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let iterations = 0;

  const interval = setInterval(() => {
    viewer.innerHTML = finalText
      .split("")
      .map((letter, index) => {
        if (index < iterations || letter === "\n" || letter === " ") return letter;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("")
      .replace(/\n/g, "<br>");

    if (iterations >= finalText.length) {
      clearInterval(interval);
      setViewer(finalText);
    }

    iterations += 2;
  }, 30);
}
