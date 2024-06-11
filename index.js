
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const databaseSettings = {
    databaseURL: "https://gumastro-40785-default-rtdb.europe-west1.firebasedatabase.app/"
};

const dataApp = initializeApp(databaseSettings);
const database = getDatabase(dataApp);

const notesDatabase = ref(database, "notes");

const inputFieldHeader = document.getElementById("input-field-header");
const inputFieldText = document.getElementById("input-field-text");

document.getElementById("add-note-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const headerValue = inputFieldHeader.value.trim();
    const textValue = inputFieldText.value.trim();

    if (!headerValue || !textValue) {
        alert("Заполни и текст и заголовок.");
        return;
    }

    const newNoteRef = push(notesDatabase);
    set(newNoteRef, {
        header: headerValue,
        text: textValue
    });

    alert(`Заметка добавлена в базу данных под заголовком: ${headerValue}`);

    inputFieldHeader.value = "";
    inputFieldText.value = "";
});