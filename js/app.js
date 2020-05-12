'use strict';

var maxRounds = 6;

var parentEl = document.getElementById('product1');

var clicksNumber = 0;

var allProducts = [];

function ProductImage(name, url, alt, title){
  this.name = name;
  this.filePath = url;
  this.alt = alt;
  this.title = title;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}

new ProductImage('suitcase', 'img/bag.jpg', 'bag', 'bag');
new ProductImage('banana slicer', 'img/banana.jpg', 'banana', 'banana');
new ProductImage('bio facilitator', 'img/bathroom.jpg', 'bathroom', 'bathroom');
new ProductImage('peep toe rain boots', 'img/boots.jpg', 'boots', 'boots');
new ProductImage('breakfast maker', 'img/breakfast.jpg', 'breakfast', 'breakfast');
new ProductImage('meatball flavor gum', 'img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new ProductImage('weird chair', 'img/chair.jpg', 'chair', 'chair');
new ProductImage('Great Old One figurine', 'img/cthulhu.jpg', 'cthulhu', 'cthulhu');
new ProductImage('dog duck face', 'img/dog-duck.jpg', 'dog-duck', 'dog-duck');
new ProductImage('dragon meat', 'img/dragon.jpg', 'dragon', 'dragon');
new ProductImage('utensil pens', 'img/pen.jpg', 'pen', 'pen');
new ProductImage('pet sweep', 'img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new ProductImage('pizza scissors', 'img/scissors.jpg', 'scissors', 'scissors');
new ProductImage('shark sleeping bag', 'img/shark.jpg', 'shark', 'shark');
new ProductImage('baby sweeper', 'img/sweep.png', 'sweep', 'sweep');
new ProductImage('tauntaun blanket', 'img/tauntaun.jpg', 'tauntaun', 'tauntaun');
new ProductImage('unicorn meat', 'img/unicorn.jpg', 'unicorn', 'unicorn');
new ProductImage('dragon tail usb', 'img/usb.gif', 'usb', 'usb');
new ProductImage('absurd water can', 'img/water-can.jpg', 'water-can', 'water-can');
new ProductImage('silly wine glass', 'img/wine-glass.jpg', 'wine-glass', 'wine-glass');

ProductImage.prototype.appendImage = function(){
  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', this.filePath);
  imageElement.setAttribute('alt', this.alt);
  imageElement.setAttribute('title', this.title);
  parentEl.appendChild(imageElement);
};

function randomNumber(min=0, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomProduct(){
  parentEl.textContent = '';

  var randomIndex = randomNumber(0, allProducts.length-1);
  var secondRandomIndex = randomNumber(0, allProducts.length-1);
  var thirdRandomIndex = randomNumber(0, allProducts.length-1);

  while(randomIndex === secondRandomIndex){
    secondRandomIndex = randomNumber(0, allProducts.length-1);
  }

  while(secondRandomIndex === thirdRandomIndex){
    thirdRandomIndex = randomNumber(0, allProducts.length-1);
  }

  allProducts[randomIndex].appendImage();
  allProducts[randomIndex].views++;

  allProducts[secondRandomIndex].appendImage();
  allProducts[secondRandomIndex].views++;

  allProducts[thirdRandomIndex].appendImage();
  allProducts[thirdRandomIndex].views++;
}

parent.addEventListener('click', clicker);

function clicker(event){
  var titleOfProductThatWasClickedOn = event.target.title;

  for(var i = 0; i<allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === allProducts[i].title){
      allProducts[i].votes++;
    }
  }
  clicksNumber += 1;

  if (clicksNumber < maxRounds) {
    getRandomProduct();
  } else {
    parent.removeEventListener('click', clicker);
    renderResults();

    //remove EventListener
  }
}

function renderResults (){

  var momEl = document.getElementById('results');

  for(var i=0; i<allProducts.length; i++){

    var listItem = document.createElement('li');
    listItem.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times`;
    momEl.appendChild(listItem);
  }
}
