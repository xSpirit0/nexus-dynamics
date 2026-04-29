const correctId = "0731";
const correctPass = "ORION";

const bootLines = [
  "Loading Nexus kernel...",
  "Connecting to SYSTEM-7...",
  "Verifying encrypted gateway...",
  "Scanning employee database...",
  "Secure portal ready."
];

let i = 0;
const bootText = document.getElementById("bootText");

function bootSequence() {
  if (i < bootLines.length) {
    bootText.innerHTML += bootLines[i] + "<br>";
    i++;
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
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    typeViewer("ACCESS GRANTED...\nLoading Nexus Archive...");
  } else {
    error.textContent = "ACCESS DENIED // INVALID CREDENTIALS";
    document.body.classList.add("shake");

    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 400);
  }
}

function openFile(file) {
  if (file === 1) {
    typeViewer(
`FILE: staff_registry.log

EMPLOYEE: Dr. Elias Voss
STATUS: Missing
LAST KNOWN LOCATION: Level 1 Archive Room

NOTE:
Employee ID fragments were printed before the lockdown.`
    );
  }

  if (file === 2) {
    typeViewer(
`FILE: security_memo.txt

SYSTEM NOTICE:
All Level 1 override codes were removed from local terminals.

Only encrypted vault files may contain emergency access data.

WARNING:
SYSTEM-7 detected abnormal activity before shutdown.`
    );
  }

  if (file === 3) {
    typeViewer(
`FILE: vault_override.enc

Decrypting...
████████████████ 100%

VAULT OVERRIDE CODE:
4927

MESSAGE:
Use this code on the Level 1 exit keypad.`
    );
  }
}

function typeViewer(text) {
  const viewer = document.getElementById("viewer");
  viewer.innerHTML = "";
  let index = 0;

  const interval = setInterval(() => {
    viewer.innerHTML += text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 18);
}
