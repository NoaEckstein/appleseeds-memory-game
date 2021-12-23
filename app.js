//Global variables - they stay alive and reflect the state of the game 
let elPreviousCard = null;
let flippedCouplesCount = 0;
let startTime = 0;
let TOTAL_COUPLES_COUNT = 6;

function cardClicked(elCard) {
    
    if (startTime === 0) {// Clock starts after user clicks the first card
        startTime = Date.now();
        console.log(startTime);
    }

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

                toggle_visibility('startOver');// Show replay button  

                let endTime = Date.now();

                let currentGameDurationCal = endTime - startTime;
                let currentGameDurationInt = parseInt(currentGameDurationCal);
                document.querySelector(".bestscore").innerHTML = `Score: ${currentGameDurationInt}`; //Display Score
            }


        }

    }

}

function toggle_visibility(id) {
    let e = document.getElementById(id);
    if (e.style.visibility == 'visible') {
        e.style.visibility = 'hidden'
    } else {
        e.style.visibility = 'visible';
    }
}

function reset() {
    flippedCouplesCount = 0;
    startTime = 0;
    toggle_visibility('startOver');

    let cardElements = document.querySelectorAll('.card');// Unflip all cards
    for (let i = 0; i < cardElements.length; ++i) {
        cardElements[i].classList.remove('flipped');
    }
}