function Person() {
  this.hi = 'hi';
}
Person.prototype.greeting = function(text) {
  console.log(text);
}

function Shouter() {
  Person.call(this); // Any variables in the parent constructor gets instantiated here;
}
Shouter.prototype = Object.create(Person.prototype)
Shouter.prototype.greeting = function(text) {
  Person.prototype.greeting.call(this, text.toUpperCase());
}
Shouter.prototype.constructor = Shouter;

let person = new Person();
let shouter = new Shouter();

// console.log(person);
// console.log(shouter);
// console.log(shouter.__proto__ === Shouter.prototype);
// console.log(shouter.__proto__);

// person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
// shouter.greeting("Hello my friend."); // HELLO MY FRIEND. 


class Pet {
  constructor(species, name, shelter) {
    this.species = species;
    this.name = name;
    shelter.addUnadoptedPets(this);
  }
}



class Shelter {
  constructor() {
    this.owners = {};
    this.unadoptedPets = [];
  }

  adopt(owner, pet) { // You cannot use object as keys because they converted to string;
    let owners = this.owners;
    owners[owner.name] = owners[owner.name] || [owner];
    owners[owner.name].push(pet);
    owner.incrementAdoptedPets(1);
    let petIndex = this.unadoptedPets.indexOf(pet);
    this.undadoptedPets.splice(petIndex,1);
  }

  printAdoptions() {
    for (let owner in this.owners) {
      console.log(`${owner} has adopted the following pets:`);
      for (let idx = 0; idx < this.owners[owner].length; idx ++) {
        let pet = this.owners[owner][idx];
        console.log(`a ${pet.species} named ${pet.name}`);
      }
      console.log(' ');
    }
  }

  addUnadoptedPets(pet) {
    this.unadoptedPets.push(pet);
  }

  undaoptedPetsCount() {
    return this.undaoptedPets.length;
  }
}


class Owner {
  constructor(name) {
    this.name = name;
    this.adoptedPets = 0;
  }

  numberOfPets() {
    return this.owners[this].reduce((sum,pet) => sum++ , 0);
  }

  incrementAdoptedPets(value) {
    this.adoptedPets += value;
  }

  numberOfPets() {
    return this.adoptedPets;
  }

}

// let butterscotch = new Pet('cat', 'Butterscotch'); // Need to specify the shelter
// let pudding      = new Pet('cat', 'Pudding');
// let darwin       = new Pet('bearded dragon', 'Darwin');
// let kennedy      = new Pet('dog', 'Kennedy');
// let sweetie      = new Pet('parakeet', 'Sweetie Pie');
// let molly        = new Pet('dog', 'Molly');
// let chester      = new Pet('fish', 'Chester');

// let phanson = new Owner('P Hanson');
// let bholmes = new Owner('B Holmes');

// let shelter = new Shelter();
// shelter.adopt(phanson, butterscotch);
// shelter.adopt(phanson, pudding);
// shelter.adopt(phanson, darwin);
// shelter.adopt(bholmes, kennedy);
// shelter.adopt(bholmes, sweetie);
// shelter.adopt(bholmes, molly);
// shelter.adopt(bholmes, chester);
// shelter.printAdoptions();
// console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
// console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);



class Banner {
  constructor(message,length) {
    this.message = message;
    length = length || length >= message.length && length || message.length;
    this.length = (length - message.length) % 2 === 0 ? length : length + 1;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return '+' + '-'.repeat(this.length + 2) + '+';
  }

  emptyLine() {
    return '|' + ' '.repeat(this.length + 2) + '|';
  }

  messageLine() {
    let padding = (this.length - this.message.length) / 2 + 1;
    return `|${' '.repeat(padding)}${this.message}${' '.repeat(padding)}|`;
  }
}

// let banner1 = new Banner('To boldly go where no one has gone before.');
// banner1.displayBanner();

// let banner2 = new Banner('');
// banner2.displayBanner();

function objectsEqual(obj1,obj2) {
  if (obj1 === obj2) {
    return true;
  }
  let keys = Object.getOwnPropertyNames(obj1);
  return keys.every(key => {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
}

// console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
// console.log(objectsEqual({}, {}));                                      // true
// console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false



function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    notes: {},

    info: function() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses: function() {
      console.log(this.courses);
    },

    addCourse: function(courseObj) {

      this.courses.push(courseObj);
      this.notes[courseObj.code] = {name: courseObj.name};

    },

    addNote: function(code, note) { // Only add a note if a student is enrolled;
      if (!this.notes[code]) return;
      this.notes[code].note = this.notes[code].note || '';
      this.notes[code].note += ' ;' + note;

    },

    updateNote(code, note) {
      if (!this.notes[code]) return;
      this.addNote(code ,note); // you should override the existing value instead of adding to it;
    },

    viewNotes() {
      Object.values(this.notes).forEach(courseObj => {
        if (courseObj.note) { // Do not console log courses without notes
          console.log(`${courseObj.name}: ${courseObj.note}`);
        }
      })
    }
  }
}



let foo = createStudent('Foo', '1st');
foo.info();
"Foo is a 1st year student"
foo.listCourses();
[];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
[{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
"Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
"Math: Fun course; Remember to study for algebra"
"Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
"Math: Fun course"
"Advanced Math: Difficult subject"