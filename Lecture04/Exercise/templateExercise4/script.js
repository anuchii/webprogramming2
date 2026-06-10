const pianoKeys = [
  { key: "a", note: "C" },
  { key: "w", note: "C5" },
  { key: "s", note: "D" },
  { key: "e", note: "D5" },
  { key: "d", note: "E" },
  { key: "f", note: "F" },
  { key: "t", note: "F5" },
  { key: "z", note: "G5" },
  { key: "g", note: "G" },
  { key: "h", note: "A" },
  { key: "u", note: "A5" },
  { key: "j", note: "B" },
];

const pianoDiv = document.getElementById("piano");

const whiteKeysDiv = document.createElement("div");
whiteKeysDiv.classList.add("white-keys");

const blackKeysDiv = document.createElement("div");
blackKeysDiv.classList.add("black-keys");

pianoDiv.appendChild(whiteKeysDiv);
pianoDiv.appendChild(blackKeysDiv);


pianoKeys.forEach((pianoKey) => {
  const keyDiv = document.createElement("div");
  keyDiv.dataset.note = pianoKey.note;

  keyDiv.addEventListener("click", () => {
    playSound(pianoKey.note);
  });

  if (pianoKey.note.includes("5")) {
    keyDiv.classList.add("key", "black");
    keyDiv.id = "key" + pianoKey.note;
    keyDiv.textContent = pianoKey.note;
    blackKeysDiv.appendChild(keyDiv);
  } else {
    keyDiv.classList.add("key");
    keyDiv.textContent = pianoKey.note;
    whiteKeysDiv.appendChild(keyDiv);
  }
});

let loadedSequence = [];
let currentIndex = 0;


function displaySequence() {
  const noteLine = document.getElementById("note-line");
  noteLine.innerHTML = "";

  for (let i = 0; i < loadedSequence.length; i++) {
    const span = document.createElement("span");
    span.textContent = loadedSequence[i];

    if (i === currentIndex) {
      span.classList.add("active-note");
    }

    noteLine.appendChild(span);

    if (i < loadedSequence.length - 1) {
      noteLine.appendChild(document.createTextNode(" - "));
    }
  }
}

function loadSongs(){
fetch("notes.json")
  .then(response => response.json())
  .then(data => {
    loadedSequence = data.songs[0].sequence;  
    displaySequence();

    document.getElementById("level-select")
      .addEventListener("change", function() {
        loadedSequence = data.songs[this.value].sequence;  
        currentIndex = 0;
        displaySequence();
      });
  })
  .catch(error => {
    console.error("Fehler beim Laden:", error); 
  });
}

function playSound(note) {
  const audio = new Audio(`sounds/${note}.mp3`);
  audio.currentTime = 0;
  audio.play();
  activateKey(note);

  if (loadedSequence[currentIndex] === note) {
    currentIndex++;
    displaySequence();
  }
}

function activateKey(note) {
  const keyDiv = document.querySelector(`[data-note="${note}"]`);
  if (keyDiv) {
    keyDiv.classList.add("active");
    setTimeout(() => keyDiv.classList.remove("active"), 200);
  }
}

loadSongs();

document.addEventListener("keydown", function (event) {
  const pianoKey = pianoKeys.find((k) => k.key === event.key);
  if (pianoKey) playSound(pianoKey.note);
});

