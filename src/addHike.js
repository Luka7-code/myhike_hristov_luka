import { db } from "./firebaseConfig.js";
import { onAuthReady } from "./authentication.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

let currentUser = null;

onAuthReady(function (user) {
  if (!user) {
    location.href = "index.html";
  } else {
    currentUser = user;
  }
});

async function saveHike(event) {
  event.preventDefault();

  const newHike = {
    name: document.getElementById("hikeNameInput").value,
    city: document.getElementById("cityInput").value,
    level: document.getElementById("levelInput").value,
    length: Number(document.getElementById("lengthInput").value),
    details: document.getElementById("detailsInput").value,
    owner: currentUser.uid,
    ownerName: currentUser.displayName || currentUser.email,
    lastUpdated: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "hikes"), newHike);
    location.href = "main.html";
  } catch (error) {
    alert("Error saving hike: " + error.message);
  }
}

document.getElementById("addHikeForm").addEventListener("submit", saveHike);
