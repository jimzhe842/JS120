function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

let services = {
  phone: 0,
  internet: 0
}
console.log(services.phone + 1 ? (services.phone === 0 ? 0 : services.phone) : 3000);



function createInvoice(services = {}) { // REMEMBER ZERO IS FALSY, THIS CAUSED YOU A LOT OF PROBLEMS!
  // let phoneCharge = services.phone || 3000;
  // let internetCharge = services.internet || 5500;
  return {
    phone: services.phone + 1 ? (services.phone === 0 ? 0 : services.phone) : 3000,  // TERNARY OPERATOR 0 IS FALSY AS WELL
    internet: services.internet + 1 ? (services.internet === 0 ? 0 : services.internet) : 5500,
    // phone: services.phone === 0 ? 0 : phoneCharge,
    // internet: services.internet === 0 ? 0 : internetCharge,
    
    // payments: [],
    // addPayment(payment) {
    //   this.payments.push(payment);
    // },
    // addPayments(payments) {
    //   payments.forEach(this.addPayment,this);
    // },
    // paymentTotal() {
    //   return payments.reduce((sum,payment) => sum + payment.total(), 0);
    // },
    // total() {
    //   return this.phone + this.internet;
    // },
    // amountDue() {
    //   return this.total() - this.paymentTotal();
    // },
    payment: 0,
    addPayment(payment) {
      this.payment += payment.total();
    },
    addPayments(payments) {
      this.payment += payments.reduce((sum,payment) => sum + payment.total(),0);
    },
    total() {
      return this.phone + this.internet;
    },
    amountDue() {
      return this.total() - this.payment;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ internet: 0, phone: 0 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000


function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      return this.amount || this.phone + this.internet;
    }
  }
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000



invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0


function make(type) {
  this.type = type;
  console.log(this);
}
let dog = new make('cake');




function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return (this.radius ** 2) * Math.PI;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false


function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`


// Problem 7
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.__proto__.constructor();

console.log(ninjaA.constructor === ninjaB.constructor) // => true





function User(first, last) {
  return {
    name: first + ' ' + last
  };
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe


function Cake(flavor) {
  this.flavor = flavor;
}
let vanillaCake = new Cake("Vanilla");
console.log(vanillaCake instanceof Cake);
vanillaCake.constructor = {};
console.log(vanillaCake instanceof Cake);
vanillaCake.__proto__.constructor = {};
console.log(vanillaCake instanceof Cake);