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

let selection1 = '';
let selection2 = '';
let selection3 = '';

filterSelection1(selection1)
filterSelection2(selection2)
filterSelection3(selection3)

function filterSelection1(c) {
  var x, i;
  selection1 = c;
  x = document.getElementsByClassName("portfolio__item");
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(selection2) > -1 && x[i].className.indexOf(selection3) > -1 && x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

function filterSelection2(c) {
  var x, i;
  selection2 = c;
  x = document.getElementsByClassName("portfolio__item");
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(selection1) > -1 && x[i].className.indexOf(selection3) > -1 && x[i].className.indexOf(c) > -1) AddClass(x[i], "show");

  }
}

function filterSelection3(c) {
  var x, i;
  selection3 = c;
  x = document.getElementsByClassName("portfolio__item");
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(selection1) > -1 && x[i].className.indexOf(selection2) > -1 && x[i].className.indexOf(c) > -1) AddClass(x[i], "show");

  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var ALL = document.getElementById('sc-1-1-1');
var BUS = document.getElementById('sc-1-1-2');
var HEA = document.getElementById('sc-1-1-3');
var FIN = document.getElementById('sc-1-1-4');
var GIS = document.getElementById('sc-1-1-5');
var CV = document.getElementById('sc-1-1-6');
var EDU = document.getElementById('sc-1-1-7');

var FULL = document.getElementById('sc-1-2-1');
var MAT = document.getElementById('sc-1-2-2');
var TAB = document.getElementById('sc-1-2-3');
var D3 = document.getElementById('sc-1-2-4');
var TFJ = document.getElementById('sc-1-2-5');
var VRP = document.getElementById('sc-1-2-6');
var OPE = document.getElementById('sc-1-2-7');

var COMP = document.getElementById('sc-1-3-1');
var RED = document.getElementById('sc-1-3-2');
var CLA = document.getElementById('sc-1-3-3');
var REG = document.getElementById('sc-1-3-4');
var CON = document.getElementById('sc-1-3-5');
var REC = document.getElementById('sc-1-3-6');
var REI = document.getElementById('sc-1-3-7');