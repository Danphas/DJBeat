document.body.addEventListener("keyup", (event) => {
  playSound(event.code.toLowerCase());
});

document.querySelector(".composer button").addEventListener("click", () => {
  let song = document.querySelector("#input").value;

  if (song !== "") {
    let songArray = song.split("");
    playComposition(songArray);
  }
});

function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key="${sound}"]`);

  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  if (keyElement) {
    keyElement.classList.add("active");

    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 300);
  }
}

let isPlaying = false;
let intervalId;

document.getElementById("pauseButton").addEventListener("click", () => {
  if (isPlaying) {
    clearInterval(intervalId);
    isPlaying = false;
  }
});

function playComposition(songArray) {
  const bpm = parseFloat(rangeInput.value);
  const milissegundosPorBatimento = 60000 / bpm;
  let wait = 0;
  let currentNote = 0;

  isPlaying = true;

  intervalId = setInterval(() => {
    if (currentNote < songArray.length) {
      playSound(`key${songArray[currentNote]}`);
      currentNote++;
    } else {
      clearInterval(intervalId);
      isPlaying = false;
    }
  }, milissegundosPorBatimento);
}

const rangeInput = document.getElementById("rangeInput");
const rangeValueElement = document.getElementById("rangeValue");

rangeValueElement.innerHTML = rangeInput.value + " BPM";

rangeInput.addEventListener("input", function () {
  const value = parseFloat(this.value);
  rangeValueElement.innerHTML = value + " BPM";
});
