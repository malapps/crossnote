// --- 1. Your Firebase config (paste yours here) ---
const firebaseConfig = {
    apiKey: "AIzaSyDWPnTqWVUNOS1RAh9DtTE_OVMUobc9jPs",
    authDomain: "milk-a5681.firebaseapp.com",
    projectId: "milk-a5681",
    storageBucket: "milk-a5681.firebasestorage.app",
    messagingSenderId: "502144590699",
    appId: "1:502144590699:web:7fc917c4cedfdb78fea22e",
    measurementId: "G-KRWCX432HD"
  };

// --- 2. Initialise Firebase ---
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 3. Save note to Firestore ---
document.getElementById("saveBtn").addEventListener("click", async function () {
    const noteText = document.getElementById("noteInput").value.trim();
    if (noteText === "") return;

    await db.collection("notes").add({
        text: noteText,
        timestamp: Date.now()
    });

    document.getElementById("noteInput").value = "";
});

// --- 4. Load notes in real time ---
db.collection("notes")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
      const notesList = document.getElementById("notesList");
      notesList.innerHTML = "";

      snapshot.forEach((doc) => {
          const note = doc.data().text;

          let div = document.createElement("div");
          div.className = "note-item";
          div.textContent = note;

          notesList.appendChild(div);
      });
  });