var dealerPoints = 0;
var playerPoints = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true   //allows player to hit while sum is <= 21 

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame(); 
}

function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

     for(let i=0; i<types.length; i++){
        for (let j=0; j<values.length; j++){
            deck.push(values[j] + "-" + types[i]); //A-C to K-C, A-D to K-D, etc
        }
    }
}

function shuffleDeck(){
    for(let i=0; i< deck.length; i++){
        let j=Math.floor(Math.random() * deck.length); // Math.random gives a number between (0, 1) * 52 which gives a number between 0-52
        let temp = deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
    console.log(deck)
}

function startGame(){
    hidden = deck.pop();
    dealerPoints += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    console.log(hidden);
    // console.log(dealerPoints);
    while (dealerPoints < 17){
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        dealerPoints += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }
    // console.log(dealerPoints);

    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        playerPoints += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);   
    }
    console.log(dealerPoints);
    console.log(playerPoints);
    document.getElementById("hit-button").addEventListener("click", hit);
    document.getElementById("stand-button").addEventListener("click", stand)
}

function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        playerPoints += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);  

    if(reduceAce(playerPoints, playerAceCount)>21){
        canHit=false; 
    let message = "";
    if (playerPoints>21){
        message = "You Lose"  
    }
    else if(dealerPoints>21){
        message = "You Win!";
    } 
    else if(playerPoints == dealerPoints){
        message = "Push";
    }
    else if(playerPoints > dealerPoints){
        message = "You Win!";
    }
    else if(playerPoints < dealerPoints){
        message = "You Lose";
    }
    document.getElementById("dealer-points").innerText = dealerPoints;
    document.getElementById("player-points").innerText = playerPoints;
    document.getElementById("messages").innerText = message;
    }
    console.log(dealerPoints);
    console.log(playerPoints);
}

function stand(){
    dealerPoints = reduceAce(dealerPoints, dealerAceCount);
    playerPoints = reduceAce(playerPoints, playerAceCount);
    canHit = false;
    document.getElementById("hidden").src = "./images/" + hidden + ".png";
    let message = "";
    if (playerPoints>21){
        message = "You Lose"  
    }
    else if(dealerPoints>21){
        message = "You Win!";
    } 
    else if(playerPoints == dealerPoints){
        message = "Push";
    }
    else if(playerPoints > dealerPoints){
        message = "You Win!";
    }
    else if(playerPoints < dealerPoints){
        message = "You Lose";
    }
    document.getElementById("dealer-points").innerText = dealerPoints;
    document.getElementById("player-points").innerText = playerPoints;
    document.getElementById("messages").innerText = message;
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)){
        if (value == "A"){
            return 11
        }
        return 10;
    }
    return parseInt(value);  
}

function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }
    return 0
}

function reduceAce(playerPoints, playerAceCount){
    while(playerPoints>21 && playerAceCount>0){
        playerPoints-=10;
        playerAceCount-=1;
    }
    return playerPoints;
}

let newGame = document.querySelector('#newGame-button')
newGame.addEventListener('click', e=>{
    location.reload();
})