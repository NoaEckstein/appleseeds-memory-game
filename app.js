'use strict';

//Global variables - they stay alive and reflect the state of the game 
let elPreviousCard = null;
let flippedCouplesCount = 0;
let TOTAL_COUPLES_COUNT = 6;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
let missMatchCounter = 0;
let cardsArray = [1,2,3,4,5,6,1,2,3,4,5,6];

function cardClicked(elCard) {
    showReplayBtn('start-over');
    start();// Clock starts after user clicks the first card
  
    if (elCard.classList.contains('flipped')) {// If the user clicked an already flipped card - do nothing and return from the function
        return;
    }

    elCard.classList.add('flipped');// Flip card

    if (elPreviousCard === null) {// This is a first card, only keep it in the global variable
        elPreviousCard = elCard;
    } else {
        let card1 = elPreviousCard.getAttribute('data-card');// Get the data-card attribute's value from both cards
        let card2 = elCard.getAttribute('data-card');

        if (card1 !== card2) {// No match, schedule to flip them back in 1 second
            addMissed();
            const DOM_TREE = document.querySelectorAll('.card');
            DOM_TREE.forEach(node => node.classList.add('disable'))
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                DOM_TREE.forEach(node => node.classList.remove('disable'))
            }, 1000)

        } else {
            flippedCouplesCount++;//Matching cards
            elPreviousCard = null;

            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {// All cards flipped
                pause();//Pause clock
                showReplayBtn('start-over');  
                showOverlay();
            }
        }

    }

}
//----------------------------------- helper functions -----------------------------
function addMissed(){
    missMatchCounter ++;
    document.querySelector('.mistakes').innerText = missMatchCounter;
}

function clearMissed(){
    missMatchCounter = 0;
    document.querySelector('.mistakes').innerText = missMatchCounter;
}
function showReplayBtn(id){
    let e = document.querySelector('.'+id);
    e.style.visibility = 'visible';
}

function hideReplayBtn(id){
    let e = document.querySelector('.'+id);
    e.style.visibility = 'hidden';
}

function showOverlay() {
    document.querySelector('.overlay').style.visibility = 'visible';
  }
  
  function hideOverlay() {
    document.querySelector('.overlay').style.visibility = 'hidden';
  }

function reset(self) { //starts the game over after selecting btn in overlay
    if(self){document.querySelector('.overlay').style.visibility = 'hidden'};
    flippedCouplesCount = 0;
    resetClock();
    clearMissed();
    let cardElements = document.querySelectorAll('.card');// Unflip all cards
    for (let i = 0; i < cardElements.length; ++i) {
        cardElements[i].classList.remove('flipped');
    }
}


//------------------------------------ Timer ---------------------------------------------
function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function resetClock(){
    clearInterval(cron);
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}
 
 document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';


function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input > 10 ? input : `0${input}`
  }

  
  

  // function shuffleArray(array) {
  //     let currentIndex = array.length,  randomIndex;
    
  //     while (currentIndex != 0) {// While there remain elements to shuffle...
    
  //       randomIndex = Math.floor(Math.random() * currentIndex);// Pick a remaining element...
  //       currentIndex--;
    
  //       [array[currentIndex], array[randomIndex]] = [ // And swap it with the current element.
  //         array[randomIndex], array[currentIndex]];
  //     }
    
  //     return array;
  //   }
  
  //   function createBoard(){
  //     let shuffledCardsArray = shuffleArray(cardsArray);
  //     let boardElement = document.querySelector('.board');
  //     shuffledCardsArray.map((cardNo)=>{
  //         let cardElement = document.createElement('div');//create card element
  //         let backCard = document.createElement('img');//create back card img
  //         let frontCard = document.createElement('img');//create front card img
          
  //         boardElement.appendChild(cardElement);//add card to board
  //         cardElement.appendChild(backCard);
  //         cardElement.appendChild(frontCard);

  //         cardElement.classList.add('card');
  //         backCard.classList.add('back');
  //         frontCard.classList.add('front');

  //         cardElement.dataset.card = cardNo;
  //         cardElement.addEventListener('click',cardClicked.bind(cardElement),false);
  //         backCard.setAttribute('src','img/cards/back.png');
  //         frontCard.setAttribute('src',`img/cards/${cardNo}.png`);


  //       })
  //       console.log('boardElement',boardElement);
  //   }
  