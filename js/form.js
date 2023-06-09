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

const errorMessage = document.getElementById("errorMessage");

// (2) Interaktionen festlegen
emailField.addEventListener("keyup", () => {
  onChangeEmailField();
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
function validateForm(event) {
  event.preventDefault();
  
  var vorname = document.getElementById("vorname").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var anrede = document.getElementById("anrede").value;
  var geburtsdatum = document.getElementById("geburtsdatum").value;

  // Geburtsdatum validieren
  function validateGeburtsdatum(geburtsdatum) {
    var today = new Date();
    var inputDate = new Date(geburtsdatum);
    var minAge = 16;
    var age = today.getFullYear() - inputDate.getFullYear();
    var monthDiff = today.getMonth() - inputDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < inputDate.getDate())) {
      age--;
    }
    if (age < minAge) {
      return false;
    }
    return true;
  }
  
  // Email validieren
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      alert("Ungültige E-Mail-Adresse");
      return false;
  }
  
  document.getElementById("myForm").reset();
}


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
  formContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
};
