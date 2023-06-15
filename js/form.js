const element = document.querySelector('.wettbewerb');

element.addEventListener('mouseover', () => {
  element.style.backgroundColor = '#FEC2C3';
});

element.addEventListener('mouseout', () => {
  element.style.backgroundColor = 'black';
});


const button = document.getElementById('hover-button');

button.addEventListener('mouseover', function() {
  button.style.fontSize = '17px';
  button.style.padding = '14px 16px';
});

button.addEventListener('mouseout', function() {
  button.style.fontSize = '15px';
  button.style.padding = '8px 10px';
});






// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const thankYouContainer = document.getElementById("thankYouContainer");
const submitButton = document.getElementById("submit");
submitButton.disabled = true;
const emailField = document.getElementById("email");
const anredeField = document.getElementById("anrede");
const vornameField = document.getElementById("vorname");
const nameField = document.getElementById("name");
const geburtsdatumField = document.getElementById("geburtsdatum");


// (2) Interaktionen festlegen
emailField.addEventListener("keyup", () => {
  onChangeEmailField(); 
  event.preventDefault();
  validateForm(); 
});
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});

// (3) Interaktionen Code
const onChangeEmailField = () => {
  if (emailField.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

// (4) JS Validierung

document.getElementById('submit').addEventListener('click', function(event) {
  var emailInput = document.getElementById('email');
  var emailPattern = new RegExp(emailInput.getAttribute('pattern'));

  if (!emailPattern.test(emailInput.value)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      event.preventDefault();
  }
});


const onClickSubmit = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "Notfall1", // SQL Gruppen Namen
    pw: "1a42e818", // SQL Passwort
    tableName: "formular", // Name der Tabelle in der SQL Datenbank

    columns: {
      // "email" Name der Spalte in der SQL Tabelle
      // "emailField.value" Eingabe des Benutzers aus dem Formularfeld
      email: emailField.value,
      anrede: anredeField.value,
      vorname: vornameField.value,
      name: nameField.value,
      geburtsdatum: geburtsdatumField.value,
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, eine Dankeschön Nachricht erscheint
  // [RH] disabled CSS Klasse fehlt 
  formContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
};

function startSpin() {
  var spinner = document.getElementById("spinner-container");
  var arrow = document.querySelector(".arrow");

  // Zufälligen Drehwinkel generieren (0 - 359 Grad)
  var randomRotation = Math.floor(Math.random() * 360);

  // Drehscheibe um den zufälligen Drehwinkel drehen
  spinner.style.transform = "rotate(" + randomRotation + "deg)";

  // Pfeil zur Mitte der Drehscheibe ausrichten
  arrow.style.transform = "rotate(" + (-randomRotation) + "deg)";
}
