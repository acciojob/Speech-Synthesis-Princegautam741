const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Populate the list of voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === voicesDropdown.value);
}

voicesDropdown.addEventListener('change', setVoice);

// Set rate and pitch
function setOption() {
  msg[this.name] = this.value;
}

options.forEach(option => option.addEventListener('input', setOption));

// Speak and Stop functions
speakButton.addEventListener('click', () => {
  speechSynthesis.speak(msg);
});

stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});
