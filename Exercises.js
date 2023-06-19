// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

Object.prototype.ancestors = function ancestors() {
  let ancestor = Object.getPrototypeOf(this);

  if (ancestor.hasOwnProperty('name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
};  

Object.prototype.ancestors2 = function() {
  let context = this;
  let chain = [];
  while (Object.getPrototypeOf(context).name) {
    let proto = Object.getPrototypeOf(context);
    console.log(proto);
    chain.push(proto.name);
    context = proto;
  };
  chain.push('Object.prototype');
  return chain;
}

// console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
// console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
// console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
// console.log(foo.ancestors());  // returns ['Object.prototype']

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName  = lastName  ;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  console.log(`${this.firstName} ${this.lastName}`);
}

Person.prototype.communicate = function() {
  console.log("Hello");
}

Person.prototype.eat = function() {
  console.log(`${this.firstName} eating...`);
}

Person.prototype.sleep = function() {
  console.log(`${this.firstName} sleeping...`);
}

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this,firstName, lastName, age, gender);
  this.specialization = specialization;
}


Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function() {
  console.log(`${this.firstName} diagnosing...`);
}

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function() {
  console.log(`${this.firstName} teaching...`);
}

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log(`${this.firstName} studying...`);
}

function GraduateStudent(firstName, lastName, age, gender, undergraduateDegree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, undergraduateDegree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function() {
  console.log(`${this.firstName} researching...`);
}

// let person = new Person('foo', 'bar', 21, 'gender');
// console.log(person instanceof Person);     // logs true
// person.eat();                              // logs 'Eating'
// person.communicate();                      // logs 'Communicating'
// person.sleep();                            // logs 'Sleeping'
// console.log(person.fullName());            // logs 'foo bar'

// let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
// console.log(doctor instanceof Person);     // logs true
// console.log(doctor instanceof Doctor);     // logs true
// doctor.eat();                              // logs 'Eating'
// doctor.communicate();                      // logs 'Communicating'
// doctor.sleep();                            // logs 'Sleeping'
// console.log(doctor.fullName());            // logs 'foo bar'
// doctor.diagnose();                         // logs 'Diagnosing'

// let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// // logs true for next three statements
// console.log(graduateStudent instanceof Person);
// console.log(graduateStudent instanceof Student);
// console.log(graduateStudent instanceof GraduateStudent);
// graduateStudent.eat();                     // logs 'Eating'
// graduateStudent.communicate();             // logs 'Communicating'
// graduateStudent.sleep();                   // logs 'Sleeping'
// console.log(graduateStudent.fullName());   // logs 'foo bar'
// graduateStudent.study();                   // logs 'Studying'
// graduateStudent.research();                // logs 'Researching'


class CircularQueue3 {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.buffer = [];
  }

  enqueue(item) {
    if (this.size === this.capacity) {
      this.buffer.shift();
      this.buffer.push(item);
    } else {
      this.buffer.push(item);
      this.size++;
    }
  }

  dequeue() {
    if (this.size === 0) {
      return null;
    } else {
      this.size--;
      let item = this.buffer.shift();
      return item;
    }
  }
}


class CircularQueue {
  constructor(size) {
    this.buffer = new Array(size).fill(null);
    this.oldestIndex = 0;
    this.nextIndex = 0;
  }

  enqueue(item) {
    if (this.buffer[this.nextIndex]) { // if nextIndex is full;
      this.buffer[this.oldestIndex] = item;
      this.incrementIndex();
    } else {
      this.buffer[this.nextIndex] = item;
      this.incrementNext();
    }
  }

  dequeue() {
    if (this.buffer[this.oldestIndex] === null) {
      return null;
    }
    if (this.buffer[this.nextIndex]) {
      let item = this.buffer[this.oldestIndex];
      this.buffer[this.oldestIndex] = null;
      this.nextIndex = this.oldestIndex;
      this.incrementIndex();
      return item;
    } else {
      let item = this.buffer[this.oldestIndex];
      this.buffer[this.oldestIndex] = null;
      this.incrementIndex();
      return item;
    }
  }
  
  incrementIndex() {
    this.oldestIndex = (this.oldestIndex + 1) % this.buffer.length;
  }

  incrementNext() {
    this.nextIndex = (this.nextIndex + 1) % this.buffer.length;
  }
}



let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);



