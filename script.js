////////////////////////////////////////
// On selectionne les éléments du DOM //
////////////////////////////////////////
const buttonNext = document.querySelector('.slider__button--next');
const buttonPrev = document.querySelector('.slider__button--prev');
const container = document.querySelector('.slider');

//////////////////////////////////////////////////////////////////////////
// On selectionne l'élement qui contient le numéro de la slide actuelle //
//////////////////////////////////////////////////////////////////////////
const indexIndication = document.querySelector(
  '.slider__counter span:nth-child(1)'
);

/////////////////////////////////////////////////////////////
// On selectionne les slides et on les met dans un tableau //
/////////////////////////////////////////////////////////////
const slides = Array.from(document.querySelectorAll('.slider__slide'));

////////////////////////////////////////////////
// On initialise l'index de la slide actuelle //
////////////////////////////////////////////////
let index = 0;

/////////////////////////////////////////////////////////////////
// Fonction pour passer à la diapositive suivante              //
// On crée une timeline pour animer le déplacement de la slide //
/////////////////////////////////////////////////////////////////
function moveNext() {
  const TLNext = gsap.timeline();
  TLNext.set(indexIndication, { innerText: index + 1 }).to(slides[index], {
    duration: 0.6,
    x: 0,
  });
}

/////////////////////////////////////////////////////////////////
// Fonction pour passer à la diapositive précédente            //
// On crée une timeline pour animer le déplacement de la slide //
/////////////////////////////////////////////////////////////////
function movePrev() {
  const TLPrev = gsap.timeline();
  TLPrev.set(indexIndication, { innerText: index }).to(slides[index], {
    duration: 0.6,
    x: '-100%',
  });
}

///////////////////////////////////////////////////////////////////////
// Fonction pour animer le container si on est sur la dernière slide //
///////////////////////////////////////////////////////////////////////
function lastSlide() {
  gsap.to(container, {
    keyframes: [
      { duration: 0.1, x: -4 },
      { duration: 0.1, x: 4 },
      { duration: 0.1, x: -4 },
      { duration: 0.1, x: 4 },
      { duration: 0.1, x: 0 },
    ],
  });
}
/////////////////////////////////////////////////////////////////////
// Fonction pour gérer le changement de slide                      //
// On vérifie la direction pour appeler la fonction correspondante //
// Si c'est next, on vérifie si on est sur la dernière slide       //
// Si oui, on appelle la fonction lastSlide                        //
// Sinon, on incrémente l'index et on appelle la fonction moveNext //
// Si c'est prev, on vérifie si on est sur la première slide       //
// Sinon, on décrémente l'index et on appelle la fonction movePrev //
/////////////////////////////////////////////////////////////////////
function handleDirection(direction) {
  if (direction === 'next') {
    if (index === slides.length - 1) {
      lastSlide();
      return;
    }
    index++;
    moveNext();
  } else if (direction === 'prev') {
    if (index === 0) {
      lastSlide();
      return;
    }
    movePrev();
    index--;
  }
}

//////////////////////////////////////////////////////////
// On ajoute un écouteur d'événement sur le bouton next //
// On appelle la fonction handleDirection avec 'next'   //
//////////////////////////////////////////////////////////
buttonNext.addEventListener('click', () => {
  handleDirection('next');
});

//////////////////////////////////////////////////////////
// On ajoute un écouteur d'événement sur le bouton prev //
// On appelle la fonction handleDirection avec 'prev'   //
//////////////////////////////////////////////////////////
buttonPrev.addEventListener('click', () => {
  handleDirection('prev');
});
