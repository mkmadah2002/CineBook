"use strict";

// Bienvenue dans le fichier de travail principal de CineBook !
// Le HTML et les données sont prêts, mais les interactions sont volontairement absentes.
// La page contient déjà un exemple statique complet pour montrer le résultat attendu.
// Inspectez et copiez la structure HTML utile, puis remplacez ces exemples avec
// les éléments que votre code crée à partir des tableaux de data.js.
// Avancez section par section et testez souvent dans le navigateur.

// ==================================================
// 0 - SÉLECTIONNER LES ÉLÉMENTS HTML
// ==================================================
// OBJECTIF : garder des références vers les zones qui seront modifiées.
// NOTIONS UTILES : const, document.querySelector(), document.getElementById().
// QUESTIONS : Quel identifiant correspond au catalogue ? Au prix total ?
// TODO : créez ici des constantes explicites pour les éléments nécessaires.
// ÉCRIVEZ VOTRE CODE ICI :

const filmsContaner = document.querySelector("#films-container");

// ==================================================
// 0 BIS - MÉMORISER L'ÉTAT DE L'APPLICATION
// ==================================================
// OBJECTIF : mémoriser temporairement le film, la séance et les sièges choisis.
// Les données décrivent les films ; l'état décrit les choix actuels de l'utilisateur.
// NOTIONS UTILES : let, null, tableau vide [].
// PISTES : que faut-il remettre à zéro lorsqu'un autre film est choisi ?
// TODO : déclarez trois variables avec des valeurs initiales adaptées.
// ÉCRIVEZ VOTRE CODE ICI :
let currentfilm = {};
let seanceid = 0;
let reserved = []

// ==================================================
// US01 - AFFICHER LES FILMS
// ==================================================
// OBJECTIF : créer une carte pour chaque objet du tableau "films" et l'ajouter
// dans #films-container.
// NOTIONS UTILES : forEach, createElement ou innerHTML, propriétés d'un objet.
// QUESTIONS : Comment parcourir films ? Comment utiliser film.affiche et film.titre ?
// TODO : 1) vider les cartes statiques ; 2) construire les cartes ; 3) les insérer.
// PISTE : ajoutez l'identifiant du film dans un attribut data-film-id du bouton.
// MODÈLE : observez l'élément <article data-film-id="1"> dans index.html.
// ÉCRIVEZ VOTRE CODE ICI :

for (let i = 0; i < films.length; i++) {
  const newCard = `    
    <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg" data-film-id="${films[i].id}">
        <div class="relative">
            <img src="${films[i].affiche}" alt="${films[i].description}" class="aspect-[2/3] w-full object-cover">
            <span class="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold shadow-lg">
               ${films[i].prix} DH
            </span>
        </div>
        <div class="p-4">
               <p class="text-xs font-bold uppercase tracking-wider text-cine-red">${films[i].genre}</p>
               <h3 class="mt-1 text-lg font-black">${films[i].titre}</h3>
               <p class="mt-2 text-sm text-slate-500">${Math.floor(films[i].duree / 60)} h ${films[i].duree % 60} m</p>
               <button id="${films[i].id}" type="button" class="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-extrabold text-slate-700">Choisir
                  ce film</button>
        </div>
    </article>
    `;

  filmsContaner.innerHTML += newCard;
}

// ==================================================
// US02 - SÉLECTIONNER UN FILM
// ==================================================
// OBJECTIF : réagir au clic sur une carte, retrouver le film correspondant et
// afficher ses informations dans #film-details.
// NOTIONS UTILES : addEventListener, Number(), find(), textContent, classList.
// QUESTIONS : Où lire l'id du bouton ? Comment comparer cet id à film.id ?
// TODO : écouter les clics, modifier l'état et mettre à jour les détails.
// PISTE : un changement de film doit aussi réinitialiser séance et sièges.
// MODÈLE : #film-details contient déjà un exemple de détail à reproduire.
// ÉCRIVEZ VOTRE CODE ICI :
function selectionFilm() {
  const btns = filmsContaner.querySelectorAll('[type="button"]');
  const filmdet = document.querySelector("#film-details");

  btns.forEach((e) => {
    e.addEventListener("click", (e) => {
      btns.forEach((elm) => {
        elm.innerText = "Choisir ce film";
        elm.classList.replace("bg-cine-red", "bg-slate-50");
        elm.classList.replace("bg-cine-red", "text-slate-700");
      });

      e.target.innerText = "selectioner";
      e.target.classList.replace("bg-slate-50", "bg-cine-red");
      e.target.classList.replace("text-slate-700", "bg-cine-red");
      currentfilm = films.find((film) => film.id == e.target.id);
      console.log(currentfilm);

      filmdet.innerHTML = `
     <img src="${currentfilm.affiche}" alt="${currentfilm.titre}"
                class="aspect-[2/3] w-24 rounded-xl object-cover shadow-md">
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-xl font-black">${currentfilm.titre}</h3><span
                    class="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">${currentfilm.prix} DH</span>
                </div>
                <p class="mt-2 text-sm font-semibold text-slate-500">${currentfilm.genre} · ${Math.floor(currentfilm.duree / 60)} h ${currentfilm.duree % 60} m</p>
                <p class="mt-3 leading-7 text-slate-600">${currentfilm.description}</p>
     `;
      afficheSeances();
    });
  });
}
selectionFilm();

// ==================================================
// US03 - AFFICHER LES SÉANCES
// ==================================================
// OBJECTIF : afficher les horaires du film sélectionné dans #seances-container.
// NOTIONS UTILES : tableau imbriqué, boucle, bouton, innerHTML.
// QUESTIONS : Dans quelle propriété du film se trouvent les séances ?
// TODO : créer un bouton par séance et conserver son id dans data-seance-id.
// MODÈLE : les trois boutons statiques de #seances-container montrent le HTML attendu.
// ÉCRIVEZ VOTRE CODE ICI :

function afficheSeances() {
  const seancesContainer = document.querySelector("#seances-container");

  seancesContainer.innerHTML = "";
  currentfilm.seances.forEach((seance) => {
    seancesContainer.innerHTML += `
      <button type="button" data-seance-id="${seance.id}" class="rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-bold text-slate-700">
           ${seance.horaire}
        </button>
`;
  });

  selectionerSeance(seancesContainer);
}

// ==================================================
// US04 - SÉLECTIONNER UNE SÉANCE
// ==================================================
// OBJECTIF : mémoriser la séance cliquée et montrer visuellement le bouton actif.
// NOTIONS UTILES : addEventListener, find(), classList, conditions.
// QUESTIONS : Faut-il autoriser une séance qui n'appartient pas au film choisi ?
// TODO : retrouver la séance, modifier l'état et réinitialiser les sièges choisis.
// ÉCRIVEZ VOTRE CODE ICI :

function selectionerSeance(seancesContainer) {
  const seancesBtns = seancesContainer.querySelectorAll('[type="button"]');
  seancesBtns.forEach((seanceBtn) => {
    seanceBtn.addEventListener("click", (event) => {
      seancesBtns.forEach((seanceBtn) => {
        seanceBtn.className =
          "rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-bold text-slate-700";
      });
      seanceid = event.target.getAttribute("data-seance-id");
      console.log(seanceid);
      creerSieges(seanceid)
      event.target.className =
        "rounded-xl bg-cine-red px-5 py-3 font-bold text-white shadow-md";
    });
  });
}

// ==================================================
// US05 - AFFICHER LES 30 SIÈGES
// ==================================================
// OBJECTIF : créer les rangées A à E, avec les numéros 1 à 6.
// NOTIONS UTILES : boucles imbriquées, concaténation, createElement, classList.
// QUESTIONS : Comment fabriquer le nom "C4" ? Où sont les sièges occupés ?
// TODO : générer les sièges et donner un état visuel différent aux places occupées.
// PISTE : rangees et siegesParRangee sont fournis dans data.js.
// MODÈLE : #sieges-container contient les 30 sièges statiques et leurs classes Tailwind.
// ÉCRIVEZ VOTRE CODE ICI :
function creerSieges(seanceid) {
const siegesContainer = document.querySelector("#sieges-container");
siegesContainer.innerHTML=''
  for (let index = 0; index < rangees.length; index++) {    
    const span = document.createElement("span");
    span.className = "self-center text-xs font-extrabold text-slate-500";
    span.textContent = rangees[index];
    siegesContainer.appendChild(span);
    for (let j = 1; j <= siegesParRangee; j++) {
      const btn = document.createElement("button");
      btn.className = currentfilm.seances.find((seance)=>seance.id==seanceid).siegesOccupes.includes(rangees[index] + j)?
      "aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50": 
      "aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white";
      if(btn.className === "aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50"){
        btn.disabled =true
      }
      btn.textContent = rangees[index] + j;
      siegesContainer.appendChild(btn);
    }
  }  
}



// ==================================================
// US06 - SÉLECTIONNER ET DÉSÉLECTIONNER DES SIÈGES
// ==================================================
// OBJECTIF : ajouter ou retirer une place du tableau des sièges sélectionnés.
// NOTIONS UTILES : includes(), push(), splice() ou filter(), classList.toggle().
// QUESTIONS : Comment empêcher le clic sur une place occupée ?
// TODO : écouter chaque siège disponible et actualiser son état visuel.
// ÉCRIVEZ VOTRE CODE ICI :

// ==================================================
// US07 - CALCULER LE TOTAL ET METTRE À JOUR LE RÉCAPITULATIF
// ==================================================
// OBJECTIF : afficher le film, la séance, les sièges et le montant actuel.
// NOTIONS UTILES : multiplication, length, join(), textContent.
// QUESTIONS : Quelle formule relie prix du film et nombre de sièges ?
// TODO : écrire une fonction appelée après chaque changement de sélection.
// MODÈLE : le récapitulatif HTML affiche des exemples de valeurs déjà remplies.
// ÉCRIVEZ VOTRE CODE ICI :

// ==================================================
// US08 - CONFIRMER LA RÉSERVATION
// ==================================================
// OBJECTIF : vérifier les choix puis afficher un succès ou une erreur dans
// #reservation-message. Les données restent seulement en mémoire.
// NOTIONS UTILES : if / else, addEventListener, textContent, classList.
// QUESTIONS : Quelles conditions rendent une réservation valide ?
// TODO : écouter #confirmer-reservation et construire un message clair.
// ÉCRIVEZ VOTRE CODE ICI :

// PREMIER TEST CONSEILLÉ :
// console.log(films);
// Décommentez temporairement cette ligne pour explorer les données, puis avancez.
