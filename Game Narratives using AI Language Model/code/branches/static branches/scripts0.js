const introScreen = document.getElementById('intro-screen');
const introText = document.getElementById('intro-text');
const chooseCharacterScreen = document.getElementById('choose-character-screen');
const characterOptions = document.querySelectorAll('.character-option');
const loadingScreen = document.getElementById('loading-screen');
const narrativeScreen = document.getElementById('narrative-screen');
const narrativeOutput = document.getElementById('narrative-output');

function typeWriter(element, text, delay, callback) {
  let index = 0;
  const typeInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(typeInterval);
      setTimeout(callback, delay);
    }
  }, 50);
}

function fadeScreen(screen) {
  const screens = document.getElementsByClassName('fade');
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.remove('show');
  }
  screen.classList.add('show');
}


function handleCharacterClick(character) {
  fadeScreen(loadingScreen);

  // Simulate loading delay for demonstration purposes
  setTimeout(() => {
    fadeScreen(narrativeScreen);
    generateNarrative(character); // Call the function to generate the narrative
  }, 2000);
}

function generateNarrative(character) {
  const narrativePrompt = `You are ${character}, standing in a post-apocalyptic world. Describe the situation and provide two options to continue the story.`;

  // Make an API call to your Flask server to generate the narrative
  fetch('/generate_narrative', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      choice: character,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Display the generated narrative in the narrative-output element
      narrativeOutput.textContent = data.narrative;
    })
    .catch(error => {
      console.error('Error generating narrative:', error);
    });
}

introScreen.classList.add('show');
typeWriter(introText, 'Welcome to the Game Narratives Generator!', 2000, () => {
  fadeScreen(chooseCharacterScreen);
});

characterOptions.forEach(option => {
  option.addEventListener('click', () => {
    const character = option.getAttribute('data-character');
    handleCharacterClick(character);
  });
});