function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    }
  }
}

// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake


let PetPrototype = {
  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },
  
  init(animal, name) {
    // console.log(this);
    this.animal = animal;
    this.name = name;
    // console.log(this);
    // console.log(this.__proto__);
    return this;
  }
}


let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake




function Mammal() {

}
Mammal.prototype.breathe = function() {
  console.log("Breathe");
}

function Cat() {

}
Cat.prototype = new Mammal();
Cat.prototype.constructor = Cat;
console.log(Cat.prototype.constructor === Cat);
let garfield = new Cat();
console.log(garfield.__proto__.constructor);
console.log(garfield instanceof Cat);




class Greeting {
  greet(str) {
    console.log(str);
  }
}

class Hello extends Greeting {
  
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {

  bye() {
    this.greet('Goodbye');
  }
}

let hi = new Hello();
hi.hi();
let bye = new Goodbye();
bye.bye();