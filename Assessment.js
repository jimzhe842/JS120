// Problem 15

class Employee {
  constructor(name, serialNumber, workStatus) {
    this.name = name;
    this.serialNumber = serialNumber;
    this.workStatus = workStatus;
  }
}


let takeVacationMixin = {
  takeVacation() {
    console.log(`You take ${this.vacationLength} days of vacation.`);
  }
}

class RegularEmployee extends Employee {
  constructor(name, serialNumber) {
    super(name, serialNumber, 'full-time');
    this.vacationLength = 10;
  }

  work() {
    console.log('Currenty working in a cubicle');
  }
}

Object.assign(RegularEmployee.prototype, takeVacationMixin);

class PartTimeEmployee extends Employee {
  constructor(name, serialNumber) {
    super(name, serialNumber, 'part-time');
  }

  work() {
    console.log('Currently working in an open workspace');
  }
}
class Manager extends Employee {
  constructor(name, serialNumber) {
    super(name, serialNumber, 'full-time');
    this.vacationLength = 14;

  }

  work() {
    console.log('Currently working in a regular private office');
  }

  delegate(employee) {
    console.log(`Delegate anyone below me, not executives: ${employee}`);
  }
}

Object.assign(Manager.prototype, takeVacationMixin);


class Executive extends Manager {
  constructor(name, serialNumber) {
    super(name, serialNumber, 'full-time');
    this.vacationLength = 20;
  }

  work() {
    console.log(`Currently working at a desk in a corner office`);
  }

  delegate(employee) {
    console.log(`Delegate anyone below me: ${employee}`);
  }

  hire(employee) {
    console.log(`${employee} was fired by ${this.name}`);
  }

  fire(employee) {
    console.log(`${employee} was fired by ${this.name}`);
  }
}




// Problem 8

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// let saunterMixin = {
//   saunter() {
//     console.log(`${this.name} saunters`);
//   }
// }

// let swimMixin = {
//   swim() {
//     console.log(`${this.name} swims around`);
//   }
// }

// class Cat extends Pet {
//   constructor(name, age) {
//     super(name, age);
//   }
// }

// Object.assign(Cat.prototype, saunterMixin);

// class Dog extends Pet {
//   constructor(name, age) {
//     super(name, age);
//   }
// }

// Object.assign(Dog.prototype, saunterMixin);

// class GoldFish extends Pet {
//   constructor(name, age) {
//     super(name, age);
//   }
// }

// Object.assign(GoldFish.prototype, swimMixin);

// Problem 2


// class Dog {
//   constructor(name, weight) {
//     this.name = name;
//     this.weight=  weight;
//   }

//   static getScientificName() {
//     return 'Canis familiaris';
//   }

//   speak() {
//     if (this.weight > 30) {
//       console.log("Woof");
//     } else {
//       console.log("Yip");
//     }
//   }
// }

// let dog = new Dog('Fido', 31);
// console.log(Dog.getScientificName());
// dog.speak();

// Which problem?

let catPet = {
  name: "Felix",
  // getHappiness(hunger,thirst) {
  //   if (hunger + thirst > 100) {
  //     console.log(`${this.name} is happy!`);
  //   } else if (hunger + thirst > 50) {
  //     console.log(`${this.name} is neutral!`);
  //   } else {
  //     console.log(`${this.name} is not happy!`);
  //   }
  // }
}

let dogPet = {
  name: "Fido",
  getState(hunger,thirst) {
    console.log(`${this.name} is ${hunger} hungry and ${thirst} thirsty!`);
  }
}

dogPet.getState.call(catPet, 45,45); // Logs 'Felix is 45 hungry and 45 thirsty'
dogPet.getState.apply(catPet, [45, 45]); // Logs 'Felix is 45 hungry and 45 thirsty'

// Testing another problem

let person = {
  name: 'Jane',
  printName() {
    console.log(`My name is ${this.name}.`);
  }
};

const logName = person.printName.bind(person);
logName();


let compare = {
  number: 10,
  compareNumbers(nums) {
    return nums.filter(function(num) {
      return num < this.number;
    }, this);
  },
};

console.log(compare.compareNumbers([1, 6, 19, 7, 12]));



// Problem 8 Again

class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let saunterMixin = {
  saunter() {
    console.log(`${this.name} saunters`);
  }
}

let swimMixin = {
  swim() {
    console.log(`${this.name} swims around`);
  }
}

class Cat extends Pet {
  constructor(name, age) {
    super(name, age);
  }
}

Object.assign(Cat.prototype, saunterMixin);

class Dog extends Pet {
  constructor(name, age) {
    super(name, age);
  }
}

Object.assign(Dog.prototype, saunterMixin);

class GoldFish extends Pet {
  constructor(name, age) {
    super(name, age);
  }
}

Object.assign(GoldFish.prototype, swimMixin);

let cat = new Cat('Felix', 5);
let dog = new Dog('Fido', 2);
let goldFish = new GoldFish('Finn', 3);

cat.saunter();
dog.saunter();
goldFish.swim();

let obj = {};
let arr = [1,2,3];
let number = 123;

console.log(obj.toString()); // logs '[object Object]'
console.log(arr.toString()); // logs '1,2,3';
console.log(number.toString()); // logs '123';

// Problem about assigning prototypes;

let plane = {
  passengers: 220
};

let flyingMachine = {
  fly() {
    console.log(`Off we go with ${this.passengers} passengers!`);
  }
};

// Object.assign(plane, flyingMachine);
Object.setPrototypeOf(plane, flyingMachine);

plane.fly();


// Problem 14?

let contacts = {
  list: [],
  add(name, gender) {
    let contact = new Contact(name, gender);
    this.list.push(contact);
  },
  males() {
    return this.list.filter(function(contact) {
      return contact.gender === 'male';
     });
  },
  females() {
    return this.list.filter(function(contact) {
      return contact.gender === 'female';
    });
  },
  filterByName(name) {
    return this.list.filter(function(contact) {
      return contact.hasName(name);
    });
  },
};

function Contact(name, gender) {
  this.name = name;
  this.gender = gender;
}

Contact.prototype.hasName = function(name) {
  return this.name === name;
}

contacts.add("Doge", "male");
console.log(contacts.males());
console.log(contacts.females());
console.log(contacts.filterByName("Doge"));