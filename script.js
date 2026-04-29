const CORRECT_EMPLOYEE_ID = "0731";
const CORRECT_PASSWORD = "ORION";

const loginScreen = document.getElementById("loginScreen");
const databaseScreen = document.getElementById("databaseScreen");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutButton = document.getElementById("logoutButton");
const revealButton = document.getElementById("revealButton");
const secretCode = document.getElementById("secretCode");
const terminalText = document.getElementById("terminalText");

const terminalLines = [
  "> Initializing secure session...",
  "> Verifying clearance level...",
  "> Access granted: limited archive mode.",
  "> Warning: Level 1 emergency override was accessed recently.",
  "> Retrieved file: DOOR_OVERRIDE_L1.txt",
  "> Awaiting user action..."
];

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = document.getElementById("employeeId").value.trim().toUpperCase();
  const password = document.getElementById("password").value.trim().toUpperCase();

  if (employeeId === CORRECT_EMPLOYEE_ID && password === CORRECT_PASSWORD) {
    loginMessage.textContent = "";
    loginScreen.classList.add("hidden");
    databaseScreen.classList.remove("hidden");
    typeTerminalLog();
  } else {
    loginMessage.textContent = "ACCESS DENIED: Invalid employee ID or password.";
  }
});

logoutButton.addEventListener("click", function () {
  databaseScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  secretCode.classList.add("hidden");
  terminalText.textContent = "";
  loginForm.reset();
});

revealButton.addEventListener("click", function () {
  secretCode.classList.remove("hidden");
  revealButton.textContent = "Override Code Revealed";
});

function typeTerminalLog() {
  terminalText.textContent = "";
  let lineIndex = 0;
  let charIndex = 0;

  function typeNextCharacter() {
    if (lineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[lineIndex];
    terminalText.textContent += currentLine.charAt(charIndex);
    charIndex++;

    if (charIndex >= currentLine.length) {
      terminalText.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextCharacter, 300);
    } else {
      setTimeout(typeNextCharacter, 22);
    }
  }

  typeNextCharacter();
}
