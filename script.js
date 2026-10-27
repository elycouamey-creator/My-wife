/* ================================================================
   TOUT CE QUI EST À PERSONNALISER EST ICI, EN HAUT.
   Modifie juste les textes entre guillemets, sans toucher au reste.
   ================================================================ */

const PRENOM = "Esther";

const QUESTIONS = [
  {
    question: "Esther, quand t'as faim, tu fais quoi avec ton visage ?",
    options: ["Tu souris gentiment", "Tu serres ton visage mode 'Tchai' 😂", "Tu restes parfaitement zen"],
    correcte: 1
  },
  {
    question: "Dôkôkounou ou Bubble Tea ?",
    options: ["Dôkôkounou, sans débat", "Bubble Tea, sans débat", "Les deux, impossible de choisir"],
    correcte: 2
  },
  {
    question: "Qui a toujours raison dans nos petites embrouilles ?",
    options: ["Toi, évidemment", "Moi, clairement", "On va dire... personne 😅"],
    correcte: 2
  }
];

const EMOJIS_MEMORY = ["💜", "🧋", "🌙", "😂", "⭐", "🔥"];

const MESSAGES_SECRETS = [
  "Je sais que tu m'aimes, mais tu te rejettes toujours... moi par contre, je suis fan. Donc Tchai 😌",
  "T'es forte en vrai, même si je te le dis pas souvent. Et t'es une bonne grande sœur : tu seras une maman adorable ❤️",
  "J'aime tes fossettes en vrai 🤭"
];
const PHOTO_ESTHER = ""; // nom du fichier de sa photo, ex : "esther.jpg"
const VIDEO_DANSE = ""; // nom du fichier de sa vidéo qui danse, ex : "danse.mp4"
const TEXTE_SURPRISE = "Esther, t'as survécu au quiz, au jeu des cœurs, au memory ET à mes messages bizarres. 🏆\nMais en vrai, je voulais juste te dire : je t'aime.\nT'es forte, courageuse, et je suis fier de toi, même dans les jours difficiles.\nEt pour te faire rire un peu plus... 👇";
 

const NUMERO_TEL = ""; // exemple : "+2250000000000"
const LIEN_WHATSAPP = ""; // exemple : "https://wa.me/2250000000000"

/* ================================================================
   À PARTIR D'ICI, RIEN D'OBLIGATOIRE À MODIFIER.
   ================================================================ */

const fond = document.getElementById("fond-etoiles");
for (let i = 0; i < 40; i++) {
  const e = document.createElement("div");
  e.className = "etoile";
  e.style.left = Math.random() * 100 + "%";
  e.style.top = Math.random() * 100 + "%";
  e.style.animationDelay = (Math.random() * 3) + "s";
  fond.appendChild(e);
}

const ecrans = document.querySelectorAll(".ecran");
const barre = document.getElementById("barre");

function allerA(numero) {
  ecrans.forEach(function (s) {
    s.classList.toggle("actif", s.dataset.ecran == numero);
  });
  barre.style.width = (numero / 6 * 100) + "%";
  window.scrollTo(0, 0);
  localStorage.setItem("missMystereEtape", numero);
  if (numero == 1) afficherQuiz();
  if (numero == 3) construireMemory();
  if (numero == 4) afficherMessages();
  if (numero == 5) afficherVideos();
}

let indexQuestion = 0;
function afficherQuiz() {
  const zone = document.getElementById("zone-quiz");
  const message = document.getElementById("quiz-message");
  const boutonSuite = document.getElementById("bouton-suite-quiz");
  message.textContent = "";
  boutonSuite.style.display = "none";

  if (indexQuestion >= QUESTIONS.length) {
    zone.innerHTML = "<p>Tu connais tout par cœur... 💜</p>";
    boutonSuite.style.display = "inline-block";
    return;
  }

  const q = QUESTIONS[indexQuestion];
  zone.innerHTML =
    '<p class="quiz-question">' + q.question + "</p>" +
    '<div class="quiz-options">' +
    q.options.map(function (opt, i) {
      return '<button class="quiz-option" data-i="' + i + '">' + opt + "</button>";
    }).join("") +
    "</div>";

  zone.querySelectorAll(".quiz-option").forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const i = Number(bouton.dataset.i);
      if (i === q.correcte) {
        bouton.classList.add("bonne");
        message.textContent = "Exactement 💜";
        setTimeout(function () {
          indexQuestion++;
          afficherQuiz();
        }, 900);
      } else {
        bouton.classList.add("mauvaise");
        message.textContent = "Pas tout à fait... essaie encore !";
      }
    });
  });
}

let scoreJeu = 0;
let tempsJeu = 20;
let objectifJeu = 8;
let minuteurJeu = null;
let spawnJeu = null;

document.getElementById("jeu-objectif").textContent = objectifJeu;

function demarrerJeuCoeurs() {
  const zone = document.getElementById("zone-jeu");
  const boutonRejouer = document.getElementById("bouton-rejouer-jeu");
  const boutonSuite = document.getElementById("bouton-suite-jeu");
  zone.innerHTML = "";
  scoreJeu = 0;
  tempsJeu = 20;
  document.getElementById("jeu-score").textContent = scoreJeu;
  document.getElementById("jeu-temps").textContent = tempsJeu;
  boutonRejouer.style.display = "none";
  boutonSuite.style.display = "none";

  clearInterval(minuteurJeu);
  clearInterval(spawnJeu);

  spawnJeu = setInterval(function () {
    const coeur = document.createElement("button");
    coeur.className = "coeur-cible";
    coeur.textContent = "💗";
    const largeur = zone.clientWidth - 40;
    const hauteur = zone.clientHeight - 40;
    coeur.style.left = Math.random() * largeur + "px";
    coeur.style.top = Math.random() * hauteur + "px";
    coeur.addEventListener("click", function () {
      scoreJeu++;
      document.getElementById("jeu-score").textContent = scoreJeu;
      coeur.remove();
      if (scoreJeu >= objectifJeu) finirJeuCoeurs(true);
    });
    zone.appendChild(coeur);
    setTimeout(function () { coeur.remove(); }, 1800);
  }, 700);

  minuteurJeu = setInterval(function () {
    tempsJeu--;
    document.getElementById("jeu-temps").textContent = tempsJeu;
    if (tempsJeu <= 0) finirJeuCoeurs(scoreJeu >= objectifJeu);
  }, 1000);
}

function finirJeuCoeurs(reussi) {
  clearInterval(minuteurJeu);
  clearInterval(spawnJeu);
  document.getElementById("zone-jeu").innerHTML = "";
  const boutonRejouer = document.getElementById("bouton-rejouer-jeu");
  const boutonSuite = document.getElementById("bouton-suite-jeu");
  if (reussi) {
    boutonRejouer.style.display = "none";
    boutonSuite.style.display = "inline-block";
  } else {
    boutonRejouer.textContent = "Réessayer 💓";
    boutonRejouer.style.display = "inline-block";
  }
}

let cartesRetournees = [];
let pairesTrouvees = 0;

function construireMemory() {
  pairesTrouvees = 0;
  cartesRetournees = [];
  const grille = document.getElementById("grille-memory");
  const boutonSuite = document.getElementById("bouton-suite-memory");
  boutonSuite.style.display = "none";

  let cartes = EMOJIS_MEMORY.concat(EMOJIS_MEMORY);
  cartes.sort(function () { return Math.random() - 0.5; });

  grille.innerHTML = "";
  cartes.forEach(function (emoji) {
    const carte = document.createElement("div");
    carte.className = "carte-memory";
    carte.dataset.emoji = emoji;
    carte.textContent = "";
    carte.addEventListener("click", function () { retournerCarte(carte); });
    grille.appendChild(carte);
  });
}

function retournerCarte(carte) {
  if (carte.classList.contains("retournee") || carte.classList.contains("trouvee")) return;
  if (cartesRetournees.length === 2) return;

  carte.classList.add("retournee");
  carte.textContent = carte.dataset.emoji;
  cartesRetournees.push(carte);

  if (cartesRetournees.length === 2) {
    const a = cartesRetournees[0];
    const b = cartesRetournees[1];
    if (a.dataset.emoji === b.dataset.emoji) {
      a.classList.add("trouvee");
      b.classList.add("trouvee");
      cartesRetournees = [];
      pairesTrouvees++;
      if (pairesTrouvees === EMOJIS_MEMORY.length) {
        document.getElementById("bouton-suite-memory").style.display = "inline-block";
      }
    } else {
      setTimeout(function () {
        a.classList.remove("retournee");
        b.classList.remove("retournee");
        a.textContent = "";
        b.textContent = "";
        cartesRetournees = [];
      }, 700);
    }
  }
}

function afficherMessages() {
  const liste = document.getElementById("liste-messages");
  liste.innerHTML = "";
  MESSAGES_SECRETS.forEach(function (texte, i) {
    const carte = document.createElement("div");
    carte.className = "carte-message";
    carte.innerHTML =
      '<div class="cadenas">🔒 Message secret ' + (i + 1) + "</div>" +
      '<div class="texte-message">' + texte + "</div>";
    carte.addEventListener("click", function () {
      carte.classList.add("ouvert");
      verifierMessagesOuverts();
    });
    liste.appendChild(carte);
  });
}

function verifierMessagesOuverts() {
  const total = document.querySelectorAll(".carte-message").length;
  const ouverts = document.querySelectorAll(".carte-message.ouvert").length;
  if (ouverts === total) {
    document.getElementById("bouton-suite-messages").style.display = "inline-block";
  }
}

function afficherVideos() {
  const grille = document.getElementById("grille-videos");
  grille.innerHTML = "";
  VIDEOS.forEach(function (fichier) {
    const carte = document.createElement("div");
    carte.className = "carte-video";
    carte.innerHTML = '<video src="' + fichier + '" controls playsinline></video>';
    grille.appendChild(carte);
  });
}
function revelerSurprise() {
  document.getElementById("avant-surprise").style.display = "none";
  const contenu = document.getElementById("surprise-contenu");
  contenu.classList.add("visible");
  document.getElementById("texte-surprise").innerHTML = TEXTE_SURPRISE.replace(/\n/g, "<br>");

  const photo = document.getElementById("photo-surprise");
  if (PHOTO_ESTHER) {
    photo.src = PHOTO_ESTHER;
    photo.style.display = "block";
  } else {
    photo.style.display = "none";
  }

  const video = document.getElementById("video-surprise");
  if (VIDEO_DANSE) {
    video.src = VIDEO_DANSE;
    video.style.display = "block";
  } else {
    video.style.display = "none";
  }
}
}
