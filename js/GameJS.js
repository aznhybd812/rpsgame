
var plyrScore = 0;
var comScore = 0;
var playerScoreSpan = document.getElementById("playerScore");
var computerScoreSpan= document.getElementById("computerScore");
var scoreDiv = document.getElementById("score");
var outcomeDiv = document.querySelector(".outcome > p");
var rockDiv = document.getElementById("Rock");
var paperDiv = document.getElementById("Paper");
var scissorsDiv = document.getElementById("Scissors");
var comChoiceDiv = document.querySelector(".comChoice");
var plyrChoiceDiv = document.querySelector(".plyrChoice");
var chosenPic = document.querySelector(".chosenPic img");
var comChosenPic = document.querySelector(".comChosenPic img");
var chosenAnswer = document.getElementById("chosenAnswer");
var rounds = 1;

//------- Background Music & Event Handling Buttons -------------
var backgroundMusic = document.getElementById("music");
var playB = document.getElementById("playBtn");
var pauseB = document.getElementById("pauseBtn");

playB.addEventListener("click", function(evt){
       backgroundMusic.play();    
});
pauseB.addEventListener("click", function(evt){
  	backgroundMusic.pause();
});

//--------- Computer generates random choice of "Rock" "Paper" or "Scissors" ------------- 
function comChoice() {
    var options = ['Rock', 'Paper', 'Scissors'];
    var randomNum = (Math.floor(Math.random() * (2-0+1) + 0));          // Gets random whole number ranging from 0-2
    return options[randomNum];
}

//---------------------------------- Game Play -------------------------------------------- 
function runGame(playerChoice) {
    var comChooses = comChoice();
    plyrChoiceDiv.innerHTML = playerChoice;
    comChoiceDiv.innerHTML = comChooses;
    chosenPic.src = "images/" + playerChoice + ".png";
    chosenPic.style.display = "inline";
    comChosenPic.src = "images/" + comChooses + ".png";
    comChosenPic.style.display = "inline";
    var result;

    function win() {
        plyrScore++;
        playerScoreSpan.innerHTML = plyrScore;
        outcomeDiv.innerHTML = "Congratulations, YOU WON! " + playerChoice + " beats " + comChooses + "!";
        var winSound = document.getElementById("winSound");
        winSound.play();
    }

    function lose() {
        comScore++;
        computerScoreSpan.innerHTML = comScore;
        outcomeDiv.innerHTML = "Sorry, YOU LOST! " + comChooses + " beats " + playerChoice + "!";
        var loseSound = document.getElementById("loseSound");
        loseSound.play();
        
    }

    function tie() {
        computerScoreSpan.innerHTML = comScore;
        playerScoreSpan.innerHTML = plyrScore;
        outcomeDiv.innerHTML = "It's a TIE!";
        var tieSound = document.getElementById("tieSound");
        tieSound.play();
    }

    // 1. If Player and CPU chooses the SAME weapon:
    if (playerChoice === comChooses){   
        result = "TIE";                     
        tie();
    }
    
    // 2. If Player chooses ROCK: 
    if (playerChoice === "Rock"){                       
        if (comChooses === "Scissors"){
            result = "WIN";
            win();
        } else {
            result = "LOSE";
            lose(); 
        }
    }

    // 3. If Player chooses SCISSORS:
    if (playerChoice === "Scissors"){                    
        if (comChooses === "Paper"){
            result = "WIN";
            win(); 
        } else {
            result = "LOSE";
            lose(); 
        }
    }

    // 4. If Player chooses PAPER:
    if (playerChoice === "Paper") {                     
        if (comChooses === "Rock") {
            result = "WIN";
            win();
        } else {
            result = "LOSE";
            lose(); 
        }
    }

    addNewRow(playerChoice, comChooses, result);
}

function homePage (){
    rockDiv.addEventListener('click', function(){
        var rockSound = document.getElementById("rockSound");
        rockSound.play();
        runGame("Rock");
    })     
    
    paperDiv.addEventListener('click', function(){
        var paperSound = document.getElementById("paperSound");
        paperSound.play();
        runGame("Paper");
    })
    
    scissorsDiv.addEventListener('click', function(){
        var scissorsSound = document.getElementById("scissorsSound");
        scissorsSound.play();
        runGame("Scissors");
    })
}

homePage();

//----------------------- Write to Table (Game Statistics) -----------------------//
function addNewRow(playerChoice, comChooses, result){
    var tableArea = document.querySelector(".gameStatsTable");
    var comChoiceDiv = document.querySelector(".comChoice");
    var plyrChoiceDiv = document.querySelector(".plyrChoice");
    var comChooses = comChoice();  
    plyrChoiceDiv.innerHTML = playerChoice;
    comChoiceDiv.innerHTML = comChooses;
            
    class Entry{
        constructor (rounds, playerChoice, comChooses, result){
            this.rounds = rounds;
            this.playerChoice = playerChoice;
            this.comChooses = comChooses;
            this.result = result;
        }
    } 
    var gameStatsEntry = new Entry(rounds++, playerChoice, comChooses, result);
    writeRowToPage(gameStatsEntry, tableArea);
}
    

function writeRowToPage(dataObject, tableArea) {
    var write = "<div class=\"gameStats\">";

    write+= '</div><div class="rounds">';
    if (dataObject.rounds !== 'undefined') {
        write+=dataObject.rounds;
    }

    write+='<div class="playerChoice">';
    if (dataObject.playerChoice !== 'undefined') {
        write+=dataObject.playerChoice;
    }

    write+= '</div><div class="comChooses">';
    if (dataObject.comChooses !== 'undefined') {
        write+=dataObject.comChooses;
    }
    
    write+= '</div><div class="result">';
    if (dataObject.result !== 'undefined') {
        write+=dataObject.result;
    }

    write+= '</div></div>';
    tableArea.innerHTML += write;
};

//----------------------- Enter Player Name (MODAL BOX) -----------------------//
var modal = document.getElementById('myModal');

// Player Name Form Validtion (Checks for matched regex input)
var documentForm = document.forms[0];
var nameHolder = document.getElementById("nameHolder");

nameHolder.addEventListener("input", checkName, false);

function checkName(evt){
    var nameHolder = document.getElementById("nameHolder")
    var nameHolderValue = nameHolder.value;
    var nameHint = document.getElementById("nameHint");
    var blankHint = document.getElementById("blankHint");
    var regex = /^[A-Za-z]+$/;

    if(!nameHolderValue.match(regex)){
        nameHint.style.display = "block";
    } else {
        nameHint.style.display = "none";
    }  

    if(nameHolder.value == ""){
        blankHint.style.display = "block";
    } else {
        blankHint.style.display = "none";
    }
};

// ------------ Submit Form Validation (Handler runs when FORM is submitted) ------------
// Conditions = Field MUST NOT be blank & can only contain alphabetical letters a-z or A-Z
documentForm.addEventListener("submit", function (e){  
    var nameHolder = document.getElementById("nameHolder")
    var nameHolderValue = nameHolder.value;
    var player = document.getElementById('playerLabel');
    var regex = /^[A-Za-z]+$/;

    e.preventDefault();
    if (nameHolderValue == ""){
        alert ("Name required. Cannot leave field blank.");
    
    } else if (!nameHolderValue.match(regex)){
        alert ("Please provide a name using ONLY alphabet characters in order to proceed.");

    } else {
        player.innerHTML = nameHolderValue;
        modal.style.display = "none";
    }
})
