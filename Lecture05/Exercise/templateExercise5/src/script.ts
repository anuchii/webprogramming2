interface PianoKey {
    key: string;
    note: string;
}

interface Song {
    level: string;
    sequence: string[];
}

interface SongsData {
    songs: Song[];
}


const pianoKeys: PianoKey[] = [
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

const pianoDiv = document.getElementById("piano") as HTMLDivElement;

const whiteKeysDiv = document.createElement("div") as HTMLDivElement;
whiteKeysDiv.classList.add("white-keys");

const blackKeysDiv = document.createElement("div") as HTMLDivElement;
blackKeysDiv.classList.add("black-keys");

pianoDiv.appendChild(whiteKeysDiv);
pianoDiv.appendChild(blackKeysDiv);


pianoKeys.forEach((pianoKey: PianoKey) => {
    const keyDiv = document.createElement("div");
    keyDiv.dataset.note = pianoKey.note;

    if (pianoKey.note.includes("5")) {
        keyDiv.classList.add("key", "black");
        keyDiv.id = "key" + pianoKey.note
        keyDiv.textContent = pianoKey.note;
        blackKeysDiv.appendChild(keyDiv);

    } else {
        keyDiv.classList.add("key");
        keyDiv.textContent = pianoKey.note;
        whiteKeysDiv.appendChild(keyDiv);
    }
});


let loadedSequence: string[] = [];
let currentIndex: number = 0;

function displaySequence(): void {
    const noteLine = document.getElementById("note-line") as HTMLDivElement;
    noteLine.innerHTML = "";

    for (let i: number = 0; i < loadedSequence.length; i++) {
        const span = document.createElement("span") ;
        span.textContent = loadedSequence[i] ?? "";

        if (i === currentIndex) {
            span.classList.add("active-note");
        }

        noteLine.appendChild(span);

        if (i < loadedSequence.length - 1) {
            noteLine.innerHTML += " - ";
        }
    }
}

fetch("notes.json")
    .then(response => response.json())
    .then((data: SongsData) => {
        const firstSong = data.songs[0];
        if (firstSong) {
            loadedSequence = firstSong.sequence;
            displaySequence();
        }

        const LevelSelect = document.getElementById("level-select") as HTMLSelectElement;
        LevelSelect.addEventListener("change", function () {
            const index = parseInt(this.value);
            const selectedSong = data.songs[index];

            if (selectedSong) {
                loadedSequence = selectedSong.sequence;
                currentIndex = 0;
                displaySequence();

            }

        });
    })



const keys = document.querySelectorAll(".key");


keys.forEach(key => {
    key.addEventListener("click", () => {
        const note = (key as HTMLElement).dataset.note;
        if (note) playSound(note);
    });
});


function playSound(note: string) {
    const audio = new Audio(`sounds/${note}.mp3`)
    audio.currentTime = 0;
    audio.play();
    activateKey(note);

    if (loadedSequence[currentIndex] === note) {
        currentIndex++;
        displaySequence();
    }
}

document.addEventListener("keydown", function (event) {
    const pianoKey = pianoKeys.find(k => k.key === event.key);
    if (pianoKey) playSound(pianoKey.note);
});

function activateKey(note: string) {
    const keyDiv = document.querySelector(`[data-note="${note}"]`);
    if (keyDiv) {
        keyDiv.classList.add("active");
        setTimeout(() => keyDiv.classList.remove("active"), 200);
    }
}