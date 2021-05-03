const newBtn = <HTMLElement>document.getElementById('new-die');
const sumBtn = <HTMLElement>document.getElementById('sum-die');
const rerollBtn = <HTMLElement>document.getElementById('reroll-die');
const diceContainer = <HTMLElement>document.getElementById('dice-container');
const myCounter = counter();
const diceArray: Array<Dice> = [];

newBtn.addEventListener('click', handleNew);
rerollBtn.addEventListener('click', handleReroll);
sumBtn.addEventListener('click', handleSum);

function counter() {
  let count: number = 0;
  return function () {
    return ++count;
  };
}

function handleNew() {
  const newDice: Dice = new Dice();
  diceArray.push(newDice);
}

function handleReroll() {
  if (diceArray.length > 0) {
    diceArray.map((dice) => {
      dice.roll();
    });
  } else {
    alert('Must have at least one dice to reroll everything!😃');
  }
}

function handleSum() {
  if (diceArray.length > 0) {
    let sum = 0;
    diceArray.map((dice) => {
      sum += dice.value;
    });

    alert(`You have ${diceArray.length} dice 😃. Sum of dice is: ${sum}!`);
  } else {
    alert('There is nothing to add!');
  }
}

class Dice {
  value: number = 0;
  div: HTMLElement;

  constructor() {
    this.div = document.createElement('div');
    this.value = this.randomValue();
    this.render();

    this.div.addEventListener('click', () => {
      this.roll();
    });

    this.div.addEventListener('dblclick', () => {
      this.div.remove();
      let thisDiceIndex = diceArray.indexOf(this);
      diceArray.splice(thisDiceIndex, 1);
    });
  }

  roll() {
    this.value = this.randomValue();
    this.div.textContent = this.value.toString();
  }

  randomValue() {
    return Math.ceil(Math.random() * 6);
  }

  render() {
    this.div.classList.add('box');
    this.div.id = myCounter().toString();
    this.div.textContent = this.value.toString();
    // inserts it in the DOM
    diceContainer.appendChild(this.div);
  }
}
