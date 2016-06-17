var pizzaCounter = 0;
var totalOrderPrice = 0;

function PizzaOrder(name, size) {
  this.orderName = name
  this.pizzaSize = size;
  this.basePrice = 12;
  this.toppings = [];
  this.price = 1;
  this.address = [];
};

var cheesePrice = { name: 'Cheese', price: 3}
var pepporoniPrice = { name: 'Pepperoni', price: 3}
var sausagePrice= { name: 'Sausage', price: 3}
var mushroomPrice = { name: 'Mushroom', price: 2}
var pineapplePrice = { name: 'Pineapple', price: 2}

PizzaOrder.prototype.addToppingPrice = function() {
  if (document.getElementById('cheese').checked) {
    this.toppings.push(cheesePrice);
  }
  if (document.getElementById('pepperoni').checked) {
    this.toppings.push(pepporoniPrice);
  }
  if (document.getElementById('sausage').checked) {
    this.toppings.push(sausagePrice);
  }
  if (document.getElementById('mushrooms').checked) {
    this.toppings.push(mushroomPrice);
  }
  if (document.getElementById('pineapple').checked) {
    this.toppings.push(pineapplePrice);
  }
}

PizzaOrder.prototype.sizeConverter = function() {
debugger;
  var tempPizzaSize;
  if (this.pizzaSize === 4) {
    tempPizzaSize = "Huge";
  } else if (this.pizzaSize === 3) {
    tempPizzaSize = "Large";
  } else if (this.pizzaSize === 2) {
    tempPizzaSize = "Medium";
  } else if (this.pizzaSize === 1) {
    tempPizzaSize = "Small";
  }
  return tempPizzaSize;
}

PizzaOrder.prototype.lastPizzaOrdered = function() {
  debugger;
  $('#toppingsPerPizza').append('Pizza size of ' + this.sizeConverter() + ' with these toppings:');
}

PizzaOrder.prototype.toppingsConverter = function() {
  var tempToppingsArray = [];
  this.toppings.forEach(function(topping) {
    $('#toppingsPerPizza').append('<li>' + topping.name + '</li>')
  })
}

PizzaOrder.prototype.createCost = function() {
  var toppingsCost = 0;
  this.toppings.forEach(function(topping) {
    toppingsCost += topping.price;
  });
  this.basePrice += toppingsCost;
  this.basePrice = (this.basePrice * this.pizzaSize / 2)
}

var radioReset = function() {
  $('input[name=pizzaCheeseRadio]').attr('checked', false);
  $('input[name=pizzaPepperoniRadio]').attr('checked', false);
  $('input[name=pizzaSausageRadio]').attr('checked', false);
  $('input[name=pizzaMushroomRadio]').attr('checked', false);
  $('input[name=pizzaPineappleRadio]').attr('checked', false);
}

$(document).ready(function() {
  $('form#pizzaOrder').submit(function(event) {
    event.preventDefault();
    var inputtedName = $('#new-name').val();
    var holder = document.getElementById("pizzaSize");
    var tempSize = holder.options[holder.selectedIndex].value;
    var inputtedSize = parseInt(tempSize);
    newPizzaOrder = new PizzaOrder(inputtedName, inputtedSize)
    newPizzaOrder.addToppingPrice();
    newPizzaOrder.createCost();
    totalOrderPrice += newPizzaOrder.basePrice;
    pizzaCounter += 1
    $('#totalCost').text(totalOrderPrice);
    $('#currentPizzaCost').text(newPizzaOrder.basePrice);
    $('#pizzaNumber').text(pizzaCounter);
    newPizzaOrder.lastPizzaOrdered();
    newPizzaOrder.toppingsConverter();
  });
  $('span#resetRadios').click(function() {
    radioReset();
  })
  $('span#displayCurrentCost').click(function() {
    var holder = document.getElementById("pizzaSize");
    var tempSize = holder.options[holder.selectedIndex].value;
    var inputtedSize = parseInt(tempSize);
    var inputtedName = '';
    newPizzaOrder = new PizzaOrder(inputtedName, inputtedSize)
    newPizzaOrder.addToppingPrice();
    newPizzaOrder.createCost();
    $('#currentPizzaCost').text(newPizzaOrder.basePrice);
  });
});
