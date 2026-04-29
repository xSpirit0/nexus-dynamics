const correctId = "0731";
const correctPass = "ORION";

const bootLines = [
  "Loading Nexus kernel...",
  "Connecting to SYSTEM-7...",
  "Verifying encrypted gateway...",
  "Scanning employee database...",
  "Secure portal ready."
];

let bootIndex = 0;
let typingTimer = null;

const bootText = document.getElementById("bootText");

function bootSequence() {
  if (bootIndex < bootLines.length) {
    bootText.innerHTML += bootLines[bootIndex] + "<br>";
    bootIndex++;
    setTimeout(bootSequence, 650);
  } else {
    setTimeout(() => {
      document.getElementById("bootScreen").style.display = "none";
    }, 700);
  }
}

bootSequence();

function login() {
  const id = document.getElementById("id").value.trim();
  const pass = document.getElementById("pass").value.trim().toUpperCase();
  const error = document.getElementById("error");

  if (id === correctId && pass === correctPass) {
    error.textContent = "";
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    typeViewer("ACCESS GRANTED...\nLoading Nexus Archive...");
  } else {
    error.textContent = "ACCESS DENIED // INVALID CREDENTIALS";
  }
}

function openFile(file) {
  let text = "";

  if (file === 1) {
    text = `FILE: staff_registry.log

EMPLOYEE: Dr. Elias Voss
STATUS: Missing
LAST KNOWN LOCATION: Level 1 Archive Room

NOTE:
Employee ID fragments were printed before the lockdown.`;
  }

  if (file === 2) {
    text = `FILE: security_memo.txt

SYSTEM NOTICE:
All Level 1 override codes were removed from local terminals.

Only encrypted vault files may contain emergency access data.

WARNING:
SYSTEM-7 detected abnormal activity before shutdown.`;
  }

  if (file === 3) {
    text = `FILE: vault_override.enc

Decrypting archive...
Integrity check complete.

VAULT OVERRIDE CODE:
4927

MESSAGE:
Use this code on the Level 1 exit keypad.`;
  }

  typeViewer(text);
}

function typeViewer(text) {
  const viewer = document.getElementById("viewer");

  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  viewer.innerHTML = "";
  let index = 0;

  typingTimer = setInterval(() => {
    const char = text.charAt(index);
    viewer.innerHTML += char === "\n" ? "<br>" : char;
    index++;

    if (index >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 14);
}
