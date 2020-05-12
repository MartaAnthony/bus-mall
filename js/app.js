'use strict';

var uniqueIndexArray = [];
var maxRounds = 25;
var names = [];
var parentEl = document.getElementById('product1');
var votes = [];
var totalVotes = 0;
var allProducts = [];
var views = [];

function ProductImage(name, extension){
  this.filePath = `img/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}

ProductImage.prototype.render = function(){
  this.views++;
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentEl.appendChild(imageElement);
};

new ProductImage('bag', '.jpg');
new ProductImage('banana', '.jpg');
new ProductImage('bathroom', '.jpg');
new ProductImage('boots', '.jpg');
new ProductImage('breakfast', '.jpg');
new ProductImage('bubblegum', '.jpg');
new ProductImage('chair', '.jpg');
new ProductImage('cthulhu', '.jpg');
new ProductImage('dog-duck', '.jpg');
new ProductImage('dragon', '.jpg');
new ProductImage('pen', '.jpg');
new ProductImage('pet-sweep', '.jpg');
new ProductImage('scissors', '.jpg');
new ProductImage('shark', '.jpg');
new ProductImage('sweep', '.png');
new ProductImage('tauntaun', '.jpg');
new ProductImage('unicorn', '.jpg');
new ProductImage('usb', '.gif');
new ProductImage('water-can', '.jpg');
new ProductImage('wine-glass', '.jpg');


function getRandomIndex(){

  var index = getRandomNumber(allProducts.length);

  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allProducts.length);
  }

  uniqueIndexArray.push(index);


  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }

  return index;
}

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allProducts[index].render();
}

function clicker(event){
  parentEl.textContent = '';
  var titleOfProductThatWasClickedOn = event.target.title;

  for(var i=0; i<allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === allProducts[i].title){
      allProducts[i].votes++;
      totalVotes++;

      if(totalVotes === maxRounds){

        parentEl.removeEventListener('click', clicker);
        makeNamesArray();
      }
    }
  }

  displayImage();
  displayImage();
  displayImage();

}

displayImage();
displayImage();
displayImage();


parentEl.addEventListener('click', clicker);

function makeNamesArray(){
  for(var i=0; i<allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }
 
  generateChart();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
