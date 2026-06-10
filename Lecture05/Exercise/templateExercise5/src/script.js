var PianoKey = /** @class */ (function () {
    function PianoKey(key, note) {
        this.note = note;
        this.key = key;
    }
    PianoKey.prototype.playSound = function () {
        var audio = new Audio("sounds/".concat(this.note, ".mp3"));
        audio.currentTime = 0;
        audio.play();
        activateKey(this.note);
        if (loadedSequence[currentIndex] === this.note) {
            currentIndex++;
            displaySequence();
        }
    };
    return PianoKey;
}());
var pianoKeys = [
    new PianoKey("a", "C"),
    new PianoKey("w", "C5"),
    new PianoKey("s", "D"),
    new PianoKey("e", "D5"),
    new PianoKey("d", "E"),
    new PianoKey("f", "F"),
    new PianoKey("t", "F5"),
    new PianoKey("z", "G5"),
    new PianoKey("g", "G"),
    new PianoKey("h", "A"),
    new PianoKey("u", "A5"),
    new PianoKey("j", "B"),
];
var pianoDiv = document.getElementById("piano");
var whiteKeysDiv = document.createElement("div");
whiteKeysDiv.classList.add("white-keys");
var blackKeysDiv = document.createElement("div");
blackKeysDiv.classList.add("black-keys");
pianoDiv.appendChild(whiteKeysDiv);
pianoDiv.appendChild(blackKeysDiv);
pianoKeys.forEach(function (pianoKey) {
    var keyDiv = document.createElement("div");
    keyDiv.dataset.note = pianoKey.note;
    keyDiv.addEventListener("click", function () {
        pianoKey.playSound();
    });
    if (pianoKey.note.includes("5")) {
        keyDiv.classList.add("key", "black");
        keyDiv.id = "key" + pianoKey.note;
        keyDiv.textContent = pianoKey.note;
        blackKeysDiv.appendChild(keyDiv);
    }
    else {
        keyDiv.classList.add("key");
        keyDiv.textContent = pianoKey.note;
        whiteKeysDiv.appendChild(keyDiv);
    }
});
var loadedSequence = [];
var currentIndex = 0;
function displaySequence() {
    var _a;
    var noteLine = document.getElementById("note-line");
    noteLine.innerHTML = "";
    for (var i = 0; i < loadedSequence.length; i++) {
        var span = document.createElement("span");
        span.textContent = (_a = loadedSequence[i]) !== null && _a !== void 0 ? _a : "";
        if (i === currentIndex) {
            span.classList.add("active-note");
        }
        noteLine.appendChild(span);
        if (i < loadedSequence.length - 1) {
            noteLine.appendChild(document.createTextNode(" - "));
        }
    }
}
function loadSongs() {
    fetch("notes.json")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var firstSong = data.songs[0];
        if (firstSong) {
            loadedSequence = firstSong.sequence;
            displaySequence();
        }
        var levelSelect = document.getElementById("level-select");
        levelSelect.addEventListener("change", function () {
            var index = parseInt(this.value);
            var selectedSong = data.songs[index];
            if (selectedSong) {
                loadedSequence = selectedSong.sequence;
                currentIndex = 0;
                displaySequence();
            }
        });
    })
        .catch(function (error) {
        console.error("Fehler beim Laden:", error);
    });
}
function activateKey(note) {
    var keyDiv = document.querySelector("[data-note=\"".concat(note, "\"]"));
    if (keyDiv) {
        keyDiv.classList.add("active");
        setTimeout(function () { return keyDiv.classList.remove("active"); }, 200);
    }
}
document.addEventListener("keydown", function (event) {
    var pianoKey = pianoKeys.find(function (k) { return k.key === event.key; });
    if (pianoKey)
        pianoKey.playSound();
});
loadSongs();
