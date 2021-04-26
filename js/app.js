'use strict'

let assets=['bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'];

let left =document.getElementById('leftImage');
let center = document.getElementById('midImage');
let right = document.getElementById('rightImage');
let imageSection = document.getElementById('images');

let centerProductIndex = 0;
let leftProductIndex = 0;
let rightProductIndex = 0;
let numOfAttempts = 25;
let counterAttembYouAreDoing = 0;
var arrObj=[];

function products(name){
    this.clicked=0;
    this.viewed=0;
    this.name = name.split('.')[0];
    this.imgPath= `./assets/${name}`;
    arrObj.push(this);
}

function randomFun(min,max){
    var result = Math.floor(Math.random()*(max-min+1)-min);
    return result;
}

for(let i=0 ; i < assets.length ; i++){
    new products(assets[i]);
}

let clickNumber = 0;

function render(){
    let leftProduct = randomFun(0 , assets.length - 1);
    let centerProduct;
    let rightProduct;
    do{
        centerProduct = randomFun(0 , assets.length -1);
    }
    while(centerProduct === leftProduct);
    do{
        rightProduct = randomFun(0, assets.length - 1);
    }
    while ((leftProduct === rightProduct) || (centerProduct === rightProduct));

    left.src = arrObj[leftProduct].imgPath;
    center.src = arrObj[centerProduct].imgPath;
    right.src = arrObj[rightProduct].imgPath;

    leftProductIndex = leftProduct;
    centerProductIndex = centerProduct;
    rightProductIndex = rightProduct;

    arrObj[leftProductIndex].viewed++;
    arrObj[centerProductIndex].viewed++;
    arrObj[rightProductIndex].viewed++;

}

render();

imageSection.addEventListener('clicked' , eventHandler);

function eventHandler(event){
    counterAttembYouAreDoing+=1;
    if (counterAttembYouAreDoing <= numOfAttempts){
    if((e.target.id == 'left' || e.target.id == 'center' || e.target.id == 'right' ) && clickNumber < 25){
            if (event.target.id == 'left'){
                arrObj[leftProductIndex].clicked++;
            }
            if (vent.target.id == 'center'){
                arrObj[centerProductIndex].clicked++;
            }
            if (event.target.id == 'right'){
                arrObj[rightProductIndex].clicked++;
            }
        }
    render();
    }
    else{
        console.log(arrObj);
    }
}



