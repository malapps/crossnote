const firebaseConfig = {
    apiKey: "AIzaSyDWPnTqWVUNOS1RAh9DtTE_OVMUobc9jPs",
    authDomain: "milk-a5681.firebaseapp.com",
    projectId: "milk-a5681",
    storageBucket: "milk-a5681.firebasestorage.app",
    messagingSenderId: "502144590699",
    appId: "1:502144590699:web:7fc917c4cedfdb78fea22e",
    measurementId: "G-KRWCX432HD"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("saveBtn").addEventListener("click", async function () {
    const noteText = document.getElementById("noteInput").value.trim();
    if (noteText === "") return;

    await db.collection("notes").add({
        text: noteText,
        timestamp: Date.now()
    });

    document.getElementById("noteInput").value = "";
});

document.getElementById("deleteBtn").addEventListener("click", async function () {
    const checkboxes = document.querySelectorAll(".note-checkbox:checked");

    for (let box of checkboxes) {
        const id = box.getAttribute("data-id");
        await db.collection("notes").doc(id).delete();
    }
});

db.collection("notes")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
      const notesList = document.getElementById("notesList");
      notesList.innerHTML = "";

      snapshot.forEach((doc) => {
          const data = doc.data();

          const container = document.createElement("div");
          container.className = "note-item";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "note-checkbox";
          checkbox.setAttribute("data-id", doc.id);

          const text = document.createElement("div");
          text.className = "note-text";
          text.textContent = data.text;

          container.appendChild(checkbox);
          container.appendChild(text);

          notesList.appendChild(container);
      });
  });