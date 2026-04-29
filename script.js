const targetWord = "SYSTEM";
const correctId = "0731";
const correctPass = "ORION";

let wordSolved = false;

function submitGuess() {
  const input = document.getElementById("guessInput");
  const error = document.getElementById("wordError");
  const guess = input.value.trim().toUpperCase();

  error.style.color = "red";
  error.textContent = "";

  if (wordSolved) return;

  if (guess.length !== 6) {
    error.textContent = "WORD MUST BE 6 LETTERS";
    return;
  }

  if (!/^[A-Z]+$/.test(guess)) {
    error.textContent = "LETTERS ONLY";
    return;
  }

  addGuessRow(guess);

  if (guess === targetWord) {
    wordSolved = true;
    error.style.color = "#7dffd8";
    error.textContent = "KEYWORD ACCEPTED // PRESS NEXT";

    input.disabled = true;
    document.getElementById("submitWordBtn").disabled = true;
    document.getElementById("nextBtn").classList.remove("hidden");
  }

  input.value = "";
}

function addGuessRow(guess) {
  const board = document.getElementById("wordBoard");
  const targetLetters = targetWord.split("");
  const result = Array(6).fill("wrong");

  // First: exact correct letters
  for (let i = 0; i < 6; i++) {
    if (guess[i] === targetLetters[i]) {
      result[i] = "correct";
      targetLetters[i] = null;
    }
  }

  // Second: yellow letters only if target still has that letter left
  for (let i = 0; i < 6; i++) {
    if (result[i] === "correct") continue;

    const foundIndex = targetLetters.indexOf(guess[i]);

    if (foundIndex !== -1) {
      result[i] = "present";
      targetLetters[foundIndex] = null;
    }
  }

  for (let i = 0; i < 6; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile", result[i]);
    tile.textContent = guess[i];
    board.appendChild(tile);
  }
}

function goToLogin() {
  document.getElementById("wordGate").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
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
