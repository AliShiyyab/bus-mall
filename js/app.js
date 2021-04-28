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

let imgsection = document.getElementById('images');
let rightImg = document.getElementById('rightImage');
let midImg = document.getElementById('midImage');
let leftImg = document.getElementById('leftImage');
let viewe = document.getElementById('view');
let list = document.getElementById('list');
let resultDiv = document.getElementById('divs');
let RemoveButton = document.getElementById('ButtonRemoveLocalStorgeData');
var clicked = 0;
let rightCounter = 0;
let leftCounter = 0;
let midCounter = 0;
let viewArr = [];
let voteArr = [];


let Products = function(name){
    this.name = name.split('.')[0];
    this.imgPath= `./assets/${name}`;
    this.show = 0;
    this.clicks = 0;
    Products.all.push(this);
};

Products.all = [];

function updateProuducts (){
    var productsStrings = JSON.stringify(Products.all);
    localStorage.setItem('productOutPut',productsStrings);
}

function getterProduct(){
    var productsStrings =localStorage.getItem('productOutPut');
    if(productsStrings){
        Products.all = JSON.parse(productsStrings);
        render();
        render2();
    }
}

function remove(){
    //document.getElementById('info').innerHTML = localStorage.removeItem('productOutPut');
    //list.innerHTML = localStorage.removeItem('productOutPut');
    var checkDeleted = prompt("Do you need to delete all data store ? y/n");
    if (checkDeleted.toLowerCase() == 'y'){
        document.getElementById('info').innerHTML = "Deleted Chart. " + localStorage.removeItem('productOutPut');
        list.innerHTML = "Deleted list. " + localStorage.removeItem('productOutPut');
        alert("Deleted Done");
    }
    
}

function randomFun(min,max){
    return Math.floor(Math.random()*(max-min+1)-min);
}

for (let i = 0; i < assets.length; i++) {
    new Products(assets[i]);
}

let leftProduct = 0;
let centerProduct = 0;
let rightProduct = 0;
function render(){
    
     leftProduct = randomFun(0 , assets.length - 1);
     centerProduct;
     rightProduct;
    do{
        centerProduct = randomFun(0 , assets.length -1);
    }
    while(centerProduct === leftProduct);
    do{
        rightProduct = randomFun(0, assets.length - 1);
    }
    while ((leftProduct === rightProduct) || (centerProduct === rightProduct));

    leftImg.src = Products.all[leftProduct].imgPath;
    midImg.src = Products.all[centerProduct].imgPath;
    rightImg.src = Products.all[rightProduct].imgPath;

    //leftCounter = leftProduct;
    //midCounter = centerProduct;
    //rightCounter = rightProduct;

    Products.all[leftProduct].show++;
    Products.all[centerProduct].show++;
    Products.all[rightProduct].show++;

    for (var i=0;i< assets.length ; i++){
        viewArr[i] = Products.all[i].show; 
    }
}

render();

rightImg.addEventListener('click' , eventHandler);
midImg.addEventListener('click' , eventHandler);
leftImg.addEventListener('click' , eventHandler);


function eventHandler(event){
    render();
    if(clicked <= 24){
        if (event.target.id == 'leftImage'){
            console.log("Left image clicked");
            Products.all[leftProduct].clicks++;
            updateProuducts();
        }
        else if (event.target.id == 'midImage'){  
            console.log("Middle image clicked");
            Products.all[centerProduct].clicks++;
            updateProuducts();
        }
        else if (event.target.id == 'rightImage'){
            console.log("Right image clicked");
            Products.all[rightProduct].clicks++;
            updateProuducts();
        }   
        clicked++;
        for (let i = 0 ; i < assets.length ; i++){
            voteArr[i] = Products.all[i].clicks;
        }
    }
    else {
        render2();
        console.log("Inside else")
        rightImg.removeEventListener('click',eventHandler);
        leftImg.removeEventListener('click',eventHandler);
        midImg.removeEventListener('click',eventHandler);
        viewe.style = "";
        for (let i = 0; i < 20 ; i++) {
            console.log(i)
            let listItem = document.createElement('li');
            listItem.textContent = `${Products.all[i].name} had ${Products.all[i].clicks} Voted and ${Products.all[i].show} Shown`;
            list.appendChild(listItem);
        }
    }
}


function render2(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: assets,
            datasets: [{
                label: '# of Votes',
                data:voteArr,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor:  'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: '# of views',
                data:viewArr,
                backgroundColor: 
                'rgba(75, 192, 240, 1)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            }        
        ],
        },
        options: {
            scales: {
                    y: {
                        beginAtZero: true
                    }
            }
        }
    });
    
}

getterProduct();