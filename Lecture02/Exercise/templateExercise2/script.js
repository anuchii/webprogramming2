const keys = document.querySelectorAll(".key");
const keyMap = {
    "a": "C",
    "s": "D",
    "d": "E",
    "f": "F",
    "g": "G",
    "h": "A",
    "j": "B",
    "w": "C#",
    "e": "D#",
    "r": "F#",
    "t": "G#",
    "z": "A#",  
};

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playSound(note);
  });
});

function playSound(note) {
  const encodedNote = encodeURIComponent(note);

  let fileName;

  if (note.includes("#")) {
    fileName = `sounds/${encodedNote}4.mp3`;
  } else {
    fileName = `sounds/${encodedNote}.mp3`;
  }

  const audio = new Audio(fileName);
  audio.play();
}

document.addEventListener("keydown", function(event) {
    const note = keyMap[event.key];
    if (note) playSound(note);
});