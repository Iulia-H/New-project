 class Item {
    constructor(name, type, img) {
        this.name = name;
        this.type = type;
        this.image = new Image();
        this.image.src = img;
        this.velocity = {
            x : 0,
            y : 0
        };
        this.x = 0;
        this.y = 0;
        this.size = 50;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.frames = 100;
        this.opacity = 1;
    }

    draw(ctx) {
        this.image.unload = function (){
            ctx.drawImage(this.image, this.size, this.size);
            console.log(this.image);
        };
        return this.image.unload();
    }

    update(){
        this.draw();
    }

}

const grapes = new Item("Grapes", "fruit", "./assets/Ingredients/berrys1.png");
const cranberries = new Item("Cranberries", "fruit", "./assets/Ingredients/berrys2.png");
const bone = new Item("Bone", "animal", "./assets/Ingredients/bone.png");
const iceButterfly = new Item("Ice Butterfly ", "animal", "./assets/Ingredients/butterfly_wing1.png");
const fireButterfly = new Item("Fire Butterfly", "animal", "./assets/Ingredients/butterfly_wing2.png");
const cotton = new Item("Cotton", "flower", "./assets/Ingredients/cotton.png");
const ametyst = new Item("Ametyst", "rock", "./assets/Ingredients/crystal1.png");
const quartz = new Item("Quartz", "rock", "./assets/Ingredients/crystal2.png");
const roe = new Item("Roe", "animal", "./assets/Ingredients/eggs.png");
const feather = new Item("Feather", "animal", "./assets/Ingredients/feather.png");
const daisy = new Item("Daisy", "flower", "./assets/Ingredients/flower1.png");
const fireFlower = new Item("Fire Flower", "flower", "./assets/Ingredients/flower2.png");
const rose = new Item("Rose", "flower", "./assets/Ingredients/flower3.png");
const blazingStar = new Item("Blazing star", "flower", "./assets/Ingredients/flower4.png");
const redAester = new Item("Red aester", "flower", "./assets/Ingredients/flower5.png");
const tulip = new Item("Tulip", "flower", "./assets/Ingredients/flower6.png");
const iris = new Item("Iris", "flower", "./assets/Ingredients/flower7.png");
const blueHeart = new Item("Blue bleading heart", "flower", "./assets/Ingredients/flower8.png");
const trailing = new Item("Trailing abutilon", "flower", "./assets/Ingredients/flower9.png");
const lilly = new Item("Lilly of the Valley", "flower", "./assets/Ingredients/flower10.png");
const wheat = new Item("Wheat", "grain", "./assets/Ingredients/grass.png");
const mint = new Item("Mint", "herb", "./assets/Ingredients/leaf1.png");
const nettle = new Item("Nettle", "herb", "./assets/Ingredients/leaf2.png");
const black = new Item("Black gum", "herb", "./assets/Ingredients/leaf3.png");
const hawthorn = new Item("Hawthorn", "herb", "./assets/Ingredients/leaf4.png");
const raspberry = new Item("Raspberry leaf", "herb", "./assets/Ingredients/leaf5.png");
const maple = new Item("Maple leaf", "herb", "./assets/Ingredients/leaf6.png");
const ivy = new Item("Ivy leaf", "herb", "./assets/Ingredients/leaf7.png");
const rosebud = new Item("Rosebud cordyline", "herb", "./assets/Ingredients/leaf8.png");
const helly = new Item("Helly", "herb", "./assets/Ingredients/leaf9.png");
const fern = new Item("Fern", "herb", "./assets/Ingredients/leaf10.png");
const por = new Item("Porcini mushroom", "mushroom", "./assets/Ingredients/mushroom1.png");
const rosy = new Item("Rosy mushroom", "mushroom", "./assets/Ingredients/mushroom2.png");
const amanita = new Item("Amanita mushroom", "mushroom", "./assets/Ingredients/mushroom3.png");
const magic = new Item("Magic mushrooms", "mushroom", "./assets/Ingredients/mushroom4.png");
const blue = new Item("Blue milk mushroom", "mushroom", "./assets/Ingredients/mushroom5.png");
const magicPod = new Item("Magic beans", "fruit", "./assets/Ingredients/pod.png");
const dragon = new Item("Dragon scales", "animal", "./assets/Ingredients/scales.png");
const  wood = new Item("Treant fingers", "flower", "./assets/Ingredients/wood1.png");
const lumber = new Item("Lumber", "flower", "./assets/Ingredients/wood2.png");

export const items = [
    bone, cotton, daisy, lilly, amanita, //0-4
    feather, iris, wheat, raspberry, rosy, //5-9
    fireButterfly, fireFlower, roe, maple, ivy, //10-14
    rosebud, trailing, redAester, rose, cranberries, //15-19
    mint, magicPod, nettle, fern, hawthorn, //20-24
    helly, black, blueHeart, quartz, magic, //25-29
    iceButterfly, dragon, blue, tulip, grapes, //30-34
    blazingStar,  ametyst, por, wood, lumber ]; //35 -39

// module.exports = items;