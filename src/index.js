import { recipes } from "./recipe";
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.style.cursor = "crosshair";
canvas.width = innerWidth;
canvas.height = innerHeight;
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize('UA-123791717-1');
    ReactGA.pageview('/homepage');
}
initializeReactGA();


//Initialize
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight ;

    init();
});

addEventListener("click", (event)=>{
    bottles.forEach(item =>{
        item.respond();
    });

});

const mouse = {
    x : 0,
    y : 0
};

addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

const body = document.body;
let menu = document.createElement("div");
menu.hidden = false;
menu.classList.add("menu");

let instructions = document.createElement("p");
// instructions.hidden = false;
instructions.classList.add("instructions");
menu.appendChild(instructions);
instructions.innerHTML = "Welcome to Potion Catcher" + "<br />" + "Catch the potions before they reach the ground!"
    + "<br />" + "Click on a potion to save it and yourself from unknown circumstances."
    + "<br />" + "Press Space to start or return to this menu.";

let counter = document.createElement("div");
counter.classList.add("counter");
let count = 0;
counter.innerText = `Potions: ${count}`;

let lives = document.createElement("div");
lives.classList.add("lives");
let life = 15;
lives.innerText = `Lives remaining: ${life}`;

body.appendChild(menu);
body.appendChild(counter);
body.appendChild(lives);




//Objects

class Shard{
    constructor(x, y) {
        this.velocity = {
            x: Math.random() * 5,
            y: Math.random() * 5
        };
        this.x = x;
        this.y = y;
        this.size = 7;
        this.gravity = 0.1;
        this.friction = 0.7;
        this.frames = 200;
        this.opacity = 1;
    }


    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.4;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+7, this.y-7);
        ctx.lineTo(this.x-7, this.y-7);
        ctx.lineTo(this.x-14.5, this.y);
        ctx.shadowColor = "#EEF8FB";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.draw();

        if (this.y + this.size +this.velocity.y > canvas.height-50) {
            this.velocity.y = -this.velocity.y * this.friction;
        }
        else {
            this.velocity.y += this.gravity;
        }
        if (this.x + this.size + this.velocity.x > canvas.width || this.x - this.size <= 0) {
            this.velocity.x = -this.velocity.x;
        }

        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.frames -= 1;
        this.opacity -= 1 / this.frames;
    }

}


class Potion {
    constructor(recipe, image, x, y, existance = 1) {
        // this.name = name;
        this.recipe = recipe.sort();
        this.image = new Image();
        this.image.src = image;
        this.size = 70;
        this.x = x;
        this.y = y;
        this.existance = existance;
        if (life <= 0) {
            this.velocity = 10;
        }else if (count >= 0){
            this.velocity = Math.random() * 1.5 + 0.5;
        }else if(count >=15){
            this.velocity = Math.random() * 3 + 1;
        }else if (count >=30){
            this.velocity = Math.random() * 4.5 + 1.5;
        }else if (count >= 45){
            this.velocity = Math.random() * 6 + 2;
        }
        
     

    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.existance;
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.restore();
    }

    update() {

        if (this.y + this.size + this.velocity > canvas.height-45) {
            this.draw();
            this.explode();
            this.existance = 0;
        } else if(this.velocity){
            this.draw();
            this.y += this.velocity;   
        }else{
            this.break();
            
        }
    }

    respond(){
        if (this.x + this.size/2 >= (mouse.x - 40) && this.x + this.size/2 <= (mouse.x + 40) && 
        this.y + this.size/2 >= (mouse.y - 40) && this.y + this.size/2<= (mouse.y + 40)){
        
            this.velocity = 0;

        }
        
    }

    break(){
       for (let i = 0; i < 15; i++) {
            ingredients.push(new Shard(this.x, this.y));
            
        }
        this.existance = 0;
        count += 1;
    }

    explode() {
        for (let i = 0; i < 10; i++) {
            ingredients.push(new Shard(this.x, this.y));
            
        }
        this.recipe.forEach(item=>{
            ingredients.push(new Item(item, this.x, this.y));
        });
        if (life> 0){
            life -= 1;
        }
    }   
}


class Item {
    constructor(image, x, y) {
        this.image = new Image();
        this.image.src = image;
        this.velocity = {
            x: Math.random() * 3,
            y: Math.random() * 3
        };
        this.x = x;
        this.y = y;
        this.size = 40;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.frames = 100;
        this.opacity = 1;
    }


    draw() {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.shadowColor = "#EEF8FB";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.restore();
    }

    update() {
        this.draw();

        if (this.y + this.size+ this.velocity.y > canvas.height-50) {
            this.velocity.y = -this.velocity.y * this.friction;
        }
        else {
            this.velocity.y += this.gravity;
        }
        if (this.x + this.size + this.velocity.x > canvas.width || this.x - this.size <= 0) {
            this.velocity.x = -this.velocity.x;
        }

        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.frames -= 1;
        this.opacity -= 1 / this.frames;
    }

}

// Use for a better cursor halo
// class Cursor { 
//     constructor(color = "white") {
//         this.velocity = 0.05;
//         this.x =  mouse.x + 20;
//         this.y = mouse.y + 20;
//         this.radians = Math.random() * Math.PI * 2;
//         this.place = (Math.random() * 65 + Math.random() * 75)/2;
//         this.color = color;
//     }


//     draw() {
//         ctx.save();
//         ctx.beginPath();
//         ctx.globalAlpha = 0.5;
//         ctx.strokeStyle = this.color;
//         ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
//         ctx.stroke();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         // ctx.stroke()
//         ctx.shadowOffsetX = 4;
//         ctx.shadowOffsetY = 4;
//         ctx.closePath();
//         ctx.restore();
//     }

//     update() {
//         this.radians += this.velocity;
//         this.x = mouse.x + Math.cos(this.radians) * this.place;
//         this.y = mouse.y + Math.sin(this.radians) * this.place;
//         this.draw();

//     }
// }

//Logic

let bottles;
let ingredients;

function init(){
    bottles = [];
    ingredients = [];
    for (let i = 0; i < 10; i++) {
        let j = Math.floor(Math.random() * recipes.length);
        let x = Math.floor((Math.random() * (canvas.width - 70)));
        let y = Math.floor(0 - Math.random() * canvas.height - 50);
        let bottle = new Potion(recipes[j][0], recipes[j][1], x, y);
        bottles.push(bottle);
    }

}

function ground(){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, canvas.height-50, canvas.width, canvas.height);
    ctx.fill();
    ctx.restore();
}

function background(){
    let grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#2A1E5C");
    grd.addColorStop(0.5, "#890620");
    grd.addColorStop(1, "#EE4266");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background();
    ground();

    bottles.forEach((bottle) => {
        bottle.draw();
    });

    ingredients.forEach((ingredient) => {
        ingredient.draw();
    });
}

function cursor(){
    let x = mouse.x;
    let y = mouse.y;
    ctx.save();
    let grd = ctx.createLinearGradient(x, y, x+20, y+ 20);
    grd.addColorStop(0, "#F8F9FA");
    grd.addColorStop(0.5, "#E9ECEF");
    grd.addColorStop(1, "#DEE2E6");
    ctx.beginPath();
    ctx.strokeStyle = grd;
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.restore();
}

function drawCursor() {
    if (paused) {
        draw();
        cursor();
        rederFrames(function () {
            drawCursor();
        });
    } else {
        cursor();
    }
}

function destroyBottle(idx){
    bottles.splice(idx, 1);
    let j = Math.floor(Math.random() * recipes.length);
    let x = Math.floor((Math.random() * (canvas.width - 70)));
    let y = Math.floor(0 - Math.random() * canvas.height);
    bottles.push(new Potion(recipes[j][0], recipes[j][1], x, y));
}


function animate() {
    counter.innerText = `Potions: ${count}`;
    lives.innerText = `Lives remaining: ${life}`;
    if (life <= 0) {
        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    if ( !paused ){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        background();
        ground();

        bottles.forEach((bottle, idx) => {
            bottle.update();
            if (bottle.existance <= 0) {
                destroyBottle(idx);
                
            }

        });

        ingredients.forEach((ingredient, idx) => {
            ingredient.update();
            if (ingredient.frames === 0) {
                ingredients.splice(idx, 1);
            }
        });
    
        rederFrames(function () {
            animate();
        });
        drawCursor();
    }else{
        rederFrames(function () {
            drawCursor();
        });
        
    }

    
}

 window.rederFrames = (function (callback) {
    return window.requestAnimationFrame ||
        function (callback) {
           setTimeout(callback, 1000 / 60);
        };
})();


let paused = true;

function togglePause(){
    if (paused === false) {
        paused = true;
        animate();
    } 
    else {
        paused = false;
        animate();
    }
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        togglePause();
        menu.hidden = !menu.hidden;
        // instructions.hidden = !instructions.hidden;
    }
});


init();
animate();
drawCursor();



