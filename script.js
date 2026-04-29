const correctId = "0731";
const correctPass = "ORION";

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

  let chars = "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let iterations = 0;

  let interval = setInterval(() => {
    viewer.innerHTML = finalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) return letter;
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
