"use strict";

//Global variables - they stay alive and reflect the state of the game 
let elPreviousCard = null;
let flippedCouplesCount = 0;
// let startTime = 0;
let TOTAL_COUPLES_COUNT = 6;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
let missMatchCounter = 0;

function cardClicked(elCard) {
    showReplayBtn('start-over');
    start();// Clock starts after user clicks the first card
    // if (startTime === 0) {// Clock starts after user clicks the first card
    //     startTime = Date.now();
    //     console.log(startTime);
    // }

    if (elCard.classList.contains('flipped')) {// If the user clicked an already flipped card - do nothing and return from the function
        return;
    }

    elCard.classList.add('flipped');// Flip it

    if (elPreviousCard === null) {// This is a first card, only keep it in the global variable
        elPreviousCard = elCard;
    } else {
        let card1 = elPreviousCard.getAttribute('data-card');// get the data-card attribute's value from both cards
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
            flippedCouplesCount++;// a match
            elPreviousCard = null;

            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {// All cards flipped
                pause();//clock pause
                showReplayBtn('start-over');  
                showOverlay();
                // let endTime = Date.now();
                // let currentGameDurationCal = endTime - startTime;
                // let currentGameDurationInt = parseInt(currentGameDurationCal);
                // document.querySelector(".bestscore").innerHTML = `Score: ${currentGameDurationInt}`; //Display Score
            }


        }

    }

}

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
    document.querySelector('.overlay').style.display = 'block';
  }
  
  function hideOverlay() {
    document.querySelector('.overlay').style.display = 'none';
  }
// function toggle_visibility(id) {
//     let e = document.getElementById(id);
//     if (e.style.visibility === 'visible') {
//         e.style.visibility = 'hidden'
//     } else {
//         e.style.visibility = 'visible';
//     }
// }

function reset(self) {
    if(self){document.querySelector('.overlay').style.display = 'none'};
    flippedCouplesCount = 0;
    // startTime = 0;
    // toggle_visibility('start-over');
    resetClock();
    clearMissed();
    let cardElements = document.querySelectorAll('.card');// Unflip all cards
    for (let i = 0; i < cardElements.length; ++i) {
        cardElements[i].classList.remove('flipped');
    }
}


//Timer
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