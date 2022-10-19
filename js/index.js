const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

var ALL = document.getElementById('sc-1-1-1');
var BIO = document.getElementById('sc-1-1-2');
var NLP = document.getElementById('sc-1-1-3');
var FIN = document.getElementById('sc-1-1-4');

ALL.onclick = function() {
  for (let el of document.querySelectorAll('.portfolio__item')){
    if ( el.style.visibility == 'collapse') {
      el.style.visibility = 'visible';
    }
  }
};

BIO.onclick = function () {
  for (let el of document.querySelectorAll('.portfolio__item') )el.style.visibility = 'collapse';
  for (let el of document.querySelectorAll('.bio')){
    if ( el.style.visibility == 'collapse') {
      el.style.visibility = 'visible';
    }
  }
};

NLP.onclick = function () {
  for (let el of document.querySelectorAll('.portfolio__item') )el.style.visibility = 'collapse';
  for (let el of document.querySelectorAll('.nlp')){
    if ( el.style.visibility == 'collapse') {
      el.style.visibility = 'visible';
    }
  }
};

FIN.onclick = function () {
  for (let el of document.querySelectorAll('.portfolio__item') )el.style.visibility = 'collapse';
  for (let el of document.querySelectorAll('.fin')){
    if ( el.style.visibility == 'collapse') {
      el.style.visibility = 'visible';
    }
  }
};