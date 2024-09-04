"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  const maxNumber = Number($maxUsr.value);
  if (isNaN(maxNumber) || maxNumber <= 0) {
    $output.textContent = "Veuillez entrer un nombre valide supérieur à 0 pour le maximum.";
    return;
  }

  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  maxGuesses = Math.floor(Math.random() * maxNumber) + 1;
  nbGuesses = 0;
  
  console.log('Jeu démarré :');
  console.log('Nombre maximum :', maxNumber);
  console.log('Nombre secret :', secretNumber);
  console.log('Nombre maximum d\'essais :', maxGuesses);
  console.log('Types - secretNumber :', typeof secretNumber, 'maxGuesses:', typeof maxGuesses);
  
  $output.textContent = `Le jeu commence ! Trouvez un nombre entre 1 et ${maxNumber}. Vous avez ${maxGuesses} essais.`;
  $guessBtn.disabled = false;
  $numUsr.disabled = false;
  $numUsr.value = '';
  $numUsr.focus();
}

function checkGuess() {
  const userGuess = Number($numUsr.value);
  
  console.log('Vérification de la supposition :');
  console.log('Entrée de l\'utilisateur (chaîne) :', $numUsr.value);
  console.log('Supposition de l\'utilisateur (nombre) :', userGuess);
  console.log('Nombre secret :', secretNumber);
  console.log('Types - userGuess :', typeof userGuess, 'secretNumber :', typeof secretNumber);
  
  if (isNaN(userGuess)) {
    $output.textContent += `\nVeuillez entrer un nombre valide.`;
    return;
  }

  nbGuesses++;

  if (userGuess === secretNumber) {
    console.log('CORRESPONDANCE : userGuess === secretNumber');
    $output.textContent += `\nBravo ! Vous avez trouvé le nombre ${secretNumber} en ${nbGuesses} essais.`;
    $guessBtn.disabled = true;
  } else if (nbGuesses >= maxGuesses) {
    console.log('NOMBRE MAX D\'ESSAIS ATTEINT');
    $output.textContent += `\nDésolé, vous avez épuisé vos ${maxGuesses} essais. Le nombre était ${secretNumber}.`;
    $guessBtn.disabled = true;
  } else if (userGuess < secretNumber) {
    console.log('TROP BAS : userGuess < secretNumber');
    $output.textContent += `\nEssai ${nbGuesses} : ${userGuess} est trop bas.`;
  } else {
    console.log('TROP HAUT : userGuess > secretNumber');
    $output.textContent += `\nEssai ${nbGuesses} : ${userGuess} est trop haut.`;
  }
  
  $numUsr.value = '';
  $numUsr.focus();
}

function checkGuess() {
  const userGuess = parseInt($numUsr.value, 10);
  
  console.log('Vérification de la supposition :');
  console.log('Entrée de l\'utilisateur (chaîne) :', $numUsr.value);
  console.log('Supposition de l\'utilisateur (nombre) :', userGuess);
  console.log('Nombre secret :', secretNumber);
  console.log('Types - userGuess :', typeof userGuess, 'secretNumber :', typeof secretNumber);
  
  if (isNaN(userGuess)) {
    $output.textContent += `\nVeuillez entrer un nombre valide.`;
    return;
  }

  nbGuesses++;

  if (userGuess === secretNumber) {
    console.log('MATCH: userGuess === secretNumber');
    $output.textContent += `\nBravo ! Vous avez trouvé le nombre ${secretNumber} en ${nbGuesses} essais.`;
    $guessBtn.disabled = true;
  } else if (nbGuesses >= maxGuesses) {
    console.log('MAX GUESSES ATTEINT');
    $output.textContent += `\nDésolé, vous avez épuisé vos ${maxGuesses} essais. Le nombre était ${secretNumber}.`;
    $guessBtn.disabled = true;
  } else if (userGuess < secretNumber) {
    console.log('Trop bas: userGuess < secretNumber');
    $output.textContent += `\nEssai ${nbGuesses}: ${userGuess} est trop bas.`;
  } else {
    console.log('Trop haut: userGuess > secretNumber');
    $output.textContent += `\nEssai ${nbGuesses}: ${userGuess} est trop haut.`;
  }
  
  $numUsr.value = '';
  $numUsr.focus();
}

// Attacher la fonction launchGame à l'événement click du bouton "Lancer le jeu"
$startBtn.addEventListener("click", launchGame);

// Attacher la fonction checkGuess à l'événement click du bouton "Vérifier"
$guessBtn.addEventListener("click", checkGuess);

// Permettre à l'utilisateur d'appuyer sur Entrée pour vérifier la supposition au lieu de cliquer sur le bouton
$numUsr.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Initialisation
$guessBtn.disabled = true;
$output.textContent = "Cliquez sur 'Lancer le jeu' pour commencer.";

function addCow(evt) {
  console.debug(evt.x, evt.y);
  
  const cow = document.createElement('img');
  cow.src = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg';
  cow.classList.add('cow');
  cow.style.position = 'absolute';
  cow.style.left = `${evt.x}px`;
  cow.style.top = `${evt.y}px`;
  
  // Rotation aléatoire
  const rotation = Math.floor(Math.random() * 360);
  cow.style.transform = `rotate(${rotation}deg)`;
  
  document.body.appendChild(cow);
}

// Fonction qui bascule le comportement de l'événement mousedown du document
function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
    $cowBtn.textContent = 'Vacher';
  } else {
    document.onmousedown = addCow;
    $cowBtn.textContent = 'Dévacher';
  }
}

$cowBtn.addEventListener("click", toggleCow);