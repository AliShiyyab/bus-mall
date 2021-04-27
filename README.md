# bus-mall

let left =document.getElementById('leftImage');
let center = document.getElementById('midImage');
let right = document.getElementById('rightImage');
let imageSection = document.getElementById('images');
let divs = document.getElementById( 'divs' );
let button = document.getElementById( 'results' );
let ulElement = document.createElement('ul');
let createList = document.getElementById('list');

let centerProductIndex = 0;
let leftProductIndex = 0;
let rightProductIndex = 0;
let numOfAttempts = 25;
var arrObj=[];

function products(name){
    this.clicked=0;
    this.viewed=0;
    this.name = name.split('.')[0];
    this.imgPath= `./assets/${name}`;
    arrObj.push(this);
}



for(let i=0 ; i < assets.length ; i++){
    new products(assets[i]);
}

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

let clicknumber = 0;

function eventHandler(event){
    if(clicknumber <= 24){
        if (event.target.id == 'left'){
            arrObj[leftProductIndex].clicked++;
        }
        if (event.target.id == 'center'){                
            arrObj[centerProductIndex].clicked++;
        }
        if (event.target.id == 'right'){
            arrObj[rightProductIndex].clicked++;
        }   
        clicknumber++;
        render();
    }
    if (clicknumber > 24){
        button.hidden = false;
        divs.appendChild(button);
        button.textContent= 'Shown the Result';
        button.addEventListener('click' , viewResult);
        divs.removeEventListener('click' , eventHandler);
        console.log(arrObj);
    }
}

function viewResult(event){
    button.hidden = true;
    for (let i = 0; i < arrObj.length; i++) {
        let liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = `${arrObj[i].name} had ${arrObj[i].viewed} Votes, and was seen ${arrObj[i].clicked} times.`;
      }
}

render();
