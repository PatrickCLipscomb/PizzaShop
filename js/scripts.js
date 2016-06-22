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

PizzaOrder.prototype.createCost = function() {
  var toppingsCost = 0;
  this.toppings.forEach(function(topping) {
    toppingsCost += topping.price;
  });
  this.basePrice += toppingsCost;
  this.basePrice = (this.basePrice * this.pizzaSize / 2)
}

$(document).ready(function() {
  var radioReset = function() {
    $('input[name=pizzaCheeseRadio]').attr('checked', false);
    $('input[name=pizzaPepperoniRadio]').attr('checked', false);
    $('input[name=pizzaSausageRadio]').attr('checked', false);
    $('input[name=pizzaMushroomRadio]').attr('checked', false);
    $('input[name=pizzaPineappleRadio]').attr('checked', false);
  }
  var sizeConverter = function(pizza) {
    var tempPizzaSize;
    if (pizza.pizzaSize === 4) {
      tempPizzaSize = "Huge";
    } else if (pizza.pizzaSize === 3) {
      tempPizzaSize = "Large";
    } else if (pizza.pizzaSize === 2) {
      tempPizzaSize = "Medium";
    } else if (pizza.pizzaSize === 1) {
      tempPizzaSize = "Small";
    }
    return tempPizzaSize;
  }
  var addToppingPrice = function(pizza) {
    if (document.getElementById('cheese').checked) {
      pizza.toppings.push(cheesePrice);
    }
    if (document.getElementById('pepperoni').checked) {
      pizza.toppings.push(pepporoniPrice);
    }
    if (document.getElementById('sausage').checked) {
      pizza.toppings.push(sausagePrice);
    }
    if (document.getElementById('mushrooms').checked) {
      pizza.toppings.push(mushroomPrice);
    }
    if (document.getElementById('pineapple').checked) {
      pizza.toppings.push(pineapplePrice);
    }
  }
  var toppingsConverter = function(pizza) {
    var tempToppingsArray = [];
    pizza.toppings.forEach(function(topping) {
      $('#toppingsPerPizza').append('<li>' + topping.name + '</li>')
    })
  }
  var lastPizzaOrdered = function() {
    $('#toppingsPerPizza').append('Pizza size of ' + sizeConverter(newPizzaOrder) + ' with these toppings:');
  }
  $('form#pizzaOrder').submit(function(event) {
    event.preventDefault();
    var inputtedName = $('#new-name').val();
    var holder = document.getElementById("pizzaSize");
    var tempSize = holder.options[holder.selectedIndex].value;
    var inputtedSize = parseInt(tempSize);
    newPizzaOrder = new PizzaOrder(inputtedName, inputtedSize)
    addToppingPrice(newPizzaOrder);
    newPizzaOrder.createCost();
    totalOrderPrice += newPizzaOrder.basePrice;
    pizzaCounter += 1
    $('#totalCost').text(totalOrderPrice);
    $('#currentPizzaCost').text(newPizzaOrder.basePrice);
    $('#pizzaNumber').text(pizzaCounter);
    lastPizzaOrdered();
    toppingsConverter(newPizzaOrder);
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
    addToppingPrice(newPizzaOrder);
    newPizzaOrder.createCost();
    $('#currentPizzaCost').text(newPizzaOrder.basePrice);
  });
  $('span#SubmitOrder').click(function() {
    var holder = document.getElementById("pizzaSize");
    var tempSize = holder.options[holder.selectedIndex].value;
    var inputtedSize = parseInt(tempSize);
    inputtedName = $('#new-name').val();
    newPizzaOrder = new PizzaOrder(inputtedName, inputtedSize)
    addToppingPrice(newPizzaOrder);
    newPizzaOrder.createCost();
    $('#result').show();
    $('#result').text(newPizzaOrder.orderName + " your order will be ready in 2 hours.");
  });
});
