
// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const databaseSettings = {
    databaseURL: "https://astrologer-site-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase app
const dataApp = initializeApp(databaseSettings);
const database = getDatabase(dataApp);

// References to the database locations
const notesDatabase = ref(database, "notes");

// References to the input fields and button
const inputFieldHeader = document.getElementById("input-field-header");
const inputFieldText = document.getElementById("input-field-text");

// Event listener for form submission
document.getElementById("add-note-form").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input values
    const headerValue = inputFieldHeader.value.trim();
    const textValue = inputFieldText.value.trim();

    // Check if either of the input fields is empty
    if (!headerValue || !textValue) {
        // Show an error message or perform any desired action
        alert("Please fill in both the header and text fields.");
        return; // Exit the function early if validation fails
    }

    // Push the note into the database
    const newNoteRef = push(notesDatabase);
    set(newNoteRef, {
        header: headerValue,
        text: textValue
    });

    // Show a success message
    alert(`Note added to database with header: ${headerValue}`);

    // Optionally, reset the form after successful submission
    inputFieldHeader.value = "";
    inputFieldText.value = "";
});