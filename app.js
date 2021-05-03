"use strict";
var newBtn = document.getElementById('new-die');
var sumBtn = document.getElementById('sum-die');
var rerollBtn = document.getElementById('reroll-die');
var diceContainer = document.getElementById('dice-container');
var myCounter = counter();
var diceArray = [];
newBtn.addEventListener('click', handleNew);
rerollBtn.addEventListener('click', handleReroll);
sumBtn.addEventListener('click', handleSum);
function counter() {
    var count = 0;
    return function () {
        return ++count;
    };
}
function handleNew() {
    var newDice = new Dice();
    diceArray.push(newDice);
}
function handleReroll() {
    if (diceArray.length > 0) {
        diceArray.map(function (dice) {
            dice.roll();
        });
    }
    else {
        alert('Must have at least one dice to reroll everything!😃');
    }
}
function handleSum() {
    if (diceArray.length > 0) {
        var sum_1 = 0;
        diceArray.map(function (dice) {
            sum_1 += dice.value;
        });
        alert("You have " + diceArray.length + " dice \uD83D\uDE03. Sum of dice is: " + sum_1 + "!");
    }
    else {
        alert('There is nothing to add!');
    }
}
var Dice = /** @class */ (function () {
    function Dice() {
        var _this = this;
        this.value = 0;
        this.div = document.createElement('div');
        this.value = this.randomValue();
        this.render();
        this.div.addEventListener('click', function () {
            _this.roll();
        });
        this.div.addEventListener('dblclick', function () {
            _this.div.remove();
            var thisDiceIndex = diceArray.indexOf(_this);
            diceArray.splice(thisDiceIndex, 1);
        });
    }
    Dice.prototype.roll = function () {
        this.value = this.randomValue();
        this.div.textContent = this.value.toString();
    };
    Dice.prototype.randomValue = function () {
        return Math.ceil(Math.random() * 6);
    };
    Dice.prototype.render = function () {
        this.div.classList.add('box');
        this.div.id = myCounter().toString();
        this.div.textContent = this.value.toString();
        // inserts it in the DOM
        diceContainer.appendChild(this.div);
    };
    return Dice;
}());
