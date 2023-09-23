const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start1");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const start2= document.getElementById("start2");
const chooseContainer = document.querySelector(".chooseContainer");
const wrapper2= document.querySelector(".wrapper2");
const wrapper1=document.querySelector(".wrapper1");
const val=document.querySelectorAll(".img .box");
let room;


const audio=new Audio();
audio.src="./music/click.mpeg";
const audiomatched=new Audio();
audiomatched.src="./music/matched.mpeg";
const wining=new Audio();
wining.src="./music/win.mpeg";

val.forEach((box)=>{
  box.addEventListener("click",(e)=>{
  room=e.currentTarget.dataset.id;
  });
}) ;



let cards;
let interval;
let firstCard = false;
let secondCard = false;

let item = (room)=>{
    if(room=='staitionary'){
      return [
        { name: "pencil", image: "./staitionary/pencil.webp" },
        { name: "brush", image: "./staitionary/brush.webp" },
        { name: "eraser", image: "./staitionary/eraser.jpg" },
        { name: "highlighter", image: "./staitionary/highligter.jpg" },
        { name: "paintingPlate", image: "./staitionary/paintingPlate.png" },
        { name: "rounder", image: "./staitionary/rounder.webp" },
        { name: "salotap", image: "./staitionary/salotap.webp" },
        { name: "scale", image: "./staitionary/scale.jpg" },
        { name: "scissor", image: "./staitionary/scissor.jpg" },
        { name: "sharpner", image: "./staitionary/sharpner.jpg" },
        { name: "stapler", image: "./staitionary/stapler.webp" },
        { name: "sticky-note", image: "./staitionary/sticky-note.jpg" },
      ];}
     else 
     if(room=="vegetables"){
      return [
        { name: "beans", image: "./vegetables/beans.jpg" },
        { name: "brinjal", image: "./vegetables/brinjal.jpg" },
        { name: "broccoli", image: "./vegetables/broccoli.jpg" },
        { name: "cabbage", image: "./vegetables/cabbage.jpg" },
        { name: "chilli", image: "./vegetables/chilli.jpeg" },
        { name: "cucumber", image: "./vegetables/cucumber.jpg" },
        { name: "garlic", image: "./vegetables/garlic.jpg" },
        { name: "ginger", image: "./vegetables/ginger.jpg" },
        { name: "ladyfinger", image: "./vegetables/ladyfinger.jpg" },
        { name: "onion", image: "./vegetables/onion.jpg" },
        { name: "potato", image: "./vegetables/potato.jpg" },
        { name: "tomatoe", image: "./vegetables/tomatoe.jpg" },
      
      ];
      
    }
    else if(room=="animals"){return [
      
      { name: "buffalo", image: "./animals/buffalo.avif" },
      { name: "cow", image: "./animals/cow.jpg" },
      { name: "crocodile", image: "./animals/crocodile.avif" },
      { name: "donkey", image: "./animals/donkey.avif" },
      { name: "fox", image: "./animals/fox.avif" },
      { name: "giraffe", image: "./animals/giraffe.jpg" },
      { name: "lion", image: "./animals/lion.jpg" },
      { name: "monkey", image: "./animals/monkey.jpeg" },
      { name: "sheep", image: "./animals/sheep.avif" },
      { name: "snake", image: "./animals/snake.avif" },
      { name: "tiger", image: "./animals/tiger.avif" },
      { name: "zebra", image: "./animals/zebra.avif" },
    ];}
    else if(room=="alphabates"){return [
      
      { name: "a", image: "./alphabets/a.jpg" },
      { name: "b", image: "./alphabets/b.jpg" },
      { name: "c", image: "./alphabets/c.png" },
      { name: "d", image: "./alphabets/d.png" },
      { name: "e", image: "./alphabets/e.jpg" },
      { name: "f", image: "./alphabets/f.jpg" },
      { name: "i", image: "./alphabets/i.jpg" },
      { name: "k", image: "./alphabets/k.png" },
      { name: "n", image: "./alphabets/n.jpg" },
      { name: "r", image: "./alphabets/r.png" },
      { name: "v", image: "./alphabets/v.jpg" },
      { name: "x", image: "./alphabets/x.png" },
    ];}

    else{
      return alert("choose your favourites");
    }
}

let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
const generateRandom = (size = 4) => {
  let items=item(room);
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {

    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before" onclick="audio.play()">?</div>
        <div class="card-after" >
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if(card.classList.contains("flipped")){
        return;
      }
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            audiomatched.play();
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won :)</h2>
            <h4>Moves: ${movesCount}</h4>`;
            wining.play();

              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click",()=>{ 
  startButton.classList.add("hide");
  controls.classList.add("hide");
  wrapper1.classList.remove("hide");
  chooseContainer.classList.remove("hide");
  wrapper2.classList.add("hide");
});

start2.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  wrapper1.classList.add("hide");
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  wrapper2.classList.remove("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    wrapper2.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
