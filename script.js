//Challange 1 : Age in days
//Rishabh Bhargava - 18BEE0181

function ageInDays() {
    var birthyear = prompt("What's Your Birth Year ?");
    var res = (2021 - birthyear)*365;
    var h1 = document.createElement('h1');
    var text = document.createTextNode('You are '+ res + ' Days Old.');
    h1.setAttribute('id' , 'ageInDays');
    h1.appendChild(text);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

//Challenge 2 : Cat Generator

function GenerateCat(){
    var img= document.createElement('img');
    var div = document.getElementById('flexCatGen');
    img.src = "https://storage.googleapis.com/chydlx/codepen/random-gif-generator/giphy-logo.gif";
    div.appendChild(img);
}

//Challenge 3 : Rock Paper Scissor Game

function rpsGame(yourChoice){
    var humanChoice = yourChoice.id;
    var botChoice = ['rock' , 'paper' , 'scissor'][Math.floor(Math.random() * 3)];

    res = Compare(humanChoice , botChoice);

    ans = message(res);
    console.log(ans);

    rpsFrontEnd(humanChoice , botChoice , ans);

}
function Compare(humanChoice, botChoice){
    var array = {
        'rock' : {'rock' : 0.5 ,'paper' :  0 , 'scissor' : 1},
        'paper' : {'rock' : 1 ,'paper' :  0.5 , 'scissor' : 0},
        'scissor' : {'rock' : 0 ,'paper' :  1 , 'scissor' : 0.5},
    };
    var human = array[humanChoice][botChoice];
    var bot = array[botChoice][humanChoice];

    return [human , bot];
}
function message([human , bot]){
    if(human === 0){
        return {'message' : 'You Lost!' , 'color' : 'red'};
    }
    else if(human === 1){
        return {'message' : 'You Won!' , 'color' : 'green'};
    }
    else{
        return {'message' : 'You Tied!' , 'color' : 'yellow'};
    }
}
function rpsFrontEnd(humanChoice , botChoice , ans){
    var imgdb = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var msgdiv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imgdb[humanChoice] + "' height=150 width=150 style= 'box-shadow: 0px 10px 50px rgba(35, 50, 233, 1);'> ";
    msgdiv.innerHTML = "<h1 style = 'color: " + ans['color'] + "; font-size : 60px; padding : 10px ;'>" + ans['message'] + "</h1>";
    botdiv.innerHTML = "<img src='" + imgdb[botChoice] + "' height=150 width=150 style= 'box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'> ";
    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(msgdiv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
}

//Challange 4 : Change The Color of All Button

var all_buttons = document.getElementsByTagName('button');
var copyButton = [];

for(let i = 0 ; i<all_buttons.length ; i++){
    copyButton.push(all_buttons[i].classList[1]);
}

function buttonColorChange(ThisButton){
    if(ThisButton.value === 'red'){
        AllButtonRed();
    } else if(ThisButton.value === 'green'){
        AllButtonGreen();
    } else if(ThisButton.value === 'reset'){
        AllButtonReset();
    } else if(ThisButton.value === 'random'){
        AllButtonRandom();
    }
}

function AllButtonRed(){
    for(let i = 0 ; i,all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function AllButtonGreen(){
    for(let i = 0 ; i,all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success");
    }
}

function AllButtonReset(){
    for(let i = 0 ; i < all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyButton[i]);
    }
}

function AllButtonRandom(){
    var choice = ['btn-primary' , 'btn-success' , 'btn-danger' , 'btn-warning'];
    
    for(let i = 0 ; i<all_buttons.length ; i++){
        var random = [Math.floor(Math.random() * 4)];
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[random]);
    }
}

//Challenge 5 : BlackJack

let BlackJackGame = {
    'you' : {'scorespan' : '#your-blackjack-score' , 'div' : '#your-box' , 'score' : 0},
    'dealer' : {'scorespan' : '#dealer-blackjack-score' , 'div' : '#dealer-box' , 'score' : 0},
    'card' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardValue' : {'2' : 2 , '3' : 3 , '4' : 4 , '5' : 5 , '6' : 6,'7' : 7,'8' : 8,'9' : 9,'10' : 10,'K' : 10,'Q' : 10,'J' : 10,'A' : [1,11]},
}

const YOU = BlackJackGame['you'];
const DEALER = BlackJackGame['dealer'];
let HitSound = new Audio('assets/swish.m4a');
let WinSound = new Audio('assets/cash.mp3');
let LossSound = new Audio('assets/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click' , BlackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click' , BlackjackStand);
document.querySelector('#blackjack-Deal-button').addEventListener('click', BlackjackDeal);

function BlackjackHit(){
    let card = randomCard();
    cardShow(card , YOU);
    updateScore(card , YOU);
    showScore(YOU);
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return BlackJackGame['card'][randomIndex];
}

function cardShow(card , activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        //directly calling the file
        cardImage.src = `assets/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HitSound.play();
    }
}

function BlackjackDeal(){
    ShowWinner(ComputeWinner());
   
    let yourimg = document.querySelector('#your-box').querySelectorAll('img');
    let dealerimg = document.querySelector('#dealer-box').querySelectorAll('img');

    //Deleting Images
    for(let i = 0 ; i<yourimg.length ; i++){
        yourimg[i].remove();
    }
    for(let i = 0 ; i<dealerimg.length ; i++){
        dealerimg[i].remove();
    }
    //Restoring Your and Dealers span values
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector(YOU['scorespan']).textContent = 0;
    document.querySelector(YOU['scorespan']).style.color = '#ffffff';
    document.querySelector(DEALER['scorespan']).textContent = 0;
    document.querySelector(DEALER['scorespan']).style.color = '#ffffff';
}

function updateScore(card , activePlayer){
    if(card === 'A'){
        //If adding 11 goes you bust then add 1
        if(activePlayer['score'] + BlackJackGame['cardValue'][card][1]<= 21){
            activePlayer['score'] += BlackJackGame['cardValue'][card][1];
        }
        else{
            activePlayer['score'] += BlackJackGame['cardValue'][card][0];
        }
    }

    else{
        activePlayer['score'] += BlackJackGame['cardValue'][card];
    }
}

function showScore(activePlayer){
    //Updating the span value
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function BlackjackStand(){
    let card = randomCard();
    cardShow(card , DEALER);
    updateScore(card , DEALER);
    showScore(DEALER);
    
}
let none;
function ComputeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            message = "You Win!";
        
            winner = YOU;
            
        }
        else if(YOU['score'] < DEALER['score']){
            message = "You Lost!";
          
            winner = DEALER;
            
        }
        else if(YOU['score'] === DEALER['score']){
            message = "You Drew!";
            
        }
    }
    else if(YOU['score'] > 21){
        if(DEALER['score'] <= 21){
            message = "You Lost!";
            
            winner = DEALER;
        }
        else if(DEALER['score'] > 21){
            message = "mistake!";
           
        }
    }
    return winner;
}
let wins = 0;
let loss = 0;
let draws = 0;
function ShowWinner(winner){
    let message , messagecolor;
    if(winner === YOU){
        message = "You Win!";
        messagecolor = "green";
        WinSound.play();
        let win = wins+1;
        wins = win;
        console.log(win);
        document.querySelector('#Wins').textContent = win;
    }
    else if(winner === DEALER){
        message = "You Lost!";
        messagecolor = "red";
        LossSound.play();
        let har = loss + 1;
        loss = har;
        document.querySelector('#Losses').textContent = har;
    }
    else{
        message = "You Drew!";
        messagecolor = "black";
        let draw = draws + 1;
        draws = draw;
        document.querySelector('#Draws').textContent = draw;
    }
    document.querySelector('#res-span').textContent = message;
    document.querySelector('#res-span').style.color = messagecolor;
}