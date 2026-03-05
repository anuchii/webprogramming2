const keys = document.querySelectorAll(".key");


keys.forEach(key => {
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
    audio.currentTime = 0;
    audio.play();
}


document.addEventListener("keydown", function(event) {

    if (event.key === "a") playSound("C");
    if (event.key === "s") playSound("D");
    if (event.key === "d") playSound("E");
    if (event.key === "f") playSound("F");
    if (event.key === "g") playSound("G");
    if (event.key === "h") playSound("A");
    if (event.key === "j") playSound("B");

});